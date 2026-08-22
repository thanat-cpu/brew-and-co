#!/usr/bin/env node
// Downloads an image from a URL, resizes it (downscale-only) to a max
// width, converts it to WebP, and writes it into public/. See ../SKILL.md
// for usage guidance.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith("--")) {
      args[key] = next;
      i++;
    } else {
      args[key] = "true";
    }
  }
  return args;
}

function usageAndExit(message) {
  if (message) console.error(`Error: ${message}\n`);
  console.error(
    [
      "Usage:",
      "  node optimize-image.mjs --url <source URL> --out <path under public/> [options]",
      "",
      "Options:",
      "  --width <px>     Max output width; downscales only, never upscales (default: 1600)",
      "  --quality <0-100> WebP quality (default: 82)",
      "",
      "Example:",
      "  node optimize-image.mjs \\",
      "    --url https://images.pexels.com/photos/34153867/pexels-photo-34153867.jpeg \\",
      "    --out images/hero/shop-interior.webp --width 2400",
    ].join("\n"),
  );
  process.exit(1);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { url, out } = args;

  if (!url || !out) usageAndExit("both --url and --out are required");
  if (!out.endsWith(".webp")) usageAndExit("--out must end in .webp");

  const maxWidth = args.width ? Number.parseInt(args.width, 10) : 1600;
  const quality = args.quality ? Number.parseInt(args.quality, 10) : 82;
  if (!Number.isFinite(maxWidth) || maxWidth <= 0) usageAndExit("--width must be a positive number");
  if (!Number.isFinite(quality) || quality < 1 || quality > 100) usageAndExit("--quality must be 1-100");

  const outPath = path.join(
    process.cwd(),
    "public",
    out.replace(/^public[\\/]/, ""),
  );

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status} ${response.statusText}): ${url}`);
  }
  const sourceBuffer = Buffer.from(await response.arrayBuffer());

  const source = sharp(sourceBuffer).rotate(); // normalize EXIF orientation
  const sourceMeta = await source.metadata();

  const pipeline =
    sourceMeta.width && sourceMeta.width > maxWidth
      ? source.resize({ width: maxWidth })
      : source;

  const webpBuffer = await pipeline.webp({ quality }).toBuffer();

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, webpBuffer);

  const finalMeta = await sharp(webpBuffer).metadata();
  console.log(
    JSON.stringify(
      {
        sourceUrl: url,
        sourceWidth: sourceMeta.width,
        sourceHeight: sourceMeta.height,
        sourceBytes: sourceBuffer.length,
        outPath: path.relative(process.cwd(), outPath),
        outWidth: finalMeta.width,
        outHeight: finalMeta.height,
        outBytes: webpBuffer.length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
