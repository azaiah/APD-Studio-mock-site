/**
 * Match rates, read from @apd-studio/rules at load time.
 *
 * CLAUDE.md hard rule 1: no hardcoded regulatory values in application code.
 * There is deliberately not a single `90`, `75`, or `50` in this package. The
 * rates come from the rule register, which carries the citation and the
 * effective date, and which is re-verified on a schedule. If the law changes,
 * the register changes and this module follows automatically.
 *
 * CLAUDE.md hard rule 3: only HIGH/MEDIUM-confidence rules may be enforced.
 * A rate rule downgraded to LOW or UNVERIFIED will throw here rather than
 * quietly drive a federal share.
 */
import { enforceableRules, ruleById, type Rule } from '@apd-studio/rules';

export const ACTIVITY_CLASSES = ['DDI', 'M_AND_O', 'ADMIN'] as const;
export type ActivityClass = (typeof ACTIVITY_CLASSES)[number];

/**
 * Which register rules govern each activity class.
 *
 * These are rule IDENTIFIERS, not regulatory values — the numbers they carry
 * are read from the register below. `ruleById` throws on an unknown id, so a
 * register that drops one of these fails the build rather than silently
 * falling back to a guess.
 *
 *  DDI      — 42 CFR 433.112(a) (MMIS) and 433.112(c)(1) (E&E)
 *  M_AND_O  — 42 CFR 433.116(a) (operations) and 433.116(j) (E&E operations)
 *  ADMIN    — SSA s.1903(a)(7). Deliberately NOT in 42 CFR Part 433; see the
 *             applicabilityWarning on RR-RATE-ADMIN-50.
 */
const RATE_RULE_IDS: Readonly<Record<ActivityClass, readonly string[]>> = {
  DDI: ['RR-RATE-DDI-90', 'RR-RATE-EE-DDI-90'],
  M_AND_O: ['RR-RATE-OPS-75', 'RR-RATE-EE-OPS-75'],
  ADMIN: ['RR-RATE-ADMIN-50'],
};

/** The register carries `rate` as passthrough data, so narrow it explicitly. */
interface RegisterRate {
  readonly federalPct: number;
  readonly statePct: number;
}

const ENFORCEABLE_IDS: ReadonlySet<string> = new Set(enforceableRules().map((r) => r.id));

function enforceableRule(id: string): Rule {
  const rule = ruleById(id); // throws on an unknown id
  if (!ENFORCEABLE_IDS.has(id)) {
    throw new Error(
      `Rule ${id} has confidence ${rule.confidence} and is not enforceable. ` +
        'An unverified rate must never compute a federal share. See CLAUDE.md hard rule 3.',
    );
  }
  return rule;
}

function readRate(rule: Rule): RegisterRate {
  const raw = (rule as { readonly rate?: unknown }).rate;
  if (raw === null || raw === undefined || typeof raw !== 'object') {
    throw new Error(`Rule ${rule.id} carries no rate object; it cannot drive match-rate arithmetic.`);
  }
  const { federal, state } = raw as { federal?: unknown; state?: unknown };
  if (typeof federal !== 'number' || typeof state !== 'number') {
    throw new Error(`Rule ${rule.id} has a malformed rate: federal and state must both be numbers.`);
  }
  if (federal + state !== 100) {
    throw new Error(
      `Rule ${rule.id} has federal ${federal} + state ${state} = ${federal + state}, not 100. ` +
        'The federal and state shares of a match rate must be complements.',
    );
  }
  return { federalPct: federal, statePct: state };
}

/** federal percentage -> state percentage, for every rate the register defines. */
const STATE_PCT_BY_FEDERAL_PCT: ReadonlyMap<number, number> = (() => {
  const map = new Map<number, number>();
  for (const ids of Object.values(RATE_RULE_IDS)) {
    for (const id of ids) {
      const { federalPct, statePct } = readRate(enforceableRule(id));
      const existing = map.get(federalPct);
      if (existing !== undefined && existing !== statePct) {
        throw new Error(
          `Register disagrees with itself: federal ${federalPct}% maps to both ` +
            `${existing}% and ${statePct}% state share.`,
        );
      }
      map.set(federalPct, statePct);
    }
  }
  return map;
})();

/**
 * The highest federal share each activity class may claim.
 * All rules governing a class must agree, or the register is inconsistent.
 */
export const STATUTORY_FEDERAL_PCT: Readonly<Record<ActivityClass, number>> = (() => {
  const out = {} as Record<ActivityClass, number>;
  for (const activityClass of ACTIVITY_CLASSES) {
    const rates = RATE_RULE_IDS[activityClass].map((id) => readRate(enforceableRule(id)).federalPct);
    const [first] = rates;
    if (first === undefined) {
      throw new Error(`No match-rate rule is registered for activity class ${activityClass}.`);
    }
    if (!rates.every((r) => r === first)) {
      throw new Error(
        `Activity class ${activityClass} maps to conflicting federal rates: ${rates.join(', ')}.`,
      );
    }
    out[activityClass] = first;
  }
  return out;
})();

/** Every legal federal share, highest first. Derived — currently 90, 75, 50. */
export const FEDERAL_RATES: readonly number[] = [...STATE_PCT_BY_FEDERAL_PCT.keys()].sort(
  (a, b) => b - a,
);

export function isKnownFederalRate(federalPct: number): boolean {
  return STATE_PCT_BY_FEDERAL_PCT.has(federalPct);
}

/** The state share for a federal rate. Throws on a rate the register does not define. */
export function stateSharePct(federalPct: number): number {
  const statePct = STATE_PCT_BY_FEDERAL_PCT.get(federalPct);
  if (statePct === undefined) {
    throw new Error(
      `${federalPct}% is not a match rate in the register. Legal rates: ${FEDERAL_RATES.join(', ')}.`,
    );
  }
  return statePct;
}

/** The primary governing rule for a class — used to cite a finding. */
export function rateRuleFor(activityClass: ActivityClass): Rule {
  const [primary] = RATE_RULE_IDS[activityClass];
  if (primary === undefined) {
    throw new Error(`No match-rate rule is registered for activity class ${activityClass}.`);
  }
  return enforceableRule(primary);
}

export function citationFor(activityClass: ActivityClass): string {
  return rateRuleFor(activityClass).citation;
}

/**
 * V-APD-S8-003: an M&O cost may never be claimed at the DDI rate.
 *
 * A state may always claim LESS federal share than it is entitled to — that is
 * a state's own money and no violation — but never more. So the test is
 * "at or below the statutory rate for this activity", which makes M&O at 90
 * illegal while leaving DDI at 75 or 50 permissible.
 */
export function isLegalRateForActivity(activityClass: ActivityClass, federalPct: number): boolean {
  if (!isKnownFederalRate(federalPct)) return false;
  return federalPct <= STATUTORY_FEDERAL_PCT[activityClass];
}
