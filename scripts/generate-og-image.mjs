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

const ROOT   = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const LOGO_PNG = join(ROOT, 'src', 'assets', 'logo', 'lornaLogo.png');

// ── Brand colors (hex → RGB for sharp) ───────────────────────────────────────
const BG_DARK_RGB  = { r: 15,  g: 23,  b: 42,  alpha: 1 };   // #0f172a
const BG_DARK2_RGB = { r: 30,  g: 41,  b: 59,  alpha: 1 };   // #1e293b
const ACCENT_HEX   = '#3a6ea5';
const TEXT_SEC     = '#94a3b8';

// ── OG background SVG (pure shapes — no text, logo composited separately) ───
const OG_BG_SVG = `<svg width="1200" height="630" viewBox="0 0 1200 630"
  xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Left accent bar -->
  <rect x="60" y="80" width="5" height="470" fill="${ACCENT_HEX}" rx="2"/>

  <!-- Brand name -->
  <text x="100" y="235"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="92" font-weight="800" fill="#ffffff" letter-spacing="-2">
    Lorna Dev
  </text>

  <!-- Divider -->
  <rect x="100" y="270" width="340" height="2" fill="${ACCENT_HEX}" opacity="0.5"/>

  <!-- Tagline line 1 -->
  <text x="100" y="330"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="34" font-weight="400" fill="${TEXT_SEC}">
    Engineering Consulting for
  </text>
  <!-- Tagline line 2 -->
  <text x="100" y="378"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="34" font-weight="400" fill="${TEXT_SEC}">
    Production-Ready Systems
  </text>

  <!-- Domain -->
  <text x="100" y="512"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="26" font-weight="600" fill="${ACCENT_HEX}">
    lornadev.com
  </text>

  <!-- Decorative concentric circles (right side, behind logo) -->
  <circle cx="980" cy="315" r="200" fill="${ACCENT_HEX}" opacity="0.05"/>
  <circle cx="980" cy="315" r="140" fill="${ACCENT_HEX}" opacity="0.05"/>
  <circle cx="980" cy="315" r="80"  fill="${ACCENT_HEX}" opacity="0.06"/>
  <circle cx="980" cy="315" r="28"  fill="${ACCENT_HEX}" opacity="0.12"/>
</svg>`;

// ── Apple-touch-icon SVG fallback (180×180 lettermark) ───────────────────────
const ICON_SVG = `<svg width="180" height="180" viewBox="0 0 180 180"
  xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="#0f172a" rx="20"/>
  <text x="50" y="132"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="100" font-weight="800" fill="#ffffff">
    L
  </text>
  <circle cx="126" cy="118" r="12" fill="${ACCENT_HEX}"/>
</svg>`;

// ── Helpers ───────────────────────────────────────────────────────────────────
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

// ── Generators ────────────────────────────────────────────────────────────────
async function generateOgImage(sharp) {
  const out = join(PUBLIC, 'og-image.png');

  // Render the background SVG as a truecolor PNG buffer
  const bgBuffer = await sharp(Buffer.from(OG_BG_SVG))
    .resize(1200, 630)
    .png()
    .toBuffer();

  let result;

  if (existsSync(LOGO_PNG)) {
    // Fit the logo into a 220×220 box, preserve transparency, then composite
    // it on the right side of the card (centered at x≈980, y≈315)
    const logoBuffer = await sharp(LOGO_PNG)
      .resize(220, 220, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    result = await sharp(bgBuffer)
      .composite([{
        input: logoBuffer,
        gravity: 'northeast',
        top: 205,
        left: 0,
      }])
      .png({ compressionLevel: 9 })
      .toBuffer();

    // Use explicit positioning instead of gravity to center the logo on the right panel
    const logoMeta = await sharp(logoBuffer).metadata();
    const logoW = logoMeta.width ?? 220;
    const logoH = logoMeta.height ?? 220;
    const logoLeft = 980 - Math.floor(logoW / 2);
    const logoTop  = 315 - Math.floor(logoH / 2);

    result = await sharp(bgBuffer)
      .composite([{ input: logoBuffer, left: logoLeft, top: logoTop }])
      .png({ compressionLevel: 9 })
      .toBuffer();
  } else {
    result = await sharp(bgBuffer)
      .png({ compressionLevel: 9 })
      .toBuffer();
    console.warn('  ⚠ src/assets/logo/lornaLogo.png not found — OG image has no logo composite');
  }

  // Write final truecolor PNG (color type 2, not palette/indexed)
  await sharp(result).toFile(out);
  console.log('  ✓ public/og-image.png         (1200×630, truecolor)');
}

async function generateAppleTouchIcon(sharp) {
  const out = join(PUBLIC, 'apple-touch-icon.png');

  if (existsSync(LOGO_PNG)) {
    await sharp(LOGO_PNG)
      .resize(136, 136, { fit: 'contain', background: BG_DARK_RGB })
      .extend({ top: 22, bottom: 22, left: 22, right: 22, background: BG_DARK_RGB })
      .png()
      .toFile(out);
    console.log('  ✓ public/apple-touch-icon.png (180×180, from logo PNG)');
  } else {
    await sharp(Buffer.from(ICON_SVG))
      .resize(180, 180)
      .png()
      .toFile(out);
    console.log('  ✓ public/apple-touch-icon.png (180×180, lettermark fallback)');
  }
}

async function generateFaviconIco(sharp) {
  const out = join(PUBLIC, 'favicon.ico');

  let src;
  if (existsSync(LOGO_PNG)) {
    src = await sharp(LOGO_PNG)
      .resize(48, 48, { fit: 'contain', background: BG_DARK_RGB })
      .png()
      .toBuffer();
  } else {
    src = await sharp(Buffer.from(ICON_SVG)).resize(48, 48).png().toBuffer();
  }

  // Minimal ICO container: ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes) + PNG data
  const pngData   = src;
  const pngLen    = pngData.length;
  const headerLen = 6 + 16;
  const buf       = Buffer.alloc(headerLen + pngLen);

  // ICONDIR
  buf.writeUInt16LE(0, 0);   // reserved
  buf.writeUInt16LE(1, 2);   // type = 1 (ICO)
  buf.writeUInt16LE(1, 4);   // count = 1 image

  // ICONDIRENTRY
  buf.writeUInt8(48, 6);            // width
  buf.writeUInt8(48, 7);            // height
  buf.writeUInt8(0,  8);            // color count (0 = no palette)
  buf.writeUInt8(0,  9);            // reserved
  buf.writeUInt16LE(1,  10);        // color planes
  buf.writeUInt16LE(32, 12);        // bits per pixel
  buf.writeUInt32LE(pngLen,    14); // size of image data
  buf.writeUInt32LE(headerLen, 18); // offset to image data

  pngData.copy(buf, headerLen);

  const { writeFileSync } = await import('fs');
  writeFileSync(out, buf);
  console.log('  ✓ public/favicon.ico          (48×48 ICO)');
}

// ── Entry point ───────────────────────────────────────────────────────────────
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
