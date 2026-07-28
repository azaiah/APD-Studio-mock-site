export type RuleFilters = {
  search: string;
  track: string;
  category: string;
  confidence: string;
};

export type RuleCatalogItem = {
  id: string;
  category: string;
  fundingTrack: string;
  citation: string;
  confidence: string;
  source?: string | undefined;
  trigger?: string | undefined;
  obligation?: string | null | undefined;
  verbatim?: string | undefined;
  applicabilityWarning?: string | undefined;
};

/** Apply the catalog filters without changing the source register. */
export function filterRules(
  rules: readonly RuleCatalogItem[],
  filters: RuleFilters,
): RuleCatalogItem[] {
  const query = filters.search.trim().toLowerCase();

  return rules.filter((rule) => {
    const matchesTrack =
      filters.track === "ALL" ||
      rule.fundingTrack === filters.track ||
      rule.fundingTrack === "BOTH";
    const matchesCategory = filters.category === "ALL" || rule.category === filters.category;
    const matchesConfidence =
      filters.confidence === "ALL" || rule.confidence === filters.confidence;
    const searchableText = [
      rule.id,
      rule.citation,
      rule.trigger,
      rule.obligation,
      rule.verbatim,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      matchesTrack &&
      matchesCategory &&
      matchesConfidence &&
      (!query || searchableText.includes(query))
    );
  });
}
