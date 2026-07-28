import ConsoleShell from "@/components/ConsoleShell";
import { getRegulatoryCatalog } from "@/lib/regulatory";

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const data = getRegulatoryCatalog();

  return (
    <ConsoleShell
      metadata={{
        ruleCount: data.rules.length,
        validatorCount: data.validationRuleCount,
        verifiedAsOf: data.meta.rules.verifiedAsOf,
        staleAfter: data.meta.rules.staleAfter,
        sectionCount: data.sections.length,
        cefCount: data.cefs.length,
        integrityCount:
          data.conflicts.length + data.openQuestions.length + data.openGaps.length,
      }}
    >
      {children}
    </ConsoleShell>
  );
}
