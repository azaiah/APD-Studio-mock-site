import { describe, expect, it } from 'vitest';
import {
  sections, sectionById, requiredSections,
  allValidationRules, flagshipRules, machineCheckableRules,
  knownConflicts, openGaps,
} from '../src/index.js';

describe('APD section schema', () => {
  it('parses', () => {
    expect(sections.length).toBe(28);
  });

  it('section ids are unique', () => {
    expect(new Set(sections.map((s) => s.id)).size).toBe(sections.length);
  });

  it('validation rule ids are unique across the whole schema', () => {
    const ids = allValidationRules().map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every validation rule states its basis', () => {
    const bare = allValidationRules().filter((r) => !r.basis?.trim());
    expect(bare.map((r) => r.id)).toEqual([]);
  });

  it('carries all 22 Conditions for Enhanced Funding', () => {
    const appxC = sectionById('APD-APX-C');
    expect(appxC.conditions).toHaveLength(22);
    expect(appxC.conditions?.filter((condition) => condition.appliesAtInitialApproval)).toHaveLength(22);
  });

  // 42 CFR 433.119(a)(1): reapproval requires (b)(1), (3), (4), and (7)-(22).
  // (b)(2), (b)(5), (b)(6) drop out. Most tools miss this; it is a differentiator.
  it('reapproval condition set excludes b2, b5, b6', () => {
    const appxC = sectionById('APD-APX-C');
    expect([...(appxC.reapprovalSubset?.excludedOnReapproval ?? [])].sort()).toEqual(['b2', 'b5', 'b6']);
    expect(appxC.reapprovalSubset?.appliesOnReapproval).toHaveLength(19);
    expect(appxC.conditions?.filter((condition) => condition.appliesAtReapproval)).toHaveLength(19);
  });

  it('a PAPD does not require Appendix C or Section 11', () => {
    const ids = requiredSections('PAPD').map((s) => s.id);
    expect(ids).not.toContain('APD-APX-C'); // "Not required." per template
    expect(ids).not.toContain('APD-S11');   // "This section is not applicable for PAPD."
  });

  it('an IAPD requires the budget, personnel, and CEF sections', () => {
    const ids = requiredSections('IAPD').map((s) => s.id);
    for (const id of ['APD-S6', 'APD-S8', 'APD-S9', 'APD-APX-C']) expect(ids).toContain(id);
  });

  it('exposes the flagship rules that carry the demo', () => {
    const ids = flagshipRules().map((r) => r.id);
    expect(ids).toContain('V-APD-S8-001'); // narrative/budget reconciliation
    expect(ids).toContain('V-APD-S6-001'); // key personnel by name — 433.112(b)(19)
    expect(ids).toContain('V-APD-S3-003'); // reuse gate — 433.112(b)(13)
    expect(ids).toContain('V-AOA-007');    // preferred solution consistency
  });

  it('most rules are machine-checkable', () => {
    expect(machineCheckableRules().length).toBeGreaterThan(allValidationRules().length * 0.85);
  });

  // These are known and documented. If one disappears, someone "fixed" a real
  // conflict without resolving it. Read docs/regulatory/apd-section-schema.md.
  it('still records the seven known conflicts', () => {
    expect(knownConflicts).toHaveLength(7);
    expect(knownConflicts.map((c) => c.id)).toContain('CONFLICT-001'); // AoA placement
  });

  it('exposes every source gap with remediation details', () => {
    expect(openGaps.length).toBeGreaterThan(0);
    expect(openGaps.every((gap) => gap.impact && gap.fix)).toBe(true);
  });
});
