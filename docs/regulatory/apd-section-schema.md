# APD Section Schema — human-readable companion

**Artifact:** R2 · **Schema version:** 0.2.0 · **Verified as of:** July 27, 2026 · **Stale after:** October 25, 2026
**Machine-readable source of truth:** `specs/apd-section-schema.json` — that file governs; this one explains.

---

## What this is

A section-by-section reverse-engineering of the CMS Medicaid Enterprise Systems template set that became mandatory on July 1, 2026. For every section of the MES APD and MES OAPD, plus the AoA template, the MDBT, and the Procurement Checklist, it records five things:

1. What content is required
2. Which of the four APD types require it
3. Which federal provision demands it
4. What a CMS State Officer is actually looking for
5. The machine-checkable rule that proves it is satisfied

**Coverage:** 28 sections · 124 validation rules · all 22 Conditions for Enhanced Funding captured verbatim · 7 documented conflicts · 8 open gaps.

Everything downstream references section ids and rule ids from this file. Do not rename them.

---

## How the source material was obtained (and why that matters)

All eight current CMS templates are native Word or Excel, which the research environment cannot parse. The structures below were recovered from **CMS's own Paperwork Reduction Act filings on reginfo.gov**, which contain PDF conversions of the same documents. That is an authoritative CMS artifact, not a third-party rendering.

| Template | reginfo objectID | Recovered |
|---|---|---|
| MES APD Template | 162298501 | Full outline |
| MES OAPD Template | 162299001 | Full outline |
| AoA Template | 162299301 | Full outline + scoring structure |
| MDBT + CHIP **V1.06** | 162299401 | Tabs + column structure |
| Procurement Checklist | 162299601 | All 28 checklist items |
| Operational Report Workbook | 162299901 | Tabs, columns, ID grammar |
| MES Project Status Report | 162300001 | **Identified, not yet extracted** |
| CEF / ORR evidence table | 162300101 | **Identified, not yet extracted** |
| "What Changed" crosswalk | 162300201 | Full |

The object IDs increment by 100 across the range 1622985xx–1623002xx. Probing that grid is how the remaining templates were found — worth remembering next time CMS publishes a template set.

---

## The MES APD at a glance

One template now covers all four submission types. Content varies by type within the same numbered sections.

| # | Section | PAPD | IAPD | Annual APDU | As-Needed APDU |
|---|---|---|---|---|---|
| — | Front Matter | ● | ● | ● | ● |
| — | Document Version History | ● | ● | ● | ● |
| — | Executive Summary | ● | ● | ● | ● |
| 1 | Project Management Plan / Summary of Activities | ● *(PMP)* | ● *(Summary)* | ● *(Activity Report)* | ● *(Activity Report)* |
| 2 | Statement of Needs and Objectives | ● | ● | ● | ● |
| 3 | Requirements Analysis, Feasibility Study, AoA Considerations | ○ *commitment* | ● *full* | ● *updates* | ● *updates* |
| 4 | Cost-Benefit Analysis | ○ *commitment* | ● | ◐ *if new work* | ◐ *if new work* |
| 5 | Acquisitions | ● | ● | ● | ● |
| 6 | Personnel Resource Statement | ◐ *abbreviated* | ● | ● | ● |
| 7 | Proposed Activity Schedule | ● | ● | ● | ● |
| 8 | Proposed Budget | ● | ● | ● | ● |
| 9 | **Statement of Duration** *(new)* | ? | ● | ● | ● |
| 10 | Cost Allocation Plan | ◐ *if multi-program* | ◐ | ◐ | ◐ |
| 11 | Security and Interface Requirements | ✕ *N/A* | ● | ● | ● |
| 12 | Assurances and Compliance | ● | ● | ● | ● |
| A | **Diagram** *(new)* | ? | ● | ● | ● |
| B | Other Information Required *(carries the AoA)* | ◐ | ● | ◐ | ◐ |
| C | Conditions for Enhanced Funding | ✕ *not required* | ● | ● | ● |
| D | **Outcomes and Metrics** *(new)* | ? | ● | ● | ● |
| E | **Certification** *(new)* | ? | ● | ● | ● |

● required · ◐ conditional · ○ commitment only · ✕ not applicable · ? not stated in the retrieved conversion (GAP-007)

### What changed from the old E&E IAPD template

From CMS's own crosswalk: Section 9 (Statement of Duration) and Appendices A, D and E are **entirely new**. Project management planning moved from the old Section 5 into Section 1, which is why Section 5 is now purely Acquisitions. The sample MDBT moved from the old Appendix A into Section 8. Section 11 lost its explicit disaster-recovery language because "those are addressed by CEF 18 in Appendix C." Appendix C replaced the old acquisition checklist with the Enhanced Funding attestations.

---

## The seven flagship validators

Of 124 rules, these are the ones that carry the demo and, on the evidence, catch what CMS actually returns documents for.

| Rule | What it catches | Authority |
|---|---|---|
| **V-APD-S8-001** Narrative/budget reconciliation | Table D totals do not equal the MDBT; an activity is budgeted that is not in the narrative, or vice versa | Derived; this is the number-one return reason |
| **V-APD-S8-002** Match-rate arithmetic | 90% federal paired with anything but 10% state; pairs that do not sum to the line total | 42 CFR 433.112(a); 433.116(a) |
| **V-APD-S8-003** DDI/M&O separation | An M&O cost claimed at 90 percent | 42 CFR 433.112(a) vs 433.116(a); 45 CFR 95.631 |
| **V-APD-S8-004** Pre-expenditure approval | An expenditure period that begins before CMS approval, for costs claimed at the enhanced rate | 42 CFR 433.112(a) — "only if the APD is approved by CMS prior to the State's expenditure of funds" |
| **V-APD-S6-001** Key personnel by name | A personnel table full of roles, "TBD", or vacancies while Appendix C attests "Yes" to CEF 19 | 42 CFR 433.112(b)(19) |
| **V-APD-S3-003** Reuse gate | No reuse alternative evaluated **and** no explanation of why reuse was not viable | 42 CFR 433.112(b)(13) |
| **V-AOA-007** Preferred-solution consistency | The preferred solution is not the top-ranked alternative, with no written justification | Derived — the single clearest tell that an AoA is a retrofit |

Plus one cross-cutting guardrail, **X-005 Human approval gate**: nothing reaches submission-ready without a named human approver on every attestation. The system never auto-submits and never attests on a state's behalf. This is a product rule, not a regulation, and it is also the answer to the "AI wrote our federal funding request" objection.

---

## The Conditions for Enhanced Funding — and the subset that matters

42 CFR 433.112(b) contains **exactly 22 conditions**, (b)(1) through (b)(22). All 22 are captured verbatim in the JSON. Five were spot-checked character-for-character against eCFR in the July 27 audit and matched.

The commercially useful detail is what happens at **reapproval**:

> "The system meets the requirements of § 433.112(b)(1), (3), (4), and (7) through (22)." — 42 CFR 433.119(a)(1)

**Conditions (b)(2), (b)(5), and (b)(6) drop out at reapproval.** The reapproval checklist is a strict subset of the initial-approval checklist. There is a second asymmetry alongside it:

| | Which 433.116 paragraphs apply |
|---|---|
| Initial approval — 42 CFR 433.114(a) | **(c) through (i)** |
| Reapproval — 42 CFR 433.119(a)(2) | **(d) through (j)** |

(c) is in for initial and out for reapproval; (j) is in for reapproval and out for initial. Both asymmetries were verified against primary sources. Most generic compliance tooling will not model this, which is exactly why it is worth modelling.

---

## The AoA — where the analysis usually falls apart

**Minimum alternatives:** current state plus at least two proposed alternatives if a legacy solution exists; at least three alternatives if there is none.

**Scoring:** a 1–5 scale, from "infeasible because it does not meet the needs" to "exceeds the needs and benchmarks." Fifteen example criteria, with the Weight column left blank for the state to set. Weighting is optional; consistency is not.

**The distinction that will cause false failures if you get it wrong:** reuse is a **mandatory scoring criterion**, not a mandatory alternative. Section 3 says criteria "must include" reuse; Section 2.2 requires describing the reuse options evaluated and explaining why none were viable if that is the case. Nothing requires that one of the enumerated alternatives *be* a transfer or reuse option. Validate for the criterion and the why-not explanation — not for a reuse alternative.

---

## The seven documented conflicts

These are recorded rather than smoothed over, because each one will eventually be raised by a State Officer or a state's counsel.

**CONFLICT-001 — HIGH — where the AoA actually goes.** SHO #25-003 says, verbatim: *"States will be expected to use the template to complete Section 5 of the new MES APD and/or Appendix A of the new MES OAPD."* But in the published templates, APD Section 5 is **Acquisitions** and OAPD Appendix A is the **Proposed Activity Schedule**. The SHO FAQ places the AoA at APD Section 3 (reference) plus Appendix B (full document), which matches the published templates exactly. The likeliest explanation is that the SHO described a draft numbering that changed before publication.
**Build against the templates and the FAQ. Surface the SHO's sentence rather than hiding it.** Note this also means the project's own standing instructions currently repeat the SHO's framing and should be corrected.

**CONFLICT-002 — LOW — Appendix C table letter.** The PRA conversion refers to "Table J" in the Appendix C instruction while labeling the CEF grid "Table K." Table J is the Section 12 Assurances table. One is an extraction artifact. Confirm against the Word original before hard-coding the field mapping.

**CONFLICT-003 — MEDIUM — cost principles citation.** The template's Section 10 cites OMB Circular A-87, which was superseded by 2 CFR Part 200. Both 42 CFR 433.112(b)(7) and 45 CFR 95.613(a) point to 2 CFR parts 200 and 300. Draft to 2 CFR 200 while reproducing the template's citation where the template requires it. Do not tell a customer the template is wrong without confirming.

**CONFLICT-004 — LOW — OAPD length.** 45 CFR 95.610(c)(3) describes the Operational APDU as *"an annual submission of no more than two pages."* Verified. CMS's current OAPD template has three sections plus four appendices. The template governs in practice; do not tell a state its OAPD must be two pages.

**CONFLICT-005 — MEDIUM — a 90 percent M&O column in the MDBT.** The retrieved V1.06 shows `CMS Share M&O (90% FFP)`. 42 CFR 433.116(a) sets operations at 75 percent. This may be a genuine template artifact, a legacy column, or an extraction error. Until the real .xlsx is opened, flag 90 percent M&O for human review rather than auto-failing it.

**CONFLICT-006 — MEDIUM — the MITA State Self-Assessment.** SMC Guidance v1.0 (April 2022) required it. SMC Guidance v2.0 (October 21, 2025) **deleted the section entirely**. SHO #25-003, its FAQ, and the current APD template never mention MITA outside CEF 11. Meanwhile the MITA Governance Board FAQ still says the SS-A is required, citing 42 CFR 433.112(b)(11) and 433.116(b), (c), (i). CMS's "What Changed" crosswalk does not mention MITA at all, so this was not documented as a deliberate removal.
**Do not build a hard SS-A gate.** Make it configurable per state and surface the conflict. The only durable, citable MITA obligation is CEF 11 — and CEF 11 names no maturity level and no required rate of advancement, so there is no numeric threshold to validate against.

**CONFLICT-007 — MEDIUM — operational reporting cadence.** Largely resolved; see the rule register companion for the full analysis. What remains open is whether the annual OAPD-supporting operational report survives alongside the monthly ORW.

---

## Open gaps

| Gap | Blocks | Fix |
|---|---|---|
| **GAP-001** MDBT V1.09 (only V1.06 recovered) | Budget Engine build | Open `mes-mdbt.xlsx`, or get V1.09 from a State Officer |
| **GAP-002** SMC Intake Form internal structure | Certification Tracker field mapping | Open `intake-form.xlsx` |
| **GAP-003** Project Status Report field list | Ongoing Obligations Engine cannot generate the monthly PSR | reginfo objectID 162300001 — identified, not extracted |
| **GAP-004** CEF / ORR evidence-mapping table | Certification Tracker evidence collection | reginfo objectID 162300101 — identified, not extracted |
| **GAP-005** 42 CFR 435.560 verbatim text | Community-engagement exemption logic | Re-pull from eCFR **on or just after July 31, 2026** |
| **GAP-006** Appendix C table letter | Field mapping | Open `mes-apd-template.docx` |
| **GAP-007** Whether Appendices A, D, E are required for a PAPD | The requiredBy matrix | Open `mes-apd-template.docx` |
| **GAP-008** **State Medicaid Manual Part 11** | **CEF 2 is un-checkable today** | Locate and index it |

**GAP-008 is the one to fix first.** Both 42 CFR 433.112(b)(2) and 433.119(a)(3) make the system requirements and performance standards in Part 11 of the State Medicaid Manual a condition of enhanced funding, "as periodically amended." We cannot currently validate against a load-bearing condition.

---

## Sources

- MES APD Template (CMS PRA copy) — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162298501
- MES OAPD Template (CMS PRA copy) — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162299001
- MES Analysis of Alternatives (CMS PRA copy) — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162299301
- MES MDBT + CHIP V1.06 (CMS PRA copy) — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162299401
- MES Procurement Checklist (CMS PRA copy) — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162299601
- Operational Report Workbook (CMS PRA copy) — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162299901
- "What Changed" crosswalk (CMS PRA copy) — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162300201
- SHO #25-003 — https://www.medicaid.gov/federal-policy-guidance/downloads/sho25003.pdf
- SHO #25-003 FAQ — https://www.medicaid.gov/federal-policy-guidance/downloads/sho25003-faq.pdf
- SMC Certification Guidance v2.0 — https://www.medicaid.gov/medicaid/data-and-systems/downloads/smc-certification-guidance.pdf
- SMDL #22-001 — https://www.medicaid.gov/federal-policy-guidance/downloads/smd22001.pdf
- 45 CFR Part 95 Subpart F — https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-95/subpart-F
- 42 CFR Part 433 Subpart C — https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-433/subpart-C
- MES Certification Repository — https://cmsgov.github.io/CMCS-DSG-DSS-Certification/

---

*Research artifact, not legal advice. We are not lawyers and not any state's authorized representative. Re-verify all regulatory claims against primary sources before customer-facing use.*
