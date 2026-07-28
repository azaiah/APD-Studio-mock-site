import { describe, expect, it } from "vitest";
import { rules } from "@apd-studio/rules";
import { filterRules } from "./rule-filter";

describe("filterRules", () => {
  it("searches rule ids, citations, and regulatory text", () => {
    const result = filterRules(rules, {
      search: "95.611",
      track: "ALL",
      category: "ALL",
      confidence: "ALL",
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((rule) => JSON.stringify(rule).includes("95.611"))).toBe(true);
  });

  it("does not leak regular-only rules into the enhanced filter", () => {
    const result = filterRules(rules, {
      search: "",
      track: "ENHANCED",
      category: "ALL",
      confidence: "ALL",
    });

    expect(result.some((rule) => rule.fundingTrack === "REGULAR")).toBe(false);
  });

  it("combines category and confidence filters", () => {
    const result = filterRules(rules, {
      search: "",
      track: "ALL",
      category: "condition",
      confidence: "HIGH",
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((rule) => rule.category === "condition")).toBe(true);
    expect(result.every((rule) => rule.confidence === "HIGH")).toBe(true);
  });
});
