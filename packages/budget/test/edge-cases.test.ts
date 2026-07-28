import { describe, expect, it } from 'vitest';
import {
  ACTIVITY_CLASSES,
  allocateFederalShare,
  allocationSumsTo100,
  cents,
  FEDERAL_RATES,
  fiscalYearsCovered,
  fromDollars,
  isLegalRateForActivity,
  reconcile,
  rollupByFiscalYear,
  rollupFederalShareByProgram,
  rollupTotals,
  splitLine,
  stateSharePct,
  STATUTORY_FEDERAL_PCT,
  validateLine,
  type ActivityClass,
  type BudgetLine,
} from '../src/index.js';

const line = (over: Partial<BudgetLine> = {}): BudgetLine => ({
  id: 'L1',
  federalFiscalYear: 2027,
  activityClass: 'DDI',
  federalRate: 90,
  totalCents: fromDollars(1_000_000),
  allocationBps: { MEDICAID: 10_000 },
  ...over,
});

/** Legal (activityClass, rate) pairs, derived from the register rather than listed. */
const LEGAL_PAIRS: ReadonlyArray<readonly [ActivityClass, number]> = ACTIVITY_CLASSES.flatMap(
  (c) => FEDERAL_RATES.filter((r) => isLegalRateForActivity(c, r)).map((r) => [c, r] as const),
);

describe('rates come from the register, not from literals', () => {
  it('derives every federal rate from @apd-studio/rules', () => {
    // 90 DDI / 75 M&O / 50 admin — asserted as a set so the register stays the
    // source of truth. If CMS changes a rate, the register changes and this
    // test tells us the package followed.
    expect([...FEDERAL_RATES].sort((a, b) => a - b)).toEqual([50, 75, 90]);
  });

  it('pairs each federal rate with its complementary state share', () => {
    for (const rate of FEDERAL_RATES) {
      expect(rate + stateSharePct(rate)).toBe(100);
    }
  });

  it('maps each activity class to its statutory ceiling', () => {
    expect(STATUTORY_FEDERAL_PCT.DDI).toBe(90);
    expect(STATUTORY_FEDERAL_PCT.M_AND_O).toBe(75);
    expect(STATUTORY_FEDERAL_PCT.ADMIN).toBe(50);
  });

  it('refuses a rate the register does not define', () => {
    expect(() => stateSharePct(80)).toThrow(/not a match rate/i);
    expect(() => splitLine(line({ federalRate: 80 }))).toThrow(/not a match rate/i);
  });

  it('never lets M&O reach the DDI rate, at any amount', () => {
    expect(isLegalRateForActivity('M_AND_O', STATUTORY_FEDERAL_PCT.DDI)).toBe(false);
    expect(validateLine(line({ activityClass: 'M_AND_O', federalRate: 90 }))
      .map((p) => p.code)).toContain('ILLEGAL_RATE_FOR_ACTIVITY');
  });

  it('cites a rule when it rejects an illegal combination', () => {
    const problem = validateLine(line({ activityClass: 'M_AND_O', federalRate: 90 }))
      .find((p) => p.code === 'ILLEGAL_RATE_FOR_ACTIVITY');
    expect(problem?.ruleId).toBe('RR-RATE-OPS-75');
    expect(problem?.citation).toBe('42 CFR 433.116(a)');
  });
});

describe('zero-dollar lines', () => {
  it('splits a zero line to zero and zero, at every legal rate', () => {
    for (const [activityClass, federalRate] of LEGAL_PAIRS) {
      const s = splitLine(line({ totalCents: cents(0), activityClass, federalRate }));
      expect(s.federalCents).toBe(0);
      expect(s.stateCents).toBe(0);
    }
  });

  it('never yields negative zero', () => {
    const s = splitLine(line({ totalCents: cents(0) }));
    expect(Object.is(s.federalCents, -0)).toBe(false);
    expect(Object.is(s.stateCents, -0)).toBe(false);
  });

  it('allocates a zero line across programs as zeros that still sum to the federal share', () => {
    const l = line({ totalCents: cents(0), allocationBps: { MEDICAID: 6_000, CHIP: 4_000 } });
    const parts = allocateFederalShare(l);
    expect(parts).toEqual({ MEDICAID: 0, CHIP: 0 });
    expect(Object.values(parts).reduce((a, b) => a + b, 0)).toBe(splitLine(l).federalCents);
  });

  it('treats a zero line as valid — a planned-but-unfunded activity is not an error', () => {
    expect(validateLine(line({ totalCents: cents(0) }))).toEqual([]);
  });

  it('reconciles zero against zero without a finding', () => {
    expect(reconcile(new Map([['DDI FFY2027', cents(0)]]), new Map([['DDI FFY2027', cents(0)]])))
      .toEqual([]);
  });

  it('still flags a figure that is zero in the table but non-zero in the narrative', () => {
    const found = reconcile(
      new Map([['DDI FFY2027', fromDollars(1)]]),
      new Map([['DDI FFY2027', cents(0)]]),
    );
    expect(found).toHaveLength(1);
    expect(found[0]?.deltaCents).toBe(100);
  });
});

describe('negative amounts — credits and prior-period adjustments', () => {
  // The arithmetic must stay exact for negatives even though a negative line is
  // reportable: a credit that silently loses a cent is still a reconciliation
  // failure, and it would be blamed on the wrong line.
  it('keeps federal + state === total for negative amounts at every legal rate', () => {
    for (const dollars of [-0.01, -0.03, -1, -33.33, -99.99, -1_234_567.89]) {
      for (const [activityClass, federalRate] of LEGAL_PAIRS) {
        const l = line({ totalCents: fromDollars(dollars), activityClass, federalRate });
        const s = splitLine(l);
        expect(s.federalCents + s.stateCents).toBe(l.totalCents);
      }
    }
  });

  it('holds across a contiguous sweep of small negative amounts', () => {
    for (let c = -250; c <= 0; c++) {
      for (const rate of FEDERAL_RATES) {
        const l = line({ totalCents: cents(c), activityClass: 'DDI', federalRate: rate });
        const s = splitLine(l);
        expect(s.federalCents + s.stateCents).toBe(l.totalCents);
      }
    }
  });

  it('allocates a negative federal share so the parts still sum to the whole', () => {
    const l = line({
      totalCents: fromDollars(-1_000_000.01),
      allocationBps: { A: 3_333, B: 3_333, C: 3_334 },
    });
    const parts = allocateFederalShare(l);
    const sum = Object.values(parts).reduce((a, b) => a + b, 0);
    expect(sum).toBe(splitLine(l).federalCents);
  });

  it('reports a negative line rather than accepting it silently', () => {
    const problems = validateLine(line({ totalCents: fromDollars(-5_000) }));
    expect(problems.map((p) => p.code)).toContain('NEGATIVE_TOTAL');
  });

  it('rolls negative lines up against positive ones without drift', () => {
    const lines = [
      line({ id: 'A', totalCents: fromDollars(1_000_000) }),
      line({ id: 'B', totalCents: fromDollars(-250_000.01) }),
    ];
    const t = rollupTotals(lines);
    expect(t.federalCents + t.stateCents).toBe(t.totalCents);
    expect(t.totalCents).toBe(fromDollars(749_999.99));
  });
});

describe('non-integer and malformed input is refused, not rounded away', () => {
  it('throws rather than splitting a fractional cent amount', () => {
    const bad = { ...line(), totalCents: 100.5 as unknown as BudgetLine['totalCents'] };
    expect(() => splitLine(bad)).toThrow(/integer cent/i);
  });

  it('reports a fractional cent amount as a problem', () => {
    const bad = { ...line(), totalCents: 100.5 as unknown as BudgetLine['totalCents'] };
    expect(validateLine(bad).map((p) => p.code)).toContain('NON_INTEGER_CENTS');
  });

  it('refuses to allocate when the allocation does not total 100 percent', () => {
    const l = line({ allocationBps: { MEDICAID: 6_000, CHIP: 3_999 } });
    expect(allocationSumsTo100(l)).toBe(false);
    // Silently giving the shortfall to the last program would be a confident
    // wrong number — worse than an error. CLAUDE.md hard rule 11.
    expect(() => allocateFederalShare(l)).toThrow(/100%/);
  });

  it('refuses to allocate a line with no benefiting program', () => {
    const l = line({ allocationBps: {} });
    expect(allocationSumsTo100(l)).toBe(false);
    expect(() => allocateFederalShare(l)).toThrow();
    expect(validateLine(l).map((p) => p.code)).toContain('EMPTY_ALLOCATION');
  });
});

describe('multi-fiscal-year rollups', () => {
  // A realistic shape: DDI tapering across three years while M&O ramps up,
  // split between Medicaid and CHIP.
  const project = (): BudgetLine[] => [
    line({ id: 'ddi-27', federalFiscalYear: 2027, activityClass: 'DDI', federalRate: 90,
      totalCents: fromDollars(4_000_000), allocationBps: { MEDICAID: 8_500, CHIP: 1_500 } }),
    line({ id: 'ddi-28', federalFiscalYear: 2028, activityClass: 'DDI', federalRate: 90,
      totalCents: fromDollars(2_500_000.33), allocationBps: { MEDICAID: 8_500, CHIP: 1_500 } }),
    line({ id: 'mo-28', federalFiscalYear: 2028, activityClass: 'M_AND_O', federalRate: 75,
      totalCents: fromDollars(750_000.07), allocationBps: { MEDICAID: 8_500, CHIP: 1_500 } }),
    line({ id: 'mo-29', federalFiscalYear: 2029, activityClass: 'M_AND_O', federalRate: 75,
      totalCents: fromDollars(1_100_000.11), allocationBps: { MEDICAID: 8_500, CHIP: 1_500 } }),
    line({ id: 'admin-29', federalFiscalYear: 2029, activityClass: 'ADMIN', federalRate: 50,
      totalCents: fromDollars(60_000.01), allocationBps: { MEDICAID: 8_500, CHIP: 1_500 } }),
  ];

  it('returns one row per fiscal year, ascending', () => {
    expect(rollupByFiscalYear(project()).map((r) => r.federalFiscalYear)).toEqual([2027, 2028, 2029]);
    expect(fiscalYearsCovered(project())).toEqual([2027, 2028, 2029]);
  });

  it('keeps federal + state === total within every fiscal year', () => {
    for (const row of rollupByFiscalYear(project())) {
      expect(row.federalCents + row.stateCents).toBe(row.totalCents);
    }
  });

  it('makes the fiscal-year rows sum to the grand total, to the cent', () => {
    const rows = rollupByFiscalYear(project());
    const grand = rollupTotals(project());
    const sum = (pick: (r: (typeof rows)[number]) => number) =>
      rows.reduce((a, r) => a + pick(r), 0);

    expect(sum((r) => r.totalCents)).toBe(grand.totalCents);
    expect(sum((r) => r.federalCents)).toBe(grand.federalCents);
    expect(sum((r) => r.stateCents)).toBe(grand.stateCents);
    expect(grand.federalCents + grand.stateCents).toBe(grand.totalCents);
  });

  it('separates activity classes within a mixed year', () => {
    const y2028 = rollupByFiscalYear(project()).find((r) => r.federalFiscalYear === 2028);
    expect(y2028?.lineCount).toBe(2);
    expect(y2028?.totalByActivityClass.DDI).toBe(fromDollars(2_500_000.33));
    expect(y2028?.totalByActivityClass.M_AND_O).toBe(fromDollars(750_000.07));
    expect(y2028?.totalByActivityClass.ADMIN).toBe(0);
  });

  it('applies each line its own rate rather than a blended one', () => {
    const y2029 = rollupByFiscalYear(project()).find((r) => r.federalFiscalYear === 2029);
    // 75% of 1,100,000.11 plus 50% of 60,000.01, each rounded on its own line.
    const expected =
      splitLine(project()[3] as BudgetLine).federalCents +
      splitLine(project()[4] as BudgetLine).federalCents;
    expect(y2029?.federalCents).toBe(expected);
  });

  it('rolls the federal share up by program to exactly the grand federal share', () => {
    const byProgram = rollupFederalShareByProgram(project());
    const sum = Object.values(byProgram).reduce((a, b) => a + b, 0);
    expect(Object.keys(byProgram).sort()).toEqual(['CHIP', 'MEDICAID']);
    expect(sum).toBe(rollupTotals(project()).federalCents);
  });

  it('handles an empty budget without inventing a total', () => {
    expect(rollupByFiscalYear([])).toEqual([]);
    expect(rollupTotals([])).toEqual({ totalCents: 0, federalCents: 0, stateCents: 0 });
    expect(rollupFederalShareByProgram([])).toEqual({});
  });

  it('rolls up a single year spanning all three activity classes', () => {
    const lines = ACTIVITY_CLASSES.map((activityClass, i) =>
      line({
        id: `x${i}`,
        federalFiscalYear: 2030,
        activityClass,
        federalRate: STATUTORY_FEDERAL_PCT[activityClass],
        totalCents: fromDollars(333_333.33),
      }),
    );
    const rows = rollupByFiscalYear(lines);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.lineCount).toBe(3);
    expect(rows[0]?.federalCents ?? 0).toBe(
      lines.reduce((a, l) => a + splitLine(l).federalCents, 0),
    );
  });
});

describe('exhaustive split property — the basis for a blocker-severity check', () => {
  it('federal + state === total across a contiguous cent sweep at every legal rate', () => {
    for (let c = 0; c <= 1_000; c++) {
      for (const [activityClass, federalRate] of LEGAL_PAIRS) {
        const l = line({ totalCents: cents(c), activityClass, federalRate });
        const s = splitLine(l);
        expect(s.federalCents + s.stateCents).toBe(l.totalCents);
      }
    }
  });

  it('never awards more federal share than the rate allows', () => {
    for (let c = 0; c <= 1_000; c++) {
      for (const rate of FEDERAL_RATES) {
        const s = splitLine(line({ totalCents: cents(c), federalRate: rate }));
        // Rounding may add at most half a cent; it may never round a whole cent
        // of state money into the federal column.
        expect(s.federalCents).toBeLessThanOrEqual(Math.ceil((c * rate) / 100));
        expect(s.federalCents).toBeGreaterThanOrEqual(Math.floor((c * rate) / 100));
      }
    }
  });

  it('allocated parts sum to the federal share across many uneven splits', () => {
    for (let c = 0; c <= 500; c++) {
      const l = line({
        totalCents: cents(c),
        allocationBps: { A: 1_667, B: 1_667, C: 1_666, D: 5_000 },
      });
      const parts = allocateFederalShare(l);
      const sum = Object.values(parts).reduce((a, b) => a + b, 0);
      expect(sum).toBe(splitLine(l).federalCents);
    }
  });
});
