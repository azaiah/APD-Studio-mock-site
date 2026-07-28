import { describe, expect, it } from 'vitest';
import {
  register, rules, ruleById, rulesForTrack, enforceableRules,
  asNeededCostTriggerUsd, isStale, openQuestions,
} from '../src/index.js';

describe('rule register invariants', () => {
  it('parses and is non-empty', () => {
    expect(rules.length).toBeGreaterThan(70);
  });

  // HARD RULE from CLAUDE.md: a rule with no citation does not ship.
  it('every rule carries a citation', () => {
    const missing = rules.filter((r) => !r.citation?.trim());
    expect(missing.map((r) => r.id)).toEqual([]);
  });

  it('every rule declares a confidence and a funding track', () => {
    const bad = rules.filter((r) => !r.confidence || !r.fundingTrack);
    expect(bad.map((r) => r.id)).toEqual([]);
  });

  it('rule ids are unique', () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const r of rules) { if (seen.has(r.id)) dupes.push(r.id); seen.add(r.id); }
    expect(dupes).toEqual([]);
  });

  it('every relatedRules / supersededBy pointer resolves', () => {
    for (const r of rules) {
      for (const ref of (r as { relatedRules?: string[] }).relatedRules ?? []) {
        expect(() => ruleById(ref), `${r.id} -> ${ref}`).not.toThrow();
      }
    }
  });

  // The whole point of the confidence field.
  it('no UNVERIFIED rule claims blocker severity without an open question', () => {
    const offenders = rules.filter(
      (r) => r.confidence === 'UNVERIFIED' && r.severity === 'blocker' && !r.openQuestionRef,
    );
    expect(offenders.map((r) => r.id)).toEqual([]);
  });

  it('enforceable rules exclude UNVERIFIED and LOW', () => {
    expect(enforceableRules().every((r) => r.confidence === 'HIGH' || r.confidence === 'MEDIUM')).toBe(true);
  });

  // Applying a REGULAR-FFP threshold to Medicaid MES work is the single most
  // dangerous class of error in this codebase. It already happened once, in the
  // register itself, and was caught by audit. Keep the guard.
  it('rulesForTrack(ENHANCED) never returns a REGULAR-only rule', () => {
    expect(rulesForTrack('ENHANCED').some((r) => r.fundingTrack === 'REGULAR')).toBe(false);
  });

  it('every REGULAR-track rule carries an applicability warning', () => {
    const bare = rules.filter((r) => r.fundingTrack === 'REGULAR' && !r.applicabilityWarning);
    expect(bare.map((r) => r.id)).toEqual([]);
  });
});

describe('As-Needed APDU cost trigger — 45 CFR 95.611(c)(2)(ii)(A)', () => {
  it('uses 10% when 10% is less than $300,000', () => {
    expect(asNeededCostTriggerUsd(1_000_000)).toBe(100_000);
  });
  it('uses $300,000 when 10% exceeds it', () => {
    expect(asNeededCostTriggerUsd(20_000_000)).toBe(300_000);
  });
  it('is exactly $300,000 at the $3,000,000 crossover', () => {
    expect(asNeededCostTriggerUsd(3_000_000)).toBe(300_000);
  });
  it('never returns the larger of the two', () => {
    for (const cost of [250_000, 3_000_000, 50_000_000]) {
      expect(asNeededCostTriggerUsd(cost)).toBeLessThanOrEqual(300_000);
    }
  });
});

describe('staleness', () => {
  it('knows when the register needs re-verification', () => {
    expect(isStale(new Date(register.meta.staleAfter))).toBe(false);
    expect(isStale(new Date('2099-01-01'))).toBe(true);
  });
});

describe('open-question accessors', () => {
  it('exposes every parsed open question', () => {
    expect(openQuestions).toHaveLength(10);
    expect(openQuestions).toBe(register.openQuestions);
  });

  it('preserves open and closed status details', () => {
    expect(openQuestions.filter((question) => question.status.startsWith('OPEN'))).toHaveLength(8);
    expect(openQuestions.filter((question) => question.status.startsWith('CLOSED'))).toHaveLength(2);
    expect(openQuestions.find((question) => question.id === 'OQ-002')?.resolution).toBeTruthy();
  });
});
