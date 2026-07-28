import Image from "next/image";
import Link from "next/link";
import { portalUrl } from "@/lib/portal-urls";

export default function Home() {
  const portalSignInUrl = `${portalUrl()}/sign-in`;

  return (
    <>
      <a className="absolute -left-[999px] top-0 z-[99] bg-ink text-white px-4 py-2.5 focus:left-2 focus:top-2" href="#main">
        Skip to content
      </a>

      <header className="sticky top-0 z-20 bg-card border-b border-rule border-t-[3px] border-t-navy">
        <div className="flex items-center gap-7 h-16 max-w-[1120px] mx-auto px-5 sm:px-8">
          <Link href="#main" className="flex items-center gap-3 no-underline" aria-label="APD Studio — home">
            <Image src="/apd-studio-logo.png" alt="APD Studio" width={152} height={76} className="h-[34px] w-auto block" priority />
            <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-ink-3 border-l border-rule pl-3 leading-tight max-w-[11ch]">
              Medicaid Enterprise Systems
            </span>
          </Link>
          <nav className="hidden md:flex ml-auto gap-6 text-[14px]">
            <Link href="#what" className="text-ink-2 no-underline hover:text-navy">What it does</Link>
            <Link href="#changed" className="text-ink-2 no-underline hover:text-navy">What changed</Link>
            <Link href="#limits" className="text-ink-2 no-underline hover:text-navy">What it won't do</Link>
            <Link href="#who" className="text-ink-2 no-underline hover:text-navy">Who it's for</Link>
          </nav>
          <div className="hidden sm:flex items-center gap-4">
            <a href={portalSignInUrl} className="text-[14px] font-semibold text-ink-2 no-underline hover:text-navy">
              Log in
            </a>
            <Link
              href="#contact"
              className="bg-navy text-white px-5 py-2.5 font-semibold text-[14.5px] border border-navy tracking-[-0.006em] hover:bg-navy-900 hover:border-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 no-underline"
            >
              Request a walkthrough
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        <div className="bg-card border-b border-rule pt-[56px] pb-[48px] md:pt-[88px] md:pb-[76px]">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mb-[22px]">
              45 CFR 95.611(c)(2)(ii) · Enhanced FFP
            </div>
            <h1 className="text-navy text-[clamp(38px,5.6vw,68px)] font-[900] tracking-[-0.042em] leading-[1.02] mb-2 max-w-[17ch]">
              The clock starts when it happens. <em className="not-italic text-fail">Not when you find out.</em>
            </h1>
            <p className="text-[20px] text-ink-2 max-w-[50ch] mt-5 mb-[34px] leading-[1.45]">
              A schedule slips past sixty days and a state has sixty days to file. Nobody sends a notice. The deadline runs from the change itself.
            </p>
            <div className="border-l-[3px] border-blue py-4 px-[22px] bg-paper max-w-[62ch] mb-[34px]">
              <q className="font-mono text-[14px] leading-[1.7] block quotes-['\201C'_'\201D']">
                The State shall submit the "As Needed APDU" to the Department, no later than 60 days after the occurrence of the project changes to be reported in the "As Needed APDU".
              </q>
              <cite className="block font-mono text-[11px] tracking-[0.05em] text-ink-3 not-italic mt-2.5">
                45 CFR § 95.611(c)(2) — verified against eCFR, 27 July 2026
              </cite>
            </div>
            <p className="text-[17px] text-ink-2 max-w-[56ch] mt-5 mb-[34px] leading-[1.45]">
              APD Studio watches your schedule, budget, scope, and contracts against every trigger in the regulation, and tells you the filing date before it passes.
            </p>
            <div className="flex gap-3 flex-wrap items-center">
              <Link
                href="#contact"
                className="inline-block bg-navy text-white px-5 py-2.5 font-semibold text-[14.5px] border border-navy tracking-[-0.006em] hover:bg-navy-900 hover:border-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 no-underline"
              >
                Request a walkthrough
              </Link>
              <Link
                href="#what"
                className="inline-block bg-transparent text-navy border-rule px-5 py-2.5 font-semibold text-[14.5px] border tracking-[-0.006em] hover:bg-blue-50 hover:border-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 no-underline"
              >
                See what it catches
              </Link>
              <small className="text-[13px] text-ink-3 ml-1.5">
                Built on primary sources. Every claim cites one.
              </small>
            </div>
          </div>
        </div>

        <div className="bg-navy text-white">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4">
            <div className="py-[26px] pr-5 md:pr-0">
              <b className="block font-mono text-[30px] font-semibold tracking-[-0.03em] leading-none">90 / 10</b>
              <span className="block text-[13px] text-white/60 mt-[7px] max-w-[26ch]">Federal match for design, development, installation — 42 CFR 433.112(a)</span>
            </div>
            <div className="py-[26px] pl-5 border-l border-white/15 md:pl-[28px]">
              <b className="block font-mono text-[30px] font-semibold tracking-[-0.03em] leading-none">75 / 25</b>
              <span className="block text-[13px] text-white/60 mt-[7px] max-w-[26ch]">Federal match for operating an approved system — 42 CFR 433.116(a)</span>
            </div>
            <div className="py-[26px] pr-5 border-t border-white/15 md:border-t-0 md:border-l md:pl-[28px]">
              <b className="block font-mono text-[30px] font-semibold tracking-[-0.03em] leading-none">$500K</b>
              <span className="block text-[13px] text-white/60 mt-[7px] max-w-[26ch]">Enhanced-FFP prior approval threshold for contracts — not the $5M states often assume</span>
            </div>
            <div className="py-[26px] pl-5 border-l border-t border-white/15 md:border-t-0 md:pl-[28px]">
              <b className="block font-mono text-[30px] font-semibold tracking-[-0.03em] leading-none">22</b>
              <span className="block text-[13px] text-white/60 mt-[7px] max-w-[26ch]">Conditions for Enhanced Funding your APD must attest to, every time</span>
            </div>
          </div>
        </div>

        <section id="what" className="py-[76px] border-b border-rule">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mb-3">
              The pre-submission gate
            </div>
            <h2 className="text-[clamp(26px,3.2vw,38px)] font-[800] tracking-[-0.032em] leading-[1.1] mb-[14px] max-w-[22ch] text-navy">
              It fails your document before CMS does
            </h2>
            <p className="text-[18px] text-ink-2 max-w-[62ch] mb-[40px]">
              The validator runs every threshold, attestation, arithmetic check, and cross-document consistency rule, and returns findings a reviewer can act on — each one naming the provision it enforces and the exact fix.
            </p>

            <div className="bg-card border border-rule">
              <div className="flex items-stretch border-b border-rule">
                <div className="bg-fail text-white py-4 px-[30px] flex flex-col justify-center">
                  <b className="text-[26px] font-[900] tracking-[-0.04em] leading-none">RED</b>
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase opacity-85 mt-[3px]">
                    Do not submit
                  </span>
                </div>
                <p className="m-0 py-4 px-6 text-[14.5px] text-ink-2 self-center">
                  <b className="text-ink">Six blockers</b> on a $18.4M E&E implementation APD. Two are attestation failures — the document contradicts its own Appendix C.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] border-b border-rule-2 text-[14.5px] last:border-b-0">
                <i className="not-italic font-mono text-[11px] text-ink py-3.5 px-4 md:border-r border-rule-2 border-b md:border-b-0">
                  § 433.112(b)(19)
                </i>
                <div className="py-3.5 px-[18px] min-w-0">
                  <b className="block mb-[3px] text-ink">Appendix C attests "Yes" to CEF 19, but the personnel table names nobody</b>
                  <p className="m-0 text-ink-2 text-[14px]">
                    Three of five key personnel are entered as "TBD." The regulation requires the agency to identify key state personnel <i className="not-italic">by name, type and time commitment</i>. A State Officer checks this in seconds.
                  </p>
                  <p className="text-pass text-[13.5px] mt-1.5">
                    Fix: name the three roles with percent-of-time, or change the attestation to "No" with an explanation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] border-b border-rule-2 text-[14.5px] last:border-b-0">
                <i className="not-italic font-mono text-[11px] text-ink py-3.5 px-4 md:border-r border-rule-2 border-b md:border-b-0">
                  § 433.116(a)
                </i>
                <div className="py-3.5 px-[18px] min-w-0">
                  <b className="block mb-[3px] text-ink">Maintenance and operations cost claimed at 90 percent</b>
                  <p className="m-0 text-ink-2 text-[14px]">
                    $1,240,000 of post-implementation support claimed at the DDI rate. Operations earn 75 percent. Overstates the federal share by $186,000.
                  </p>
                  <p className="text-pass text-[13.5px] mt-1.5">
                    Fix: reclassify to 75/25, or re-scope the line as enhancement and state expressly what is being enhanced.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] border-b border-rule-2 text-[14.5px] last:border-b-0">
                <i className="not-italic font-mono text-[11px] text-ink py-3.5 px-4 md:border-r border-rule-2 border-b md:border-b-0">
                  § 95.611(b)(2)(iii)
                </i>
                <div className="py-3.5 px-[18px] min-w-0">
                  <b className="block mb-[3px] text-ink">$2.14M contract with no prior approval on record</b>
                  <p className="m-0 text-ink-2 text-[14px]">
                    On the enhanced track the threshold is $500,000 — not the $5,000,000 that applies to regular FFP. Acquiring without prior approval puts the expenditure at risk of disallowance.
                  </p>
                  <p className="text-pass text-[13.5px] mt-1.5">
                    Fix: submit the solicitation and draft contract before release, with the CMS Procurement Document Checklist.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] border-b border-rule-2 text-[14.5px] last:border-b-0">
                <i className="not-italic font-mono text-[11px] text-ink py-3.5 px-4 md:border-r border-rule-2 border-b md:border-b-0">
                  Not evaluated
                </i>
                <div className="py-3.5 px-[18px] min-w-0">
                  <b className="block mb-[3px] text-ink">CEF 2 could not be checked — Part 11 of the State Medicaid Manual is not indexed</b>
                  <p className="m-0 text-ink-2 text-[14px]">
                    Reported rather than passed. A validator that silently skips a check it cannot perform produces a false green, which is the worst thing a compliance tool can do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="changed" className="py-[76px] border-b border-rule bg-card">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mb-3">
              Why now
            </div>
            <h2 className="text-[clamp(26px,3.2vw,38px)] font-[800] tracking-[-0.032em] leading-[1.1] mb-[14px] max-w-[22ch] text-navy">
              Every state's templates changed under it last year
            </h2>
            <p className="text-[18px] text-ink-2 max-w-[62ch] mb-[40px]">
              SHO #25-003 replaced the entire APD submission stack and attached a permanent monthly reporting obligation to enhanced funding. That is a recurring, structured, deadline-driven workload — which is exactly the kind of work that should not be done by hand.
            </p>

            <dl className="border-t border-rule">
              <div className="grid grid-cols-1 md:grid-cols-[var(--rail-site)_1fr] border-b border-rule-2">
                <dt className="font-mono text-[12.5px] py-4 md:py-[18px] md:pr-5 md:text-right md:border-r border-rule m-0">14 Apr 2022</dt>
                <dd className="pb-4 md:py-[18px] md:pl-[26px] m-0 text-[15.5px] text-ink-2">
                  <b className="text-ink">SMDL #22-001</b> sunsets the MECT and MEET toolkits, introduces Streamlined Modular Certification.
                </dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[var(--rail-site)_1fr] border-b border-rule-2">
                <dt className="font-mono text-[12.5px] py-4 md:py-[18px] md:pr-5 md:text-right md:border-r border-rule m-0">6 Aug 2025</dt>
                <dd className="pb-4 md:py-[18px] md:pl-[26px] m-0 text-[15.5px] text-ink-2">
                  <b className="text-ink">SHO #25-003</b> replaces the template set — unified MES APD, OAPD, consolidated MDBT, standardized Analysis of Alternatives, Operational Report Workbook, monthly Project Status Report, procurement checklist, unified SMC intake.
                </dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[var(--rail-site)_1fr] border-b border-rule-2">
                <dt className="font-mono text-[12.5px] py-4 md:py-[18px] md:pr-5 md:text-right md:border-r border-rule m-0">23 Dec 2025</dt>
                <dd className="pb-4 md:py-[18px] md:pl-[26px] m-0 text-[15.5px] text-ink-2">
                  OMB clears the package under the Paperwork Reduction Act.
                </dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[var(--rail-site)_1fr] border-b border-rule-2">
                <dt className="font-mono text-[12.5px] py-4 md:py-[18px] md:pr-5 md:text-right md:border-r border-rule m-0">1 Jan – 30 Jun 2026</dt>
                <dd className="pb-4 md:py-[18px] md:pl-[26px] m-0 text-[15.5px] text-ink-2">
                  Transition window. States may adopt early.
                </dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[var(--rail-site)_1fr] border-b border-rule-2">
                <dt className="font-mono text-[12.5px] py-4 md:py-[18px] md:pr-5 md:text-right md:border-r border-rule m-0 text-fail font-semibold">1 Jul 2026</dt>
                <dd className="pb-4 md:py-[18px] md:pl-[26px] m-0 text-[15.5px] text-ink-2">
                  <b className="text-fail">Mandatory.</b> "After July 1, 2026, no other templates should be used unless a state receives prior approval from CMS."
                </dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[var(--rail-site)_1fr] border-b border-rule-2">
                <dt className="font-mono text-[12.5px] py-4 md:py-[18px] md:pr-5 md:text-right md:border-r border-rule m-0 text-fail font-semibold">1 Jan 2027</dt>
                <dd className="pb-4 md:py-[18px] md:pl-[26px] m-0 text-[15.5px] text-ink-2">
                  <b className="text-fail">Community engagement.</b> P.L. 119-21 § 71119 requires states to condition eligibility on community engagement. Every state must modify its E&E system for verification, exemptions, noticing, and appeals.
                </dd>
              </div>
            </dl>

            <p className="text-[18px] text-ink-2 max-w-[62ch] mt-8 mb-0">
              Systems work supporting community engagement <b className="text-ink">may be eligible</b> for 90/10 enhanced match, and 75/25 for ongoing operations — but only through an approved APD, and CMS's bulletin sets no filing deadline and makes no promises. The conditional wording is theirs, and we quote it rather than paraphrase it.
            </p>
          </div>
        </section>

        <section id="how" className="py-[76px] border-b border-rule">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mb-3">
              How it works
            </div>
            <h2 className="text-[clamp(26px,3.2vw,38px)] font-[800] tracking-[-0.032em] leading-[1.1] mb-[14px] max-w-[22ch] text-navy">
              Rules are data, not opinions
            </h2>
            <p className="text-[18px] text-ink-2 max-w-[62ch] mb-[40px]">
              Every threshold, trigger, deadline, and condition is stored as a structured object with its citation, its effective date, and the verbatim text it came from. A rule without a citation cannot enter the system.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[var(--rail-site)_1fr] border-t border-rule">
              <div className="font-mono text-[12px] py-4 md:py-[22px] md:pr-5 md:text-right md:border-r border-rule md:border-b border-rule-2 text-ink">
                § 95.611(c)(2)(ii)(A)
                <s className="block no-underline text-[10px] tracking-[0.06em] uppercase text-ink-3 mt-1">45 CFR</s>
              </div>
              <div className="pb-4 md:py-[22px] md:pl-[26px] border-b border-rule-2">
                <h3 className="m-0 mb-1.5 text-[17px] font-[700] tracking-[-0.016em] text-navy">Thresholds that are easy to get backwards</h3>
                <p className="m-0 text-ink-2 max-w-[64ch] text-[15.5px]">
                  The As-Needed APDU cost trigger is the <b className="text-ink">lesser</b> of $300,000 or 10 percent of project cost — not the greater. Enhanced FFP has six triggers; regular FFP has five. Applying the wrong track's threshold is the most expensive mistake in this domain.
                </p>
              </div>

              <div className="font-mono text-[12px] py-4 md:py-[22px] md:pr-5 md:text-right md:border-r border-rule md:border-b border-rule-2 text-ink">
                § 433.119(a)(1)
                <s className="block no-underline text-[10px] tracking-[0.06em] uppercase text-ink-3 mt-1">42 CFR</s>
              </div>
              <div className="pb-4 md:py-[22px] md:pl-[26px] border-b border-rule-2">
                <h3 className="m-0 mb-1.5 text-[17px] font-[700] tracking-[-0.016em] text-navy">Conditions that change at reapproval</h3>
                <p className="m-0 text-ink-2 max-w-[64ch] text-[15.5px]">
                  Twenty-two Conditions for Enhanced Funding apply at initial approval. At reapproval the operative set is (b)(1), (3), (4), and (7) through (22) — conditions 2, 5, and 6 drop out. The console shows the correct set for the stage you're in.
                </p>
              </div>

              <div className="font-mono text-[12px] py-4 md:py-[22px] md:pr-5 md:text-right md:border-r border-rule md:border-b border-rule-2 text-ink">
                § 433.112(a)
                <s className="block no-underline text-[10px] tracking-[0.06em] uppercase text-ink-3 mt-1">42 CFR</s>
              </div>
              <div className="pb-4 md:py-[22px] md:pl-[26px] border-b border-rule-2">
                <h3 className="m-0 mb-1.5 text-[17px] font-[700] tracking-[-0.016em] text-navy">Arithmetic done by code, never by a model</h3>
                <p className="m-0 text-ink-2 max-w-[64ch] text-[15.5px]">
                  Federal and state shares are computed in integer cents, with the state share taken as the remainder so the parts always equal the whole. No language model computes a federal share. Narrative figures are reconciled against the budget table at zero tolerance.
                </p>
              </div>

              <div className="font-mono text-[12px] py-4 md:py-[22px] md:pr-5 md:text-right md:border-r border-rule md:border-b border-rule-2 text-ink">
                SHO #25-003
                <s className="block no-underline text-[10px] tracking-[0.06em] uppercase text-ink-3 mt-1">CMS</s>
              </div>
              <div className="pb-4 md:py-[22px] md:pl-[26px] border-b border-rule-2">
                <h3 className="m-0 mb-1.5 text-[17px] font-[700] tracking-[-0.016em] text-navy">Conflicts surfaced, not smoothed over</h3>
                <p className="m-0 text-ink-2 max-w-[64ch] text-[15.5px]">
                  CMS's own sources disagree in seven documented places — including where the Analysis of Alternatives belongs. We build to the best-evidenced reading, show you the conflict, and cite both. A product that hides an ambiguity is more dangerous than one that names it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="limits" className="py-[76px] border-b border-rule bg-card">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mb-3">
              Constraints
            </div>
            <h2 className="text-[clamp(26px,3.2vw,38px)] font-[800] tracking-[-0.032em] leading-[1.1] mb-[14px] max-w-[22ch] text-navy">
              What it will not do, by design
            </h2>
            <p className="text-[18px] text-ink-2 max-w-[62ch] mb-[40px]">
              Each of these is an architectural decision, not a roadmap gap. They are the reasons a security reviewer and a State Officer can both get comfortable.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-rule">
              <div className="p-[26px] md:p-[28px] border-r border-b border-rule bg-card">
                <span className="block font-mono text-[10px] tracking-[0.11em] uppercase text-fail mb-[9px]">Never</span>
                <h3 className="m-0 mb-1.5 text-[16.5px] font-[700] tracking-[-0.014em] text-navy">Files anything with CMS</h3>
                <p className="m-0 text-[15px] text-ink-2">
                  There is no outbound CMS integration in any environment. The system produces a submission-ready package. A named state official exports it and files it.
                </p>
              </div>
              <div className="p-[26px] md:p-[28px] border-r border-b border-rule bg-card">
                <span className="block font-mono text-[10px] tracking-[0.11em] uppercase text-fail mb-[9px]">Never</span>
                <h3 className="m-0 mb-1.5 text-[16.5px] font-[700] tracking-[-0.014em] text-navy">Makes an attestation for you</h3>
                <p className="m-0 text-[15px] text-ink-2">
                  Agents draft explanation text and assemble evidence. Every attestation value is set by a named human. An APD carries sworn statements to the federal government; a model does not get to make one.
                </p>
              </div>
              <div className="p-[26px] md:p-[28px] border-r border-b border-rule bg-card">
                <span className="block font-mono text-[10px] tracking-[0.11em] uppercase text-fail mb-[9px]">Never</span>
                <h3 className="m-0 mb-1.5 text-[16.5px] font-[700] tracking-[-0.014em] text-navy">Touches member data</h3>
                <p className="m-0 text-[15px] text-ink-2">
                  No PHI. No member-level records. Not in a schema, a column, a log line, or a test fixture. APDs are budget, architecture, and procurement documents — there is no clinical reason for member data to be here, so it is designed out.
                </p>
              </div>
              <div className="p-[26px] md:p-[28px] border-r border-b border-rule bg-card">
                <span className="block font-mono text-[10px] tracking-[0.11em] uppercase text-fail mb-[9px]">Never</span>
                <h3 className="m-0 mb-1.5 text-[16.5px] font-[700] tracking-[-0.014em] text-navy">Passes a check it couldn't run</h3>
                <p className="m-0 text-[15px] text-ink-2">
                  An unimplemented or unevaluable check is reported as not evaluated, visibly, in the report. It never counts as a pass. A false green is the worst output a compliance system can produce.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="who" className="py-[76px] border-b border-rule">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mb-3">
              Who buys this
            </div>
            <h2 className="text-[clamp(26px,3.2vw,38px)] font-[800] tracking-[-0.032em] leading-[1.1] mb-[14px] max-w-[22ch] text-navy">
              Two buyers, sold differently
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule mt-10">
              <div className="bg-card p-8">
                <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-3 mb-3.5">
                  State Medicaid agencies
                </div>
                <h3 className="m-0 mb-1 text-[19px] font-[800] tracking-[-0.02em] text-navy">
                  Make your existing staff faster, or cover the function without hiring a specialist
                </h3>
                <ul className="m-0 mt-3.5 pl-[18px] text-ink-2 text-[15px]">
                  <li className="mb-1.5">Licensed software, procured through your existing IT vehicles</li>
                  <li className="mb-1.5">Often fundable as an administrative or systems cost — verify per use case; we will not tell you it is automatic</li>
                  <li className="mb-1.5">Your APD writer stops chasing SMEs and starts reviewing drafts</li>
                  <li className="mb-1.5">The monthly Project Status Report and Operational Report Workbook generate from live project data</li>
                </ul>
              </div>
              <div className="bg-card p-8">
                <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-3 mb-3.5">
                  System integrators & consultancies
                </div>
                <h3 className="m-0 mb-1 text-[19px] font-[800] tracking-[-0.02em] text-navy">
                  Raise margin per engagement on work your staff already does by hand
                </h3>
                <ul className="m-0 mt-3.5 pl-[18px] text-ink-2 text-[15px]">
                  <li className="mb-1.5">White-labeled, multi-tenant, strict isolation between client states</li>
                  <li className="mb-1.5">Your analysts review and sign instead of drafting from scratch</li>
                  <li className="mb-1.5">Pre-submission validation before the document reaches your client's State Officer</li>
                  <li className="mb-1.5">An audit trail that answers "who wrote this, from what source, and who approved it"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-[76px] bg-navy text-white">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/50 mb-3">
              Next step
            </div>
            <h2 className="text-[clamp(26px,3.2vw,38px)] font-[800] tracking-[-0.032em] leading-[1.1] mb-[14px] max-w-[24ch] text-white">
              Bring an APD you've already submitted
            </h2>
            <p className="text-[17px] text-white/70 max-w-[58ch]">
              The most useful first conversation is twelve minutes long: we run the validator against a document CMS has already seen, and you decide whether what it found was worth knowing. No slides.
            </p>
            <p className="mt-[26px] mb-0 flex gap-3 flex-wrap">
              <Link
                href="mailto:hello@realestateadvancement.com"
                className="inline-block bg-white text-ink px-5 py-2.5 font-semibold text-[14.5px] border border-white tracking-[-0.006em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 no-underline"
              >
                Request a walkthrough
              </Link>
              <Link
                href="#what"
                className="inline-block bg-transparent text-white border-white/30 px-5 py-2.5 font-semibold text-[14.5px] border tracking-[-0.006em] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 no-underline"
              >
                See what it catches
              </Link>
            </p>
          </div>
        </section>
      </main>

      <footer className="py-10 text-[13.5px] text-ink-3">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
          <p className="max-w-[74ch] m-0 mb-2.5">
            <b className="text-ink-2 font-semibold">APD Studio is a compliance and workflow platform, not a law firm.</b> The validator automates checking against the Code of Federal Regulations and CMS subregulatory guidance, but does not provide legal advice and does not act as a state's authorized representative.
          </p>
          <p className="max-w-[74ch] m-0 mb-2.5">
            There is no such thing as a "CMS-preapproved" tool. Use of this platform does not guarantee funding approval.
          </p>
          <p className="max-w-[74ch] m-0">
            &copy; 2026 APD Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
