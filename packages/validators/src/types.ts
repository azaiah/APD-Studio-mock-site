import type { Severity } from '@apd-studio/rules';

/**
 * A Finding is what the product sells. Every field is mandatory for a reason:
 * a finding a state cannot act on is noise, and a finding without a citation is
 * an opinion. The Compliance Auditor is adversarial by construction — its job is
 * to fail the document the way a CMS State Officer would.
 */
export interface Finding {
  /** The validation rule id from the section schema, e.g. 'V-APD-S8-001'. */
  readonly ruleId: string;
  /** The rule register id whose obligation this enforces, e.g. 'RR-TRIG-ENH-COST'. */
  readonly registerRuleId?: string;
  readonly severity: Severity;
  /** A real CFR section or CMS letter. Shown verbatim to the reviewer. */
  readonly citation: string;
  /** Where in the document. Section id at minimum; table cell if we can. */
  readonly location: string;
  /** What is wrong, in one sentence, in the reviewer's language. */
  readonly whatsWrong: string;
  /** Why it matters — the funding consequence, stated accurately, never inflated. */
  readonly whyItMatters: string;
  /** The concrete fix. Not "review this section." */
  readonly howToFix: string;
  /** Set when the finding creates a dated obligation, e.g. an As-Needed APDU. */
  readonly deadline?: string;
}

export type Verdict = 'GREEN' | 'YELLOW' | 'RED';

export interface ValidationReport {
  readonly verdict: Verdict;
  readonly findings: readonly Finding[];
  readonly rulesEvaluated: number;
  readonly rulesSkipped: readonly { ruleId: string; reason: string }[];
  readonly registerVersion: string;
  readonly evaluatedAt: string;
}

/** RED if any blocker. YELLOW if any error. GREEN only when both are clear. */
export function verdictFor(findings: readonly Finding[]): Verdict {
  if (findings.some((f) => f.severity === 'blocker')) return 'RED';
  if (findings.some((f) => f.severity === 'error')) return 'YELLOW';
  return 'GREEN';
}

/** A validator family. One file per family, each individually tested. */
export interface ValidatorFamily<TInput> {
  readonly name: string;
  readonly ruleIds: readonly string[];
  run(input: TInput): Finding[];
}
