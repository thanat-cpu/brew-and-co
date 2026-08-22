# brew&co — Style Guide

Derived from [`reference/Coffee.png`](./reference/Coffee.png). Tokens referenced
below live in [`tokens.css`](./tokens.css); component usage lives in
[`components.md`](./components.md).

## 1. Brand thesis

brew&co reads like a specialty roastery's own label stock, not a generic
"coffee shop" template: deep forest-green ink on warm cream paper, a stamped
wax-seal mark for provenance, condensed structural-steel display type for
headlines, and photography treated like specimens — dropped into thick paper
frames, not floating in soft shadows. The site should feel **confident,
editorial, and slightly industrial** — closer to a roaster's batch label or a
zine than a lifestyle café mood board.

Two devices carry that identity everywhere and are treated as the system's
signature (see §7):

- **The Roast Stamp** — a rotated circular seal, the way a roastery stamps a
  bag with its mark and batch info.
- **The Specimen Frame** — a thick, evenly-bordered frame around every
  photograph, as if it were mounted on cardstock for a catalog.

## 2. Design principles

- **Flat, color-blocked, not shadowed.** Depth comes from adjacent fields of
  flat color (cream / ink / gold / sage), not drop shadows. Reserve
  `shadow-raised` for transient overlays (menus, popovers) — never for cards.
- **Condensed display type is the loudest thing on the page.** Everything
  else — body copy, labels, buttons — stays quiet so headlines can be huge.
- **Uppercase + wide tracking = metadata, not headlines.** Reserve tracked
  uppercase for eyebrows, nav, tags, and micro-labels. Headlines are set in
  the display face's own natural (mixed-case or single-case) form, never
  artificially letter-spaced.
- **Asymmetry over symmetry.** The reference's grid is deliberately uneven —
  a dominant hero column against a stacked, denser secondary column. Avoid
  centered, evenly-split hero layouts.
- **One accent block per view.** Gold appears as a single deliberate panel or
  small point accents (stars, focus rings) — never as a background wash
  across a whole page.

## 3. Color

| Token | Hex | Role |
|---|---|---|
| `cream` | `#F5ECDD` | Default page background |
| `cream-soft` | `#EFE3CF` | Alternating section background, subtle hover on cream |
| `paper` | `#FFFFFF` | Button fill, specimen-frame border, raised card fill |
| `ink` | `#16301F` | Headlines, primary body text, dark filled surfaces |
| `ink-soft` | `#2F4E3B` | Secondary text, icons, nav links |
| `ink-muted` | `#5B6F60` | Captions, timestamps, disabled text |
| `gold` | `#E4A73A` | Single accent panel, star rating, focus ring |
| `gold-strong` | `#C98A1F` | Hover/pressed state for gold elements |
| `sage` | `#A7B3A1` | Product-photo tile background |
| `sage-soft` | `#C3CBBD` | Hover/alt state for sage tiles |
| `espresso` | `#2B1B13` | Roast Stamp fill, deep dark accent blocks |
| `signal` | `#B5482D` | Form error/alert text only — introduced for real forms (e.g. Contact us), used nowhere else |

**Usage rules**

- Every page needs cream, ink, and *one* of {gold, sage, espresso} as its
  accent for that section — not all three at once.
- `signal` exists purely for validation states. It doesn't appear in the
  reference; it's a practical addition so error messaging doesn't fall back
  to a stock red that clashes with the palette.
- Don't tint neutrals with cool gray — every "gray" in this system leans
  green (`ink-muted`) or warm (`cream-soft`), never a true desaturated gray.

**Contrast (WCAG 2.1)**

- `ink` on `cream`: **11.4:1** — passes AAA for any text size.
- `ink` on `gold`: **6.3:1** — passes AA for normal text; reserve for large,
  bold display text (as the reference does) rather than small captions.
- `paper` fill + `ink` text (buttons): comfortably >10:1.
- Never place `gold` text on `cream`, or `sage` text on `cream` — both drop
  well below AA. Gold and sage are backgrounds/fills, not text colors.

## 4. Typography

**Pairing:** a structural, ultra-condensed display face for headlines against
a warm, humanist grotesk for everything people read at length. Avoid Anton /
Bebas Neue for the display role — both are the default reach for "bold
condensed coffee brand" and would make this system indistinguishable from a
template.

| Role | Family | Weight | Token |
|---|---|---|---|
| Display (hero, section titles) | **Big Shoulders** | 900 | `font-display` |
| Display, small sizes (card/nav titles) | **Big Shoulders** (same family, pinned lighter weight) | 800 | `font-display-sm` |
| Body / UI | **Schibsted Grotesk** | 400 / 500 / 600 | `font-body` |
| Numeric / data (prices, ratings, batch marks) | **IBM Plex Mono** | 500 | `font-mono-data` |

All three load via `next/font/google`, self-hosted, following the same
`variable` pattern already used for Geist in `app/layout.tsx` — see the setup
note at the top of `tokens.css`.

- **Big Shoulders** (opsz-aware, structural, girder-like flat terminals) reads
  as industrial/roastery rather than "generic condensed sans" — it earns the
  bold cut-corner look of the reference without reaching for the two most
  overused condensed display fonts in AI-generated design.
- **Schibsted Grotesk** is warm and slightly rounded at small sizes, keeping
  body copy from feeling as cold as the display face — it's also distinct
  enough from Geist (already in the project for code/UI chrome) to signal
  "this is brand voice," not "this is the framework default."
- **IBM Plex Mono** is reserved for anything that reads like a stamped
  number: prices, review counts (`4.7/5 · 980 REVIEWS`), the `/2025` page
  marker, batch/lot numbers. This is a deliberate nod to how roasteries
  actually print batch codes on bags — not a generic "use a mono font for
  numbers" habit.

**Scale**

| Token | Size | Use |
|---|---|---|
| `text-hero` | `clamp(2.75rem, …, 7.5rem)` | Page hero headline ("Coffee Break") |
| `text-display` | `clamp(2rem, …, 3.5rem)` | Section headings ("Explore Our Menu", "Visit shops") |
| `text-title` | `1.375rem` | Card/product titles, set in `font-display-sm` |
| `text-body-lg` | `1.125rem` | Hero/intro paragraphs |
| `text-body` (Tailwind default `text-base`) | `1rem` | Standard body copy |
| `text-caption` | `0.875rem` | Secondary copy, form hints |
| `text-micro` | `0.6875rem` | Eyebrows, tags, nav — always uppercase, always `tracking-wider` |

**Rules**

- Display headlines never take extra `tracking-*` — the face is condensed
  enough on its own; artificial tightening or widening breaks its rhythm.
- Micro-labels are always uppercase with `tracking-wide` (buttons, nav) or
  `tracking-wider` (eyebrows/tags), and always `font-body`, never the display
  face — the display face is reserved for headline-scale moments only.
- Don't mix more than these four faces on one page.

## 5. Layout & spacing

- **Grid:** an asymmetric two-column split on desktop — a dominant column
  (~60%) for the hero/specimen photography, a denser stacked column (~40%)
  for product grids, testimonials, and CTA blocks. Collapse to a single
  column, hero first, below the `md` breakpoint.
- **Radius scale** (`tokens.css`): `sm` 8px (chips/tags) → `md` 14px (inputs)
  → `lg` 20px (product tiles) → `xl` 28px (standard cards/panels) → `2xl`
  40px (large photo frames) → `3xl` 48px (full-bleed hero panel). Buttons and
  the Roast Stamp use Tailwind's built-in `rounded-full`.
- **Section rhythm:** generous, editorial vertical spacing between sections —
  target `clamp(4rem, 3rem + 4vw, 7rem)` (`py-24` to `py-28` in practice)
  rather than the tighter `py-12`/`py-16` common in SaaS-style pages.
- **Borders over shadows:** the Specimen Frame and cards separate from their
  background with a `paper` or `line` border, not elevation. Reserve
  `shadow-raised` for floating UI (dropdown menus, toasts).

## 6. Imagery & photography

- Product and lifestyle shots are always mounted in a **Specimen Frame**
  (thick `paper` border, generous corner radius) — see §7 and
  `components.md`.
- Product tiles sit on a flat `sage` field, not a photographic background —
  this is what gives the product grid its catalog/specimen feel rather than
  a lifestyle-photography feel.
- Location/shop photography can bleed full-width with a `scrim` overlay for
  caption legibility, and gets a small circular arrow-button affordance
  (see Shop Card in `components.md`) rather than a text link.

## 7. Signature elements

These two devices are this system's fingerprint — spend restraint everywhere
else so these read as intentional, not incidental.

1. **Roast Stamp** — a circular badge (`espresso` fill, `cream` or `paper`
   text), rotated a few degrees off-axis, used as a certification/provenance
   mark near the hero and on featured products. Never straightened to 0°;
   never used more than once per view.
2. **Specimen Frame** — any photograph gets a thick, even `paper` border and
   a large radius, as if pinned to a card. This is the one "photographic
   chrome" device in the system — don't add drop shadows, gradients, or
   vignettes on top of it.

## 8. Accessibility & responsiveness

- Maintain the contrast pairs in §3; never introduce gold-on-cream or
  sage-on-cream text.
- All interactive elements get a visible focus ring using `gold` at 2px
  offset — the one place gold is allowed to appear as an outline rather than
  a fill.
- Respect `prefers-reduced-motion`: the Roast Stamp's idle rotation (if
  animated at all) and any hover lift/scale must fall back to an instant
  state change.
- Design mobile-first for the stacked single-column layout; the asymmetric
  two-column grid is a `md:`+ enhancement, not the base case.

## 9. File map

- `style-guide.md` — this file: rationale, palette, type, layout rules.
- `tokens.css` — the machine-readable Tailwind v4 `@theme` source.
- `components.md` — per-component anatomy, variants, states, and JSX/Tailwind
  usage built on top of these tokens.
- `reference/Coffee.png` — the original mood reference these docs derive from.
