/**
 * Budget lines: match-rate splits and cost allocation across benefiting programs.
 */
import {
  assertIntegerCents,
  BASIS_POINTS_TOTAL,
  cents,
  PERCENT_DIVISOR,
  type Cents,
} from './money.js';
import {
  citationFor,
  isKnownFederalRate,
  isLegalRateForActivity,
  rateRuleFor,
  stateSharePct,
  STATUTORY_FEDERAL_PCT,
  type ActivityClass,
} from './rates.js';

export interface BudgetLine {
  readonly id: string;
  readonly federalFiscalYear: number;
  readonly activityClass: ActivityClass;
  /** Federal percentage. Validated against the register — never a free number. */
  readonly federalRate: number;
  readonly totalCents: Cents;
  /** Program code -> share of this line, in basis points (10000 = 100%). */
  readonly allocationBps: Readonly<Record<string, number>>;
}

export interface Split {
  readonly federalCents: Cents;
  readonly stateCents: Cents;
}

/**
 * Split a line into federal and state shares.
 *
 * The state share is the REMAINDER — total minus federal — and is never
 * independently rounded. That is what makes `federal + state === total` an
 * identity rather than an approximation, and it is the only reason
 * V-APD-S8-002 can carry blocker severity: a check that is itself capable of a
 * rounding error cannot block a submission.
 *
 * Holds for negative totals and zero-dollar lines alike, because it is
 * subtraction, not a second rounding.
 */
export function splitLine(line: BudgetLine): Split {
  assertIntegerCents(line.totalCents, `Budget line ${line.id} total`);
  // Throws unless the register recognises this rate. An unrecognised rate is
  // not a rounding question, it is a made-up match rate.
  stateSharePct(line.federalRate);

  const federal = cents((line.totalCents * line.federalRate) / PERCENT_DIVISOR);
  const state = cents(line.totalCents - federal);
  return { federalCents: federal, stateCents: state };
}

/** V-APD-S10-001: allocation across benefiting programs must sum to exactly 100%. */
export function allocationSumsTo100(line: BudgetLine): boolean {
  const values = Object.values(line.allocationBps);
  if (values.length === 0) return false;
  return values.reduce((a, b) => a + b, 0) === BASIS_POINTS_TOTAL;
}

/**
 * Split a line's FEDERAL share across the benefiting programs.
 *
 * The last program receives the remainder, so the allocated parts always sum to
 * the federal share exactly even when the percentages do not divide evenly.
 * Program order is the insertion order of `allocationBps`.
 *
 * Throws on an allocation that does not sum to 100%: silently spraying the
 * shortfall onto the last program would produce a confident wrong number, which
 * is worse than an error (CLAUDE.md hard rule 11).
 */
export function allocateFederalShare(line: BudgetLine): Record<string, Cents> {
  if (!allocationSumsTo100(line)) {
    const sum = Object.values(line.allocationBps).reduce((a, b) => a + b, 0);
    throw new Error(
      `Budget line ${line.id}: cost allocation sums to ${sum} basis points, not ${BASIS_POINTS_TOTAL}. ` +
        'Allocation across benefiting programs must total exactly 100% before a federal share can be split.',
    );
  }

  const { federalCents } = splitLine(line);
  const entries = Object.entries(line.allocationBps);
  const out: Record<string, Cents> = {};
  let assigned = 0;

  entries.forEach(([program, bps], i) => {
    const isLast = i === entries.length - 1;
    const amount = isLast
      ? federalCents - assigned
      : Math.round((federalCents * bps) / BASIS_POINTS_TOTAL);
    assigned += amount;
    out[program] = cents(amount);
  });

  return out;
}

/* ── Validation ─────────────────────────────────────────────────────────────
 * These report problems rather than throwing, so validator family 4 can turn
 * each one into a Finding with a citation. Arithmetic that cannot be performed
 * at all still throws — see splitLine and allocateFederalShare above.
 */

export type LineProblemCode =
  | 'UNKNOWN_FEDERAL_RATE'
  | 'ILLEGAL_RATE_FOR_ACTIVITY'
  | 'NEGATIVE_TOTAL'
  | 'NON_INTEGER_CENTS'
  | 'EMPTY_ALLOCATION'
  | 'ALLOCATION_NOT_100_PCT'
  | 'NEGATIVE_ALLOCATION';

export interface LineProblem {
  readonly code: LineProblemCode;
  readonly lineId: string;
  readonly message: string;
  readonly ruleId?: string;
  readonly citation?: string;
}

export function validateLine(line: BudgetLine): LineProblem[] {
  const problems: LineProblem[] = [];
  const at = (code: LineProblemCode, message: string, rule?: { id: string; citation: string }) =>
    problems.push({
      code,
      lineId: line.id,
      message,
      ...(rule ? { ruleId: rule.id, citation: rule.citation } : {}),
    });

  if (!Number.isFinite(line.totalCents) || !Number.isInteger(line.totalCents)) {
    at('NON_INTEGER_CENTS', `Total ${line.totalCents} is not an integer cent amount.`);
  }

  // A negative line is a credit or a prior-period adjustment. The arithmetic
  // handles it exactly, but it is not something an APD budget table should
  // carry silently, so it is surfaced rather than accepted.
  if (line.totalCents < 0) {
    at('NEGATIVE_TOTAL', `Total is negative (${line.totalCents} cents). An APD budget line should not be negative; record a credit or adjustment explicitly.`);
  }

  if (!isKnownFederalRate(line.federalRate)) {
    at('UNKNOWN_FEDERAL_RATE', `${line.federalRate}% is not a match rate in the rule register.`);
  } else if (!isLegalRateForActivity(line.activityClass, line.federalRate)) {
    const rule = rateRuleFor(line.activityClass);
    at(
      'ILLEGAL_RATE_FOR_ACTIVITY',
      `${line.activityClass} claimed at ${line.federalRate}% exceeds its statutory rate of ` +
        `${STATUTORY_FEDERAL_PCT[line.activityClass]}% (${citationFor(line.activityClass)}).`,
      { id: rule.id, citation: rule.citation },
    );
  }

  const bps = Object.values(line.allocationBps);
  if (bps.length === 0) {
    at('EMPTY_ALLOCATION', 'No benefiting program allocation. Every cost must be allocated.');
  } else {
    if (bps.some((b) => b < 0)) {
      at('NEGATIVE_ALLOCATION', 'A benefiting program carries a negative allocation share.');
    }
    const sum = bps.reduce((a, b) => a + b, 0);
    if (sum !== BASIS_POINTS_TOTAL) {
      at(
        'ALLOCATION_NOT_100_PCT',
        `Cost allocation sums to ${sum} basis points, not ${BASIS_POINTS_TOTAL} (100%).`,
      );
    }
  }

  return problems;
}

export function validateLines(lines: readonly BudgetLine[]): LineProblem[] {
  return lines.flatMap(validateLine);
}
