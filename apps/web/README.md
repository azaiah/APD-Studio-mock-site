# apps/web — the portal

## Current scope

The scenario-independent regulatory console is implemented:

- `/sign-in` is an honest demo gateway. It does not create a fake session.
- `/rules` browses the typed Rule Register.
- `/sections` shows the APD section matrix and flagship checks.
- `/cef` shows all 22 CEFs and the 19-condition reapproval subset.
- `/integrity` surfaces conflicts, open questions, and source gaps.

These views read package data from `@apd-studio/rules` and
`@apd-studio/templates`. The identity-provider and password controls remain
disabled because no authentication backend exists.

## Still blocked, deliberately

Two research artifacts have to land first, and building before they do means
building the wrong thing:

- **R11 — reference scenario.** One complete worked example: a mid-size expansion
  state implementing P.L. 119-21 § 71119 community-engagement functionality in
  its E&E system. Scope, schedule, staffing, contracts, budget by FY and quarter,
  cost allocation across Medicaid and CHIP. Every module, agent, and validator
  gets developed and tested against this one scenario.
- **R12 — demo script.** The 12-minute end-to-end walkthrough that defines what
  screens exist and in what order.

See `WORK-ORDER.md` Phase 3. Until then, do not build Project Register forms,
the authoring workspace, scenario validator output, or demo-flow ordering.

## When scenario work starts

Build the demo script's path first and nothing else, until it works.

- Accessibility from the first component, not retrofitted.
- The UI must **visibly distinguish AI-drafted from human-approved content.**
  This is not a nicety; it is the answer to the first objection every state CIO
  raises.
- Where CMS's own sources conflict, the UI says so at the point it matters.
  There are seven documented conflicts. Surfacing them is a credibility feature,
  not a bug. ADR-0008.
- Nothing reaches submission-ready without a named human approver on every
  attestation.
