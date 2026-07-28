/**
 * Rollups across federal fiscal years and benefiting programs.
 *
 * These aggregate the per-line splits. They never re-split an aggregated total.
 * Splitting a sum and summing the splits are not the same number once rounding
 * is involved, and only one of them reconciles against the line items a state
 * actually files. An MDBT whose FY column does not equal its own rows is the
 * defect this package exists to make impossible.
 */
import { cents, ZERO_CENTS, type Cents } from './money.js';
import { allocateFederalShare, splitLine, type BudgetLine } from './lines.js';
import { ACTIVITY_CLASSES, type ActivityClass } from './rates.js';

export interface Totals {
  readonly totalCents: Cents;
  readonly federalCents: Cents;
  readonly stateCents: Cents;
}

export interface FiscalYearRollup extends Totals {
  readonly federalFiscalYear: number;
  readonly lineCount: number;
  readonly totalByActivityClass: Readonly<Record<ActivityClass, Cents>>;
}

function emptyByActivityClass(): Record<ActivityClass, Cents> {
  const out = {} as Record<ActivityClass, Cents>;
  for (const c of ACTIVITY_CLASSES) out[c] = ZERO_CENTS;
  return out;
}

/** Grand totals across every line, at every rate and fiscal year. */
export function rollupTotals(lines: readonly BudgetLine[]): Totals {
  let total = 0;
  let federal = 0;
  let state = 0;
  for (const line of lines) {
    const split = splitLine(line);
    total += line.totalCents;
    federal += split.federalCents;
    state += split.stateCents;
  }
  return { totalCents: cents(total), federalCents: cents(federal), stateCents: cents(state) };
}

/**
 * One row per federal fiscal year, ascending. Within a year, lines may carry
 * different activity classes and different rates; each is split on its own
 * terms before being added in.
 */
export function rollupByFiscalYear(lines: readonly BudgetLine[]): FiscalYearRollup[] {
  interface Acc {
    total: number;
    federal: number;
    state: number;
    lineCount: number;
    byClass: Record<ActivityClass, Cents>;
  }
  const byYear = new Map<number, Acc>();

  for (const line of lines) {
    const split = splitLine(line);
    let acc = byYear.get(line.federalFiscalYear);
    if (acc === undefined) {
      acc = { total: 0, federal: 0, state: 0, lineCount: 0, byClass: emptyByActivityClass() };
      byYear.set(line.federalFiscalYear, acc);
    }
    acc.total += line.totalCents;
    acc.federal += split.federalCents;
    acc.state += split.stateCents;
    acc.lineCount += 1;
    acc.byClass[line.activityClass] = cents(acc.byClass[line.activityClass] + line.totalCents);
  }

  return [...byYear.entries()]
    .sort(([a], [b]) => a - b)
    .map(([federalFiscalYear, acc]) => ({
      federalFiscalYear,
      lineCount: acc.lineCount,
      totalCents: cents(acc.total),
      federalCents: cents(acc.federal),
      stateCents: cents(acc.state),
      totalByActivityClass: acc.byClass,
    }));
}

/**
 * Federal share by benefiting program, across every line.
 *
 * Each line's allocation already sums to that line's federal share exactly, so
 * the program totals sum to the grand federal share exactly. This is the number
 * that has to tie out against the cost-allocation narrative.
 */
export function rollupFederalShareByProgram(lines: readonly BudgetLine[]): Record<string, Cents> {
  const out: Record<string, Cents> = {};
  for (const line of lines) {
    for (const [program, amount] of Object.entries(allocateFederalShare(line))) {
      out[program] = cents((out[program] ?? ZERO_CENTS) + amount);
    }
  }
  return out;
}

/** Federal share by program, for a single fiscal year. */
export function rollupFederalShareByProgramForYear(
  lines: readonly BudgetLine[],
  federalFiscalYear: number,
): Record<string, Cents> {
  return rollupFederalShareByProgram(lines.filter((l) => l.federalFiscalYear === federalFiscalYear));
}

/** Every fiscal year present, ascending. */
export function fiscalYearsCovered(lines: readonly BudgetLine[]): number[] {
  return [...new Set(lines.map((l) => l.federalFiscalYear))].sort((a, b) => a - b);
}
