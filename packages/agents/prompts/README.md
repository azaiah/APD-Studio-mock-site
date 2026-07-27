# Agent prompts — versioned

One file per agent per version: `<agent-id>.v<N>.md`. **Never edit a shipped
prompt in place.** Create `v2` and update `promptVersion` in `src/roster.ts`.
`promptVersion` is persisted with every agent output so any historical draft can
be explained.

## Before merging a prompt change

Run the eval suite. **A prompt change that lowers a score does not merge.**

| Agent | How it is scored |
|---|---|
| Compliance Auditor | Seeded-defect fixtures — inject known violations, measure catch rate and false-positive rate. **Recall matters more than precision.** |
| Budget Analyst | Exact-match arithmetic tests; allocation logic tests |
| Change Sentinel | Synthetic timelines with known trigger events; detection rate and deadline accuracy |
| Narrative Drafter | Does the section satisfy its requirement? Rubric-scored by a separate model + human spot checks |
| Regulatory Analyst | Fixture projects with known obligation maps |

`compliance-auditor.v1.md` is written. The remaining ten are specified in
`docs/specs/agent-roster.md` and listed in `src/roster.ts` with a build order.
Write each one when you build that agent — not before.
