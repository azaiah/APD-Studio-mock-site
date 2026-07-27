# CLAUDE.md — APD Studio

Cursor and Claude Code read this file automatically. Read it fully before writing anything.

---

## What this is

APD Studio is a multi-tenant portal that helps a state Medicaid agency — or a vendor working for one — produce, validate, submit, and maintain **Advance Planning Documents**: the federal funding requests that unlock **90% FFP** for Medicaid IT design/development and **75% FFP** for operations.

The product's premise: most of this work is rule-following, arithmetic, cross-document consistency, and deadline tracking. That is agent work. Humans review and sign.

**Read `/docs/regulatory/` before writing any validation logic.** Rules in this codebase are not opinions. Every one traces to a CFR section, a statute, or a CMS letter — and every one has been verified against the primary source, with the verification date recorded.

---

## STOP — build order matters more than build speed

**Do not write application code yet.**

The regulatory spine exists: the source library (R1), the section schema (R2), and the rule register (R3) are in `/docs/regulatory/` and are wired into `/packages` as typed, tested data. What does **not** exist yet is:

- **R11 — the reference scenario.** One complete, realistic worked example: a mid-size expansion state implementing P.L. 119-21 § 71119 community-engagement functionality in its E&E system. Full scope, schedule, staffing, contracts, budget by FY and quarter, cost allocation across Medicaid and CHIP.
- **R12 — the demo script.** The 12-minute end-to-end walkthrough.

Every module, every agent, and every validator gets developed and tested against that one scenario. Building UI before it exists means building the wrong UI.

**What you may do right now, in this order:**

1. `pnpm install && pnpm verify` — the rules, templates, and budget packages should pass. Fix anything that doesn't.
2. Read `WORK-ORDER.md`. It sequences the work.
3. Implement the **budget engine** (`@apd-studio/budget`) fully — it has real tests and no dependency on the scenario.
4. Implement validator families 1–4 against the existing schema, using synthetic inputs.

**What you may not do until R11 and R12 land:** the Next.js app, screens, navigation, or anything a user clicks.

---

## Hard rules for anyone writing code here — human or AI

1. **No hardcoded regulatory values in application code.** Thresholds, match rates, deadlines, and required-section lists live in `/packages/rules` as versioned data with a `citation` and an `effectiveDate`. If you find `500000` inline in a component, that is a bug.
2. **Every rule object carries a citation.** `{ id, citation, source, effectiveDate, confidence, trigger, obligation, supersededBy }`. A rule with no citation does not ship — enforced by the Zod schema and again by `packages/rules/test/rules.test.ts`.
3. **Confidence gates enforcement.** Rules marked `LOW` or `UNVERIFIED` are research, not law. `enforceableRules()` is the only list a validator may act on. Two rules in the register are deliberately `UNVERIFIED` — do not "fix" them by guessing.
4. **No PHI. No member-level data.** No schema, no column, no log line, no fixture. If a ticket asks for it, escalate instead of building it.
5. **Nothing auto-submits to CMS.** The system produces packages; a named human approver exports and files. There is no outbound CMS integration and there never will be. See ADR-0004.
6. **Accessibility is a requirement, not a polish task.** WCAG 2.1 AA / Section 508. Semantic HTML, keyboard paths, focus management, contrast, labeled form controls. Tested, not assumed. It is also a Condition for Enhanced Funding — 42 CFR 433.112(b)(12) — so our own inaccessibility would be an argument against our own product.
7. **Everything is auditable.** Append-only event log for create/edit/approve/export. Never hard-delete a document version.
8. **Multi-tenant isolation is enforced at the data layer**, not in the UI. Row-level security or per-tenant schemas. No `WHERE tenant_id = ?` trust in application code alone. See ADR-0003.
9. **Agent outputs are drafts.** Persist with `status: 'draft'`, `generatedBy`, `model`, `promptVersion`, `sources[]`, `humanApprovedBy: null`. The UI must visibly distinguish AI-drafted from human-approved content.
10. **Never let a language model compute money.** Agents select categories, allocation bases, and rationale. `@apd-studio/budget` does the arithmetic, in integer cents.
11. **Never return a false GREEN.** An unimplemented check throws. A check that cannot evaluate reports itself in `rulesSkipped`, visibly. A validator that silently passes is worse than no validator.

---

## Things that are counterintuitive and will bite you

These were found by auditing primary sources. Each one is a real trap.

**The enhanced track is not the regular track.** Regular FFP requires an APD at $5,000,000. Enhanced FFP requires prior approval for **every** PAPD and IAPD regardless of amount, and for contracts over **$500,000**. Applying a regular threshold to Medicaid MES work is the single most dangerous class of error in this codebase — it already happened once in the rule register itself and was caught by audit. `rulesForTrack('ENHANCED')` never returns a `REGULAR` rule, and a test guards it.

**The As-Needed APDU clock runs from occurrence, not discovery.** *"no later than 60 days after the occurrence of the project changes."* There is no tolling for a state that did not notice. That single word is the entire business case for the Change Sentinel.

**The As-Needed cost trigger is the LESSER of $300,000 or 10%.** Not the greater. `asNeededCostTriggerUsd()` in `@apd-studio/rules` implements it; four tests guard it.

**Enhanced FFP has six As-Needed triggers. Regular has five.** The cost-benefit trigger exists only on the enhanced track.

**The reapproval condition set is a strict subset.** 42 CFR 433.119(a)(1) requires 433.112(b)(1), (3), (4), and (7)–(22). Conditions **(b)(2), (b)(5), and (b)(6) drop out at reapproval.** There is a second asymmetry beside it: initial approval requires 433.116(c)–(i) per 433.114(a); reapproval requires 433.116(d)–(j). Do not conflate them. Most tools won't model this — that's the point.

**42 CFR 433.114 has no deadlines.** It was cut down by the April 19, 2011 amendment. The 60-day clock that does exist is at **45 CFR 95.611(d)**, it runs from the date of the Departmental letter acknowledging receipt, and its consequence is that the request is *"provisionally"* deemed to have met the prior-approval conditions. That one runs in the state's favor — surface it.

**The 75%→50% reduction is narrower than people say.** It reaches *"expenditures related to the operations of non-compliant functionality or system components"* — not automatically the whole system. Never inflate this in product copy or in a finding. The accurate version is alarming enough.

**Reuse is a mandatory scoring criterion, not a mandatory alternative.** The AoA must score reuse and explain why no reuse option was viable. It does **not** have to include a reuse alternative. Getting this backwards produces false failures.

**SHO #25-003 contradicts the templates it announced.** The letter says the AoA fills "Section 5 of the new MES APD and/or Appendix A of the new MES OAPD." In the published templates, APD Section 5 is *Acquisitions* and OAPD Appendix A is the *Activity Schedule*. The FAQ and the templates agree with each other: the AoA lives at **APD Section 3 (reference) + Appendix B (full document)**. Build against the templates. Surface the conflict; don't hide it. `CONFLICT-001`.

**Cadence ≠ frequency.** CMS defines them: *cadence* is submission timing to CMS, *frequency* is metric data capture. Non-EVV modules capture monthly and submit monthly. EVV captures monthly and submits quarterly. Never say "everything is monthly."

**45 CFR 95.626 is Independent Verification and Validation.** Emergency acquisitions are 45 CFR 95.624. Easy to transpose; costly to cite wrong.

---

## Stack

- Next.js (App Router) + TypeScript, React Server Components where they help
- Postgres with row-level security; Drizzle
- Tailwind + shadcn/ui, restrained government-appropriate design system
- Zod at every boundary — API, agent output, imported spreadsheets
- SheetJS / ExcelJS for MDBT and ORW workbooks; `docx` for narrative export; Playwright for PDF packages
- Anthropic API for the agent layer; structured tool use with schema validation on every return
- Vercel for early demos; expect to move to a StateRAMP-viable host (AWS GovCloud or Azure Government) for anything real. See ADR-0005.
- Vitest for unit tests, Playwright for E2E including accessibility assertions

pnpm workspaces + Turborepo. Node ≥ 20.11.

---

## Repo layout

```
/apps
  /site           Public marketing site. Not blocked — can be built any time.
  /web            The portal. BLOCKED on R11 + R12. See apps/web/README.md.
/packages
  /rules          Rule register: 74 rules as typed, validated data
    data/rule-register.json      build-time copy of docs/regulatory/ (docs wins on drift)
    src/schema.ts                Zod — a rule with no citation cannot parse
    src/index.ts                 accessors: byId, byCategory, forTrack, enforceable
    test/rules.test.ts           invariants incl. the ENHANCED/REGULAR guard
  /templates      28 sections, 124 validation rules, all 22 CEFs, AoA, MDBT, checklist
  /validators     Eight families. Currently throw NotImplemented. Make the tests pass.
  /budget         Match-rate math in integer cents. Fully specified, tested, unbuilt.
  /agents         Roster, versioned prompts, output envelope schema
  /export         (not yet) docx / xlsx / pdf package builders
  /ui             (not yet) shared components
/docs
  /regulatory     R1 source index, R2 section schema, R3 rule register, verification log
  /specs          module map, domain model, agent roster
  /decisions      ADRs
/tests/fixtures   redacted real-world APDs, seeded-defect fixtures (R4 — empty)
```

**This repository is private, and stays private.** It contains the rule register
and the section schema — the two artifacts that took the real work. `apps/site`
being a public-facing product does not make its source public.

`apps/site` must not import from `@apd-studio/rules`. If marketing copy needs a
number, hardcode it in the copy *with its citation*. The register is for
validation, not for headlines.

---

## Domain glossary — use these terms exactly

| Term | Meaning |
|---|---|
| APD | Advance Planning Document — the funding request |
| PAPD / IAPD / OAPD / APDU | Planning / Implementation / Operational APD; APD Update (Annual or As-Needed) |
| FFP | Federal Financial Participation — the federal share |
| DDI | Design, Development, and Installation — 90% FFP |
| M&O | Maintenance and Operations — 75% FFP |
| MES | Medicaid Enterprise Systems |
| MMIS | Medicaid Management Information System |
| E&E | Eligibility and Enrollment system |
| MDBT | Medicaid Detail Budget Table |
| AoA | Analysis of Alternatives |
| ORW | Operational Report Workbook — monthly |
| PSR | Project Status Report — monthly |
| SMC | Streamlined Modular Certification |
| CEF | Conditions for Enhanced Funding — 42 CFR 433.112(b), 22 of them |
| MITA | Medicaid Information Technology Architecture |
| SO | CMS MES State Officer — the state's assigned reviewer |
| DAB | Departmental Appeals Board |
| SHO / SMDL / CIB | State Health Official letter / State Medicaid Director letter / CMCS Informational Bulletin |

---

## Core domain model

```ts
Tenant          // a state agency, or a vendor working on behalf of one
Program         // Medicaid, CHIP, other benefiting programs — drives cost allocation
Project         // an MES project: name, module type, lifecycle phase, SMC status
FundingRequest  // one APD submission: type, period, status, CMS correspondence
Section         // a template section, its rule ids, draft/approved content, sources
BudgetLine      // category, FY, quarter, amount in cents, matchRate, program allocation
Milestone       // planned vs actual dates — feeds the Change Sentinel
Contract        // vendor, value, competitive?, amendments — feeds threshold logic
Rule            // id, citation, effectiveDate, confidence, trigger, obligation, supersededBy
Finding         // validator output: severity, ruleId, citation, location, remediation
Evidence        // artifact linked to a CEF condition or an SMC outcome
AuditEvent      // append-only: actor, action, target, before/after, timestamp
```

Full detail in `/docs/specs/domain-model.md`.

---

## Validation is the product

The Compliance Validator is the demo and the reason anyone buys. Eight families, each individually tested:

1. **Completeness** — every required section present and non-trivial
2. **Threshold** — prior approval logic; enhanced FFP only
3. **APDU trigger** — the six enhanced triggers and the 60-day filing clock
4. **Budget reconciliation** — narrative equals MDBT, DDI/M&O split, match rates, allocation sums to 100%
5. **Attestation** — every certification present *and supported by the document*
6. **CEF coverage** — each 433.112(b) condition addressed with evidence
7. **Internal consistency** — dates monotonic, schedule matches budget periods, staffing matches cost lines
8. **Reporting currency** — monthly PSR and ORW filed for every enhanced-funding project

Every finding returns: severity, rule id, citation, exact document location, a plain-English explanation, and the concrete fix.

**Recall beats precision.** A missed defect costs a state 30–45 days. A false positive costs someone five minutes.

---

## Testing

- Unit tests for every validator and every budget calculation. **Money math gets exhaustive edge-case tests** — the federal/state split must equal the total at every odd amount, or the flagship check can't be a blocker.
- **Golden-file tests:** fixture APD in → expected finding set out.
- **Agent evals:** versioned prompts scored against fixtures. A prompt change that lowers a score does not merge.
- **Accessibility assertions in E2E**, not a manual checklist.
- Never edit a fixture to make a test pass. If the expected findings look wrong, check the citation in `docs/regulatory/rule-register.md` first — the register has been audited against primary sources and is more likely right than your intuition.

---

## What NOT to build

- Any CMS submission integration
- Anything that stores PHI
- A generic document editor — we are a compliance system that happens to produce documents
- Chat as the primary interface — chat assists inside structured workflows; it is not the product

---

## When you're unsure about a regulation

**Stop.** Check `/docs/regulatory/`. If it isn't there, or `verifiedAsOf` is more than 90 days old, go read the primary source — `ecfr.gov`, `medicaid.gov/federal-policy-guidance` — write a note into `/docs/regulatory/` with the date, then code.

Do not guess. **A wrong threshold shipped into a validator is worse than no validator.**

Current register: `verifiedAsOf` **2026-07-27**, `staleAfter` **2026-10-25**. `isStale()` will tell you.

Eight open questions are tracked in `/docs/regulatory/OPEN-QUESTIONS.md`. Two are dated and will resolve themselves — 42 CFR 435.560 becomes retrievable from eCFR on **July 31, 2026**. Do not implement around an open question by inventing an answer.

---

## We are not lawyers

We provide regulatory analysis, not legal advice. We are not any state's authorized representative. We do not claim CMS endorsement, partnership, or pre-approval — there is no such thing. Every customer-facing output says so.
