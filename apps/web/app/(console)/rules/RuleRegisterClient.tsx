"use client";

import { useState } from "react";
import { filterRules, type RuleCatalogItem } from "@/lib/rule-filter";

export default function RuleRegisterClient({
  rules,
  meta,
}: {
  rules: readonly RuleCatalogItem[];
  meta: {
    stale: boolean;
    rules: { verifiedAsOf: string };
  };
}) {
  const [search, setSearch] = useState("");
  const [trackFilter, setTrackFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [confidenceFilter, setConfidenceFilter] = useState("ALL");

  const filteredRules = filterRules(rules, {
    search,
    track: trackFilter,
    category: categoryFilter,
    confidence: confidenceFilter,
  });

  return (
    <>
      <div className="font-mono text-[10.5px] tracking-[0.13em] uppercase text-ink-3 mb-2">Knowledge core</div>
      <h1 className="text-navy text-[29px] font-[800] tracking-[-0.03em] leading-[1.12] mt-1.5 mb-1.5">Rule Register</h1>
      <p className="text-[15px] text-ink-2 max-w-[64ch] m-0 mb-[26px]">
        Search and filter the structured rules the Compliance Validator runs against. Every rule carries its primary-source citation and exact verbatim text. Rules marked UNVERIFIED or LOW confidence are research tracking and do not drive findings.
      </p>

      {meta.stale && (
        <div className="bg-warn-bg border border-warn-rule p-[10px_13px] text-[13.5px] my-2.5">
          <b className="text-warn">Register is stale.</b> The verified-as-of date ({meta.rules.verifiedAsOf}) is more than 90 days in the past. Do not use for new compliance logic until re-verified.
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-3.5 items-center">
        <input 
          type="text" 
          placeholder="Search citations or rule text..." 
          aria-label="Search rules"
          className="font-sans text-[13px] p-[7px_10px] border border-rule bg-card text-ink flex-[1_1_300px] min-w-[240px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          aria-label="Filter by funding track"
          className="font-sans text-[13px] p-[7px_10px] border border-rule bg-card text-ink flex-none max-w-[180px]"
          value={trackFilter}
          onChange={(e) => setTrackFilter(e.target.value)}
        >
          <option value="ALL">All tracks</option>
          <option value="ENHANCED">Enhanced only</option>
          <option value="REGULAR">Regular only</option>
          <option value="PROGRAM">Program level</option>
        </select>
        <select 
          aria-label="Filter by category"
          className="font-sans text-[13px] p-[7px_10px] border border-rule bg-card text-ink flex-none max-w-[180px]"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="ALL">All categories</option>
          <option value="prior-approval">Prior approval</option>
          <option value="apdu-trigger">APDU trigger</option>
          <option value="deadline">Deadline</option>
          <option value="match-rate">Match rate</option>
          <option value="condition">Condition</option>
        </select>
        <select 
          aria-label="Filter by confidence"
          className="font-sans text-[13px] p-[7px_10px] border border-rule bg-card text-ink flex-none max-w-[180px]"
          value={confidenceFilter}
          onChange={(e) => setConfidenceFilter(e.target.value)}
        >
          <option value="ALL">All confidence</option>
          <option value="HIGH">High only</option>
          <option value="MEDIUM">Medium only</option>
          <option value="LOW">Low only</option>
          <option value="UNVERIFIED">Unverified only</option>
        </select>
        <div className="font-mono text-[11px] text-ink-3 ml-auto">
          {filteredRules.length} rules
        </div>
      </div>

      <div className="border border-rule border-b-0 border-t-0">
        {filteredRules.map((r) => (
          <details key={r.id} className="group bg-card border-b border-rule">
            <summary className="list-none cursor-pointer p-[10px_16px] grid grid-cols-1 md:grid-cols-[232px_1fr_auto] gap-[18px] items-baseline hover:bg-paper group-open:bg-paper group-open:border-b group-open:border-rule-2 [&::-webkit-details-marker]:hidden">
              <div className="font-mono text-[12px] text-ink whitespace-nowrap overflow-hidden text-ellipsis">
                {r.citation}
              </div>
              <div className="text-[14px] text-ink-2 min-w-0 group-open:text-ink truncate md:whitespace-normal md:overflow-visible">
                {r.trigger || r.obligation || r.id}
              </div>
              <div className="flex gap-[5px] whitespace-nowrap hidden md:flex">
                <span className={`inline-block font-mono text-[9.5px] tracking-[0.08em] uppercase py-[2px] px-[6px] border border-rule whitespace-nowrap ${r.fundingTrack === 'ENHANCED' ? 'border-navy text-navy font-semibold bg-blue-50' : r.fundingTrack === 'REGULAR' ? 'border-dashed text-ink-3' : 'text-ink-2'}`}>
                  {r.fundingTrack}
                </span>
                {(r.confidence === 'LOW' || r.confidence === 'UNVERIFIED') && (
                  <span className="inline-block font-mono text-[9.5px] tracking-[0.08em] uppercase py-[2px] px-[6px] border border-fail-rule bg-fail-bg text-fail font-semibold whitespace-nowrap">
                    {r.confidence}
                  </span>
                )}
                {r.confidence === 'MEDIUM' && (
                  <span className="inline-block font-mono text-[9.5px] tracking-[0.08em] uppercase py-[2px] px-[6px] border border-warn-rule bg-warn-bg text-warn whitespace-nowrap">
                    MED
                  </span>
                )}
              </div>
            </summary>
            
            <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] gap-0 items-start">
              <div className="font-mono text-[11.5px] leading-[1.5] text-ink p-[14px_16px_14px_0] md:text-right border-b md:border-b-0 border-rule-2 md:border-r md:border-rule whitespace-nowrap overflow-hidden text-ellipsis px-4 md:px-0">
                {r.id}
                <s className="block no-underline text-ink-3 text-[10px] tracking-[0.05em] uppercase mt-[3px]">
                  {r.source || 'Primary'}
                </s>
              </div>
              <div className="p-[14px_20px] min-w-0 pb-[26px]">
                {r.verbatim && (
                  <>
                    <div className="font-mono text-[9.5px] tracking-[0.11em] uppercase text-ink-3 mb-[4px]">Verbatim text</div>
                    <div className="font-mono text-[12.5px] leading-[1.65] bg-blue-50 border-l-[3px] border-blue p-[12px_16px] m-[8px_0_16px] text-ink">
                      {r.verbatim}
                    </div>
                  </>
                )}
                
                <div className="grid grid-cols-1 gap-3">
                  {r.obligation && (
                    <div>
                      <div className="font-mono text-[9.5px] tracking-[0.11em] uppercase text-ink-3 mb-[4px]">Obligation</div>
                      <div className="text-[14px] text-ink">{r.obligation}</div>
                    </div>
                  )}
                  {r.trigger && (
                    <div>
                      <div className="font-mono text-[9.5px] tracking-[0.11em] uppercase text-ink-3 mb-[4px]">Trigger</div>
                      <div className="text-[14px] text-ink">{r.trigger}</div>
                    </div>
                  )}
                  {r.applicabilityWarning && (
                    <div className="bg-warn-bg border border-warn-rule p-[10px_13px] text-[13.5px] my-2">
                      <b className="text-warn font-semibold">Track boundary.</b> {r.applicabilityWarning}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
