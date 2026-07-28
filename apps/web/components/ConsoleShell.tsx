"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { marketingSiteUrl } from "@/lib/site-urls";

type ConsoleShellProps = {
  children: React.ReactNode;
  metadata: {
    ruleCount: number;
    validatorCount: number;
    verifiedAsOf: string;
    staleAfter: string;
    sectionCount: number;
    cefCount: number;
    integrityCount: number;
  };
};

const knowledgeLinks = [
  { href: "/rules", label: "Rule Register", countKey: "ruleCount" },
  { href: "/sections", label: "Section Schema", countKey: "sectionCount" },
  { href: "/cef", label: "Conditions for Enhanced Funding", countKey: "cefCount" },
] as const;

export default function ConsoleShell({ children, metadata }: ConsoleShellProps) {
  const pathname = usePathname();
  const mainSiteUrl = marketingSiteUrl();

  const navLink = (href: string, label: string, count: number) => {
    const active = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className={`flex items-baseline gap-2 w-full py-[7px] px-[22px] text-left font-sans text-[13.5px] no-underline ${
          active
            ? "border-l-2 border-navy bg-paper text-ink font-semibold"
            : "border-l-2 border-transparent text-ink-2 hover:bg-paper hover:text-ink"
        }`}
      >
        {label}
        <em className="not-italic ml-auto font-mono text-[10.5px] text-ink-3">{count}</em>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="absolute -top-10 left-0 bg-navy text-white p-2 z-50 focus:top-0">
        Skip to content
      </a>
      <header className="sticky top-0 z-20 flex items-stretch border-t-[3px] border-t-navy border-b border-b-rule bg-card">
        <div className="flex-none w-full md:w-[var(--nav)] p-3 px-5 border-r border-rule">
          <a href={mainSiteUrl} className="block no-underline" aria-label="APD Studio — return to main site">
            <Image src="/apd-studio-logo.png" alt="" width={160} height={80} className="block h-[26px] w-auto" />
          </a>
          <span className="block font-mono text-[10.5px] text-ink-3 tracking-[0.06em] uppercase mt-px">Compliance Console</span>
        </div>
        <div className="hidden md:flex ml-auto items-center font-mono text-[11px] text-ink-2">
          <a
            href={mainSiteUrl}
            className="px-5 self-center text-[12px] text-ink-2 no-underline hover:text-navy hover:underline underline-offset-2"
          >
            ← Main site
          </a>
          {[
            ["Register", `${metadata.ruleCount} rules`],
            ["Validators", metadata.validatorCount],
            ["Verified", metadata.verifiedAsOf],
            ["Re-verify by", metadata.staleAfter],
          ].map(([label, value]) => (
            <div key={label} className="px-5 border-l border-rule-2 self-center flex flex-col">
              <i className="not-italic text-ink-3 text-[10px] tracking-[0.05em] uppercase">{label}</i>
              <b className="text-ink font-semibold">{value}</b>
            </div>
          ))}
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        <nav className="flex flex-col flex-none w-full md:w-[var(--nav)] border-r border-rule bg-card py-5 md:sticky md:top-[62px] md:h-[calc(100vh-62px)] overflow-y-auto" aria-label="Modules">
          <div className="font-mono text-[10px] tracking-[0.11em] uppercase text-ink-3 py-4 px-[22px] pb-[7px]">Pre-submission</div>
          {["Compliance Validator", "Change Sentinel"].map((label) => (
            <button key={label} disabled className="flex items-baseline gap-2 w-full bg-transparent border-l-2 border-transparent py-[7px] px-[22px] text-left text-ink-2 font-sans text-[13.5px] opacity-40 cursor-not-allowed">
              {label}
            </button>
          ))}

          <div className="font-mono text-[10px] tracking-[0.11em] uppercase text-ink-3 py-4 px-[22px] pb-[7px]">Knowledge core</div>
          {knowledgeLinks.map((link) =>
            navLink(link.href, link.label, metadata[link.countKey]),
          )}

          <div className="font-mono text-[10px] tracking-[0.11em] uppercase text-ink-3 py-4 px-[22px] pb-[7px]">Integrity</div>
          {navLink("/integrity", "Conflicts & open questions", metadata.integrityCount)}

          <div className="font-mono text-[10px] tracking-[0.11em] uppercase text-ink-3 py-4 px-[22px] pb-[7px]">Blocked on R11 / R12</div>
          {["Project Register", "Authoring Workspace", "Budget Engine (MDBT)", "Ongoing Obligations"].map((label) => (
            <button key={label} disabled className="flex items-baseline gap-2 w-full bg-transparent border-l-2 border-transparent py-[7px] px-[22px] text-left text-ink-2 font-sans text-[13.5px] opacity-40 cursor-not-allowed">
              {label}
            </button>
          ))}

          <div className="mt-auto border-t border-rule pt-4">
            <a
              href={mainSiteUrl}
              className="flex items-center gap-2 w-full py-[7px] px-[22px] text-left font-sans text-[13.5px] text-ink-2 no-underline border-l-2 border-transparent hover:bg-paper hover:text-navy md:hidden"
            >
              ← Main site
            </a>
          </div>
        </nav>

        <main id="main" className="flex-1 min-w-0 p-[22px] px-[18px] pb-[70px] md:py-8 md:px-10 md:pb-[90px] max-w-[1180px]">
          {children}
        </main>
      </div>
    </div>
  );
}
