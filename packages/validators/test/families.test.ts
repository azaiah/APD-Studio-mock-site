import { describe, expect, it } from 'vitest';
import { verdictFor, type Finding } from '../src/types.js';
import { FAMILIES, NotImplemented, budgetReconciliation } from '../src/families.js';

const finding = (over: Partial<Finding> = {}): Finding => ({
  ruleId: 'V-APD-S8-001',
  severity: 'blocker',
  citation: '42 CFR 433.112(a)',
  location: 'APD-S8 / Table D',
  whatsWrong: 'Narrative total does not equal the MDBT total.',
  whyItMatters: 'Budget/narrative discrepancy is the most common reason CMS returns an APD.',
  howToFix: 'Correct Table D FFY2027 DDI to $1,000,000 to match Section 8 narrative.',
  ...over,
});

describe('verdict', () => {
  it('is GREEN only when there are no blockers and no errors', () => {
    expect(verdictFor([])).toBe('GREEN');
    expect(verdictFor([finding({ severity: 'warning' })])).toBe('GREEN');
  });
  it('is YELLOW on any error', () => {
    expect(verdictFor([finding({ severity: 'error' })])).toBe('YELLOW');
  });
  it('is RED on any blocker, even alongside passes', () => {
    expect(verdictFor([finding({ severity: 'info' }), finding()])).toBe('RED');
  });
});

describe('the eight families exist and are honest about being unbuilt', () => {
  it('declares all eight', () => {
    expect(FAMILIES).toHaveLength(8);
  });
  it('throws rather than returning a false GREEN', () => {
    expect(() => budgetReconciliation({})).toThrow(NotImplemented);
  });
});

/**
 * ── IMPLEMENTATION TARGETS ────────────────────────────────────────────────
 * Un-skip these one at a time as you build each family. Do not weaken an
 * assertion to make it pass. If an assertion looks wrong, check the citation in
 * docs/regulatory/rule-register.md first — the register has been audited against
 * primary sources and is more likely right than your intuition.
 */
describe.skip('budget reconciliation — V-APD-S8-001', () => {
  it('flags a narrative figure that does not appear in the MDBT', () => {});
  it('flags an M&O cost claimed at 90 percent — V-APD-S8-003', () => {});
  it('flags an expenditure period beginning before CMS approval — V-APD-S8-004', () => {});
  it('flags a federal/state pair that does not sum to the line total', () => {});
});

describe.skip('APDU trigger — RR-TRIG-ENH-*', () => {
  it('fires at the lesser of $300,000 or 10 percent of project cost', () => {});
  it('fires on a 61-day major-milestone slip but not a 60-day one', () => {});
  it('computes the filing deadline as 60 days from occurrence, not discovery', () => {});
  it('does NOT apply the $1,000,000 regular-FFP threshold to enhanced work', () => {});
});

describe.skip('attestation — 42 CFR 433.112(b)(19)', () => {
  it('fails a CEF 19 "Yes" when the personnel table names no individuals', () => {});
  it('accepts a named individual with a numeric time commitment', () => {});
  it('rejects "TBD", "vacant", and role-only entries', () => {});
});

describe.skip('CEF coverage — 42 CFR 433.112(b)', () => {
  it('requires all 22 conditions at initial approval', () => {});
  it('requires only (b)(1),(3),(4),(7)-(22) at reapproval — 433.119(a)(1)', () => {});
});
