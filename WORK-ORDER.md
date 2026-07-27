# WORK-ORDER.md — what to build, in what order

This is the handoff from the research project to the build repo. Work top to bottom. Each phase has a definition of done. Do not skip ahead — the ordering is load-bearing, not bureaucratic.

**Read `CLAUDE.md` first.** Especially the section headed *"Things that are counterintuitive and will bite you."*

---

## Phase 0 — Verify the handoff (30 minutes)

```bash
pnpm install
pnpm verify        # typecheck + test across all packages
```

**Done when:**
- `@apd-studio/rules` — 74 rules parse; every invariant test passes, including the guard that keeps REGULAR-FFP thresholds off the ENHANCED track.
- `@apd-studio/templates` — 28 sections parse; all 22 Conditions for Enhanced Funding present; the reapproval subset test passes.
- `@apd-studio/budget` — tests are written and **failing**, because the module is specified but unbuilt. That is expected.
- `@apd-studio/validators` — the eight families throw `NotImplemented`; the `describe.skip` blocks are your implementation targets.

If anything else fails, fix it before proceeding. A green baseline is the only way to know later breakage is yours.

---

## Phase 1 — The budget engine (build this first)

`@apd-studio/budget` is the only module with zero dependency on the reference scenario, and it is the foundation of the flagship validator. Build it fully.

**Scope:**
- Federal/state splits at 90/10, 75/25, 50/50, in integer cents, with the state share computed as the remainder so parts always equal the whole.
- DDI vs M&O classification, including the illegal combinations (M&O at 90% is a hard error).
- Cost allocation across benefiting programs, summing to exactly 100%, with the remainder assigned to the last program so allocated parts equal the federal share.
- Reconciliation with **zero tolerance** — a one-cent discrepancy is a finding.

**Done when:** every test in `packages/budget/test/budget.test.ts` passes, and you have added edge cases for negative amounts, zero-dollar lines, and multi-FY rollups.

**Do not:** let any agent, model, or LLM call compute a federal share. Ever.

---

## Phase 2 — Validator families 1–4

Implement in this order. Each family gets its own file, its own tests, and its own findings.

| Order | Family | Anchor | Why this order |
|---|---|---|---|
| 1 | `completeness` | `requiredSections()` from `@apd-studio/templates` | Cheapest; proves the schema wiring works end to end |
| 2 | `budgetReconciliation` | V-APD-S8-001 — **flagship** | Depends only on Phase 1; it is the demo moment |
| 3 | `threshold` | 45 CFR 95.611(b)(2) | Pure rule lookup; no document parsing |
| 4 | `apduTrigger` | 45 CFR 95.611(c)(2)(ii)(A)–(F) | The Change Sentinel's core |

Un-skip the `describe.skip` blocks in `packages/validators/test/families.test.ts` one at a time. **Do not weaken an assertion to make it pass.** If an assertion looks wrong, check the citation in `docs/regulatory/rule-register.md` — that register was audited against primary sources on 2026-07-27 and is more likely right than your intuition.

**Done when:** four families return real `Finding[]`, every finding carries a citation, and `rulesSkipped` honestly reports anything not evaluated.

---

## Phase 3 — BLOCKED: get R11 and R12 from the research project

**Stop coding application features here.** Two artifacts are missing and everything user-facing depends on them:

- **R11 — reference scenario.** A mid-size expansion state implementing P.L. 119-21 § 71119 community-engagement functionality in its E&E system. Complete: scope, schedule, staffing, contracts, budget by FY and quarter, cost allocation across Medicaid and CHIP. Lands as `specs/reference-scenario.md` plus fixture data.
- **R12 — demo script.** The 12-minute end-to-end walkthrough: import scenario → agents draft the IAPD sections → budget engine builds the MDBT and reconciles it → AoA builder produces scored alternatives → **Compliance Validator returns red/yellow/green with citations** ← the moment that sells it → Change Sentinel flags a simulated 90-day slip and computes the As-Needed APDU deadline → export a submission-ready package with an audit trail.

Then build **exactly that demo, in that order, and nothing else, until it works.**

While blocked, useful work that does not require them: validator families 5–8, the `docx`/`xlsx` export builders, and the ADR backlog.

---

## Phase 4 — Data layer

Only after R11 defines the real shape of a project.

- Drizzle schema for the domain model in `docs/specs/domain-model.md`.
- **Row-level security in Postgres**, not in application code. Per-tenant policies. A test must prove that a query without a tenant context returns zero rows — see ADR-0003.
- Append-only `audit_event` table. No `UPDATE`, no `DELETE` grants on it for the app role.
- Document versions are immutable; a "delete" is a tombstone.
- **No PHI columns.** A migration that adds one does not merge.

---

## Phase 5 — Agent layer

Build in `buildPriority` order from `packages/agents/src/roster.ts`:

1. **Compliance Auditor** — the flagship. Prompt is already written at `packages/agents/prompts/compliance-auditor.v1.md`. Implement as a **panel**: four lenses (fiscal, technical, procurement, program), run independently, findings merged and de-duplicated. Each auditor gets the rules and facts it needs and **no access to the drafting agent's reasoning**.
2. **Change Sentinel** — watches project data against the six enhanced triggers; outputs the trigger, its citation, and the filing deadline as an actual date.
3. **Budget Analyst** — selects categories and allocation bases. The math is Phase 1's code.
4. **Narrative Drafter** — one section at a time. Never the whole document in one shot.

Every agent output validates against `AgentEnvelope` before it is persisted. Every agent gets an eval suite before it is trusted.

---

## Phase 6 — The app

Next.js. Blocked on Phase 3. Build the demo script's path first and nothing else.

Accessibility from the first component, not retrofitted: WCAG 2.1 AA / Section 508, with Playwright assertions in E2E.

---

## Standing obligations while you build

**Re-verify the register before any customer-facing use.** `verifiedAsOf` is 2026-07-27; `staleAfter` is 2026-10-25.

Dated items that will resolve themselves:

| When | What | Why it matters |
|---|---|---|
| **July 31, 2026** | Re-pull 42 CFR 435.560 from eCFR | The community-engagement good-faith-effort exemption becomes codified and retrievable. Currently `UNVERIFIED` — GAP-005 / OQ-007 |
| Weekly | Docket 1:26-cv-12962 (D. Mass.) | 25–26 states challenging CMS-2454-IFC. No ruling as of 2026-07-27. A preliminary injunction changes the near-term pipeline |
| Before customer use | State Medicaid Manual **Part 11** | 42 CFR 433.112(b)(2) and 433.119(a)(3) both make it a funding condition. **CEF 2 is un-checkable until we have it** — OQ-009 |
| Before building the Budget Engine against it | **MDBT V1.09** | We only recovered V1.06. GAP-001 |

---

## The two things most likely to go wrong

**1. Someone hardcodes a threshold.** It will look harmless — a `500000` in a form validator, a `60` in a date helper. Then the regulation changes, or a rule turns out to apply only to the regular track, and the fix lands in one place and not the other. Import from `@apd-studio/rules`. Always.

**2. Someone makes a failing test pass by weakening it.** The tests in this repo encode audited regulatory facts. The `describe.skip` blocks are targets, not suggestions. If a test seems wrong, it is far more likely that the code is wrong — or that you have found a genuine eighth conflict, in which case write an ADR and record it in the register rather than quietly editing the assertion.
