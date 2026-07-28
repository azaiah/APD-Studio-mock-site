/**
 * Money primitives. Everything is an integer number of CENTS.
 *
 * Floating-point dollars produce off-by-a-penny reconciliation failures that
 * look exactly like compliance defects, so dollars exist only at the edges —
 * `fromDollars` on the way in, `toDollars` on the way out for display.
 *
 * NOTHING IN THIS PACKAGE MAY CALL A MODEL. An agent selects categories,
 * allocation bases, and rationale; this file does the arithmetic. See CLAUDE.md
 * hard rule 10.
 */

export type Cents = number & { readonly __brand: 'Cents' };

/**
 * Rounds to whole cents and normalises negative zero.
 *
 * Math.round(-0.5) is -0, which is === 0 but not Object.is 0. Left alone it
 * produces a "-$0.00" federal share and comparisons that fail for reasons that
 * take an afternoon to find.
 */
export const cents = (n: number): Cents => {
  const rounded = Math.round(n);
  return (rounded === 0 ? 0 : rounded) as Cents;
};
export const fromDollars = (d: number): Cents => cents(Math.round(d * 100));
export const toDollars = (c: Cents): number => c / 100;

export const ZERO_CENTS: Cents = cents(0);

/** Percent-to-fraction and basis-point denominators. Unit conversions, not law. */
export const PERCENT_DIVISOR = 100;
export const BASIS_POINTS_TOTAL = 10_000;

export function sumCents(values: Iterable<Cents>): Cents {
  let total = 0;
  for (const v of values) total += v;
  return cents(total);
}

/**
 * A non-integer or non-finite cent value means someone did dollar arithmetic
 * upstream. Fail loudly rather than round it away — a silent half-cent is how a
 * blocker-severity reconciliation check turns into a false GREEN.
 */
export function assertIntegerCents(value: number, context: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${context}: expected a finite integer cent amount, got ${value}.`);
  }
  if (!Number.isInteger(value)) {
    throw new Error(
      `${context}: expected an integer cent amount, got ${value}. ` +
        'Money must be in integer cents — use fromDollars() at the boundary.',
    );
  }
}
