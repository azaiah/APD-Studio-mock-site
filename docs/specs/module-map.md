# Module map

Twelve modules. Build order is set by `WORK-ORDER.md`, not by this list.

| # | Module | What it does | Depends on |
|---|---|---|---|
| 1 | **Regulatory Knowledge Core** | Versioned, citation-linked corpus. Every rule a structured object, never a PDF blob. **This is the moat.** | ✅ built (`@apd-studio/rules`) |
| 2 | **Project & Portfolio Register** | Every MES project, module, phase, funding stream, milestone, and contract. The single source the system reasons over. | Blocked on R11 |
| 3 | **APD Authoring Workspace** | Section-by-section drafting against the current template, with the Knowledge Core enforcing required content. Every section shows which requirement it satisfies. | 1, 2 |
| 4 | **Budget Engine (MDBT)** | The detailed budget table as computation. Federal/state split by category and rate, cost allocation, DDI vs M&O separation, automatic narrative/table reconciliation. | ✅ specified (`@apd-studio/budget`) |
| 5 | **Analysis of Alternatives Builder** | Market research, reuse-first evaluation, configure-vs-customize, phased and non-vendor options, transparent weighted scoring, defensible rationale. | 1, 2 |
| 6 | **Compliance Validator** | Pre-submission gate. Every requirement, attestation, threshold, and consistency check → red/yellow/green with the specific fix. **The flagship demo.** | 1, 3, 4 |
| 7 | **Change Radar (APDU sentinel)** | Watches schedule, budget, scope, and cost-allocation data against the § 95.611 triggers and raises "As-Needed APDU required — filing deadline *date*" before the state trips a failure. | 1, 2 |
| 8 | **Procurement Pack** | RFP/RFQ assembly with the CMS Procurement Document Checklist, required contract clauses, prior-approval routing. | 1, 2 |
| 9 | **Ongoing Obligations Engine** | Generates and files the monthly Project Status Report and Operational Report Workbook from live project data. **The stickiest module** — it creates a monthly habit. | 2 |
| 10 | **SMC Certification Tracker** | Intake, outcomes and metrics, evidence mapped to Conditions for Enhanced Funding, readiness scoring. | 1, 2 |
| 11 | **CMS Correspondence Hub** | Every CMS question and condition of approval tracked to closure with an audit trail. States lose weeks here. | 2 |
| 12 | **Evidence Vault & Audit Trail** | Immutable record of who wrote, who edited, who approved, what source was used, what changed. **Sells the tool to CFOs and OIG-wary leadership.** | cross-cutting |

## Why the Compliance Validator is first among equals

It is the only module a buyer can evaluate in twelve minutes without trusting us.
Everything else is a productivity claim; the validator is a demonstrable one —
run it against a document the state already submitted and see what it catches.

## Two under-appreciated commercial hooks

**The Change Radar catches an invisible failure.** Most state slippage never
reaches the person responsible for filing the APDU, and the 60-day clock runs
from occurrence, not discovery. A system that watches schedule and budget data
and fires "you have 60 days" is worth the license fee by itself.

**The Ongoing Obligations Engine creates a monthly habit.** SHO #25-003 made the
Project Status Report and the Operational Report Workbook monthly, permanently,
and made non-submission a compliance failure that can cost enhanced FFP. Twelve
months of ORW history are required for an APD submission — a state that starts
late cannot manufacture history retroactively, which is a reason to buy before
you need it.

## Deliberately out of scope

- CMS submission integration — ADR-0004
- Anything storing PHI
- A generic document editor. We are a compliance system that happens to produce
  documents.
- Chat as the primary interface. Chat assists inside structured workflows.
