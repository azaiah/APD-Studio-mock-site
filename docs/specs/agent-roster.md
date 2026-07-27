# Agent roster

The portal's value is that agents do the work, not that humans get a nicer text
editor. Code lives in `@apd-studio/agents`; prompts are versioned in
`packages/agents/prompts/`.

## Universal rules — enforced structurally, not by instruction

1. **Grounded, not remembered.** Agents read facts from the Project Register and
   law from the Rule Register. They never assert a regulatory requirement from
   model memory.
2. **Structured output.** Schema-validated JSON. Prose is a *field*, not the
   payload.
3. **Citations required.** Every regulatory claim carries
   `{ citation, sourceDocId }`. Every factual claim names the Project Register
   field it came from.
4. **Confidence and gaps.** Every output includes `confidence` and `unknowns[]` —
   the specific facts the agent needed and did not have. **Unknowns become
   questions for a human, never invented content.**
5. **Versioned prompts.** `promptVersion` is stored with every output. Prompt
   changes run the eval suite before merge.
6. **Draft status.** Nothing is approved without `humanApprovedBy`.
7. **No PHI.** Enforced at the context-assembly layer, not by instruction.

## The roster, in build order

| Order | Agent | Job |
|---|---|---|
| 1 | **Compliance Auditor** (adversarial) | Fail the document the way a CMS State Officer would, before CMS sees it. **This is the demo. This is what people buy.** |
| 2 | **Change Sentinel** | Watch live project data and catch APDU triggers before they become failures. |
| 3 | **Budget Analyst** | Build and defend the MDBT. Selects categories and allocation bases; **a deterministic engine does the math.** |
| 4 | **Narrative Drafter** | Write the document section by section against the current template schema. |
| 5 | **Regulatory Analyst** | Given a project, determine exactly which federal obligations attach. |
| 6 | **Alternatives Analyst** | Produce a real AoA — the artifact CMS standardized and states routinely do badly. |
| 7 | **Intake & Interview** | Replace the weeks of chasing SMEs. Populate the Project Register. |
| 8 | **Reporting** | Kill the monthly grind SHO #25-003 created. |
| 9 | **Reuse Scout** | Satisfy the reuse-first expectation with actual evidence. |
| 10 | **Procurement Reviewer** | Make sure the RFP and resulting contract don't blow up the federal funding. |
| 11 | **CMS Response** | Turn CMS questions and conditions of approval into tracked, closed items. |

## Design notes that matter

**Compliance Auditor** — instructed to be hostile, run as an **independent pass
with no access to the drafting agent's reasoning**. Implemented as a panel with
four lenses (fiscal, technical, procurement, program), findings merged and
de-duplicated. **A finding survives only if it cites a rule.** Prompt written:
`packages/agents/prompts/compliance-auditor.v1.md`.

**Change Sentinel** — outputs the trigger, its citation, the 60-day filing
deadline **as an actual date**, and a pre-drafted As-Needed APDU. Remember the
clock runs from occurrence, not discovery.

**Budget Analyst** — *never let a language model compute a federal share.*
See ADR-0006.

**Narrative Drafter** — one section at a time. Never the whole document in one
shot; that is where consistency dies. Reads budget figures, never computes them.
Flat, declarative register. No marketing language, no unsupported superlatives.
Flags any sentence not backed by a register fact.

**Alternatives Analyst** — must cover reuse of the state's own or another state's
solution, COTS/SaaS, configure vs customize, phased vs big-bang, build, and the
status-quo option. Transparent, reproducible scoring with rationale per cell.
**Never reverse-engineers the analysis to justify a pre-chosen vendor — and flags
it when the input data suggests someone is trying to.**
Note the trap: **reuse is a mandatory scoring criterion, not a mandatory
alternative.**

## Orchestration

```
Intake ──► Project Register ──► Regulatory Analyst ──► obligation map
                                        │
                                        ▼
              ┌──────── Narrative Drafter (per section) ────────┐
              │         Budget Analyst (deterministic math)      │
              │         Alternatives Analyst ◄── Reuse Scout     │
              └────────────────────┬────────────────────────────┘
                                   ▼
                    Compliance Auditor (adversarial panel)
                                   │
                        red/yellow/green + findings
                                   │
                     ┌─────────────┴─────────────┐
                     ▼                           ▼
              remediation loop            Human approval ──► Export package
                                                                    │
                     ┌──────────────────────────────────────────────┘
                     ▼
   Change Sentinel (continuous) · Reporting (monthly) · CMS Response (on correspondence)
```

**Loop rule:** draft → audit → remediate repeats until no findings above the
configured severity remain, capped at N iterations. If it cannot converge, it
escalates to a human with the specific blocking findings **rather than quietly
lowering the bar.**

## Evaluation

Every agent needs a scored eval suite before it is trusted.

| Agent | Scoring |
|---|---|
| Compliance Auditor | Seeded-defect fixtures: inject known violations, measure catch rate and false-positive rate. **Recall matters more than precision** — a missed defect costs a customer 30–45 days; a false positive costs someone five minutes. |
| Budget Analyst | Exact-match arithmetic tests; allocation logic tests |
| Change Sentinel | Synthetic project timelines with known trigger events; detection and deadline accuracy |
| Narrative Drafter | Does the section satisfy its requirement? Rubric-scored by a separate model plus human spot checks |
| Regulatory Analyst | Fixture projects with known obligation maps |

Track scores over time. **A prompt or model change that regresses a score does
not ship.**
