# Rule Register — human-readable companion

**Artifact:** R3 · **Register version:** 0.2.0 · **Verified as of:** July 27, 2026 · **Stale after:** October 25, 2026
**Machine-readable source of truth:** `specs/rule-register.json` — that file governs; this one explains.

**74 rules · 58 HIGH confidence · 8 open questions · 7 corrections to prior project assumptions**

---

## What this is

Every threshold, trigger, deadline, condition, and attestation in the Medicaid APD regime, as structured objects: `{ id, citation, effectiveDate, appliesTo, trigger, obligation, deadline, consequence, source, verbatim, confidence }`.

Each rule carries the verbatim source text it came from, so any validator finding traces back to a citation a CMS State Officer would recognize on sight. Confidence is stated on every rule, and two rules are marked UNVERIFIED rather than guessed.

An adversarial citation audit was run against primary sources on July 27, 2026. It checked 8 claim clusters, found **5 errors**, and all 5 were corrected. What it verified clean is listed at the end.

---

## The money: match rates

| Rate | Activity | CFR | Statute |
|---|---|---|---|
| **90 / 10** | Design, development, installation, or **enhancement** (DDI) of MMIS | 42 CFR 433.112(a) | SSA § 1903(a)(3)(A) |
| **90 / 10** | DDI of an E&E system, costs on or after April 19, 2011 | 42 CFR 433.112(c)(1) | SSA § 1903(a)(3)(A) |
| **75 / 25** | Operation of an approved system | 42 CFR 433.116(a) | SSA § 1903(a)(3)(B) |
| **75 / 25** | Operation of an approved E&E system, on or after April 19, 2011 | 42 CFR 433.116(j) | SSA § 1903(a)(3)(B) |
| **50 / 50** | Other necessary administrative expense | *not in Part 433* | **SSA § 1903(a)(7)** |

The 90 percent rate has a hard precondition, and it is the most consequential sentence in the whole regime:

> "FFP is available at the 90 percent rate in State expenditures for the design, development, installation, or enhancement of a mechanized claims processing and information retrieval system **only if the APD is approved by CMS prior to the State's expenditure of funds** for these purposes." — 42 CFR 433.112(a)

Two things worth knowing that most summaries drop:

**The 75 percent operations rate is retroactively adjustable.** The full text runs "…approved by CMS, from the first day of the calendar quarter after the date the system met the conditions of initial approval, as established by CMS (**including a retroactive adjustment of FFP if necessary to provide the 75 percent rate beginning on the first day of that calendar quarter**)."

**COTS costs are 90-percent eligible only if described.** 42 CFR 433.112(c)(2) covers initial COTS licensing and the minimum necessary costs to analyze, install, configure and integrate it — but "the nature and extent of such costs **must be expressly described in the approved APD**." A generic line item fails.

---

## Prior approval — memorize the enhanced column

The enhanced track is where Medicaid MES work lives. The regular column is context only; applying regular thresholds to MES work is a serious error.

### Enhanced FFP — 42 CFR Part 433 Subpart C work

| What | Threshold | Cite |
|---|---|---|
| Planning APD | **Any amount** | 45 CFR 95.611(b)(2)(i) |
| Implementation APD | **Any amount** | 45 CFR 95.611(b)(2)(ii) |
| Solicitation documents and contracts | **exceeds $500,000** | 45 CFR 95.611(b)(2)(iii) |
| Contract amendments | **cost increase over $500,000 OR term extension over 60 days** | 45 CFR 95.611(b)(2)(iv) |

The contract threshold reads "anticipated to **or will** exceed $500,000" — it captures overages already known, not only forecasts. And the amendment rule's 60-day prong is widely missed: a no-cost 90-day extension still requires prior approval.

### Regular FFP — context, do not apply to MES

| What | Threshold | Cite |
|---|---|---|
| APD required | $5,000,000+ total federal and state | 45 CFR 95.611(a)(1) |
| Sole source / noncompetitive | $1,000,000+ | 45 CFR 95.611(a)(3), (b)(1)(iv) |
| Software development contracts | $6,000,000 competitive / $1,000,000 noncompetitive | 45 CFR 95.611(b)(1)(v)(A) |
| Hardware / COTS | $20,000,000 competitive / $1,000,000 noncompetitive | 45 CFR 95.611(b)(1)(v)(B) |
| Contract amendments | cumulative increase over **20 percent** of base contract cost | 45 CFR 95.611(b)(1)(vi) |

### The clock that runs in the state's favor

> "If the Department has not provided approval, disapproval, or a request for information which is reflected in a record, **within 60 days of the date of the Departmental letter acknowledging receipt** of a State's request, the Department will consider the request to have **provisionally met** the prior approval conditions." — 45 CFR 95.611(d)

Note the structure: this is written as a consequence, not as a duty on HHS. And the clock starts from a **dated letter**, which gives the state a documentary anchor. The CMS Correspondence Hub should capture that letter's date on intake and run the timer.

---

## As-Needed APDU triggers — the Change Radar's reason to exist

**Enhanced FFP has SIX triggers. Regular FFP has FIVE.** The sixth — cost-benefit change — exists only on the enhanced track. Verified.

| # | Enhanced trigger — 45 CFR 95.611(c)(2)(ii) | Threshold |
|---|---|---|
| A | Projected cost increase | **$300,000 or 10% of project cost, whichever is less** |
| B | Schedule extension for a major milestone | **more than 60 days** |
| C | Significant change in procurement approach or scope | qualitative |
| D | Change to system concept or project scope | qualitative |
| E | Change to the approved **cost methodology** | qualitative |
| F | Change of more than **10%** of estimated cost benefits | 10% |

Regular FFP has (A)–(E) only, with a **$1,000,000** cost trigger and no cost-benefit trigger. The enhanced track is more than three times tighter on cost. A state moving between programs will get this wrong.

### The deadline, verbatim — and it runs from occurrence

> "The State shall submit the 'As Needed APDU' to the Department, **no later than 60 days after the occurrence of the project changes** to be reported in the 'As Needed APDU'."

**Occurrence, not discovery.** There is no tolling for a state that did not notice. That single word is the business case for the Change Sentinel: a state can blow this deadline without anyone in the building knowing a clock ever started.

*(Drafting note: this sentence is undesignated flush text appearing twice, once closing (c)(1)(ii) and once closing (c)(2)(ii)(F). Citing 95.611(c)(2) is acceptable; it has no paragraph designator of its own.)*

### The Annual APDU deadline — corrected in this pass

> "The Annual APDU, **which is due 60 days prior to the expiration of the FFP approval**, includes:" — **45 CFR 95.610(c)(1)**

This deadline is real and verbatim, verified on two independent hosts. It is **not** in 45 CFR 95.611(c)(2)(i), whose entire text is "For an Annual APDU." The register originally hung it off the wrong section, could not find timing there, and correctly refused to ship it — the audit found the right home. Trigger date is the FFP approval expiration date, which the Project Register already needs to hold.

---

## Reporting obligations — the recurring drumbeat SHO #25-003 created

| Obligation | Cadence | Applies | Cite |
|---|---|---|---|
| **Operational Report Workbook** | Submit **monthly** | non-EVV modules | SHO #25-003 |
| **ORW — EVV modules** | Capture monthly, **submit quarterly** | EVV | SHO #25-003; SMC v2.0 Table 2 |
| **Project Status Report** | **Monthly**, through DDI **and after certification** | states pursuing certification | SHO #25-003; FAQ |
| **OAPD** | **Annual**, per project | operating systems | 45 CFR 95.610(c)(3); FAQ |
| **ADP system security review** | **Biennial** | all ADP systems with FFP | 45 CFR 95.621 |

**EVV quarterly calendar (SMC Guidance v2.0, Table 2):** Oct–Dec → due end of March · Jan–Mar → end of June · Apr–Jun → end of September · Jul–Sep → end of December.

**The consequence, verbatim:**
> "States that do not submit operational reporting will be considered non-compliant with the applicable regulations and could lose enhanced Medicaid FFP or CHIP federal funding." — SHO #25-003

### The cadence question — mostly resolved, and here is the vocabulary that resolves it

The project carried this as an open question. SHO #25-003 supplies its own reconciling terms:

> "the **cadence** of reporting addresses the timing of report submission to CMS, which will remain quarterly for EVV modules, while the **frequency** refers to the capture of the metric data within the Operational Report Workbook, which will remain monthly."

So: **frequency = how often data is captured. Cadence = how often it is submitted.** Non-EVV captures monthly and submits monthly; EVV captures monthly and submits quarterly. That dissolves the apparent contradiction, and it is worth using CMS's own words in a customer conversation.

**What genuinely remains open (OQ-001):** whether the *annual* OAPD-supporting operational report from SMDL #22-001 survives as a separate obligation, or was absorbed by the monthly ORW. CMS's own Certification Repository says both — the Ongoing Reporting index page says annual only, while the Overview page states monthly, quarterly-EVV, and annual-with-OAPD simultaneously. **Confirm with a CMS MES State Officer before the Ongoing Obligations Engine hard-codes cadence. Never assert a flat "everything is monthly."**

### Evidence history is a gating item

Six months of ORW data to prepare for a certification review; **twelve months for an APD submission**, unless the APD is submitted less than 12 months after certification. A state that starts reporting late cannot retroactively manufacture history — which makes early ORW discipline a reason to buy the tool before you need it.

---

## What failure costs

| Failure | Consequence | Cite |
|---|---|---|
| System fails reapproval | Operations FFP **75% → 50%**, from the first day of the first calendar quarter after written notice | 42 CFR 433.119(c)(1) |
| Scope of that reduction | **"expenditures related to the operations of non-compliant functionality or system components"** | 42 CFR 433.120 |
| Appeal | Departmental Appeals Board under 45 CFR Part 16. **Reconsideration does not stay the reduction** | 42 CFR 433.121 |
| Restoration | 75% resumes the quarter after the reapproval determination; retroactive waiver limited to **four quarters** back | 42 CFR 433.122 |
| Good-cause waiver | Will **not extend beyond two consecutive quarters** | 42 CFR 433.131(a) |
| Acquisition fails to comply with the approved APD | FFP **may be disallowed** | 45 CFR 95.612 |
| Major failure to comply with an approved APD | All or part of project costs **subject to disallowance** | 45 CFR 95.635 |
| Denying federal access to the system | **FFP terminated** | 42 CFR 433.127; 45 CFR 95.615 |
| Acquisition without prior approval | Disallowance; reconsideration within **30 days** | 45 CFR 95.623 |

**Say the 75→50 reduction precisely.** It reaches the non-compliant functionality or components, not automatically the whole system. The accurate version is alarming enough, and overstating it is the kind of thing a state CIO catches.

**Two under-appreciated ones.** Access denial triggers *termination*, not reduction — the harshest consequence in the regime, and it attaches to obstruction rather than to substantive noncompliance. And 45 CFR 95.612's disallowance hook is failure to comply with **the APD itself**, not just with the regulations: every commitment written into an APD becomes an enforceable condition. That is an argument against over-promising in narrative, and a real product feature — track APD commitments as obligations.

---

## Deadlines, all in one place

| Days | What | Who | From | Cite |
|---|---|---|---|---|
| **60** | As-Needed APDU filing | State | occurrence of the change | 45 CFR 95.611(c)(2) |
| **60** *(before)* | Annual APDU filing | State | expiration of FFP approval | 45 CFR 95.610(c)(1) |
| **60** | CMS acts, or request is provisionally approved | HHS | date of the Departmental acknowledgment letter | 45 CFR 95.611(d) |
| **30** | Reconsideration of denied FFP for lack of prior approval | State | initial written disallowance | 45 CFR 95.623 |
| **14** | Department response to an emergency acquisition request | HHS | receipt of request | 45 CFR 95.624(b) |
| **90** | Formal § 95.611 submission after an emergency acquisition | State | date of the state's initial request | 45 CFR 95.624(b)(2) |
| **1 quarter** *(before)* | CMS notice of modified reapproval standards | CMS | the review period | 42 CFR 433.123(c) |
| **2 quarters** *(max)* | Good-cause waiver duration cap | — | — | 42 CFR 433.131(a) |
| **4 quarters** *(max)* | Retroactive FFP-reduction waiver look-back | — | — | 42 CFR 433.122(b) |

---

## Independent Verification and Validation — an underused sales hook

**45 CFR 95.626** (not 95.624 — see corrections) lets the Department require IV&V when a project meets **any** of eight criteria. Two of them are directly computable from data the Change Radar already holds:

- *"Are at risk of failure, major delay, or cost overrun in their systems development efforts"*
- *"Fail to timely and completely submit APD updates or other required systems documentation"*

That second one is self-referential in a useful way: **missing an As-Needed APDU can itself trigger IV&V.** A tool that tells a state it has entered the IV&V criteria before CMS does is worth real money. Note also that the IV&V provider must report **directly to the federal agencies at the same time it reports to the State** — states routinely misunderstand this.

---

## Corrections to prior project assumptions

Seven, recorded in the JSON. The ones that matter:

**1. The AoA does not go in APD Section 5.** SHO #25-003 says it does, verbatim. The published templates and the FAQ put it at **Section 3 plus Appendix B**. APD Section 5 is Acquisitions; OAPD Appendix A is the Proposed Activity Schedule. Build against the templates.

**2. 45 CFR 95.626 is Independent Verification and Validation, not emergency acquisitions.** Emergency acquisitions are **45 CFR 95.624**. The research agenda listed 95.626 in the rule-register source list; that citation was pointing at the wrong section.

**3. 42 CFR 433.114 has no 60-day clock.** It was materially shortened by the April 19, 2011 amendment (76 FR 21974) and contains no day-count deadlines at all. The 60-day clock that *does* exist is at 45 CFR 95.611(d).

**4. 42 CFR 433.112(b) has exactly 22 conditions**, not "20+".

**5. 42 CFR 433 Subpart C is not contiguous.** Thirteen sections. There is no 433.113, 433.115, 433.118, 433.124–433.126, 433.128, 433.129, or 433.130.

**6. The reporting-cadence conflict is mostly resolved** by CMS's own cadence/frequency vocabulary. Only the annual-OAPD question remains open.

**7. The MITA SS-A was silently deleted from SMC Guidance v2.0** while the MITA Governance Board FAQ still asserts it. Also: no CMS primary source states an *annual* SS-A cadence — that figure traces to state and vendor documents.

---

## Open questions, ranked

| # | Question | Why it matters | How to close |
|---|---|---|---|
| **OQ-010** | Is an APD Studio license itself APD-fundable? | Highest-leverage unknown in the business model. Best hook found so far: 42 CFR 433.112(c)(2) makes initial COTS licensing and integration 90-percent eligible **when expressly described in the approved APD** — unanalyzed for this use case | R8 procurement path analysis. Do not assume |
| **OQ-009** | State Medicaid Manual **Part 11** | CEF 2 is un-checkable today; also cited by 433.119(a)(3) for reapproval | Locate and index it |
| **OQ-007** | 42 CFR 435.560 verbatim text | Community-engagement exemption logic | Re-pull from eCFR **on/after July 31, 2026** |
| **OQ-001** | Does the annual OAPD-supporting report survive? | Ongoing Obligations Engine cadence | CMS MES State Officer |
| **OQ-003** | reginfo PRA record doesn't show the Dec 23, 2025 OMB approval | Credibility in a customer conversation | MES@cms.hhs.gov or a State Officer |
| **OQ-008** | Is the MITA SS-A still expected with an APD? | Whether an SS-A check exists at all | CMS MES State Officer |
| **OQ-005** | DAB appeal filing deadline | Correspondence Hub deadline tracking | Retrieve 45 CFR Part 16 |
| **OQ-006** | Does SHO #25-003 satisfy 42 CFR 433.123's procedure for modifying conditions? | A state's counsel may raise it | Research; do not assert either way |

*OQ-002 (Annual APDU deadline) and OQ-004 (statutory basis for the 50 percent rate) were closed by the July 27 audit.*

---

## Audit record — July 27, 2026

**Errors found and corrected: 5**

1. **RR-PA-EXEMPTION applied a regular-FFP-only exemption to the enhanced track.** The most dangerous finding: the three exemption conditions came from 45 CFR 95.611(b)(1)(iii), which sits inside the paragraph headed "For regular FFP requests," and has no counterpart in (b)(2). This is the one error that could have caused a state to *skip* a required federal prior-approval submission. Split into a REGULAR-track rule and a narrower BOTH-track rule based on 95.611(e) alone.
2. **Annual APDU deadline suppressed and mis-cited.** Corrected to 45 CFR 95.610(c)(1); confidence raised to HIGH; OQ-002 closed.
3. **The 75 percent operations rate carried a truncated string labeled "verbatim"**, propagated into two schema locations backing flagship validators. Full text restored.
4. **Missing statutory authority for the 90 and 75 percent rates.** SSA § 1903(a)(3)(A) and (B) added.
5. **The enhanced cost-allocation trigger quoted the regular track's wording.** Enhanced (c)(2)(ii)(E) says "cost methodology"; regular (c)(1)(ii)(E) says "cost allocation methodology."

**Verified clean:** all 22 CEF texts (five spot-checked character-for-character) · the 433.119(a)(1) reapproval subset excluding (b)(2), (b)(5), (b)(6) · the 433.116 (c)–(i) initial vs (d)–(j) reapproval asymmetry · all six enhanced and five regular As-Needed triggers · every 45 CFR 95.611 dollar threshold · both complete section inventories · the 95.624 / 95.626 assignment · the 42 CFR 433.110 title · the nine non-existent 433 section numbers · 42 CFR 433.117 · 42 CFR 433.131.

**One CFR artifact, not our error:** 42 CFR 433.131(c) bars waiver of "the December 31, 2015 deadlines referenced in § 433.112(c) and § 433.116(j)" — but both cross-referenced paragraphs now run from April 19, 2011 and contain no December 31, 2015 date. Vestigial text inside the CFR itself. Do not "fix" the quote.

---

*Research artifact, not legal advice. We are not lawyers and not any state's authorized representative. Re-verify §§ 95.611 and 433.112 and the current CMS template set before any customer-facing use.*
