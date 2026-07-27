import { describe, expect, it } from 'vitest';
import {
  fromDollars, splitLine, isLegalRateForActivity, allocationSumsTo100,
  allocateFederalShare, reconcile, cents, type BudgetLine,
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

describe('match-rate splits — 42 CFR 433.112(a), 433.116(a)', () => {
  it('splits 90/10 exactly', () => {
    const s = splitLine(line());
    expect(s.federalCents).toBe(fromDollars(900_000));
    expect(s.stateCents).toBe(fromDollars(100_000));
  });

  it('splits 75/25 exactly', () => {
    const s = splitLine(line({ activityClass: 'M_AND_O', federalRate: 75 }));
    expect(s.federalCents).toBe(fromDollars(750_000));
    expect(s.stateCents).toBe(fromDollars(250_000));
  });

  // The property that lets V-APD-S8-002 be a blocker: parts always equal the whole.
  it('federal + state always equals the total, at every odd amount', () => {
    for (const dollars of [0.01, 0.03, 1, 33.33, 99.99, 1_234_567.89]) {
      for (const rate of [90, 75, 50] as const) {
        const l = line({ totalCents: fromDollars(dollars), federalRate: rate });
        const s = splitLine(l);
        expect(s.federalCents + s.stateCents).toBe(l.totalCents);
      }
    }
  });
});

describe('activity class vs rate — V-APD-S8-003', () => {
  it('rejects M&O claimed at 90 percent', () => {
    expect(isLegalRateForActivity('M_AND_O', 90)).toBe(false);
  });
  it('allows DDI at 90 and operations at 75', () => {
    expect(isLegalRateForActivity('DDI', 90)).toBe(true);
    expect(isLegalRateForActivity('M_AND_O', 75)).toBe(true);
  });
  it('holds admin to 50 percent', () => {
    expect(isLegalRateForActivity('ADMIN', 75)).toBe(false);
    expect(isLegalRateForActivity('ADMIN', 50)).toBe(true);
  });
});

describe('cost allocation — V-APD-S10-001', () => {
  it('requires shares to sum to exactly 100 percent', () => {
    expect(allocationSumsTo100(line({ allocationBps: { MEDICAID: 6_000, CHIP: 4_000 } }))).toBe(true);
    expect(allocationSumsTo100(line({ allocationBps: { MEDICAID: 6_000, CHIP: 3_999 } }))).toBe(false);
  });

  it('allocated parts sum to the federal share even when shares do not divide evenly', () => {
    const l = line({ totalCents: fromDollars(1_000_000.01), allocationBps: { A: 3_333, B: 3_333, C: 3_334 } });
    const parts = allocateFederalShare(l);
    const sum = Object.values(parts).reduce((a, b) => a + b, 0);
    expect(sum).toBe(splitLine(l).federalCents);
  });
});

describe('narrative/budget reconciliation — V-APD-S8-001 (flagship)', () => {
  it('passes when every figure matches', () => {
    const n = new Map([['DDI FFY2027', fromDollars(1_000_000)]]);
    expect(reconcile(n, new Map(n))).toEqual([]);
  });

  it('catches a one-cent discrepancy — tolerance is zero', () => {
    const n = new Map([['DDI FFY2027', fromDollars(1_000_000)]]);
    const t = new Map([['DDI FFY2027', cents(fromDollars(1_000_000) - 1)]]);
    expect(reconcile(n, t)).toHaveLength(1);
  });

  it('catches a figure that appears in the narrative but not the table', () => {
    const found = reconcile(new Map([['Contractor', fromDollars(250_000)]]), new Map());
    expect(found[0]?.label).toBe('Contractor');
    expect(found[0]?.tableCents).toBe(0);
  });
});
