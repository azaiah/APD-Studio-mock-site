# Marketing site preview

`index.html` — a working, self-contained prototype of the public site.
Open it in a browser.

Same design language as the console (see `apps/web/preview/README.md`): color
reserved for verdicts, the citation rail as the signature, Libre Franklin +
IBM Plex Mono.

## The thesis

The hero is one word in the CFR: **occurrence.** The As-Needed APDU clock runs
from the date a change happens, not the date someone notices — and nobody sends
a notice. That single word is the whole reason the Change Sentinel exists, and
it is the most legible way to explain the product to a state Medicaid CIO in
five seconds.

The provision is quoted verbatim under the headline, with its citation and the
verification date. That pattern repeats down the page: **claim, then proof.**

## Copy rules

- Plain, non-hyped, government-appropriate. No adjective a procurement officer
  would flag. State agencies buy from people who sound like they have read the
  rules.
- Every regulatory claim carries an inline citation.
- Quote CMS's conditional verbs rather than paraphrasing them. The December 2025
  bulletin says community-engagement systems costs "**may be eligible**" for
  enhanced match. Never render that as an entitlement.
- State consequences accurately. The 75%→50% reduction reaches non-compliant
  functionality or system components, not automatically the whole system.
- The "What it will not do" section is a selling section, not a disclaimer.
  Constraints are why a security reviewer and a State Officer can both get
  comfortable.

## Constraints

- WCAG 2.1 AA / Section 508. A compliance product with an inaccessible site is
  an own goal — and accessibility is itself a Condition for Enhanced Funding
  under 42 CFR 433.112(b)(12).
- No customer data, no auth, no database.
- Does not import from `@apd-studio/rules`. If copy needs a number, hardcode it
  **with its citation** and keep it out of the validation pipeline.
