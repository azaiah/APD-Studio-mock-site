import "server-only";

import { register, rules, isStale } from "@apd-studio/rules";
import { schema, sections, sectionById, flagshipRules, allValidationRules, knownConflicts, openGaps, crossDocumentRules } from "@apd-studio/templates";
import type { CefCondition, ReapprovalSubset } from "@apd-studio/templates";

export function getRegulatoryCatalog() {
  const appxC = sectionById("APD-APX-C");
  const cefConditions = appxC.conditions as CefCondition[];
  const reapprovalSubset = appxC.reapprovalSubset as ReapprovalSubset;

  return {
    meta: {
      rules: register.meta,
      schema: schema.meta,
      stale: isStale(),
    },
    // Client views receive only fields they render. This keeps the complete
    // regulatory register on the server.
    rules: rules.map((rule) => ({
      id: rule.id,
      category: rule.category,
      fundingTrack: rule.fundingTrack,
      citation: rule.citation,
      confidence: rule.confidence,
      ...(rule.source ? { source: rule.source } : {}),
      ...(rule.trigger ? { trigger: rule.trigger } : {}),
      ...(rule.obligation !== undefined ? { obligation: rule.obligation } : {}),
      ...(rule.verbatim ? { verbatim: rule.verbatim } : {}),
      ...(rule.applicabilityWarning
        ? { applicabilityWarning: rule.applicabilityWarning }
        : {}),
    })),
    openQuestions: register.openQuestions,
    corrections: register.correctionsToPriorProjectAssumptions || [],
    sections,
    cefs: cefConditions.map((condition) => ({
      ref: condition.ref,
      citation: condition.citation,
      text: condition.text,
      appliesAtInitialApproval: condition.appliesAtInitialApproval,
      appliesAtReapproval: condition.appliesAtReapproval,
      ...(condition.note ? { note: condition.note } : {}),
    })),
    reapprovalSubset: {
      citation: reapprovalSubset.citation,
      quote: reapprovalSubset.quote,
      appliesOnReapproval: reapprovalSubset.appliesOnReapproval,
      excludedOnReapproval: reapprovalSubset.excludedOnReapproval,
      ...(reapprovalSubset.productNote
        ? { productNote: reapprovalSubset.productNote }
        : {}),
    },
    conflicts: knownConflicts,
    openGaps,
    crossDocumentRules,
    flagshipRules: flagshipRules(),
    validationRuleCount: allValidationRules().length,
  };
}
