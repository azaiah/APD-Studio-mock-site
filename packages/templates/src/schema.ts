import { z } from 'zod';

/**
 * The APD Section Schema (R2) — the spine of the product.
 *
 * Reverse-engineered from the CMS MES template set that became mandatory
 * 2026-07-01 under SHO #25-003. Every section records what content is required,
 * for which APD type, under which federal provision, what a CMS State Officer
 * looks for, and the machine-checkable rule that proves it is satisfied.
 */

export const SubmissionType = z.enum([
  'PAPD',            // Planning APD                — 45 CFR 95.610(a)
  'IAPD',            // Implementation APD          — 45 CFR 95.610(b)
  'APDU_ANNUAL',     // Annual APD Update           — 45 CFR 95.610(c)(1)
  'APDU_AS_NEEDED',  // As-Needed APD Update        — 45 CFR 95.610(c)(2)
  'OAPD',            // Operational APD Update      — 45 CFR 95.610(c)(3)
]);
export type SubmissionType = z.infer<typeof SubmissionType>;

export const DocumentType = z.enum(['MES_APD', 'MES_OAPD']);
export type DocumentType = z.infer<typeof DocumentType>;

/** How confident we are that we read the real template, not a description of it. */
export const Provenance = z.enum(['RETRIEVED', 'DERIVED', 'NOT_RETRIEVED']);

export const ValidationRule = z
  .object({
    id: z.string().min(1),
    severity: z.enum(['blocker', 'error', 'warning', 'info']),
    check: z.string().min(1),
    machineCheckable: z.boolean(),
    /** The CFR provision, template instruction, or 'DERIVED' reasoning behind it. */
    basis: z.string().min(1),
    flagshipRule: z.boolean().optional(),
    rationale: z.string().optional(),
    conflictRefs: z.array(z.string()).optional(),
  })
  .passthrough();
export type ValidationRule = z.infer<typeof ValidationRule>;

export const CefCondition = z
  .object({
    ref: z.string(),
    citation: z.string(),
    text: z.string(),
    appliesAtInitialApproval: z.boolean(),
    appliesAtReapproval: z.boolean(),
    appliesAtOperations: z.boolean().optional(),
    linkedRules: z.array(z.string()).optional(),
    linkedSection: z.string().optional(),
    note: z.string().optional(),
    appliesTo: z.array(z.string()).optional(),
    onFaceCheckable: z.boolean().optional(),
    textTruncatedInRetrieval: z.boolean().optional(),
  })
  .passthrough();
export type CefCondition = z.infer<typeof CefCondition>;

export const ReapprovalSubset = z
  .object({
    citation: z.string(),
    quote: z.string(),
    appliesOnReapproval: z.array(z.string()),
    excludedOnReapproval: z.array(z.string()),
    productNote: z.string().optional(),
  })
  .passthrough();
export type ReapprovalSubset = z.infer<typeof ReapprovalSubset>;

export const RegulatoryBasis = z
  .object({ citation: z.string().min(1) })
  .passthrough();

export const Section = z
  .object({
    id: z.string().min(1),
    documentType: DocumentType,
    number: z.string(),
    title: z.string().min(1),
    validationRules: z.array(ValidationRule),
    provenance: Provenance,
    requiredBy: z.record(z.string()).optional(),
    required: z.union([z.boolean(), z.string()]).optional(),
    regulatoryBasis: z.array(RegulatoryBasis).optional(),
    templateInstruction: z.string().optional(),
    reviewerFocus: z.string().optional(),
    conflictRefs: z.array(z.string()).optional(),
    conditions: z.array(CefCondition).optional(),
    reapprovalSubset: ReapprovalSubset.optional(),
  })
  .passthrough();
export type Section = z.infer<typeof Section>;

export const KnownConflict = z
  .object({
    id: z.string(),
    severity: z.string(),
    title: z.string(),
    detail: z.string().optional(),
    assessment: z.string().optional(),
    resolution: z.string(),
    productImpact: z.string().optional(),
    additionalFinding: z.string().optional(),
    seeAlso: z.string().optional(),
    sourceA: z.record(z.string()).optional(),
    sourceB: z.record(z.string()).optional(),
    sourceC: z.record(z.string()).optional(),
    sourceD: z.record(z.string()).optional(),
  })
  .passthrough();
export type KnownConflict = z.infer<typeof KnownConflict>;

export const OpenGap = z
  .object({
    id: z.string(),
    item: z.string(),
    impact: z.string(),
    fix: z.string(),
    blocks: z.union([z.string(), z.array(z.string())]).optional(),
    priority: z.string().optional(),
  })
  .passthrough();
export type OpenGap = z.infer<typeof OpenGap>;

export const SectionSchema = z
  .object({
    meta: z
      .object({ schemaVersion: z.string(), verifiedAsOf: z.string(), staleAfter: z.string() })
      .passthrough(),
    sections: z.array(Section).min(1),
    aoaTemplate: z.object({ validationRules: z.array(ValidationRule) }).passthrough(),
    procurementChecklist: z.object({ validationRules: z.array(ValidationRule) }).passthrough(),
    crossDocumentRules: z.array(z.object({ id: z.string() }).passthrough()),
    knownConflicts: z.array(KnownConflict),
    openGaps: z.array(OpenGap),
  })
  .passthrough();
export type SectionSchema = z.infer<typeof SectionSchema>;
