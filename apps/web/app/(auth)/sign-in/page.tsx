"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { marketingSiteUrl } from "@/lib/site-urls";

export default function SignInPage() {
  const router = useRouter();
  const mainSiteUrl = marketingSiteUrl();

  return (
    <div className="fixed inset-0 z-50 grid grid-cols-1 md:grid-cols-[47%_1fr] bg-card overflow-y-auto">
      <div className="bg-navy text-white p-8 md:p-14 md:pb-11 flex flex-col justify-between">
        <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-white/55">
          APD Studio · Medicaid Enterprise Systems
        </div>
        <div className="my-8 md:my-0">
          <h2 className="text-white text-[24px] md:text-[31px] font-[800] tracking-[-0.032em] leading-[1.12] m-0 mb-5 max-w-[16ch]">
            The clock starts when it happens. <em className="not-italic text-[#8FBBE4]">Not when you find out.</em>
          </h2>
          <div className="border-l-[3px] border-blue py-3.5 px-5 bg-white/5 max-w-[52ch]">
            <q className="block font-mono text-[12.5px] leading-[1.7] text-white/90 quotes-['\201C'_'\201D']">
              The State shall submit the "As Needed APDU" to the Department, no later than 60 days after the occurrence of the project changes to be reported in the "As Needed APDU".
            </q>
            <cite className="block font-mono text-[10.5px] tracking-[0.05em] text-white/70 not-italic mt-2.5">
              45 CFR § 95.611(c)(2) — verified against eCFR, 27 July 2026
            </cite>
          </div>
        </div>
        <div className="text-[12.5px] text-white/50 max-w-[46ch] leading-[1.5] hidden md:block">
          Regulatory analysis, not legal advice. APD Studio never files with CMS and never makes an attestation on a state's behalf — a named official reviews and signs.
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-[376px]">
          <a
            href={mainSiteUrl}
            className="inline-block mb-5 font-sans text-[13px] text-ink-2 no-underline hover:text-navy hover:underline underline-offset-2"
          >
            ← Back to main site
          </a>
          <Image src="/apd-studio-logo.png" alt="APD Studio" width={152} height={76} className="h-[38px] w-auto block mb-[26px]" />
          <h1 className="text-[22px] m-0 mb-1 tracking-[-0.022em] text-ink font-bold">Sign in</h1>
          <p className="text-[14px] text-ink-2 m-0 mb-6">Access is granted per state agency. Your tenant is determined by your identity provider.</p>

          <div className="border border-rule py-2.5 px-3.5 mb-[18px] flex items-center gap-3">
            <i className="not-italic font-mono text-[9.5px] tracking-[0.1em] uppercase text-ink-3">Tenant</i>
            <b className="text-[14px] ml-auto text-ink font-semibold">State of Franklin — Medicaid</b>
          </div>

          <button 
            type="button" 
            className="w-full text-center px-5 py-3 border border-navy bg-navy text-white font-sans text-[14.5px] font-semibold tracking-[-0.006em] hover:bg-navy-900 hover:border-navy-900"
            onClick={() => alert("Identity-provider sign-in is not wired up in this preview. Use 'Enter the demo' to continue.")}
          >
            Continue with your state identity provider
          </button>

          <div className="flex items-center gap-3 my-5 text-ink-3 font-mono text-[9.5px] tracking-[0.11em] uppercase before:flex-1 before:h-px before:bg-rule after:flex-1 after:h-px after:bg-rule">
            or sign in with a password
          </div>

          <form className="mb-0" onSubmit={e => e.preventDefault()}>
            <div className="mb-[13px]">
              <label htmlFor="email" className="block font-mono text-[9.5px] tracking-[0.11em] uppercase text-ink-3 mb-1.5">Work email</label>
              <input id="email" type="email" placeholder="name@medicaid.state.gov" disabled className="w-full font-sans text-[14.5px] py-2.5 px-3 border border-rule bg-paper text-ink-3 cursor-not-allowed" />
            </div>
            <div className="mb-[13px]">
              <label htmlFor="pw" className="block font-mono text-[9.5px] tracking-[0.11em] uppercase text-ink-3 mb-1.5">Password</label>
              <input id="pw" type="password" disabled className="w-full font-sans text-[14.5px] py-2.5 px-3 border border-rule bg-paper text-ink-3 cursor-not-allowed" />
            </div>
            <button type="submit" disabled className="w-full text-center px-5 py-3 border border-rule bg-paper text-ink-3 font-sans text-[14.5px] font-semibold cursor-not-allowed mt-2">
              Sign in
            </button>
          </form>

          <div className="border border-blue-200 bg-blue-50 p-4 mt-[22px]">
            <p className="m-0 mb-3 text-[13.5px] text-ink-2 leading-relaxed">
              <b className="text-navy font-semibold">No account needed.</b> Enter the demo tenant to see the Compliance Validator run against a worked example, with the full rule register and section schema.
            </p>
            <button 
              type="button" 
              autoFocus
              className="w-full text-center px-5 py-3 border border-navy bg-navy text-white font-sans text-[14.5px] font-semibold tracking-[-0.006em] hover:bg-navy-900 hover:border-navy-900"
              onClick={() => router.push("/rules")}
            >
              Enter the demo
            </button>
          </div>

          <p className="mt-6 text-[11.5px] text-ink-3 leading-[1.5]">
            This preview has no backend. Password and identity-provider sign-in are non-functional; the demo entry is the working path.
          </p>
        </div>
      </div>
    </div>
  );
}
