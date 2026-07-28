import { getRegulatoryCatalog } from "@/lib/regulatory";

export default function SectionsPage() {
  const data = getRegulatoryCatalog();
  const { sections, flagshipRules } = data;

  return (
    <>
      <div className="font-mono text-[10.5px] tracking-[0.13em] uppercase text-ink-3 mb-2">Knowledge core</div>
      <h1 className="text-navy text-[29px] font-[800] tracking-[-0.03em] leading-[1.12] mt-1.5 mb-1.5">Section Schema</h1>
      <p className="text-[15px] text-ink-2 max-w-[64ch] m-0 mb-[26px]">
        The 28 structural components of a modern MES APD, mapped to their requiring regulations and their flagship compliance checks.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8 items-start">
        <div
          className="overflow-x-auto"
          role="region"
          aria-label="Required sections by submission type"
          tabIndex={0}
        >
          <table className="w-full border-collapse bg-card border border-rule text-[13.5px]">
            <thead>
              <tr>
                <th className="text-left font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase text-ink-3 p-[9px_12px] border-b border-rule whitespace-nowrap">Section</th>
                <th className="text-left font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase text-ink-3 p-[9px_12px] border-b border-rule whitespace-nowrap">PAPD</th>
                <th className="text-left font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase text-ink-3 p-[9px_12px] border-b border-rule whitespace-nowrap">IAPD</th>
                <th className="text-left font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase text-ink-3 p-[9px_12px] border-b border-rule whitespace-nowrap">APDU (An/AN)</th>
                <th className="text-left font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase text-ink-3 p-[9px_12px] border-b border-rule whitespace-nowrap">OAPD</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((s) => (
                <tr key={s.id} className="hover:bg-paper group">
                  <td className="p-[9px_12px] border-b border-rule-2 align-top group-last:border-b-0">
                    <div className="font-semibold text-ink">{s.number} {s.title}</div>
                    <div className="font-mono text-[11px] text-ink-3 mt-1">
                      {s.id} {s.conflictRefs && s.conflictRefs.length > 0 && <span className="text-warn ml-2">Has known conflicts</span>}
                    </div>
                  </td>
                  <td className="p-[9px_12px] border-b border-rule-2 align-top group-last:border-b-0 text-[12.5px] text-ink-2">
                    {s.documentType === "MES_APD" ? (s.requiredBy?.PAPD || "—") : "N/A"}
                  </td>
                  <td className="p-[9px_12px] border-b border-rule-2 align-top group-last:border-b-0 text-[12.5px] text-ink-2">
                    {s.documentType === "MES_APD" ? (s.requiredBy?.IAPD || "—") : "N/A"}
                  </td>
                  <td className="p-[9px_12px] border-b border-rule-2 align-top group-last:border-b-0 text-[12.5px] text-ink-2">
                    {s.documentType === "MES_APD" ? (s.requiredBy?.APDU_ANNUAL || "—") : "N/A"}
                  </td>
                  <td className="p-[9px_12px] border-b border-rule-2 align-top group-last:border-b-0 text-[12.5px] text-ink-2">
                    {s.documentType === "MES_OAPD" ? "Required" : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-paper p-5 border border-rule">
          <h3 className="font-mono text-[10.5px] font-semibold tracking-[0.1em] uppercase text-ink-3 m-0 mb-4">Flagship Validation</h3>
          <p className="text-[13px] text-ink-2 mb-4">
            The core compliance checks driving the automated review.
          </p>
          <div className="flex flex-col gap-3">
            {flagshipRules.map((r) => (
              <div key={r.id} className="bg-card border border-rule p-3 text-[13px]">
                <div className="font-mono text-[10px] text-ink-3 mb-1">{r.id}</div>
                <div className="text-ink font-medium leading-snug">{r.check}</div>
                {r.basis && <div className="text-ink-2 text-[12px] mt-2 border-t border-rule-2 pt-2">{r.basis}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
