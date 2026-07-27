# @apd-studio/validators

**The Compliance Validator is the demo and the reason anyone buys.** Treat every
validator as a first-class, individually tested unit.

Eight families, each a separate concern:

| # | Family | Anchor rule |
|---|---|---|
| 1 | `completeness` | Section schema `requiredSections()` |
| 2 | `threshold` | 45 CFR 95.611(b)(2) — enhanced prior approval |
| 3 | `apduTrigger` | 45 CFR 95.611(c)(2)(ii)(A)–(F) — six enhanced triggers |
| 4 | `budgetReconciliation` | V-APD-S8-001 — **flagship** |
| 5 | `attestation` | 42 CFR 433.112(b)(19) and Table J |
| 6 | `cefCoverage` | 42 CFR 433.112(b)(1)–(22) |
| 7 | `internalConsistency` | Cross-document rules X-002, X-004 |
| 8 | `reportingCurrency` | SHO #25-003 monthly PSR + ORW |

## Rules for building these

1. **Never hardcode a threshold.** Import from `@apd-studio/rules`.
2. **Never compute money here.** Use `@apd-studio/budget`. A language model must
   never compute a federal share.
3. **Every finding cites a rule.** A finding without a citation does not ship.
4. **Recall beats precision.** A missed defect costs a state 30–45 days. A false
   positive costs someone five minutes. Tune accordingly, and say so in evals.
5. **Never return a false GREEN.** An unimplemented check throws. A check that
   cannot evaluate reports itself in `rulesSkipped`, visibly — it never silently
   passes.

## Golden-file tests

Fixture APD in → expected finding set out. Fixtures live in `/tests/fixtures`.
Seeded-defect fixtures (inject a known violation, measure catch rate) are how the
Compliance Auditor agent gets evaluated — see `docs/specs/agent-roster.md`.
