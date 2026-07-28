import { getRegulatoryCatalog } from "@/lib/regulatory";
import RuleRegisterClient from "./RuleRegisterClient";

export default function RulesPage() {
  const data = getRegulatoryCatalog();
  return <RuleRegisterClient rules={data.rules} meta={data.meta} />;
}
