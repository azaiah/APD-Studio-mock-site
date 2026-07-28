# APD Studio — Design System

**Version 0.1 · 27 July 2026**
Format follows the DESIGN.md convention so Cursor and Claude Code can consume it directly. Read this before writing any UI.

> **On Refero templates.** We evaluated [styles.refero.design](https://styles.refero.design/). We adopted none of them wholesale, for reasons stated in *Provenance* at the bottom. We took Linear's structural discipline and Anthropic's editorial link conventions, and rejected both palettes — the brand palette below is derived from the official APD Studio logo.

---

## The one rule

**Color is reserved for compliance verdicts.**

Red means a finding failed. Amber means an error. Green means passed or resolved. Brand navy and blue own the chrome — masthead, navigation, buttons, headings, links, focus. **Nothing else in the interface is colored.**

This is why the report reads at a glance, and it is why the rule catalog is deliberately monochrome. A catalog is not a verdict. If you find yourself reaching for a color to make something feel important, use weight, space, or a rule instead.

---

## Color

### Brand — from the official logo

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#152B4D` | Primary brand. Masthead rule, buttons, h1/h2, active nav, stat strip, footer. |
| `--navy-900` | `#0C1A30` | Button hover, deepest chrome. |
| `--navy-600` | `#2B4A78` | Secondary chrome, borders on navy surfaces. |
| `--blue` | `#5890C6` | Secondary brand. Verbatim-quote rules, accents, data emphasis. |
| `--blue-200` | `#BFD6EC` | Tinted borders. |
| `--blue-50` | `#EAF1F9` | Verbatim quote background, enhanced-track chip fill. |
| `--accent` | `#2C5C96` | Interaction only — inline links, focus rings. |

### Neutrals

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#EDF0F4` | Page canvas. |
| `--card` | `#FFFFFF` | Surfaces, rows, panels. |
| `--ink` | `#101827` | Primary text. |
| `--ink-2` | `#4E5A6B` | Secondary text, body copy in dense views. |
| `--ink-3` | `#7C8899` | Labels, eyebrows, metadata. |
| `--rule` | `#D2DAE4` | Structural borders. |
| `--rule-2` | `#E3E9F0` | Hairlines inside a component. |

### Verdicts — findings only

| Token | Hex | Meaning |
|---|---|---|
| `--fail` / `--fail-bg` / `--fail-rule` | `#96262B` / `#FBF0F0` / `#E3C2C3` | Blocker. Do not submit. |
| `--warn` / `--warn-bg` / `--warn-rule` | `#8A6116` / `#FBF5E9` / `#E7D6B4` | Error or warning. |
| `--pass` / `--pass-bg` / `--pass-rule` | `#1C6349` / `#EDF5F1` / `#BFD9CD` | Passed, or a remediation instruction. |
| `--info` / `--info-bg` / `--info-rule` | `#3F4B52` / `#F1F3F4` / `#D6DBDD` | Not evaluated. |

All four are **desaturated and stamped** — never traffic-light candy. They must remain legible against `--card` and distinguishable from `--navy` at a glance and in grayscale.

---

## Typography

| Family | Role | Fallbacks |
|---|---|---|
| **Libre Franklin** | Everything human — headings, body, UI, navigation | `system-ui, -apple-system, sans-serif` |
| **IBM Plex Mono** | Everything a machine produced or a regulation numbered — citations, rule ids, money, dates, metric ids, eyebrows | `ui-monospace, Menlo, monospace` |

**Why Libre Franklin.** It descends from Franklin Gothic, the lineage of American civic signage and government documents. That is a subject-derived choice, not a default. It also carries weight 900 without looking decorative, which the hero needs.

**Why the mono split.** In this product a citation *is* a machine-readable identifier — `§ 95.611(c)(2)(ii)(A)` is as much a key as a phrase. Setting it in mono is accurate, not stylistic. The rule extends: if a value is looked up, computed, or numbered by a regulation, it is mono.

### Scale

| Role | Size | Weight | Letter-spacing | Notes |
|---|---|---|---|---|
| `hero` | `clamp(38px, 5.6vw, 68px)` | 900 | `-.042em` | Site only. Max 17ch. |
| `h1` | 29px | 800 | `-.03em` | Console page title. `--navy`. |
| `h2` | 17px (console) / `clamp(26px,3.2vw,38px)` (site) | 700 / 800 | `-.017em` / `-.032em` | `--navy`. |
| `body` | 15px (console) / 16px (site) | 400 | normal | line-height 1.55 / 1.6 |
| `lede` | 15px (console) / 18px (site) | 400 | normal | `--ink-2`, max 62–64ch |
| `mono-body` | 12–12.5px | 400 | normal | Citations, verbatim, table data |
| `eyebrow` | 10–11px | 400 | `.11–.14em` | Mono, uppercase, `--ink-3` |
| `label` | 9.5px | 600 | `.1em` | Mono, uppercase — `dt`, severity, chips |

Never exceed weight 900, and never use weight above 600 for body copy. Tight negative tracking on display sizes only; body stays at normal.

---

## Spacing & shape

**Base unit: 4px.** Scale: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 76 · 96`.

| Metric | Value |
|---|---|
| Site max width | 1120px |
| Console main max width | 1180px |
| Console sidebar | 248px |
| Citation rail | 210px (console) / 224px (site) |
| Section gap (site) | 76px |
| Card padding | 14–26px |

**Border radius: `0` everywhere.** This is deliberate. The product's subject is federal forms, tables, and stamped determinations. Rounded corners soften a document into an app, and the register we are rendering is not soft. The one exception is nothing — there is no exception.

**No shadows. Ever.** Elevate with surface tone (`--card` on `--paper`) and 1px borders. A shadow in this interface means someone imported a component library without reading this file.

---

## Signature: the citation rail

Every regulatory claim hangs off a monospace citation in a fixed left column, the way a statute annotates itself in the margin.

```
┌───────────────────┬──────────────────────────────────────┐
│  § 433.112(b)(19) │  Appendix C attests "Yes" to CEF 19, │
│           42 CFR  │  but the personnel table names       │
│                   │  nobody.                             │
└───────────────────┴──────────────────────────────────────┘
     mono, right-aligned      Libre Franklin
     border-right 1px         border-bottom 1px --rule-2
```

```css
.rail{display:grid; grid-template-columns:var(--rail) 1fr}
.rail > .cite{
  font-family:var(--mono); font-size:11.5px; text-align:right;
  padding:14px 16px 14px 0; border-right:1px solid var(--rule);
}
.rail > .cite s{           /* the source, under the section */
  display:block; text-decoration:none; font-size:10px;
  letter-spacing:.05em; text-transform:uppercase; color:var(--ink-3);
}
.rail > .body{padding:14px 0 14px 20px}
```

The citation is **not a footnote**. It is the spine the content is attached to, and it collapses to a stacked label above the content below 960px. Use the rail in findings, rule detail, the CEF list, conflicts, open questions, and the site's "how it works" section. Consistency across surfaces is what makes it a signature rather than a motif.

---

## Components

### Verdict stamp
Solid verdict color, white text, 168px fixed width, sits flush against the summary panel. `RED` / `YELLOW` / `GREEN` at 34px weight 900, with a mono caption below (`DO NOT SUBMIT`). Never rotate it, never add texture — it is a determination, not a rubber-stamp graphic.

### Finding
`<details>` with a 3px left border in the verdict color. Summary is a three-column grid: severity label (mono, 78px) · title (600) · location (mono, `--ink-3`). Body uses the citation rail. Every finding carries **What's wrong · Why it matters · How to fix it**, with the fix in a `--pass-bg` panel — the only place green appears outside a passing verdict, because a fix is the path to passing.

### Rule catalog row
Monochrome. Grid: citation (mono, 232px) · trigger · track chip. Enhanced-track chips are solid-bordered navy on `--blue-50`; regular-track chips are **dashed and muted**, because applying a regular-FFP threshold to enhanced work is the most expensive error in this domain and the visual weight should reflect that.

### Chips
Mono, 9.5px, uppercase, 1px border, `0` radius, no fill except enhanced-track and confidence states. `UNVERIFIED` and `LOW` use `--fail` treatment — those rules are research, not law, and must look inert.

### Buttons
`--navy` fill, white text, 1px `--navy` border, `0` radius, weight 600. Ghost variant is transparent with `--rule` border and `--navy` text, hovering to `--blue-50`. **One filled button per view**, on the single most consequential action.

### Inline links
`--accent` with a persistent underline. Editorial convention, not hover-reveal — in a document product, a link that hides until hovered is a link a reviewer misses.

---

## Motion

Almost none. Findings rise 5px over 340ms on a `cubic-bezier(.2,.7,.3,1)` with a 26ms stagger, once, on load. Nothing else animates.

`@media (prefers-reduced-motion:reduce)` disables it entirely — not reduced, disabled.

A compliance console that animates is a compliance console someone is waiting on.

---

## Accessibility — a requirement, not a pass

WCAG 2.1 AA / Section 508. This is also a Condition for Enhanced Funding under **42 CFR 433.112(b)(12)**, so an inaccessible APD Studio is an argument against APD Studio.

- Visible focus on every interactive element: `2px solid var(--accent)`, `outline-offset: 2px`. Never `outline: none`.
- Skip link to `#main` as the first focusable element.
- Semantic landmarks: `header`, `nav[aria-label]`, `main`. One `h1` per view.
- `aria-current="page"` on the active nav item.
- **Verdict never communicated by color alone** — every finding also carries a text severity label. Check the report in grayscale before shipping it.
- Contrast: `--ink-3` on `--card` is the floor. Do not go lighter.
- All controls labelled. Search inputs get `aria-label`.
- Playwright accessibility assertions in E2E, not a manual checklist.

---

## Do / Don't

**Do**
- Reserve red, amber, and green for verdicts and nothing else
- Set citations, ids, money, and dates in IBM Plex Mono
- Elevate with 1px borders and surface tone
- Keep `border-radius: 0`
- Show a "not evaluated" count next to the passed count
- Keep blocked modules visible in the nav, disabled, under a heading saying what blocks them
- State funding consequences accurately — the 75%→50% reduction reaches non-compliant functionality or components, not the whole system

**Don't**
- Color a rule catalog row by severity — a catalog is not a verdict
- Use box-shadows, gradients, glows, or rounded corners
- Introduce a fifth accent color
- Use bold weight to substitute for hierarchy the type scale already provides
- Animate anything beyond the finding entrance
- Let a marketing adjective into product copy — a procurement officer will flag it
- Render an unevaluated check as a pass

---

## Provenance — why not a Refero template

[Refero Styles](https://styles.refero.design/) catalogs DESIGN.md files extracted from real product sites. We read them. Eight of the twelve featured — [Linear](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1), Huly, Factory, Resend, LaunchDarkly, Authkit, Dala, Frame.io — are midnight-canvas developer aesthetics with a single neon accent. That register is wrong for an audience of state Medicaid CIOs, procurement officers, and CMS State Officers, and a neon accent would actively fight the red/amber/green verdicts that carry the product's meaning.

**What we took from Linear:** the structural discipline. 4px base grid. Hairline borders instead of shadows. Tight negative letter-spacing on display sizes. A hard cap on font weights. One accent reserved for the single primary action per view. Linear's *structure* is excellent; its palette is for a different customer.

**What we took from [Anthropic](https://styles.refero.design/style/d469cba4-c448-4a43-a033-883f8bfcdc42):** persistent underlines on inline links, and elevating through surface tone and 1px borders rather than shadows.

**What we rejected from Anthropic:** the entire palette. Its DESIGN.md states plainly, *"Don't introduce cool grays, blues, or colors outside warm earth-tone family."* APD Studio's logo is navy and blue. Adopting that system would mean discarding the brand. Its 20px serif body is also editorial, which is wrong for a dense operational console.

**What we kept that neither has:** the citation rail, and the rule that color means verdict and nothing else. Both come from the subject rather than from a reference, which is the point.

---

## Sources

- [Refero Styles — DESIGN.md examples](https://styles.refero.design/)
- [Linear design system](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1)
- [Anthropic design system](https://styles.refero.design/style/d469cba4-c448-4a43-a033-883f8bfcdc42)
- Working references: `apps/web/preview/index.html`, `apps/site/preview/index.html`
