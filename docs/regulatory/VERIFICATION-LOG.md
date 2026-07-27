# Verification log

Every regulatory claim in this repo traces to a primary source read on a
recorded date. This file is the record of when, by what method, and what was
found. **Anything older than 90 days is stale and must be re-verified before it
is used in a customer deliverable or shipped into a validator.**

---

## 2026-07-27 — initial verification pass (Research Agenda Week 1)

**Method:** direct retrieval from eCFR, federalregister.gov, govinfo.gov,
medicaid.gov, cms.gov, reginfo.gov, ssa.gov, and CMS's GitHub-hosted MES
Certification Repository. No secondary source was admitted as regulatory text.

**Verified as of:** 2026-07-27 · **Stale after:** 2026-10-25

### Sources read in full

| Source | Last amended (as shown) |
|---|---|
| 45 CFR Part 95, Subpart F — §§ 95.605, 95.610, 95.611, 95.612, 95.613, 95.615, 95.617, 95.619, 95.621, 95.623, 95.624, 95.626, 95.631, 95.633, 95.635, 95.641 | Title 45 last amended 2026-07-23 |
| 42 CFR Part 433, Subpart C — §§ 433.110, 433.111, 433.112, 433.114, 433.116, 433.117, 433.119, 433.120, 433.121, 433.122, 433.123, 433.127, 433.131 | Part 433 last amended 2024-10-02 (89 FR 80069) |
| SHO #25-003 + FAQ | 2025-08-06 |
| SMDL #22-001 | 2022-04-14 |
| SMC Certification Guidance v2.0 | 2025-10-21 |
| CMCS Informational Bulletins | 2025-11-18, 2025-12-08 |
| CMS-2454-IFC, 91 FR 33348 | published 2026-06-03, effective 2026-07-31 |
| SSA § 1903(a) | ssa.gov compilation |
| CMS MES template set (via CMS PRA filings on reginfo.gov) | mandatory 2026-07-01 |

### Adversarial audit — same date

An independent verification pass re-checked the highest-stakes claims. **Five
errors found, five corrected.**

1. A regular-FFP-only prior-approval exemption had been tagged as applying to the
   enhanced track. **This was the dangerous one** — it could have caused a state
   to skip a required federal prior-approval submission. Split into
   `RR-PA-EXEMPTION-REG` (regular only) and a narrower `RR-PA-EXEMPTION`.
2. The Annual APDU deadline had been marked UNVERIFIED and hung off
   45 CFR 95.611(c)(2)(i), which does not contain it. It is real and verbatim at
   **45 CFR 95.610(c)(1)**. Confirmed on two independent hosts.
3. The 75% operations rate carried a truncated string labelled `verbatim`,
   propagated into two schema locations backing flagship validators. Full text
   restored, including the retroactive-adjustment clause.
4. Statutory authority for the 90% and 75% rates was missing while the 50% rate
   carried its statute. Added SSA § 1903(a)(3)(A) and (B).
5. The enhanced cost-allocation trigger quoted the *regular* track's wording.

**Verified clean:** all 22 Conditions for Enhanced Funding, five spot-checked
character-for-character · the 433.119(a)(1) reapproval subset · the
433.116 (c)–(i) vs (d)–(j) asymmetry · all six enhanced and five regular
As-Needed triggers · every 45 CFR 95.611 dollar threshold · both complete
section inventories · the 95.624 / 95.626 assignment · the 42 CFR 433.110 title ·
the nine non-existent 42 CFR 433 section numbers · 42 CFR 433.117 · 433.131.

### Known CFR artifact — do not "fix"

42 CFR 433.131(c) bars waiver of *"the December 31, 2015 deadlines referenced in
§ 433.112(c) and § 433.116(j)"* — but the current text of both cross-referenced
paragraphs runs from **April 19, 2011** and contains no December 31, 2015 date.
This is vestigial text inside the CFR itself, not a transcription error.

---

## Next verification pass — DUE

| Date | Action |
|---|---|
| **2026-07-31** | Re-pull 42 CFR 435.560 and the full new §§ 435.55x–435.56x list from eCFR. CMS-2454-IFC takes effect; the text becomes codified and retrievable. Closes GAP-005 / OQ-007. |
| **Weekly** | Docket 1:26-cv-12962 (D. Mass.) — no ruling as of 2026-07-27; a preliminary injunction motion is pending with no hearing date set. |
| **2026-10-25** | Full re-verification of §§ 95.611 and 433.112 and the current CMS template set. |
| **Before any customer use** | State Medicaid Manual Part 11 (OQ-009); MDBT V1.09 (GAP-001). |

## How to record a pass

Append a dated section above. State the method, the sources, what changed, and
what was verified clean. Then bump `meta.verifiedAsOf` and `meta.staleAfter` in
both `rule-register.json` and `apd-section-schema.json`, and re-copy them into
`packages/rules/data/` and `packages/templates/data/`.
