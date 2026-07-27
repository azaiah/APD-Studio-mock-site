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
  })
  .passthrough();
export type Section = z.infer<typeof Section>;

export const KnownConflict = z
  .object({ id: z.string(), severity: z.string(), title: z.string() })
  .passthrough();

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
    openGaps: z.array(z.object({ id: z.string() }).passthrough()),
  })
  .passthrough();
export type SectionSchema = z.infer<typeof SectionSchema>;
