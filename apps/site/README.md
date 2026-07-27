# apps/site — public marketing site

Not built yet. Nothing here is blocked; this can be built any time.

## What goes here

The public-facing site: what APD Studio does, who it is for, the two buyer
paths (state agencies, and the SIs and consultancies who already hold state
contracts), and a way to start a conversation.

## Voice

Read the tone rules before writing a word of copy. State agencies buy from
people who sound like they have read the rules, not from people who sound like a
pitch deck.

- Plain, non-hyped, government-appropriate. No marketing adjectives a
  procurement officer would flag.
- Every regulatory claim carries an inline citation, same as everywhere else in
  this repo. If the site says "60 days," it says which section.
- **State the funding consequences accurately.** The 75%→50% reduction reaches
  "expenditures related to the operations of non-compliant functionality or
  system components" — not automatically the whole system. The accurate version
  is alarming enough.
- Say plainly: we provide regulatory analysis, not legal advice; we are not any
  state's authorized representative; we claim no CMS endorsement, partnership,
  or pre-approval, because there is no such thing.
- Never imply the product files anything with CMS. It does not, by design.

## Constraints

- Same accessibility bar as the portal: WCAG 2.1 AA / Section 508. A compliance
  product with an inaccessible marketing site is an own goal.
- No customer data, no auth, no database. Static or near-static.
- Does not import from `@apd-studio/rules`. If the site needs a number, hardcode
  it in copy **with its citation** and keep it out of the rule pipeline — the
  register is for validation, not for marketing.
