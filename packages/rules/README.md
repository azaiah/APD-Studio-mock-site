# @apd-studio/rules

The Rule Register: every federal threshold, trigger, deadline, condition, and
attestation as versioned data with a citation.

**Do not put regulatory values in application code.** If you find `500000`
inline in a component, that is a bug — import it from here.

- `data/rule-register.json` — build-time copy of `docs/regulatory/rule-register.json` (R3).
  If the two drift, **the docs copy wins**; re-copy it.
- `src/schema.ts` — Zod schema. A rule with no citation cannot parse.
- `src/index.ts` — parses at module load, exports typed accessors.
- `test/rules.test.ts` — invariants, including the guard that keeps REGULAR-FFP
  thresholds from leaking onto the ENHANCED track.

## Confidence is not decoration

| Confidence | Meaning | May drive a finding shown to a state? |
|---|---|---|
| `HIGH` | Verbatim from the primary source | Yes |
| `MEDIUM` | Primary source via a summarizing layer | Yes, but re-verify before quoting |
| `LOW` | Secondary source | **No** |
| `UNVERIFIED` | No primary source retrieved | **No** |

`enforceableRules()` is the only list a validator may act on.

## Re-verification

`meta.verifiedAsOf` is **2026-07-27**; `meta.staleAfter` is **2026-10-25**.
`isStale()` returns true past that date. Do not ship a build that validates
against a stale register without re-running the verification pass — see
`docs/regulatory/VERIFICATION-LOG.md`.
