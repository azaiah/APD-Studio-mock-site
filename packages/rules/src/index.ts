import raw from '../data/rule-register.json' with { type: 'json' };
import { RuleRegister, type Rule, type FundingTrack, type RuleCategory } from './schema';

export * from './schema';

/**
 * Parsed and validated at module load. If the register is malformed, the app
 * fails to boot rather than silently validating an APD against bad law.
 */
export const register: RuleRegister = RuleRegister.parse(raw);

export const rules: readonly Rule[] = register.rules;

export const openQuestions = register.openQuestions;
export const corrections = register.correctionsToPriorProjectAssumptions || [];

const byIdMap = new Map(rules.map((r) => [r.id, r]));

/** Throws on unknown id. A validator referencing a rule that does not exist is a bug. */
export function ruleById(id: string): Rule {
  const r = byIdMap.get(id);
  if (!r) throw new Error(`Unknown rule id: ${id}`);
  return r;
}

export function rulesByCategory(category: RuleCategory): Rule[] {
  return rules.filter((r) => r.category === category);
}

/** Includes BOTH-track rules. Never returns REGULAR rules for an ENHANCED query. */
export function rulesForTrack(track: FundingTrack): Rule[] {
  return rules.filter((r) => r.fundingTrack === track || r.fundingTrack === 'BOTH');
}

/**
 * Rules safe to enforce today. Anything UNVERIFIED or LOW is research, not law:
 * it must not drive a finding shown to a state. See test/rules.test.ts.
 */
export function enforceableRules(): Rule[] {
  return rules.filter((r) => r.confidence === 'HIGH' || r.confidence === 'MEDIUM');
}

export function isStale(today: Date = new Date()): boolean {
  return today > new Date(register.meta.staleAfter);
}

/** Convenience accessors for the numbers the product uses constantly. */
export const ENHANCED_CONTRACT_PRIOR_APPROVAL_USD = 500_000;
export const ENHANCED_APDU_COST_TRIGGER_USD = 300_000;
export const ENHANCED_APDU_COST_TRIGGER_PCT = 0.1;
export const APDU_FILING_WINDOW_DAYS = 60;
export const MILESTONE_SLIP_TRIGGER_DAYS = 60;

/**
 * The As-Needed APDU cost trigger: the LESSER of $300,000 or 10% of project cost.
 * 45 CFR 95.611(c)(2)(ii)(A), enhanced FFP.
 */
export function asNeededCostTriggerUsd(approvedProjectCostUsd: number): number {
  return Math.min(
    ENHANCED_APDU_COST_TRIGGER_USD,
    ENHANCED_APDU_COST_TRIGGER_PCT * approvedProjectCostUsd,
  );
}
