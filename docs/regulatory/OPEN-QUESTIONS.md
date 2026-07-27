# Open questions

Eight unresolved items. Each one affects product logic, not just marketing copy.
**Do not implement around an open question by inventing an answer.** If you need
a decision to proceed, escalate — a placeholder that looks like a rule will
outlive your memory of having invented it.

Ranked by leverage.

| # | Question | Why it matters | How to close |
|---|---|---|---|
| **OQ-010** | Is an APD Studio license itself APD-fundable as an administrative or systems cost? | Highest-leverage unknown in the business model. If yes, the tool is bought with the federal match it helps win. Best hook found so far: 42 CFR 433.112(c)(2) makes initial COTS licensing and integration 90%-eligible **when the nature and extent of the costs are expressly described in the approved APD** — unanalyzed for this use case | Research Agenda R8. **Do not assume.** |
| **OQ-009** | State Medicaid Manual **Part 11** | 42 CFR 433.112(b)(2) and 433.119(a)(3) both make its system requirements a condition of enhanced funding. **CEF 2 is un-checkable today** | Locate and index it |
| **OQ-007** | 42 CFR 435.560 verbatim text — the community-engagement good-faith-effort exemption | Cannot encode the exemption request process. Ten documented retrieval attempts failed; eCFR and Cornell both 404 because the rule is not codified until it takes effect | **Re-pull from eCFR on or just after 2026-07-31.** Dated and self-resolving |
| **OQ-001** | Does the annual OAPD-supporting operational report survive alongside the monthly ORW? | Ongoing Obligations Engine cadence logic. CMS's own Certification Repository says both — the index page says annual only; the Overview page states monthly, quarterly-EVV, and annual simultaneously | CMS MES State Officer. **Never assert a flat "everything is monthly."** |
| **OQ-003** | reginfo.gov's PRA record does not show the 2025-12-23 OMB approval the FAQ cites | Credibility in a customer conversation. The retrieved template also shows "Expires: TBD" | MES@cms.hhs.gov or a State Officer. **Do not assert the OMB control number / approval-date linkage until reconciled** |
| **OQ-008** | Is the MITA State Self-Assessment still expected with an APD? | Whether an SS-A check exists at all. SMC Guidance v2.0 deleted the section; the MITA Governance Board FAQ still asserts the requirement. Neither CMS source acknowledges the other | CMS MES State Officer. **Do not build a hard SS-A gate** — make it configurable and surface the conflict |
| **OQ-005** | DAB appeal filing deadline | Correspondence Hub deadline tracking. 42 CFR 433.121 specifies none; it points to 45 CFR Part 16, which we have not retrieved | Retrieve 45 CFR Part 16 |
| **OQ-006** | Does SHO #25-003 satisfy 42 CFR 433.123's procedure for modifying conditions? | 433.123(a) contemplates Federal Register notice-and-comment then issuance in the State Medicaid Manual. SHO #25-003 mandated a template set via a letter plus PRA clearance | Research. **Do not assert either way to a customer** |

**Closed by the 2026-07-27 audit:** OQ-002 (Annual APDU deadline — found verbatim
at 45 CFR 95.610(c)(1)) and OQ-004 (statutory basis for the 50% rate —
SSA § 1903(a)(7)).

## Open gaps in the source material

Distinct from open questions: these are documents we could not obtain, not
questions we could not answer.

| Gap | Blocks | Fix |
|---|---|---|
| GAP-001 | MDBT **V1.09** — only V1.06 recovered | Budget Engine column mapping | Open `mes-mdbt.xlsx` or ask a State Officer |
| GAP-002 | SMC Intake Form internal structure | Certification Tracker field mapping | Open `intake-form.xlsx` |
| GAP-003 | Project Status Report field list | Ongoing Obligations Engine | reginfo objectID 162300001 — identified, not extracted |
| GAP-004 | CEF / ORR evidence-mapping table | Certification Tracker evidence collection | reginfo objectID 162300101 — identified, not extracted |
| GAP-006 | Appendix C table letter (J vs K) | Field mapping | Open `mes-apd-template.docx` |
| GAP-007 | Whether Appendices A, D, E are required for a PAPD | The `requiredBy` matrix | Open `mes-apd-template.docx` |
| GAP-008 | State Medicaid Manual Part 11 | See OQ-009 | Locate and index |

**Recovery tip that worked:** CMS's Paperwork Reduction Act filings on
reginfo.gov contain PDF conversions of the Word/Excel templates, and the object
IDs increment by 100 across `1622985xx–1623002xx`. Probing that grid is how six
of the eight templates were recovered.
