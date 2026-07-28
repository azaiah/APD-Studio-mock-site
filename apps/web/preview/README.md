# Portal preview

`index.html` — a working, self-contained prototype of the Compliance Console.
Open it in a browser. No install, no build step, no server.

**This is not a throwaway mockup.** It runs against the real regulatory data:
all 74 rules from the register, all 28 sections, all 22 Conditions for Enhanced
Funding, the seven documented conflicts, and the ten open questions — parsed
from the same JSON that `@apd-studio/rules` and `@apd-studio/templates` load.
When the register changes, regenerate this file rather than hand-editing it.

## What is real vs. staged

| Real | Staged |
|---|---|
| Every rule, citation, verbatim text, threshold, and deadline | The Franklin E&E findings — hand-written against real rule ids, pending the reference scenario (R11) |
| The 22 CEFs and the reapproval subset toggle | The Change Sentinel milestone dates |
| The section schema and required-by-type matrix | Nothing else |
| Conflicts and open questions | |

Franklin is a deliberately fictional state. Replace it with the R11 reference
scenario when that lands.

## Design decisions to carry into the Next.js build

1. **Color is reserved for compliance verdicts.** Red means failed, green means
   passed, amber means error. Nothing else in the interface is colored. This is
   why the report reads at a glance — and it is why the rule catalog is
   deliberately monochrome. A catalog is not a verdict.
2. **The citation rail is the signature.** Every regulatory claim hangs off a
   monospace citation in a fixed left column, the way a statute annotates itself
   in the margin. The citation is not a footnote here; it is the spine.
3. **Type carries the rest.** Libre Franklin — a Franklin Gothic descendant, the
   lineage of American civic signage — for everything human. IBM Plex Mono for
   anything a machine produced or a regulation numbered: citations, rule ids,
   money, dates.
4. **Never a false green.** The report shows a "not evaluated" count next to the
   passed count. CEF 2 is visibly unevaluated because Part 11 of the State
   Medicaid Manual is not indexed. That honesty is a feature, not a defect.
5. **Blocked modules stay visible in the nav, disabled**, under a heading that
   says what they are blocked on. A user should be able to see the shape of the
   whole product.

## Porting

Do not copy the CSS wholesale into React. Extract the token block at the top of
`<style>` into the design system first — the palette, the type scale, the rail
width — then build components against the tokens.
