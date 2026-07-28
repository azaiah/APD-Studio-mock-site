import { getRegulatoryCatalog } from "@/lib/regulatory";
import CefClient from "./CefClient";

export default function CefPage() {
  const data = getRegulatoryCatalog();
  return <CefClient cefs={data.cefs} reapprovalSubset={data.reapprovalSubset} />;
}
