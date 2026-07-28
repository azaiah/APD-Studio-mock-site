import { getRegulatoryCatalog } from "@/lib/regulatory";
import type { OpenQuestion, Correction } from "@apd-studio/rules";

export default function IntegrityPage() {
  const { conflicts, openGaps, openQuestions, corrections } = getRegulatoryCatalog();

  return (
    <>
      <div className="font-mono text-[10.5px] tracking-[0.13em] uppercase text-ink-3 mb-2">Integrity</div>
      <h1 className="text-navy text-[29px] font-[800] tracking-[0.03em] leading-[1.12] mt-1.5 mb-1.5">Conflicts & Open Questions</h1>
      <p className="text-[15px] text-ink-2 max-w-[64ch] m-0 mb-[26px]">
        The regulatory baseline is not perfectly internally consistent. CMS templates contradict CMS letters; primary sources contradict secondary guidance. We surface these tensions rather than hiding them.
      </p>

      <div className="space-y-[44px]">
        <section>
          <h2 className="text-[20px] font-bold text-ink mb-4 pb-2 border-b border-rule">Known Conflicts</h2>
          <div className="grid grid-cols-1 gap-4">
            {conflicts.map(c => (
              <div key={c.id} className="bg-card border border-rule flex flex-col md:flex-row">
                <div className="bg-paper p-4 md:w-[220px] md:border-r border-rule flex-none">
                  <div className="font-mono text-[12px] font-bold text-ink">{c.id}</div>
                  <div className={`font-mono text-[10px] mt-2 inline-block px-2 py-0.5 uppercase tracking-[0.05em] font-semibold ${c.severity === 'HIGH' ? 'bg-fail-bg text-fail border border-fail-rule' : c.severity === 'MEDIUM' ? 'bg-warn-bg text-warn border border-warn-rule' : 'bg-paper text-ink-2 border border-rule'}`}>
                    {c.severity} Severity
                  </div>
                </div>
                <div className="p-4 flex-1 space-y-3">
                  <h3 className="text-[15px] font-semibold text-ink m-0 mb-2">{c.title}</h3>
                  {c.detail && <p className="text-[13.5px] text-ink-2 m-0">{c.detail}</p>}
                  {c.assessment && <p className="text-[13.5px] text-ink-2 m-0">{c.assessment}</p>}
                  {[c.sourceA, c.sourceB, c.sourceC, c.sourceD]
                    .filter((source) => source !== undefined)
                    .map((source, index) => (
                      <blockquote key={index} className="m-0 border-l-[3px] border-blue bg-blue-50 p-3">
                        <div className="font-mono text-[10.5px] text-ink-3 mb-1">
                          {source?.document}
                        </div>
                        <p className="font-mono text-[12px] text-ink m-0 leading-relaxed">
                          {source?.quote ?? source?.finding}
                        </p>
                      </blockquote>
                    ))}
                  <div className="bg-pass-bg border border-pass-rule p-3 text-[13.5px] text-ink">
                    <b className="text-pass">Working resolution:</b> {c.resolution}
                  </div>
                  {(c.productImpact || c.additionalFinding || c.seeAlso) && (
                    <div className="text-[12.5px] text-ink-2 border-t border-rule-2 pt-3">
                      {c.productImpact ?? c.additionalFinding ?? c.seeAlso}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-ink mb-4 pb-2 border-b border-rule">Open Questions</h2>
          <div className="grid grid-cols-1 gap-4">
            {openQuestions.map((q: OpenQuestion) => {
              const isOpen = String(q.status).toUpperCase().startsWith('OPEN');
              return (
                <div key={q.id} className="bg-card border border-rule flex flex-col md:flex-row">
                  <div className="bg-paper p-4 md:w-[220px] md:border-r border-rule flex-none">
                    <div className="font-mono text-[12px] font-bold text-ink">{q.id}</div>
                    <div className={`font-mono text-[10px] mt-2 inline-block px-2 py-0.5 uppercase tracking-[0.05em] font-semibold ${isOpen ? 'bg-blue-50 text-navy border border-navy' : 'bg-pass-bg text-pass border border-pass-rule'}`}>
                      {q.status}
                    </div>
                  </div>
                  <div className="p-4 flex-1 space-y-3">
                    <h3 className="text-[15px] font-semibold text-ink m-0">{q.title}</h3>
                    {q.detail && <p className="text-[13.5px] text-ink m-0">{q.detail}</p>}
                    {q.resolution && (
                      <div className="bg-pass-bg border border-pass-rule p-3 text-[13.5px] text-ink">
                        <b className="text-pass">Resolution:</b> {q.resolution}
                      </div>
                    )}
                    {q.resolveBy && (
                      <div className="text-[13px] text-ink-2">
                        <b className="text-ink">Next step:</b> {q.resolveBy}
                      </div>
                    )}
                    {q.doNot && (
                      <div className="bg-warn-bg border border-warn-rule p-3 text-[13.5px] text-ink">
                        <b className="text-warn">Constraint:</b> {q.doNot}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-ink mb-4 pb-2 border-b border-rule">Gaps in Primary Sources</h2>
          <div className="grid grid-cols-1 gap-4">
            {openGaps.map(g => (
              <div key={g.id} className="bg-card border border-rule flex flex-col md:flex-row">
                <div className="bg-paper p-4 md:w-[220px] md:border-r border-rule flex-none">
                  <div className="font-mono text-[12px] font-bold text-ink">{g.id}</div>
                  <div className="font-mono text-[10px] mt-2 text-ink-3 uppercase tracking-[0.05em]">Source Gap</div>
                </div>
                <div className="p-4 flex-1 space-y-3">
                  <h3 className="text-[15px] font-semibold text-ink m-0">{g.item}</h3>
                  <div className="text-[13.5px] text-ink m-0"><b>Impact:</b> {g.impact}</div>
                  <div className="text-[13.5px] text-ink-2 bg-paper p-3 border-l-[3px] border-rule-2 m-0">{g.fix}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-ink mb-4 pb-2 border-b border-rule">Corrections to Prior Assumptions</h2>
          <div className="grid grid-cols-1 gap-4">
            {corrections.map((c: Correction, i: number) => (
              <div key={i} className="bg-card border border-rule p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-[14.5px] font-semibold text-ink line-through decoration-fail/50">{c.assumption}</div>
                  <div className={`font-mono text-[10px] ml-4 px-2 py-0.5 uppercase tracking-[0.05em] font-semibold ${c.severity === 'HIGH' ? 'bg-fail-bg text-fail border border-fail-rule' : c.severity === 'MEDIUM' ? 'bg-warn-bg text-warn border border-warn-rule' : 'bg-paper text-ink-2 border border-rule'}`}>
                    {c.severity}
                  </div>
                </div>
                <div className="text-[14px] text-ink bg-pass-bg border border-pass-rule p-3 border-l-[4px]">
                  {c.finding}
                  {c.ref && <span className="ml-2 font-mono text-[11px] text-pass font-semibold">{c.ref}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
