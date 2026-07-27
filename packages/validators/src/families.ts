/**
 * The eight validator families. THE VALIDATOR IS THE PRODUCT.
 *
 * Every function here throws NotImplemented on purpose. The tests in
 * test/families.test.ts are written against the intended behaviour and are
 * currently failing/skipped. Your job is to make them pass, family by family,
 * in the order given in WORK-ORDER.md — NOT to invent new structure.
 *
 * Read docs/regulatory/rule-register.md before implementing any of these.
 * A wrong threshold shipped into a validator is worse than no validator.
 */
import type { Finding } from './types.js';

export class NotImplemented extends Error {
  constructor(family: string) {
    super(`${family} is not implemented yet — see WORK-ORDER.md`);
  }
}

/** 1. Completeness — every required section present and non-trivial. */
export function completeness(_input: unknown): Finding[] {
  throw new NotImplemented('completeness');
}

/**
 * 2. Threshold — does this trigger prior approval?
 * Enhanced FFP: all PAPDs and IAPDs regardless of amount; acquisitions >$500K;
 * amendments >$500K OR >60-day extension. 45 CFR 95.611(b)(2).
 * NEVER apply the REGULAR-FFP thresholds here.
 */
export function threshold(_input: unknown): Finding[] {
  throw new NotImplemented('threshold');
}

/**
 * 3. APDU trigger — the Change Sentinel's core.
 * Six enhanced triggers, 45 CFR 95.611(c)(2)(ii)(A)-(F). Filing window is 60 days
 * from the OCCURRENCE of the change, not from discovery — there is no tolling.
 */
export function apduTrigger(_input: unknown): Finding[] {
  throw new NotImplemented('apduTrigger');
}

/**
 * 4. Budget reconciliation — the flagship. V-APD-S8-001.
 * Narrative figures must equal MDBT totals exactly; DDI/M&O split correct;
 * match rates applied per category; cost allocation sums to 100%.
 * Use @apd-studio/budget for ALL arithmetic. Never compute a federal share here.
 */
export function budgetReconciliation(_input: unknown): Finding[] {
  throw new NotImplemented('budgetReconciliation');
}

/**
 * 5. Attestation — every required certification present AND supported.
 * An attestation the document itself contradicts is worse than a missing one:
 * it is a false statement to the federal government. See cross-document rule X-003.
 */
export function attestation(_input: unknown): Finding[] {
  throw new NotImplemented('attestation');
}

/**
 * 6. CEF coverage — each 42 CFR 433.112(b) condition addressed with evidence.
 * 22 conditions at initial approval. At REAPPROVAL the set is (b)(1), (3), (4),
 * and (7)-(22) per 433.119(a)(1) — (b)(2), (b)(5), (b)(6) drop out. Honour that.
 */
export function cefCoverage(_input: unknown): Finding[] {
  throw new NotImplemented('cefCoverage');
}

/** 7. Internal consistency — dates monotonic, schedule matches budget periods. */
export function internalConsistency(_input: unknown): Finding[] {
  throw new NotImplemented('internalConsistency');
}

/**
 * 8. Reporting currency — monthly PSR and ORW filed for every enhanced-funding
 * project. Non-EVV: submit monthly. EVV: capture monthly, submit quarterly.
 * Twelve months of ORW history are required for an APD submission.
 */
export function reportingCurrency(_input: unknown): Finding[] {
  throw new NotImplemented('reportingCurrency');
}

export const FAMILIES = [
  'completeness', 'threshold', 'apduTrigger', 'budgetReconciliation',
  'attestation', 'cefCoverage', 'internalConsistency', 'reportingCurrency',
] as const;
export type FamilyName = (typeof FAMILIES)[number];
