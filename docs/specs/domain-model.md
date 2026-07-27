# Domain model

The Project Register is the single source the whole system reasons over. Agents
read facts from here and law from the Rule Register. Nothing is asserted from
model memory.

## Entities

### Tenant
A state Medicaid agency, or a vendor working on behalf of one. **Isolation is
enforced at the data layer** — see ADR-0003. A vendor tenant may serve several
states; each state's data is a separate tenant, and the vendor's access to each
is an explicit grant.

### Program
Medicaid, CHIP, and any other benefiting program. Drives cost allocation.
A `BudgetLine` allocates across programs in basis points summing to exactly
10,000 — enforced by `allocationSumsTo100()`.

### Project
One MES project. Name, module type (MMIS / E&E / EVV / other), lifecycle phase,
SMC status, certification status. Carries the approved baselines the Change
Sentinel measures against: total project cost, cost-benefit estimate, milestone
dates, procurement approach, scope statement, cost allocation methodology.

### FundingRequest
One APD submission. `type` ∈ {PAPD, IAPD, APDU_ANNUAL, APDU_AS_NEEDED, OAPD}.
Carries the approval period, the FFP approval expiration date (which drives the
Annual APDU deadline — 60 days prior, 45 CFR 95.610(c)(1)), submission status,
and linked CMS correspondence.

### Section
An instance of a template section for a specific FundingRequest. Links to its
schema section id, the rule ids it must satisfy, draft content, approved content,
and the Project Register fields the content drew from. Versioned; **never
hard-deleted**.

### BudgetLine
Category, federal fiscal year, quarter, amount **in integer cents**, activity
class (DDI / M&O / ADMIN), federal rate (90 / 75 / 50), and program allocation.
The state share is always computed as the remainder — see ADR-0006.

### Milestone
Planned versus actual dates. Feeds the Change Sentinel's 60-day major-milestone
slip trigger — 45 CFR 95.611(c)(2)(ii)(B). The clock runs from **occurrence**,
so `actualDate` is the trigger field, not the date someone noticed.

### Contract
Vendor, value, competitive or noncompetitive, term including option years,
amendments. Feeds prior-approval threshold logic: enhanced FFP requires prior
approval over $500,000, and for amendments over $500,000 **or** a term extension
over 60 days — 45 CFR 95.611(b)(2)(iii)–(iv).

### Rule
Mirrors `@apd-studio/rules`. Not stored per-tenant; it is federal law, shared,
and versioned centrally.

### Finding
Validator output. `{ ruleId, registerRuleId, severity, citation, location,
whatsWrong, whyItMatters, howToFix, deadline }`. Every field mandatory except
`deadline`. A finding without a citation does not exist.

### Evidence
An artifact linked to a Condition for Enhanced Funding or an SMC outcome. This is
what makes "Evidence Satisfactory" readiness scoring possible, and what an
auditor asks for.

### AuditEvent
Append-only. `{ actor, action, target, before, after, timestamp }`. The app role
has no UPDATE or DELETE grant on this table. Covers create, edit, approve, and
export. This is the artifact that sells the product to a CFO.

## Invariants

1. A `Section`'s approved content always has a named `humanApprovedBy`. Agent
   output is `status: 'draft'` with `humanApprovedBy: null`.
2. Federal share + state share = line total, exactly, at every amount.
3. Program allocation basis points sum to exactly 10,000.
4. No entity, column, index, or log line contains member-level data.
5. Document versions are immutable. A "delete" is a tombstone.
6. Every `Finding` resolves to a real rule id in `@apd-studio/rules`.
