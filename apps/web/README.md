# apps/web — the portal

**Not started. Blocked, deliberately.**

Two research artifacts have to land first, and building before they do means
building the wrong thing:

- **R11 — reference scenario.** One complete worked example: a mid-size expansion
  state implementing P.L. 119-21 § 71119 community-engagement functionality in
  its E&E system. Scope, schedule, staffing, contracts, budget by FY and quarter,
  cost allocation across Medicaid and CHIP. Every module, agent, and validator
  gets developed and tested against this one scenario.
- **R12 — demo script.** The 12-minute end-to-end walkthrough that defines what
  screens exist and in what order.

See `WORK-ORDER.md` Phase 3. Until then, build the budget engine and validator
families — they have real tests and no dependency on the scenario.

## When you do start

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
