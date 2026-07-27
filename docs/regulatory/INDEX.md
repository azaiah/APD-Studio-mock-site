# CMS / Federal Source Library — INDEX

**Artifact:** R1 (Research Agenda, Week 1)
**Verified as of:** July 27, 2026 · **Index version:** 0.2.0 (post-audit)
**Maintainer note:** Anything in this index older than 90 days from the "Verified as of" date above is STALE and must be re-verified before it is used in a customer deliverable or shipped into the product.

---

## 0. How to read this index

Every entry carries a **retrieval status**, because the distinction between "we read this" and "we saw a link to this" is the difference between a citable rule and a hallucinated one.

| Status | Meaning |
|---|---|
| `RETRIEVED` | Document body was fetched and its text can be quoted. |
| `LINK-CONFIRMED` | URL confirmed live on a CMS page (or corroborated by a second independent source), but the body was **not** parsed. Do not quote contents. |
| `NOT RETRIEVED` | Could not obtain. Reason and attempts recorded. |

### Known tooling constraint (important, and it shaped this whole artifact)

This research environment can fetch and parse **HTML and PDF**. It **cannot parse `.docx` or `.xlsx`**. Every one of the eight current CMS MES templates is natively Word or Excel. Where template contents appear below, they were recovered from one of three secondary-but-authoritative routes:

1. **reginfo.gov PRA package PDF conversions** — CMS's own Paperwork Reduction Act filing of the same template. This is how the full MES APD template outline was recovered, and it is an authoritative CMS artifact.
2. **The CMS MES Certification Repository** (`cmsgov.github.io/CMCS-DSG-DSS-Certification`) — CMS-published HTML documentation *describing* the templates.
3. **SHO #25-003 and its FAQ** — which describe template structure in prose.

**Outstanding gap:** the OAPD outline, MDBT tab/column structure, and AoA section/scoring structure were not recovered. See §7, Open Gaps. These are the top of the R1 backlog and they block full completion of R2.

---

## 1. The two rulebooks (primary regulatory canon)

| # | Document | URL | Status | Governs |
|---|---|---|---|---|
| 1.1 | **45 CFR Part 95, Subpart F** — Automatic Data Processing Equipment and Services: Conditions for Federal Financial Participation (§§ 95.601–95.641) | https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-95/subpart-F | `RETRIEVED` (§§ 95.605, 95.610, 95.611, 95.617, 95.621 in full; see §7 for sections still pending) | The **procedural** rulebook: what an APD is, the four document types, prior-approval thresholds, As-Needed APDU triggers, procurement, software ownership, ADP reviews. |
| 1.2 | **42 CFR Part 433, Subpart C** — Mechanized Claims Processing and Information Retrieval Systems (§§ 433.110–433.131) | https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-433/subpart-C | `RETRIEVED` (§§ 433.112, 433.116, 433.119, 433.120, 433.121; see §7) | The **Medicaid-specific** rulebook: 90/75/50 match rates, the 22 Conditions for Enhanced Funding, approval/reapproval, FFP reduction, DAB appeal. |
| 1.3 | 42 CFR 433.112 — FFP for design/development/installation/enhancement (the 90% rule + the 22 conditions) | https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-433/subpart-C/section-433.112 | `RETRIEVED` — last amended **October 2, 2024** | The single most-cited section in the product. Paragraph (b)(1)–(b)(22) is the CEF list; (c) is the E&E 90% rule. |
| 1.4 | 45 CFR 95.611 — Prior approval conditions | https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-95/subpart-F/subject-group-ECFRc9d5b70b8fecb26/section-95.611 | `RETRIEVED` | Every prior-approval dollar threshold and every As-Needed APDU trigger, split by regular vs. enhanced FFP. |
| 1.5 | 45 CFR 95.610 — Submission of advance planning documents | https://www.ecfr.gov/current/title-45/section-95.610 | `RETRIEVED` | The statutory content list for PAPD, IAPD, Annual APDU, As-Needed APDU, and the 2-page Operational APDU. **This is the regulatory backbone of the section schema (R2).** |
| 1.6 | 45 CFR 95.605 — Definitions | https://www.ecfr.gov/current/title-45/section-95.605 | `RETRIEVED` | Controlled vocabulary: APD, APDU, Operational APD, acquisition, ADP equipment/services, COTS, project, service agreement, software, enhanced matching rate. |
| 1.7 | 45 CFR 95.617 — Software and ownership rights | https://www.ecfr.gov/current/title-45/section-95.617 | `RETRIEVED` | State software ownership + the Department's royalty-free, nonexclusive, irrevocable license; the COTS/proprietary carve-out. |
| 1.8 | 45 CFR 95.621 — ADP reviews | https://www.ecfr.gov/current/title-45/section-95.621 | `RETRIEVED` | Pre-installation, post-installation, utilization and acquisition reviews; the **biennial ADP system security review** obligation and the ADP Security Manager designation. |
| 1.9 | 42 CFR 433.116 — FFP for operation (75%) | https://www.ecfr.gov/current/title-42/section-433.116 | `RETRIEVED` | The 75% operations rate and its conditions, including the requirement to meet 433.112(b)(1)–(22) at approval and (b)(10)–(b)(16) on an ongoing basis. |
| 1.10 | 42 CFR 433.119 — Conditions for reapproval | https://www.ecfr.gov/current/title-42/section-433.119 | `RETRIEVED` | Periodic reapproval review; the 75%→50% reduction trigger. |
| 1.11 | 42 CFR 433.120 — Procedures for reduction of FFP | https://www.ecfr.gov/current/title-42/section-433.120 | `RETRIEVED` — last substantively amended **December 4, 2015 (80 FR 75843)** | Confirms the reduction reaches **"expenditures related to the operations of non-compliant functionality or system components"** — not automatically the whole system. |
| 1.12 | 42 CFR 433.121 — Reconsideration / DAB appeal | https://www.ecfr.gov/current/title-42/section-433.121 | `RETRIEVED` | Appeal to the Departmental Appeals Board under 45 CFR Part 16; reconsideration does **not** stay the reduction. |
| 1.13 | 45 CFR Part 16 — HHS Departmental Appeals Board procedures | https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-16 | `LINK-CONFIRMED` | The appeal forum referenced by 433.121. Filing deadlines live here, not in Part 433. |

---

## 2. The 2025–2026 process reset — CMS policy guidance

| # | Document | URL | Date | Status | Governs |
|---|---|---|---|---|---|
| 2.1 | **SHO #25-003** — "Streamlining Medicaid Enterprise Systems (MES) Templates to Improve Monitoring and Oversight to Ensure Fiscal Integrity" (signed Caprice Knapp, Acting Deputy Administrator and Director) | https://www.medicaid.gov/federal-policy-guidance/downloads/sho25003.pdf | **Aug 6, 2025** | `RETRIEVED` | The single most important recent change. Introduces the unified MES template set and creates the standing monthly reporting drumbeat. |
| 2.1a | SHO #25-003 landing page | https://www.medicaid.gov/federal-policy-guidance/2025-08-06/183101 | Aug 6, 2025 | `LINK-CONFIRMED` | Canonical CMS landing page. |
| 2.1b | SHO #25-003 — HHS Guidance Portal mirror | https://www.hhs.gov/guidance/document/streamlining-medicaid-enterprise-systems-mes-templates-improve-monitoring-and-oversight | Aug 6, 2025 | `LINK-CONFIRMED` | Mirror. |
| 2.2 | **SHO #25-003 FAQ** — "State Health Official Letter #25-003: Frequently Asked Questions for States" | https://www.medicaid.gov/federal-policy-guidance/downloads/sho25003-faq.pdf | 2025 (undated on face) | `RETRIEVED` | Source of the OMB approval date, the transition window, the mandatory date, and the ORW/PSR cadence detail. |
| 2.3 | **SMDL #22-001** — "Updated Medicaid Information Technology Systems Guidance: Streamlined Modular Certification for Medicaid Enterprise Systems" (signed Daniel Tsai) | https://www.medicaid.gov/federal-policy-guidance/downloads/smd22001.pdf | **Apr 14, 2022** | `RETRIEVED` | Sunsets MECT and MEET; establishes SMC and the Conditions/Outcomes/Metrics structure. |
| 2.4 | **SMC Certification Guidance v2.0** | https://www.medicaid.gov/medicaid/data-and-systems/downloads/smc-certification-guidance.pdf | **Version 2.0, Oct 21, 2025** | `RETRIEVED` | **CURRENT.** Six-phase SMC process, the 22 CEFs, ORW cadence, EVV Table 2 quarterly schedule. |
| 2.4a | SMC Guidance v2.0 — repository copy | https://cmsgov.github.io/CMCS-DSG-DSS-Certification/SMC%20Guidance.pdf | Oct 21, 2025 | `RETRIEVED` | Second copy of the same v2.0 document; contents verified consistent. |
| 2.5 | **SMC Certification Guidance v1.0** ⚠️ SUPERSEDED BUT STILL LIVE | https://www.medicaid.gov/sites/default/files/2022-04/smc-certification-guidance.pdf | Version 1.0, April 2022 | `RETRIEVED` | ⚠️ **Hazard.** Still publicly downloadable with no superseded banner. Contains the *annual* reporting cadence and the MITA SS-A section that v2.0 deleted. A state that Googles "SMC guidance" can land here and follow superseded instructions. Store as superseded; never serve as current. |
| 2.6 | Streamlined Modular Certification landing page | https://www.medicaid.gov/medicaid/data-systems/streamlined-modular-certification | — | `RETRIEVED` | SMC program hub. |
| 2.7 | Streamlining MES Templates landing page | https://www.medicaid.gov/medicaid/data-systems/streamlining-medicaid-enterprise-systems-templates | — | `RETRIEVED` | Distribution point for all eight templates. States: "The use of these templates will be required effective July 1, 2026." |
| 2.8 | MES Certification Repository (CMS GitHub Pages) | https://cmsgov.github.io/CMCS-DSG-DSS-Certification/ | — | `RETRIEVED` | CMS's living documentation of the SMC process, per-module outcomes and metrics, ORW rules, intake form. More current than parts of medicaid.gov — **and internally contradictory on cadence (see §6).** |

### Controlling dates for the template reset (all from SHO #25-003 FAQ, `RETRIEVED`)

| Milestone | Date |
|---|---|
| OMB PRA approval | **December 23, 2025** |
| Transition window | **January 1 – June 30, 2026** |
| **Mandatory use** | **July 1, 2026** |

> "States may begin using the approved templates sooner than required (that is, prior to the mandatory effective date of July 1, 2026)." — SHO #25-003 FAQ

> "After July 1, 2026, no other templates should be used unless a state receives prior approval from CMS." — SHO #25-003 FAQ

⚠️ **Do not attribute the December 23, 2025 date to SHO #25-003 itself.** The letter states no OMB approval date; it repeatedly says actions occur "Following OMB PRA approval." The date comes from the FAQ. See §7 for an unreconciled PRA-record discrepancy.

---

## 3. The current CMS MES template set (mandatory since July 1, 2026)

All distribution URLs are prefixed `https://www.medicaid.gov/medicaid/data-and-systems/downloads/`.

| # | Template | Distribution URL | Format | Status | Governs |
|---|---|---|---|---|---|
| 3.1 | **MES APD Template** (Planning / Implementation / Update / As-Needed — all four in one document) | `mes-apd-template.docx` | DOCX | `LINK-CONFIRMED`; **outline `RETRIEVED`** via reginfo PRA PDF → https://www.reginfo.gov/public/do/DownloadDocument?objectID=162298501 | The spine. "States must submit the completed MES APD template for four APD submission types (Planning, Implementation, Update, and As-Needed)." OMB 0938-1268 (CMS-10536); burden "estimated average 60 hours per response"; retrieved copy shows **"Expires: TBD"**. |
| 3.2 | **"E&E IAPD Template / MES APD Template — What Changed"** crosswalk | https://www.reginfo.gov/public/do/DownloadDocument?objectID=162300201 | PDF | `RETRIEVED` | CMS's own old→new mapping. Documents that Section 9 (Statement of Duration) and Appendices A, D, E are new, and that disaster recovery moved out of Section 11 into CEF 18. |
| 3.3 | **MES OAPD Template** | `mes-oapd-template.docx` | DOCX | `LINK-CONFIRMED`; **contents NOT RETRIEVED** | Annual operational APD. Per FAQ, "structured around 45 CFR 95.610 requirements"; required "for every project in their annual update"; must carry the URL to the state's ORW Metrics folder. AoA standardizes its **Appendix A**. |
| 3.4 | **MES MDBT (+ CHIP)** — Medicaid Detail Budget Table | `mes-mdbt.xlsx` | XLSX | `LINK-CONFIRMED`; **contents NOT RETRIEVED** | The consolidated detailed budget table merging MMIS and E&E funding, plus CHIP. **Unified Version 1.09 (V1.09)** per FAQ. "States must include the completed MES MDBT template in all APD submissions." |
| 3.5 | **Analysis of Alternatives (AoA) Template** | `aoa-template.docx` (and a confirmed-to-exist `aoa-template.pdf`) | DOCX / PDF | `LINK-CONFIRMED`; **contents NOT RETRIEVED** | Indexed title: "Medicaid Enterprise Systems Analysis of Alternatives." Standardizes **APD Section 5 / OAPD Appendix A**. "States must include the completed AoA template in all APD submissions to evaluate solution strengths, weaknesses, risks, and benefits." |
| 3.6 | **Operational Report Workbook (ORW)** | `operational-report-workbook.xlsx` | XLSX | `LINK-CONFIRMED`; **structure `RETRIEVED`** via reginfo PRA copy → https://www.reginfo.gov/public/do/DownloadDocument?objectID=162299901 | Monthly operational metrics. Title "Welcome to the Operational Report Workbook for MES Metrics"; OMB 0938-1268 (CMS-10536); **5 hours per response**. Full tab/column structure captured — see §4. |
| 3.7 | **Project Status Report** | `project-status-report.xlsx` | XLSX | `LINK-CONFIRMED` (corroborated by templates page + Certification Repository) | Monthly project status. Required through DDI and **continuing after certification**. |
| 3.8 | **MES Procurement Document Checklist** | `mes-procurement-checklist.docx` | DOCX | `LINK-CONFIRMED`; also at https://www.reginfo.gov/public/do/DownloadDocument?objectID=162299601 (indexed title "Medicaid Enterprise Systems Procurement Checklist"); **item list NOT RETRIEVED** | "States must include a completed checklist with all procurement instruments submitted to CMS" — RFPs, RFQs, and other solicitations. |
| 3.9 | **SMC Intake Form** | `intake-form.xlsx` | XLSX | `LINK-CONFIRMED`; **tab names `RETRIEVED`** from Certification Repository | Three tabs: Conditions for Enhanced Funding; Outcomes & Metrics; Required Artifacts. Now absorbs EVV (replaces the EVV Intake Form). A pre-populated EVV template exists. |
| 3.10 | **MES Templates bundle (ZIP)** | `mes-templates.zip` | ZIP | `LINK-CONFIRMED` | All templates in one download. **Fastest route to closing the §7 gaps** once a tool can open Office formats. |

---

## 4. Operational Report Workbook — structure captured

Source: reginfo.gov PRA copy (`RETRIEVED`), corroborated by the MES Certification Repository. This is directly implementable as validation rules in the Ongoing Obligations Engine.

**Tab 1 — Metric Definitions.** Populated "Upon APD approval, at ORR, at CR, and at regular intervals of operational reporting (monthly, quarterly, annually)."
Columns: Metric ID · Related System (Recommended) · Metric Name · Outcome Reference # · Metric Description · Numerator Description · Denominator Description · Value Type · Metric Reporting Frequency · OAPD Metric Status · Note.

**Tab 2 — Metric Values.**
Columns: Reporting Month · State · Metric ID · Measure Count · Measure Count Description (Optional) · Metric Value · Numerator · Denominator · Internal State Benchmark (Optional) · Comment.

*(The Certification Repository names three tabs — General Instructions, Metric Definitions, Metric Values — while the SHO FAQ refers to a "Metric Data" tab. Minor naming inconsistency across CMS sources; possibly a version difference. Do not hard-code tab names without opening the file.)*

**Controlled vocabularies and ID grammar — implementable as validators:**

- Metric ID format: `[StateAbbreviation]-CR-[ModuleAbbreviation]-[OutcomeNumber].[ConsecutiveNumber]` for CMS-required outcomes; `-ST-` replaces `-CR-` for state-specific outcomes.
- **"Do not reuse Metric IDs."**
- `OAPD Metric Status` ∈ {Active, Ended}. Ending a metric "require[s] CMS State Officer approval."
- `Value Type` ∈ {Percentage/Ratio, Numerical, List}. Numerator/Denominator required only for Percentage/Ratio.
- `Metric Reporting Frequency` ∈ {Monthly, Quarterly, Annually}. Reporting Month is MM/DD/YYYY; for quarterly metrics use the **first month of the quarter**.
- File naming: `Operational_Report_[StateAbbreviation]_[ModuleAbbreviation]_[YYYY-MM-DD].xlsx`, max 255 characters. Example from CMS: `Operational_Report_VA_CP_2022-01-22.xlsx`.
- **"Do not add, delete, or modify columns."** All months of one reporting period go in a single workbook.
- "When metrics change calculations, create new Metric ID and mark old as 'Ended'."
- Upload destination: the state's metrics folder on CMS Box, "State Submission" subfolder.
- Evidence-history thresholds (FAQ): **six months** of ORW data to prepare for a certification review; **twelve months** for an APD submission "unless the APD is submitted less than 12 months after certification."

**Per-module outcomes and metrics pages** (`LINK-CONFIRMED`, contents largely not fetched) at `https://cmsgov.github.io/CMCS-DSG-DSS-Certification/Outcomes and Metrics/<module>` for: Claims Processing (CP), DSS/DW, EVV, E&E, EPS, Financial Management, HIE, LTSS, Member Management, PBM, PDMP, Program Integrity, Provider Management, TPL.

---

## 5. The 2027 forcing function — community engagement

| # | Document | URL | Date | Status | Governs |
|---|---|---|---|---|---|
| 5.1 | **CMS-2454-IFC** — "Medicaid Program; Community Engagement Requirement for Certain Individuals," interim final rule with comment period. **91 FR 33348** (spans 33348–33482), FR doc **2026-11094**, RIN **0938-AV98** | https://www.federalregister.gov/documents/2026/06/03/2026-11094/medicaid-program-community-engagement-requirement-for-certain-individuals | Published **June 3, 2026**; effective **July 31, 2026**; comments close **July 31, 2026** | `RETRIEVED` (metadata, SUMMARY, DATES, statutory recitation). **§ 435.560 verbatim text NOT RETRIEVED** | Implements SSA § 1902(xx) / P.L. 119-21 § 71119. Drives mandatory E&E system modification in every state. |
| 5.1a | CMS-2454-IFC — govinfo authoritative PDF | https://www.govinfo.gov/content/pkg/FR-2026-06-03/pdf/2026-11094.pdf | June 3, 2026 | `RETRIEVED` (truncates before the amendatory text) | Authoritative PDF. |
| 5.1b | CMS-2454-IFC — govinfo HTML | https://www.govinfo.gov/content/pkg/FR-2026-06-03/html/2026-11094.htm | June 3, 2026 | `RETRIEVED` (truncates) | — |
| 5.1c | CMS-2454-IFC — public inspection PDF | https://public-inspection.federalregister.gov/2026-11094.pdf | — | `RETRIEVED` (truncates; **confirms § 435.560 appears in the document's table of contents**) | — |
| 5.2 | CMS Fact Sheet — CMS-2454-IFC | https://www.cms.gov/newsroom/fact-sheets/medicaid-community-engagement-requirement-certain-individuals-interim-final-rule-comment-period-cms | Posted 06/01/2026 | `RETRIEVED` | Plain-language CMS summary. |
| 5.3 | **CMCS Informational Bulletin, Nov 18, 2025** — "'Working Families Tax Cut' Legislation, Public Law 119-21: Summary of Medicaid and CHIP Related Provisions" | https://www.medicaid.gov/federal-policy-guidance/downloads/cib11182025.pdf | **Nov 18, 2025** | `RETRIEVED` (verified against HHS mirror) | Government Efficiency Grants structure; good faith effort exemption outer limit; the Jan 1, 2027 deadline. |
| 5.4 | **CMCS Informational Bulletin, Dec 8, 2025** — enhanced FFP for community-engagement systems work | https://www.medicaid.gov/federal-policy-guidance/downloads/cib12082025.pdf | **Dec 8, 2025** | `RETRIEVED` | **The money document.** Establishes that community-engagement system costs *may* qualify for 90/10 DDI and 75/25 operations enhanced match via an APD. |
| 5.5 | Medicaid.gov — Community Engagement hub | https://www.medicaid.gov/resources-for-states/working-families-tax-cut-legislation/community-engagement | — | `RETRIEVED` | Watch page. **Carries no good-faith-exemption request template and no APD guidance beyond 5.4.** |
| 5.6 | Community Engagement Overview slide deck | https://www.medicaid.gov/medicaid/downloads/community-engagement-overview-slide.pdf | Posted 12/08/2025 | `LINK-CONFIRMED` | — |
| 5.7 | Fact Sheet: Expanding State Access to Technology and IT Systems Vendors to Support Medicaid Community Engagement | https://www.medicaid.gov/resources-for-states/working-families-tax-cut-legislation/community-engagement/exp-st-acc-tech-it-sys-ven-sup-med-comm-eng-fact-sheet.pdf | Posted 02/25/2026 | `LINK-CONFIRMED` | **Competitively significant** — CMS actively brokering vendor access to states. |
| 5.8 | Pledges from Medicaid Technology Companies | https://www.medicaid.gov/resources-for-states/working-families-tax-cut-legislation/community-engagement/pledges-from-medicaid-tech-companies | Updated 02/12/2026 | `LINK-CONFIRMED` | Ditto — feeds R7 competitive scan. |
| 5.9 | Press Release: Medicaid Technology Companies Pledge $600M in Savings | https://www.cms.gov/newsroom/press-releases/medicaid-technology-companies-pledge-600m-savings-support-community-engagement-related-state | Posted 01/29/2026 | `LINK-CONFIRMED` | Ditto. |
| 5.10 | **Complaint — *Commonwealth of Massachusetts, et al. v. Mehmet Oz, M.D., et al.*, No. 1:26-cv-12962 (D. Mass.)** | https://ag.ny.gov/sites/default/files/court-filings/massachusetts-et-al-v-mehmet-oz-m.d-et-al-complaint-2026_0.pdf | Filed **June 29, 2026** | `RETRIEVED` | The challenge to CMS-2454-IFC. **No ruling, injunction, TRO, or stay as of July 27, 2026.** |
| 5.11 | Georgetown Health Care Litigation Tracker | https://litigationtracker.law.georgetown.edu/litigation/ | — | `RETRIEVED` | Status "Briefing is ongoing." Weekly re-check target. |

**Key verbatim quotes** (see `05_COMMUNITY_ENGAGEMENT_PACKAGE.md` for the full set):

> "Certain state Medicaid agency IT system costs necessary to support the community engagement requirements **may be eligible** for enhanced federal financial participation (FFP)." — CIB 12/08/2025

> "A state **may submit** an APD requesting approval for 90/10 enhanced match for the design, development, and installation of their Medicaid Enterprise Systems (MES) initiatives contributing to the economic and efficient operation of the program." — CIB 12/08/2025

> "$100 million to be distributed equally across states. $100 million in an amount for each state reflecting the ratio of individuals subject to the community engagement requirement to the total number of such individuals residing in all states as of March 31, 2025." — CIB 11/18/2025

> "Any such exemptions will expire no later than December 31, 2028." — CIB 11/18/2025

⚠️ **Never paraphrase the conditional verbs into an entitlement.** "May be eligible" and "may submit" are the operative words, and CIB 12/08/2025 sets **no APD filing deadline**.

---

## 6. MITA

| # | Document | URL | Version/Date | Status |
|---|---|---|---|---|
| 6.1 | MITA landing page | https://www.medicaid.gov/medicaid/data-systems/medicaid-information-technology-architecture | undated | `RETRIEVED` |
| 6.2 | MITA Framework page (hosts the 3.0 downloads) | https://www.medicaid.gov/medicaid/data-systems/medicaid-information-technology-architecture/medicaid-information-technology-architecture-framework | undated | `RETRIEVED` |
| 6.3 | MITA 3.0 Front Matter / Part I (Business Architecture) / Part II (Information Architecture) / Part III (Technical Architecture) / State Self-Assessment / BPT Vault / BCM Vault | `https://www.medicaid.gov/medicaid-chip-program-information/by-topics/data-and-systems/downloads/{front-matter,part-i,part-ii,part-iii,ss-a,bpt_vault_v30,bcm_vault_v30}.zip` | v3.0 | `LINK-CONFIRMED`; ZIP contents `NOT RETRIEVED` |
| 6.4 | MITA 3.0 Part 1 Appendix D — Business Capability Matrix | https://www.hhs.gov/guidance/sites/default/files/hhs-guidance-documents/CMS/part-i-appendix-d-business-capability-matrix-details-3-0-final-v1-0.pdf | **v3.0, May 2014** | `RETRIEVED` — source of the verbatim 5-level maturity model |
| 6.5 | CMCS Informational Bulletin, July 5, 2013 — MITA draft E&E Supplement v3.0 | https://www.medicaid.gov/federal-policy-guidance/downloads/cib-07-05-2013-mita.pdf | Jul 5, 2013 | `RETRIEVED` |
| 6.6 | CMCS Informational Bulletin, Aug 5, 2014 — MITA E&E Supplement v3.0 | https://www.medicaid.gov/federal-policy-guidance/downloads/CIB-08-05-2014.pdf | Aug 5, 2014 | `RETRIEVED` — the "guidance issued by CMS in 2014" that SMC v1.0 cited as SS-A authority |
| 6.7 | CMS MITA Repository (GitHub Pages) — MGB, MITA 4.0 initiative, workgroups, FAQs | https://cmsgov.github.io/Medicaid-Information-Technology-Architecture-MITA/ | current | `RETRIEVED` |
| 6.8 | MESC 2025 Presentation — "MITA Governance Meeting: General Updates" | https://cmsgov.github.io/Medicaid-Information-Technology-Architecture-MITA/presentations/MESC%202025%20Presentation_August_2025.pdf | **Aug 13, 2025** | `RETRIEVED` — the only dated MITA 4.0 plan of record |
| 6.9 | MITA (cms.gov) — **deprecated** | https://www.cms.gov/data-research/computer-data-systems/mita | Last modified 09/10/2024 | `RETRIEVED` — says pages "are currently being migrated to the Medicaid.gov website"; links only to 2011 Wayback archives |

**MITA maturity model — verbatim, 5 levels** (source 6.4). Levels 1–5 run compliance → cost management → intrastate collaboration/national standards → clinical data and interstate exchange → optimization and national/international interoperability. Important nuance from the MITA Business Process Model White Paper: *"Business processes can have from one to five Maturity Levels of business capabilities… Not every business process will have five levels of capability."* **Do not build product logic assuming five levels everywhere.**

**42 CFR 433.112(b)(11) names no specific maturity level and no required rate of advancement.** The obligation is "Align to, and advance increasingly, in MITA maturity for business, architecture, and data." There is no numeric threshold to validate against.

---

## 7. Open gaps, contradictions, and the R1 backlog

These are recorded rather than papered over, per project ground rules.

### 7.0 UPDATE — most of the template gap was closed after this index was first drafted

A second retrieval pass discovered that CMS's Paperwork Reduction Act package on reginfo.gov contains PDF conversions of the remaining templates, with **object IDs incrementing by 100 across the range 1622985xx–1623002xx**. Probing that grid recovered everything except the two items still listed below.

| Template | reginfo objectID | Status now |
|---|---|---|
| MES APD Template | 162298501 | `RETRIEVED` |
| **MES OAPD Template** | **162299001** | **`RETRIEVED` — full section outline** |
| **Analysis of Alternatives** | **162299301** | **`RETRIEVED` — full outline + 15 criteria + 1–5 scoring scale + evaluation matrix** |
| **MES MDBT + CHIP V1.06 [5/1/2025]** | **162299401** | **`RETRIEVED` — tabs and column structure (V1.06 only; current is V1.09)** |
| **MES Procurement Checklist** | **162299601** | **`RETRIEVED` — all 28 checklist items** |
| Operational Report Workbook | 162299901 | `RETRIEVED` |
| **MES Project Status Report** | **162300001** | **Identified, not yet extracted** |
| **CEF / State ORR Evidence table** | **162300101** | **Identified, not yet extracted — high value for the SMC Certification Tracker** |
| "What Changed" crosswalk | 162300201 | `RETRIEVED` |

Object IDs 162298601, 162298801, 162299101, 162299501 and 162299801 return unparsable binary (native Office files with no PDF conversion).

**Note on `medicaid.gov/.../aoa-template.pdf`:** the URL is real and search-indexed, but three WebFetch attempts returned HTTP success with a zero-length body — server-side content negotiation or bot filtering, not a dead link. The reginfo copy renders fully, so this is moot unless the medicaid.gov original is ever needed.

### 7.0a NEW CONFLICT — where the AoA actually goes (HIGH severity)

Discovered when the AoA and OAPD templates were recovered. **SHO #25-003 says, verbatim:**

> "States will be expected to use the template to complete Section 5 of the new MES APD and/or Appendix A of the new MES OAPD."

But in the **published** templates, MES APD **Section 5 is "Acquisitions"** and MES OAPD **Appendix A is "Proposed Activity Schedule for the Project."** No AoA reference appears anywhere in OAPD Appendices A through D. The SHO #25-003 **FAQ** places the AoA elsewhere, and matches the published templates exactly:

> "During the PAPD, only a commitment to perform the AoA is required via Section 3. The AoA should be completed and included as part of the initial IAPD (typically referenced within Section 3 and included via Appendix B)."

Most likely the SHO described a draft template numbering that changed before publication. **Build against the published templates and the FAQ: AoA = APD Section 3 (reference) + Appendix B (full document).** Surface the SHO's conflicting sentence rather than hiding it, and confirm with a CMS MES State Officer.

**This also means the project's standing instructions need correcting** — they currently repeat the SHO's "Section 5 of the APD / Appendix A of the OAPD" framing. Tracked as CONFLICT-001 in `specs/apd-section-schema.json`.

### 7.1 Documents not retrieved (blocks full R2 completion)

| Item | Why it matters | Attempts | Fix |
|---|---|---|---|
| ~~MES OAPD template section outline~~ | — | — | **CLOSED — recovered at reginfo objectID 162299001** |
| ~~AoA template sections + scoring structure~~ | — | — | **CLOSED — recovered at reginfo objectID 162299301** |
| ~~Procurement Document Checklist item list~~ | — | — | **CLOSED — all 28 items recovered at reginfo objectID 162299601** |
| **MDBT Unified Version 1.09** | The Budget Engine is specified against this. Only **V1.06 [5/1/2025]** was recoverable; the SHO FAQ says the current version is V1.09 | `.xlsx` unparseable; no public V1.09 conversion found | Open `mes-mdbt.xlsx`, or request V1.09 from a CMS State Officer. **Version risk is real — do not build the Budget Engine against V1.06 without flagging it** |
| **State Medicaid Manual, Part 11** | 42 CFR 433.112(b)(2) AND 433.119(a)(3) both make Part 11 system requirements a condition of enhanced funding. **CEF 2 is un-checkable today** | Not attempted in this pass | Locate and index it. **Highest-priority remaining gap** |
| **Project Status Report field list** | Ongoing Obligations Engine cannot generate the monthly PSR | reginfo objectID 162300001 identified but not extracted | Extract it |
| **CEF / State ORR evidence-mapping table** | SMC Certification Tracker evidence collection | reginfo objectID 162300101 identified but not extracted | Extract it |
| **SMC Intake Form internal structure** | Certification Tracker field mapping. Known: three tabs — Conditions for Enhanced Funding; Outcomes & Metrics; Required Artifacts | `.xlsx` unparseable | Open `intake-form.xlsx` |
| **42 CFR § 435.560 verbatim text** (good faith effort exemption) | Named open question in the project instructions | 10 documented attempts across federalregister.gov (HTML/text/XML), govinfo (HTML/PDF/page-level), public inspection, eCFR, Cornell LII, regulations.gov. Every full-text route truncates before the amendatory text at the end of a 134-page document. eCFR and Cornell both return **404 — not codified yet** | **Re-check eCFR on or just after July 31, 2026**, when the rule takes effect. Clean authoritative route; should resolve within days |
| Remaining 45 CFR 95 sections (95.612, 95.615, 95.626, 95.631, 95.641) and 42 CFR 433 sections (433.110, 433.111, 433.114, 433.117, 433.122, 433.123, 433.128, 433.131) | Completeness of the rule register | eCFR began returning HTTP 429 / read timeouts under parallel load | Retry sequentially with backoff |
| Verbatim statutory text of P.L. 119-21 § 71119 / SSA § 1902(xx) | Cleanest primary cite for the Jan 1, 2027 deadline | congress.gov robots-blocked; govinfo `PLAW-119publ21` too large | Use the IFC's own recitation (quotable as 91 FR 33348) as the interim cite; or pull the SSA compilation of § 1902 |

### 7.2 The PRA record does not corroborate the December 23, 2025 OMB approval

Fetched twice: https://www.reginfo.gov/public/do/PRAOMBHistory?ombControlNumber=0938-1268 returns exactly four entries, most recent **202409-0938-001**, "Reinstatement without change," received 09/04/2024, concluded 10/23/2024. **No 2025 entry and no pending submission.** Yet the FAQ states OMB approval on December 23, 2025, the templates carry 0938-1268, and the retrieved APD template shows **"Expires: TBD"** — the signature of a package still in review when that copy was produced. CMS's own PRA listing also still titles the collection under the legacy name "Medicaid Eligibility and Enrollment (EE) Implementation Advanced Planning Document (IAPD) Template."

**ACTION: do not assert the OMB control number / approval-date linkage to a state customer until reconciled.** Possible explanations: stale reginfo page; a ref number not rendered; approval under a different control number with un-updated footers.

### 7.3 The reporting-cadence question — mostly resolved, one real gap remaining

The project instructions carried this as an open question. It is now **two separate questions**, and only one is still open.

**Conflict A — RESOLVED by CMS's own vocabulary.** SHO #25-003 defines the terms explicitly:

> "the **cadence** of reporting addresses the timing of report submission to CMS, which will remain **quarterly for EVV modules**, while the **frequency** refers to the capture of the metric data within the Operational Report Workbook, which will remain **monthly**." — SHO #25-003

Corroborated by the FAQ ("states should capture data monthly but report it quarterly"), by SMC Guidance v2.0 ("For all modules, the state must provide a monthly breakdown of metric data within its ORW"; EVV on a "minimum quarterly reporting schedule… as outlined in Table 2"), and by Repository FAQ Q38. **Net rule: non-EVV → capture monthly, submit monthly. EVV → capture monthly, submit quarterly on the Table 2 calendar, with monthly submission optional.**

**EVV Table 2 schedule (SMC Guidance v2.0):** Oct–Dec → due end of March · Jan–Mar → end of June · Apr–Jun → end of September · Jul–Sep → end of December.

**Conflict B — STILL OPEN, and it is a live self-contradiction inside CMS's own repository.**

| Source | Verbatim | Cadence |
|---|---|---|
| Repository, Ongoing Reporting **index** | "SMC-related metrics should be submitted in operational reports on an **annual** basis." | Annual |
| Repository, Ongoing Reporting index | "States must submit operational reports to CMS containing metrics **annually** in support of a state's Operational Advance Planning Documents (OAPD) request." | Annual |
| Repository, Ongoing Reporting **Overview** | "States must submit **monthly** operational reports with metrics, unless otherwise agreed by CMS" | Monthly |
| Repository, Ongoing Reporting Overview | "EVV metrics should be captured monthly and submitted **quarterly**." | Quarterly |
| Repository, Ongoing Reporting Overview | states must submit metrics "**annually** with their OAPD requests." | Annual |

The Overview page carries **all three cadences at once**; the index page carries only pre-SHO annual language and appears never to have been updated after SHO #25-003.

**The genuine unresolved question: is the annual OAPD-supporting operational report a separate surviving obligation, or was it replaced by the monthly ORW?** SHO #25-003 does not say it eliminated the annual OAPD-linked submission. **Confirm with a CMS MES State Officer before the Ongoing Obligations Engine hard-codes cadence.** Never assert a flat "everything is monthly."

**Cadence chronology for the Knowledge Core (version-pin all of these):**

| Date | Source | Cadence stated |
|---|---|---|
| Apr 14, 2022 | SMDL #22-001 | Annual ("in support of the OAPD request") |
| Apr 2022 | SMC Guidance v1.0 | Annual |
| Aug 6, 2025 | SHO #25-003 | Monthly ORW; monthly PSR; quarterly EVV submission |
| Oct 21, 2025 | SMC Guidance v2.0 | Monthly ORW; quarterly EVV (Table 2) |
| Dec 23, 2025 (OMB) | SHO FAQ | Monthly |
| undated | Repository Overview | Monthly + quarterly EVV + annual OAPD, simultaneously |
| undated | Repository index | Annual only |

### 7.4 The MITA SS-A obligation was removed from current guidance — but not repealed

| Document | Version/Date | Contains the SS-A requirement? |
|---|---|---|
| SMC Certification Guidance **v1.0** | April 2022 | **YES** — full section "MITA STATE SELF-ASSESSMENTS" |
| SMC Certification Guidance **v2.0** | Oct 21, 2025 | **NO** — section deleted entirely |
| SHO #25-003 | Aug 6, 2025 | **NO** — the word "MITA" never appears |
| SHO #25-003 FAQ | 2025 | **NO** |
| MES APD Template (current) | mandatory 7/1/2026 | **NO** MITA/SS-A section in the body; only CEF #11 in Appendix C |

Meanwhile the **MITA Governance Board's own FAQ still says the SS-A is required**, citing 42 CFR §433.112(b)(11) and §433.116(b),(c),(i):

> "Yes, under current regulations at 42 C.F.R. §433.112(b)(11) and §433.116(b), (c), and (i)… states are required to submit a MITA SS-A in support of their request for enhanced federal matching for their Medicaid Enterprise System (MES) expenditures." — MGB FAQ #9

And the "What Changed" crosswalk **does not mention MITA or SS-A at all**, so CMS did not document this as a deliberate removal.

**Product consequence:** do **not** build a hard "SS-A attached?" gate on the APD. Make it a configurable, state-specific check with the conflict surfaced to the user. **The only durable, citable MITA obligation is CEF #11**, attested in MES APD Appendix C and SMC Guidance v2.0 Appendix A.

**Also flagged: there is no CMS primary source for an *annual* SS-A cadence.** CIB 07/05/2013 states a one-time trigger — SS-A due "within twelve months of release of the MITA 3.0 Framework" (with 90% FFP for completing it) — and CIB 08/05/2014 says CMS "is encouraging states to complete their MITA 3.0 SS-A" and "Upon receipt of state submission, CMS will consider this requirement met." The widely repeated "annually" figure traces to **state/vendor** documents (e.g. Florida AHCA's SEAS-vendor procedure, v201, Dec 16, 2020), not to CMS. Label as **ASSUMPTION**; confirm with a State Officer or via §433.116 reapproval cadence language.

### 7.5 MITA 4.0 — no confirmed release date

No published draft, no public comment docket, no Federal Register notice. The only dated plan of record is the MESC 2025 presentation (Aug 13, 2025): Q3 2025 drafting → Q4 2025–Q1 2026 pilot with "2-3 SMAs" → Q2 2026 "Introduce MITA 4.0 framework, technical assistance resources, and prototype SS-A Tool at MESC 2026." That is an intent slide ~11 months old, and a conference introduction is not a published framework. **Whether the MESC 2026 introduction actually occurred is NOT RETRIEVED**; repository newsletters stop at October 2024. Note MITA 4.0 stated goal #4 — "Further integration with Advance Planning Document, certification and other enterprise-wide activities" — means the eventual release *will* touch the APD. Participation channel: MITAGovBoard@cms.hhs.gov (states open to piloting are invited). Also note **MITA 3.1 exists but was never released**; its Member Management guidance is deferred to the next version, so MITA 3.0's Member Management gap remains open.

### 7.6 Litigation — plaintiff count varies by source

The complaint caption lists 26 jurisdictions; the Massachusetts AG press release describes 26 states + DC + two governors; Georgetown CCF says "25 states plus the District of Columbia"; Law360's headline says 26. **Safe customer-facing formulation: "a coalition of 25–26 states and the District of Columbia, with Kentucky and Pennsylvania joining through their governors."** Also: the complaint cites "Pub. L. 119-121" — almost certainly a typo for **Pub. L. 119-21**. Do not propagate.

**Status as of July 27, 2026: complaint filed June 29, 2026; a preliminary injunction motion is pending with no hearing date set; no ruling, injunction, TRO, or stay.** Plaintiff states have requested a six-month delay in the January 1, 2027 deadline. **The January 1, 2027 deadline stands and the rule takes effect July 31, 2026 — four days from this index's verification date. Re-check docket 1:26-cv-12962 before any customer conversation.**

### 7.7 Secondary-source fragments deliberately NOT admitted to the Knowledge Core

Georgetown CCF and the NORD Rare Action Network both publish renderings of § 435.560 and of the new §§ 435.55x–435.56x section titles. **These were not admitted**, because they are secondary characterizations of regulatory text that could not be verified against the rule. CCF and NORD also **disagree with each other** on the section range (CCF: §§ 435.551–435.561; NORD: §§ 435.550–435.563). Resolve from eCFR after July 31, 2026. Do not quote either as regulatory text.

---

### 7.8 Authoritative section inventories (verified July 27, 2026)

Both subparts have **non-contiguous numbering**. Knowing exactly which sections exist prevents citing one that does not.

**45 CFR Part 95, Subpart F — 19 sections**

95.601 Scope and applicability · 95.605 Definitions · 95.610 Submission of advance planning documents · 95.611 Prior approval conditions · 95.612 Disallowance of Federal Financial Participation (FFP) · 95.613 Procurement standards · 95.615 Access to systems and records · 95.617 Software and ownership rights · 95.619 Use of ADP systems · 95.621 ADP reviews · 95.623 Reconsideration of denied FFP for failure to obtain prior approval · **95.624 Consideration for FFP in emergency situations** · 95.625 Increased FFP for certain ADP systems · **95.626 Independent Verification and Validation** · 95.627 Waivers · 95.631 Cost identification for purpose of FFP claims · 95.633 Nondiscrimination requirements · 95.635 Disallowance of Federal financial participation for automated systems that fail to comply substantially with requirements · 95.641 Applicability of rules for charging equipment in subpart G

⚠️ **Correction:** the Research Agenda lists § 95.626 among the rule-register sources for emergency acquisitions. **§ 95.626 is Independent Verification and Validation.** Emergency acquisitions are **§ 95.624**.

**42 CFR Part 433, Subpart C — 13 sections**

433.110 **Basis, purpose, and applicability** · 433.111 Definitions · 433.112 FFP for design, development, installation or enhancement · 433.114 Procedures for obtaining initial approval; notice of decision · 433.116 FFP for operation · 433.117 Initial approval of replacement systems · 433.119 Conditions for reapproval; notice of decision · 433.120 Procedures for reduction of FFP after reapproval review · 433.121 Reconsideration of the decision to reduce FFP after reapproval review · 433.122 Reapproval of a disapproved system · 433.123 Notification of changes in system requirements, performance standards or other conditions · 433.127 Termination of FFP for failure to provide access · 433.131 Waiver for noncompliance with conditions of approval and reapproval

**Confirmed not to exist:** 433.113, 433.115, 433.118, 433.124, 433.125, 433.126, 433.128, 433.129, 433.130.

### 7.9 Adversarial citation audit — July 27, 2026

An independent verification pass re-checked the highest-stakes claims against primary sources on eCFR, Cornell LII, and ssa.gov. **Five errors found, five corrected.** Full record in `specs/rule-register.md`.

Two findings worth surfacing here because they change what this index says:

**The Annual APDU deadline is real and verbatim** — at **45 CFR 95.610(c)(1)**: *"The Annual APDU, which is due 60 days prior to the expiration of the FFP approval, includes:"*. Confirmed on two independent hosts. It is **not** in 45 CFR 95.611(c)(2)(i), whose entire text is "For an Annual APDU."

**42 CFR 433.114 contains no day-count deadlines.** The section was materially shortened by the April 19, 2011 amendment (76 FR 21974). Any note carrying a 60-day CMS determination clock at 433.114 is quoting pre-2011 text. The 60-day clock that *does* exist is at **45 CFR 95.611(d)**, and it runs from the date of the Departmental letter acknowledging receipt, with the consequence that the request is "provisionally" deemed to have met the prior-approval conditions.

Verified clean: all 22 Conditions for Enhanced Funding · the 433.119(a)(1) reapproval subset · the 433.116 (c)–(i) vs (d)–(j) asymmetry · every § 95.611 dollar threshold · all six enhanced and five regular As-Needed APDU triggers · both section inventories above · 42 CFR 433.117 and 433.131.

## 8. Standing re-verification triggers

| Trigger | Date / cadence | Why |
|---|---|---|
| Re-pull § 435.560 and the full new §§ 435.55x–435.56x list from eCFR | **On or just after July 31, 2026** | Rule effective; codified text becomes authoritative and retrievable |
| Re-check docket 1:26-cv-12962 (D. Mass.) | Weekly, and **before every customer conversation** | A PI would change the near-term pipeline |
| Watch for the final rule following CMS-2454-IFC | Comments closed July 31, 2026 | — |
| Re-verify §§ 95.611 and 433.112 | Before any customer-facing use | Project ground rule |
| Watch medicaid.gov Community Engagement hub for a good-faith-exemption request template | Weekly through Jan 1, 2027 | It does not exist yet; that hub is where it will appear |
| Watch for MITA 4.0 / MESC 2026 artifacts | Monthly | Stated goal #4 will touch the APD |
| Re-check the reginfo.gov PRA record for 0938-1268 | Monthly until reconciled | §7.2 |
| Re-check whether CMS updates the Certification Repository "Ongoing Reporting" index page | Monthly | §7.3 Conflict B |
| Whole-index staleness review | Every 90 days | Project ground rule |

---

## 9. Source list

**Regulations (eCFR)**
- 45 CFR Part 95 Subpart F — https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-95/subpart-F
- 42 CFR Part 433 Subpart C — https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-433/subpart-C
- 42 CFR 433.112 — https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-433/subpart-C/section-433.112

**CMS policy guidance**
- SHO #25-003 — https://www.medicaid.gov/federal-policy-guidance/downloads/sho25003.pdf
- SHO #25-003 FAQ — https://www.medicaid.gov/federal-policy-guidance/downloads/sho25003-faq.pdf
- SMDL #22-001 — https://www.medicaid.gov/federal-policy-guidance/downloads/smd22001.pdf
- SMC Guidance v2.0 — https://www.medicaid.gov/medicaid/data-and-systems/downloads/smc-certification-guidance.pdf
- SMC Guidance v1.0 (superseded) — https://www.medicaid.gov/sites/default/files/2022-04/smc-certification-guidance.pdf
- CMCS CIB 11/18/2025 — https://www.medicaid.gov/federal-policy-guidance/downloads/cib11182025.pdf
- CMCS CIB 12/08/2025 — https://www.medicaid.gov/federal-policy-guidance/downloads/cib12082025.pdf
- CMCS CIB 07/05/2013 (MITA) — https://www.medicaid.gov/federal-policy-guidance/downloads/cib-07-05-2013-mita.pdf
- CMCS CIB 08/05/2014 (MITA E&E Supplement) — https://www.medicaid.gov/federal-policy-guidance/downloads/CIB-08-05-2014.pdf

**CMS landing pages and repositories**
- Streamlining MES Templates — https://www.medicaid.gov/medicaid/data-systems/streamlining-medicaid-enterprise-systems-templates
- Streamlined Modular Certification — https://www.medicaid.gov/medicaid/data-systems/streamlined-modular-certification
- MES Certification Repository — https://cmsgov.github.io/CMCS-DSG-DSS-Certification/
- MITA Repository — https://cmsgov.github.io/Medicaid-Information-Technology-Architecture-MITA/
- MITA Framework — https://www.medicaid.gov/medicaid/data-systems/medicaid-information-technology-architecture/medicaid-information-technology-architecture-framework
- Community Engagement hub — https://www.medicaid.gov/resources-for-states/working-families-tax-cut-legislation/community-engagement

**Template PRA copies (reginfo.gov)**
- MES APD Template — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162298501
- "What Changed" crosswalk — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162300201
- Operational Report Workbook — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162299901
- MES Procurement Checklist — https://www.reginfo.gov/public/do/DownloadDocument?objectID=162299601
- PRA history, OMB 0938-1268 — https://www.reginfo.gov/public/do/PRAOMBHistory?ombControlNumber=0938-1268

**Federal Register / statute**
- CMS-2454-IFC (91 FR 33348) — https://www.federalregister.gov/documents/2026/06/03/2026-11094/medicaid-program-community-engagement-requirement-for-certain-individuals
- govinfo PDF — https://www.govinfo.gov/content/pkg/FR-2026-06-03/pdf/2026-11094.pdf
- CMS Fact Sheet — https://www.cms.gov/newsroom/fact-sheets/medicaid-community-engagement-requirement-certain-individuals-interim-final-rule-comment-period-cms

**Litigation**
- Complaint, *Massachusetts v. Oz*, No. 1:26-cv-12962 (D. Mass.) — https://ag.ny.gov/sites/default/files/court-filings/massachusetts-et-al-v-mehmet-oz-m.d-et-al-complaint-2026_0.pdf
- Mass. AG press release — https://www.mass.gov/news/ag-campbell-sues-trump-administration-over-unlawful-medicaid-work-requirements-rule
- Georgetown Health Care Litigation Tracker — https://litigationtracker.law.georgetown.edu/litigation/

**MITA**
- MITA 3.0 Part 1 Appendix D (Business Capability Matrix, v3.0, May 2014) — https://www.hhs.gov/guidance/sites/default/files/hhs-guidance-documents/CMS/part-i-appendix-d-business-capability-matrix-details-3-0-final-v1-0.pdf
- MITA Business Process Model White Paper — https://www.cms.gov/Research-Statistics-Data-and-Systems/Computer-Data-and-Systems/MedicaidInfoTechArch/downloads/mitabpm.pdf
- MESC 2025 MGB Presentation (Aug 13, 2025) — https://cmsgov.github.io/Medicaid-Information-Technology-Architecture-MITA/presentations/MESC%202025%20Presentation_August_2025.pdf

---

*This index is a research artifact, not legal advice. We are not lawyers and not any state's authorized representative. Re-verify all regulatory claims against primary sources before customer-facing use.*
