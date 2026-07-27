# Architecture Decision Records

Every non-obvious choice, with the why. Append; never rewrite history. If a
decision is reversed, add a new ADR that supersedes the old one and say so.

---

## ADR-0001 — The rule register is data, not code

**Status:** Accepted · 2026-07-27

**Context.** Federal thresholds change. The As-Needed APDU cost trigger is
$300,000 or 10% today; the enhanced contract threshold is $500,000; SHO #25-003
rewrote the entire template set in 2025 with a mandatory date of 2026-07-01. A
codebase with these values embedded in components cannot be audited, cannot be
diffed against a regulation, and cannot answer "what did we validate against in
March?"

**Decision.** Every threshold, trigger, deadline, and condition lives in
`@apd-studio/rules` as versioned JSON with `citation`, `source`, `effectiveDate`,
and `confidence`. Zod rejects a rule with no citation at parse time. Application
code imports; it never restates.

**Consequences.** One extra indirection everywhere. In exchange: a regulation
change is a data edit plus a test run, findings can cite their authority
verbatim, and `docs/regulatory/VERIFICATION-LOG.md` proves what we knew and when.

---

## ADR-0002 — Confidence gates enforcement

**Status:** Accepted · 2026-07-27

**Context.** Week 1 research produced rules at genuinely different evidentiary
levels: some verbatim from eCFR, some through a summarizing layer, some asserted
in project materials but never found in a primary source. Treating these
identically would mean shipping a validator that fails a state's document on a
rule we never actually read.

**Decision.** Every rule carries `confidence`: HIGH, MEDIUM, LOW, or UNVERIFIED.
`enforceableRules()` returns only HIGH and MEDIUM. A LOW or UNVERIFIED rule may
inform research and may be shown to an internal user, but may never drive a
finding shown to a state.

**Consequences.** Two rules ship as UNVERIFIED and are visibly inert. That is
correct behaviour, not a defect — the alternative is a confident wrong answer.
The audit that closed OQ-002 is the model: a rule sat UNVERIFIED, someone went
and read 45 CFR 95.610(c)(1), and it became HIGH.

---

## ADR-0003 — Tenant isolation lives in the database

**Status:** Accepted · 2026-07-27

**Context.** Two buyer types — state agencies and the vendors who serve several
of them — on one platform. A vendor tenant seeing another state's unfiled APD
would be a company-ending event. Application-layer filtering (`WHERE tenant_id = ?`)
fails open: one forgotten clause in one query is a breach.

**Decision.** Postgres row-level security with per-tenant policies, or per-tenant
schemas. The application role cannot read rows without a tenant context set. A
test must prove a context-free query returns **zero rows**, not all rows.

**Consequences.** More migration complexity and connection-level session setup.
In exchange, isolation fails closed, and it is demonstrable to a state security
reviewer — who will ask.

---

## ADR-0004 — No CMS submission integration, ever

**Status:** Accepted · 2026-07-27

**Context.** The obvious "complete the loop" feature is filing to CMS. It is also
the feature that turns a defensible tool into an indefensible one. An APD carries
attestations — sworn statements to the federal government about software
ownership, personnel commitments, and security posture.

**Decision.** The system produces a submission-ready package. A **named human**
exports it and files it. There is no outbound CMS endpoint in any environment.
No agent may set an attestation value; the human attestation gate (`X-005`) is a
blocker-severity check.

**Consequences.** We give up a demo flourish. We gain the answer to the first
objection every state CIO raises — *"an AI wrote our federal funding request?"* —
which is: no, your named official signed it, and here is the audit trail showing
exactly what was drafted, by which prompt version, from which facts, and who
approved each line.

---

## ADR-0005 — Vercel for demos, StateRAMP-viable host for production

**Status:** Accepted · 2026-07-27

**Context.** States will ask about MARS-E 2.x, NIST 800-53 moderate,
StateRAMP/FedRAMP status, SOC 2, and data residency. Early-stage speed argues for
Vercel; procurement reality argues for AWS GovCloud or Azure Government.

**Decision.** Build cloud-agnostic. Vercel for demos and internal work. No
managed service gets adopted unless it has a GovCloud or Azure Government
equivalent. Say plainly what we hold and what is in progress; **never claim a
certification we do not hold.**

**Consequences.** Some convenience left on the table. Migration stays a
deployment change rather than a rewrite.

---

## ADR-0006 — The model never computes money

**Status:** Accepted · 2026-07-27

**Context.** The Budget Analyst agent selects cost categories, allocation bases,
and rationale — genuinely judgement-laden work. It is tempting to let it also
produce the numbers. Language models make arithmetic errors that are plausible,
silent, and, in a federal funding request, catastrophic.

**Decision.** `@apd-studio/budget` does all arithmetic, in integer cents, with
the state share computed as the remainder so parts always equal the whole. The
agent chooses categories and writes rationale; it reads computed figures and
never produces them. The Narrative Drafter likewise reads budget figures.

**Consequences.** More plumbing between agent and engine. In exchange,
V-APD-S8-002 (match-rate arithmetic) can be a blocker-severity check with zero
tolerance, because the arithmetic is provably exact.

---

## ADR-0007 — The Compliance Auditor is a panel, and it is hostile

**Status:** Accepted · 2026-07-27

**Context.** A single agreeable reviewer agent produces a document that passes
its own review and fails CMS's. Different defect classes also need different
expertise — a fiscal reviewer and a procurement reviewer notice different things.

**Decision.** The Compliance Auditor runs as four independent passes with
distinct lenses — fiscal, technical, procurement, program — merged and
de-duplicated. Each is instructed to fail the document. None has access to the
drafting agent's reasoning; they review the artifact as CMS will see it. **A
finding survives only if it cites a rule.** Tuned for recall over precision: a
missed defect costs a state 30–45 days; a false positive costs five minutes.

**Consequences.** Four times the inference cost per audit. That is the product.

---

## ADR-0008 — Documented conflicts are surfaced, never resolved silently

**Status:** Accepted · 2026-07-27

**Context.** Week 1 found seven places where CMS's own sources disagree. The
sharpest: SHO #25-003 says the AoA template fills "Section 5 of the new MES APD
and/or Appendix A of the new MES OAPD," but in the published templates Section 5
is *Acquisitions* and OAPD Appendix A is the *Activity Schedule*. The FAQ and the
templates agree with each other and contradict the letter.

**Decision.** Build against the best-evidenced reading — here, the templates plus
the FAQ. Record the conflict in `knownConflicts` with all sources quoted, and
**show it to the user** at the point it matters rather than presenting one
reading as settled fact. A test asserts all seven conflicts still exist, so
nobody can quietly delete one instead of resolving it.

**Consequences.** The UI has to be able to say "CMS's sources disagree here, and
here is why we did it this way." That is a feature. It is exactly the credibility
signal that separates a compliance engine from a document generator — and it is
what a State Officer will respect when they notice the same thing.
