"use client";

import { useState } from "react";
import type { CefCondition, ReapprovalSubset } from "@apd-studio/templates";

export default function CefClient({ 
  cefs, 
  reapprovalSubset 
}: { 
  cefs: CefCondition[]; 
  reapprovalSubset: ReapprovalSubset; 
}) {
  const [mode, setMode] = useState<"initial" | "reapproval">("initial");

  const visibleCefs = cefs.filter(c => {
    if (mode === "initial") return c.appliesAtInitialApproval;
    return c.appliesAtReapproval;
  });

  const excludedCefs = cefs.filter(c => {
    if (mode === "reapproval") return !c.appliesAtReapproval;
    return false;
  });

  return (
    <>
      <div className="font-mono text-[10.5px] tracking-[0.13em] uppercase text-ink-3 mb-2">Knowledge core</div>
      <h1 className="text-navy text-[29px] font-[800] tracking-[-0.03em] leading-[1.12] mt-1.5 mb-1.5">Conditions for Enhanced Funding</h1>
      <p className="text-[15px] text-ink-2 max-w-[64ch] m-0 mb-[26px]">
        The 22 conditions under 42 CFR 433.112(b) that govern 90% and 75% FFP. The required subset drops from 22 to 19 at reapproval.
      </p>

      <div className="flex bg-paper p-1 border border-rule w-fit mb-6 rounded-none">
        <button 
          className={`px-4 py-2 text-[13.5px] font-sans font-medium transition-colors ${mode === 'initial' ? 'bg-card border border-rule text-ink' : 'text-ink-2 hover:text-ink border border-transparent'}`}
          onClick={() => setMode('initial')}
          aria-pressed={mode === 'initial'}
        >
          Initial Approval (22 conditions)
        </button>
        <button 
          className={`px-4 py-2 text-[13.5px] font-sans font-medium transition-colors ${mode === 'reapproval' ? 'bg-card border border-rule text-ink' : 'text-ink-2 hover:text-ink border border-transparent'}`}
          onClick={() => setMode('reapproval')}
          aria-pressed={mode === 'reapproval'}
        >
          Reapproval (19 conditions)
        </button>
      </div>

      {mode === 'reapproval' && (
        <div className="bg-info-bg border border-info-rule p-4 mb-6 text-[14px]">
          <div className="font-semibold text-info mb-2">The Reapproval Asymmetry</div>
          <div className="text-ink-2 mb-2">{reapprovalSubset.productNote}</div>
          <q className="block font-mono text-[12px] leading-[1.6] text-ink border-l-[3px] border-info pl-3 my-3 bg-white/50 py-2">
            {reapprovalSubset.quote}
          </q>
          <div className="font-mono text-[11px] text-ink-3 mt-1">— {reapprovalSubset.citation}</div>
          
          <div className="mt-4 border-t border-info-rule pt-3">
            <b className="text-ink text-[13px] uppercase tracking-[0.05em] font-mono">Dropped at reapproval:</b>
            <ul className="mt-2 space-y-1 pl-5 text-[13.5px] list-disc marker:text-info">
              {excludedCefs.map(c => (
                <li key={c.ref} className="text-ink-2">
                  <span className="font-mono text-ink mr-2">{c.ref}</span> {c.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {visibleCefs.map(c => (
          <div key={c.ref} data-cef-condition className="bg-card border border-rule p-5 flex flex-col md:flex-row gap-5 items-start">
            <div className="w-[80px] flex-none font-mono text-[16px] font-bold text-navy pt-0.5">
              {c.ref}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[11px] text-ink-3 mb-2">{c.citation}</div>
              <div className="text-[14.5px] text-ink leading-relaxed">{c.text}</div>
              {c.note && (
                <div className="mt-3 text-[13px] text-ink-2 bg-paper p-3 border-l-2 border-rule-2">
                  {c.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
