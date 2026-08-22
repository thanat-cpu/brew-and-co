---
name: optimize-image
description: Download an image from a URL, resize it for web use, and convert it to WebP, saving the result into public/. Use whenever adding stock or reference imagery (e.g. from Pexels, Unsplash) to this project, so pages serve images from the local public/ folder instead of hotlinking an external host.
---

# Optimize Image

Turns an externally-hosted image (a stock photo URL, a reference image link,
etc.) into a right-sized, self-hosted WebP file under `public/`, so the app
serves it from the same origin instead of making a request to another site
on every page load.

## When to use this

- The user (or your own research) has found a stock photo URL — Pexels,
  Unsplash, or similar — and it needs to actually live in the project rather
  than being referenced by its remote URL.
- Any existing image reference is hotlinking an external CDN and should be
  brought in-repo.

Don't use it for images that must stay dynamic/remote (e.g. user-uploaded
content served from a CMS or storage bucket) — this is for static assets
that ship with the site.

## How to run it

```bash
node .claude/skills/optimize-image/scripts/optimize-image.mjs \
  --url "<source image URL>" \
  --out "images/<area>/<descriptive-slug>.webp" \
  --width <max px> \
  --quality <1-100, default 82>
```

`--out` is a path relative to `public/` (a leading `public/` is stripped if
present). The script downloads the source, auto-orients it from EXIF,
**downscales only if wider than `--width`** (never upscales — a smaller
source stays as-is), encodes to WebP, creates any missing directories, and
writes the file. It prints a JSON summary (source/output dimensions and byte
sizes) — check `outWidth`/`outBytes` to confirm the result is sane before
moving on (e.g. a `outBytes` still in the multi-megabyte range for a photo
card usually means `--width` was left too large).

### Picking `--width`

Match it to the largest size the image actually renders at on the page —
oversizing just ships dead weight. As a starting point for a typical
marketing/content site:

| Usage | Suggested `--width` |
|---|---|
| Full-bleed hero / background | 2400 |
| Large content image (about/detail sections) | 1600 |
| Card or grid thumbnail (product cards, list items) | 1000–1200 |

These are starting points, not rules — check the component's actual
rendered size (including any `sizes`/layout container width) and adjust.

### Batch use

For several images in one pass, just call the script once per image (each
run is independent and cheap); there's no batch flag. A shell loop over a
list of `url,out,width` triples works fine.

## After running it

1. Update the code that referenced the old remote URL to point at the new
   local path instead (e.g. `/images/menu/cortado.webp`), dropping the
   `https://images.pexels.com/...` string entirely.
2. If nothing in the codebase still references the original remote image
   host, remove that host from `images.remotePatterns` in `next.config.ts`
   — no reason to keep allowing remote optimization for a host nothing
   hotlinks anymore.
3. `next/image` still resizes/re-encodes on top of this at request time
   (different device widths, AVIF negotiation, etc.) — this skill's job is
   just to make sure the *source* file is reasonably sized and self-hosted,
   not to replace Next's own pipeline.
4. Licensing: downloading a photo doesn't change its license. Keep whatever
   attribution/credit convention the project already uses for stock imagery
   (e.g. a comment noting the photographer and original source URL) next to
   wherever the new local path is referenced.

## Dependencies

Uses `sharp` (already a project dependency) and the global `fetch` — no
other packages required.
