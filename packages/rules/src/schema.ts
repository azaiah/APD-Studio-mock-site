import { z } from 'zod';

/**
 * The shape of a rule in the Rule Register.
 *
 * HARD RULE: a rule with no citation does not ship. That is enforced here as a
 * schema requirement and again in test/rules.test.ts as an invariant, so it
 * cannot be bypassed by adding data without adding a citation.
 *
 * Source of truth for the DATA is docs/regulatory/rule-register.json (R3).
 * data/rule-register.json is a build-time copy. If they drift, the docs copy wins.
 */

export const Confidence = z.enum(['HIGH', 'MEDIUM', 'LOW', 'UNVERIFIED']);
export type Confidence = z.infer<typeof Confidence>;

export const Severity = z.enum(['blocker', 'error', 'warning', 'info']);
export type Severity = z.infer<typeof Severity>;

/**
 * ENHANCED = 42 CFR Part 433 Subpart C Medicaid MMIS/E&E work. Our primary track.
 * REGULAR  = regular FFP. Context only. Applying REGULAR thresholds to MES work
 *            is a serious error — the enhanced thresholds are far tighter.
 * BOTH     = applies on either track.
 * PROGRAM  = a program-level obligation (e.g. community engagement) that is not
 *            itself an FFP rate rule.
 */
export const FundingTrack = z.enum(['ENHANCED', 'REGULAR', 'BOTH', 'PROGRAM']);
export type FundingTrack = z.infer<typeof FundingTrack>;

export const RuleCategory = z.enum([
  'prior-approval',
  'apdu-trigger',
  'deadline',
  'match-rate',
  'condition',
  'procedure',
  'consequence',
  'waiver',
  'obligation',
  'threshold',
  'reporting',
  'data-integrity',
  'funding-opportunity',
  'interpretation',
]);
export type RuleCategory = z.infer<typeof RuleCategory>;

export const Rule = z
  .object({
    id: z.string().min(1),
    category: RuleCategory,
    fundingTrack: FundingTrack,
    /** A real CFR section, statute, or CMS letter. Never a paraphrase. */
    citation: z.string().min(1),
    /** Where we actually read it. */
    source: z.string().min(1).optional(),
    confidence: Confidence,
    severity: Severity,
    effectiveDate: z.string().nullable().optional(),
    appliesTo: z.array(z.string()).optional(),
    trigger: z.string().optional(),
    obligation: z.string().nullable().optional(),
    deadline: z.unknown().optional(),
    consequence: z.string().optional(),
    /** Exact quoted text from the primary source. This is what we show a reviewer. */
    verbatim: z.string().optional(),
    threshold: z.unknown().optional(),
    /** Validator ids in @apd-studio/validators that implement this rule. */
    validatorRefs: z.array(z.string()).optional(),
    applicabilityWarning: z.string().optional(),
    openQuestionRef: z.string().optional(),
    supersededBy: z.string().optional(),
  })
  .passthrough(); // the register carries rich per-rule prose fields; keep them.

export type Rule = z.infer<typeof Rule>;

export const OpenQuestion = z
  .object({ 
    id: z.string(), 
    title: z.string(), 
    status: z.string(),
    detail: z.string().optional(),
    affects: z.string().optional(),
    resolveBy: z.string().optional(),
    doNot: z.string().optional(),
    priority: z.string().optional(),
    resolution: z.string().optional()
  })
  .passthrough();
export type OpenQuestion = z.infer<typeof OpenQuestion>;

export const Correction = z
  .object({
    assumption: z.string(),
    finding: z.string(),
    severity: z.string(),
    ref: z.string().optional()
  })
  .passthrough();
export type Correction = z.infer<typeof Correction>;

export const RuleRegister = z
  .object({
    meta: z
      .object({
        registerVersion: z.string(),
        verifiedAsOf: z.string(),
        staleAfter: z.string(),
      })
      .passthrough(),
    rules: z.array(Rule).min(1),
    openQuestions: z.array(OpenQuestion),
    correctionsToPriorProjectAssumptions: z.array(Correction).optional(),
  })
  .passthrough();

export type RuleRegister = z.infer<typeof RuleRegister>;
