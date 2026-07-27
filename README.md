# APD Studio

A compliance platform for Medicaid **Advance Planning Documents** — the federal
funding requests that unlock 90% FFP for Medicaid IT design and development and
75% FFP for operations.

The tool drafts, calculates, validates, and assembles. A named state official
reviews, edits, and signs. **We never auto-submit to CMS, and we never make an
attestation on a state's behalf.**

## Start here

| Read this | For |
|---|---|
| **`CLAUDE.md`** | How to work in this repo. Non-negotiable rules. The regulatory traps. |
| **`WORK-ORDER.md`** | What to build, in what order, and what is currently blocked. |
| `docs/regulatory/` | The primary-source research everything is built on. |
| `docs/specs/` | Module map, domain model, agent roster. |
| `docs/decisions/ADRs.md` | Why the non-obvious choices were made. |

```bash
pnpm install
pnpm verify     # typecheck + test
```

One private repository holds both the public marketing site (`apps/site`) and
the portal (`apps/web`). See `LICENSE` and `SECURITY.md`.

## Status

The regulatory spine is complete and audited. The application is not started.

| Layer | State |
|---|---|
| Source library (R1) | ✅ 40+ primary sources indexed with retrieval dates |
| Section schema (R2) | ✅ 28 sections, 124 validation rules, all 22 CEFs verbatim |
| Rule register (R3) | ✅ 74 rules, 58 at HIGH confidence, audited 2026-07-27 |
| Budget engine | ⬜ Specified and tested, unbuilt — **build this first** |
| Validators | ⬜ Eight families scaffolded, throwing `NotImplemented` |
| Agents | ⬜ Roster defined, one prompt written |
| Data layer | ⬜ Blocked on the reference scenario (R11) |
| Portal (`apps/web`) | ⬜ Blocked on R11 + R12 |
| Marketing site (`apps/site`) | ⬜ Not blocked — buildable any time |

## Legal posture

We provide regulatory analysis, not legal advice. We are not any state's
authorized representative. We claim no CMS endorsement, partnership, or
pre-approval — there is no such thing.
