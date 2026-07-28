/**
 * Narrative / budget-table reconciliation. V-APD-S8-001 — the flagship check.
 *
 * Every dollar figure asserted in the narrative must equal the corresponding
 * cell in the MDBT. TOLERANCE IS ZERO: a one-cent discrepancy is a finding.
 * Budget/narrative disagreement is the most frequently cited reason CMS returns
 * an APD, and "close enough" is not a category CMS recognises.
 */
import { cents, type Cents } from './money.js';

/** There is no tolerance band. Named so the intent cannot be misread as an oversight. */
export const RECONCILIATION_TOLERANCE_CENTS = 0;

export interface ReconciliationMismatch {
  readonly label: string;
  readonly narrativeCents: Cents;
  readonly tableCents: Cents;
  /** narrative − table. Positive means the narrative overstates the table. */
  readonly deltaCents: Cents;
}

/**
 * Compare labelled figures from the narrative against the budget table.
 *
 * A label present on one side and absent on the other counts as a mismatch
 * against zero — an unmatched figure is exactly the defect being hunted, so it
 * must not be skipped as "no counterpart to compare".
 *
 * Results are sorted by label so output is stable across runs.
 */
export function reconcile(
  narrative: ReadonlyMap<string, Cents>,
  table: ReadonlyMap<string, Cents>,
): ReconciliationMismatch[] {
  const out: ReconciliationMismatch[] = [];
  const labels = [...new Set([...narrative.keys(), ...table.keys()])].sort();

  for (const label of labels) {
    const n = narrative.get(label) ?? cents(0);
    const t = table.get(label) ?? cents(0);
    if (Math.abs(n - t) > RECONCILIATION_TOLERANCE_CENTS) {
      out.push({ label, narrativeCents: n, tableCents: t, deltaCents: cents(n - t) });
    }
  }
  return out;
}

export function reconciles(
  narrative: ReadonlyMap<string, Cents>,
  table: ReadonlyMap<string, Cents>,
): boolean {
  return reconcile(narrative, table).length === 0;
}
