# brew&co Design System

A complete design system derived from [`reference/Coffee.png`](./reference/Coffee.png),
built for this project's actual stack: Next.js 16 (App Router), React 19, and
Tailwind CSS v4's CSS-first `@theme` tokens.

| Doc | Contents |
|---|---|
| [`style-guide.md`](./style-guide.md) | Brand thesis, design principles, color/type/layout rationale, accessibility rules |
| [`tokens.css`](./tokens.css) | Canonical `@theme` token source — colors, type scale, radius, motion |
| [`components.md`](./components.md) | 12 component specs with anatomy, variants, states, and React/Tailwind snippets |

## Quick start for implementation

1. Read `style-guide.md` first — it explains *why* each token exists, not
   just its value.
2. Add the three new typefaces (`Big Shoulders`, pinned at two weights, for
   display; `Schibsted Grotesk` for body; `IBM Plex Mono` for numeric data)
   to `app/layout.tsx` via `next/font/google`, following the setup comment
   at the top of `tokens.css`.
3. Merge `tokens.css` into `app/globals.css` in place of the current
   `--background`/`--foreground` block.
4. Build components from `components.md` — they're already written against
   the token-backed Tailwind utilities (`bg-cream`, `font-display`,
   `rounded-2xl`, …), so no translation step is needed.

## Status

Documentation only — nothing in `app/` has been changed. `tokens.css` is a
standalone source of truth until an implementation pass wires it into
`app/globals.css` and `app/layout.tsx`.
