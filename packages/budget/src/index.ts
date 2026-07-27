/**
 * Match-rate math and reconciliation.
 *
 * CRITICAL DESIGN RULE (agent roster spec, §4): the arithmetic is code, not the
 * model. An agent selects categories, allocation bases, and rationale. A
 * deterministic engine does the math. NEVER let a language model compute a
 * federal share.
 *
 * All money is handled in integer CENTS. Floating-point dollars produce
 * off-by-a-penny reconciliation failures that look like compliance defects.
 */

export type Cents = number & { readonly __brand: 'Cents' };
export const cents = (n: number): Cents => Math.round(n) as Cents;
export const fromDollars = (d: number): Cents => cents(Math.round(d * 100));
export const toDollars = (c: Cents): number => c / 100;

/** DDI earns 90%. M&O earns 75%. Misclassification is a disallowance risk. */
export type ActivityClass = 'DDI' | 'M_AND_O' | 'ADMIN';

/**
 * Legal federal shares.
 *  90 — 42 CFR 433.112(a) (MMIS DDI) and 433.112(c)(1) (E&E DDI). SSA 1903(a)(3)(A).
 *  75 — 42 CFR 433.116(a) (operations) and 433.116(j) (E&E ops). SSA 1903(a)(3)(B).
 *  50 — other necessary administrative expense. SSA 1903(a)(7). NOT in Part 433.
 */
export const FEDERAL_RATES = [90, 75, 50] as const;
export type FederalRate = (typeof FEDERAL_RATES)[number];

export const STATE_SHARE_FOR: Record<FederalRate, number> = { 90: 10, 75: 25, 50: 50 };

export interface BudgetLine {
  readonly id: string;
  readonly federalFiscalYear: number;
  readonly activityClass: ActivityClass;
  readonly federalRate: FederalRate;
  readonly totalCents: Cents;
  /** Program code -> share of this line, expressed in basis points (10000 = 100%). */
  readonly allocationBps: Readonly<Record<string, number>>;
}

export interface Split {
  readonly federalCents: Cents;
  readonly stateCents: Cents;
}

/**
 * Split a line into federal and state shares.
 * The state share is computed as the REMAINDER, never independently rounded, so
 * federal + state always equals the total exactly. This is the whole reason
 * V-APD-S8-002 (match-rate arithmetic) can be a blocker-severity check.
 */
export function splitLine(line: BudgetLine): Split {
  const federal = cents((line.totalCents * line.federalRate) / 100);
  const state = cents(line.totalCents - federal);
  return { federalCents: federal, stateCents: state };
}

/** V-APD-S8-003: an M&O cost may never be claimed at 90 percent. */
export function isLegalRateForActivity(a: ActivityClass, rate: FederalRate): boolean {
  if (a === 'DDI') return rate === 90 || rate === 75 || rate === 50;
  if (a === 'M_AND_O') return rate === 75 || rate === 50;
  return rate === 50;
}

/** V-APD-S10-001: allocation across benefiting programs must sum to exactly 100%. */
export function allocationSumsTo100(line: BudgetLine): boolean {
  return Object.values(line.allocationBps).reduce((a, b) => a + b, 0) === 10_000;
}

export function allocateFederalShare(line: BudgetLine): Record<string, Cents> {
  const { federalCents } = splitLine(line);
  const entries = Object.entries(line.allocationBps);
  const out: Record<string, Cents> = {};
  let assigned = 0;
  entries.forEach(([program, bps], i) => {
    // Give the last program the remainder so the parts always sum to the whole.
    const amount = i === entries.length - 1
      ? federalCents - assigned
      : Math.round((federalCents * bps) / 10_000);
    assigned += amount;
    out[program] = cents(amount);
  });
  return out;
}

export interface ReconciliationMismatch {
  readonly label: string;
  readonly narrativeCents: Cents;
  readonly tableCents: Cents;
  readonly deltaCents: Cents;
}

/**
 * V-APD-S8-001 / X-001 — the flagship check.
 * Every dollar figure in the narrative must equal the corresponding table cell.
 * Tolerance is ZERO. Budget/narrative discrepancy is the most frequently cited
 * reason CMS returns an APD.
 */
export function reconcile(
  narrative: ReadonlyMap<string, Cents>,
  table: ReadonlyMap<string, Cents>,
): ReconciliationMismatch[] {
  const out: ReconciliationMismatch[] = [];
  for (const label of new Set([...narrative.keys(), ...table.keys()])) {
    const n = narrative.get(label) ?? cents(0);
    const t = table.get(label) ?? cents(0);
    if (n !== t) out.push({ label, narrativeCents: n, tableCents: t, deltaCents: cents(n - t) });
  }
  return out;
}
