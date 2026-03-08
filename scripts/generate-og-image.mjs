#!/usr/bin/env node
/**
 * Generates three static image assets required for production SEO:
 *
 *   public/og-image.png         1200×630  — default Open Graph / Twitter share image
 *   public/apple-touch-icon.png  180×180  — iOS home screen icon
 *   public/favicon.ico            48×48   — ICO fallback for legacy browsers and email clients
 *
 * Requires sharp:
 *   pnpm add -D sharp
 *
 * Runs automatically as part of the build:
 *   pnpm dev / pnpm build → prebuild → this script → generate-favicon.mjs
 */

import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const LOGO_PNG = join(ROOT, 'src', 'assets', 'logo', 'lornaLogo.png');

// ── Brand colors ────────────────────────────────────────────────────────────
const BG_DARK   = '#0f172a';   // dark navy background
const ACCENT    = '#3a6ea5';   // brand blue
const TEXT_PRI  = '#ffffff';
const TEXT_SEC  = '#94a3b8';

// ── OG image SVG template (1200×630) ────────────────────────────────────────
const OG_SVG = `<svg width="1200" height="630" viewBox="0 0 1200 630"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Left accent bar -->
  <rect x="60" y="80" width="5" height="470" fill="${ACCENT}" rx="2"/>

  <!-- Brand name -->
  <text x="100" y="235"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="92" font-weight="800" fill="${TEXT_PRI}" letter-spacing="-2">
    Lorna Dev
  </text>

  <!-- Divider -->
  <rect x="100" y="270" width="340" height="2" fill="${ACCENT}" opacity="0.5"/>

  <!-- Tagline -->
  <text x="100" y="330"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="34" font-weight="400" fill="${TEXT_SEC}">
    Engineering Consulting for
  </text>
  <text x="100" y="378"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="34" font-weight="400" fill="${TEXT_SEC}">
    Production-Ready Systems
  </text>

  <!-- Domain -->
  <text x="100" y="512"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="26" font-weight="600" fill="${ACCENT}">
    lornadev.com
  </text>

  <!-- Decorative concentric circles (right side) -->
  <circle cx="1080" cy="315" r="200" fill="${ACCENT}" opacity="0.05"/>
  <circle cx="1080" cy="315" r="140" fill="${ACCENT}" opacity="0.05"/>
  <circle cx="1080" cy="315" r="80"  fill="${ACCENT}" opacity="0.06"/>
  <circle cx="1080" cy="315" r="28"  fill="${ACCENT}" opacity="0.12"/>
</svg>`;

// ── Apple-touch-icon SVG fallback (180×180) ──────────────────────────────────
const ICON_SVG = `<svg width="180" height="180" viewBox="0 0 180 180"
  xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="${BG_DARK}" rx="20"/>
  <!-- "L" lettermark -->
  <text x="50" y="132"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="100" font-weight="800" fill="${TEXT_PRI}">
    L
  </text>
  <!-- Accent dot -->
  <circle cx="126" cy="118" r="12" fill="${ACCENT}"/>
</svg>`;

// ── Helpers ──────────────────────────────────────────────────────────────────
function ensurePublic() {
  if (!existsSync(PUBLIC)) mkdirSync(PUBLIC, { recursive: true });
}

async function loadSharp() {
  try {
    const { default: sharp } = await import('sharp');
    return sharp;
  } catch {
    console.error(
      '\n  [generate-og-image] ERROR: "sharp" is not installed.\n' +
      '  Run: pnpm add -D sharp\n' +
      '  Then re-run: pnpm generate:assets\n'
    );
    process.exit(1);
  }
}

// ── Generators ───────────────────────────────────────────────────────────────
async function generateOgImage(sharp) {
  const out = join(PUBLIC, 'og-image.png');
  await sharp(Buffer.from(OG_SVG))
    .resize(1200, 630)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(out);
  console.log('  ✓ public/og-image.png         (1200×630)');
}

async function generateAppleTouchIcon(sharp) {
  const out = join(PUBLIC, 'apple-touch-icon.png');

  if (existsSync(LOGO_PNG)) {
    // Resize the real logo with padding to fill 180×180
    await sharp(LOGO_PNG)
      .resize(136, 136, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .extend({
        top: 22, bottom: 22, left: 22, right: 22,
        background: { r: 15, g: 23, b: 42, alpha: 1 }
      })
      .png()
      .toFile(out);
    console.log('  ✓ public/apple-touch-icon.png (180×180, from logo PNG)');
  } else {
    // Fall back to SVG lettermark
    await sharp(Buffer.from(ICON_SVG))
      .resize(180, 180)
      .png()
      .toFile(out);
    console.log('  ✓ public/apple-touch-icon.png (180×180, lettermark fallback)');
  }
}

async function generateFaviconIco(sharp) {
  const out = join(PUBLIC, 'favicon.ico');

  // Build a 48×48 PNG first; then write it as ICO (most platforms only need 1 size in ICO)
  let src;
  if (existsSync(LOGO_PNG)) {
    src = await sharp(LOGO_PNG)
      .resize(48, 48, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .png()
      .toBuffer();
  } else {
    src = await sharp(Buffer.from(ICON_SVG)).resize(48, 48).png().toBuffer();
  }

  // Minimal ICO container: ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes) + PNG data
  const pngData   = src;
  const pngLen    = pngData.length;
  const headerLen = 6 + 16;           // ICONDIR + 1 ICONDIRENTRY
  const buf       = Buffer.alloc(headerLen + pngLen);

  // ICONDIR
  buf.writeUInt16LE(0,    0);  // reserved
  buf.writeUInt16LE(1,    2);  // type = 1 (ICO)
  buf.writeUInt16LE(1,    4);  // count = 1

  // ICONDIRENTRY
  buf.writeUInt8(48,      6);  // width  (0 = 256)
  buf.writeUInt8(48,      7);  // height (0 = 256)
  buf.writeUInt8(0,       8);  // color count
  buf.writeUInt8(0,       9);  // reserved
  buf.writeUInt16LE(1,   10);  // color planes
  buf.writeUInt16LE(32,  12);  // bits per pixel
  buf.writeUInt32LE(pngLen,    14);  // size of image data
  buf.writeUInt32LE(headerLen, 18);  // offset of image data

  pngData.copy(buf, headerLen);

  const { writeFileSync } = await import('fs');
  writeFileSync(out, buf);
  console.log('  ✓ public/favicon.ico          (48×48 ICO)');
}

// ── Entry point ──────────────────────────────────────────────────────────────
async function main() {
  console.log('\n[generate-og-image] Generating static image assets…');
  ensurePublic();
  const sharp = await loadSharp();

  await Promise.all([
    generateOgImage(sharp),
    generateAppleTouchIcon(sharp),
    generateFaviconIco(sharp),
  ]);

  console.log('[generate-og-image] Done.\n');
}

main().catch((err) => {
  console.error('[generate-og-image] Fatal error:', err);
  process.exit(1);
});
