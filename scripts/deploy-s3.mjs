#!/usr/bin/env node
/**
 * Production deployment script for S3 + CloudFront.
 *
 * Sets cache-control headers correctly at the S3 object level:
 *
 *   HTML files        → Cache-Control: public, max-age=0, must-revalidate
 *   JS / CSS bundles  → Cache-Control: public, max-age=31536000, immutable
 *   Images / fonts    → Cache-Control: public, max-age=31536000, immutable
 *   Manifest / ico    → Cache-Control: public, max-age=86400
 *   robots.txt        → Cache-Control: public, max-age=3600
 *   sitemap.xml       → Cache-Control: public, max-age=3600
 *
 * After upload it optionally creates a CloudFront invalidation
 * for HTML paths so fresh content reaches users immediately.
 *
 * Prerequisites:
 *   AWS CLI configured (aws configure) OR environment variables:
 *     AWS_ACCESS_KEY_ID
 *     AWS_SECRET_ACCESS_KEY
 *     AWS_DEFAULT_REGION
 *
 * Usage:
 *   pnpm deploy
 *   BUCKET=my-bucket CDN_ID=EXAMPLEID pnpm deploy
 *
 * Environment variables:
 *   BUCKET      — S3 bucket name (required)
 *   CDN_ID      — CloudFront distribution ID (optional; skips invalidation if absent)
 *   AWS_REGION  — AWS region (default: us-east-1)
 *   DIST_DIR    — Local build directory (default: dist)
 */

import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { extname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');

const BUCKET   = process.env.BUCKET;
const CDN_ID   = process.env.CDN_ID;
const REGION   = process.env.AWS_REGION ?? 'us-east-1';
const DIST_DIR = join(ROOT, process.env.DIST_DIR ?? 'dist');

if (!BUCKET) {
  console.error('\n  [deploy-s3] ERROR: BUCKET environment variable is required.\n');
  process.exit(1);
}

// ── MIME types ───────────────────────────────────────────────────────────────
const MIME = {
  '.html':    'text/html; charset=utf-8',
  '.xml':     'application/xml; charset=utf-8',
  '.txt':     'text/plain; charset=utf-8',
  '.json':    'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.js':      'application/javascript; charset=utf-8',
  '.mjs':     'application/javascript; charset=utf-8',
  '.css':     'text/css; charset=utf-8',
  '.svg':     'image/svg+xml',
  '.png':     'image/png',
  '.jpg':     'image/jpeg',
  '.jpeg':    'image/jpeg',
  '.webp':    'image/webp',
  '.avif':    'image/avif',
  '.ico':     'image/x-icon',
  '.woff':    'font/woff',
  '.woff2':   'font/woff2',
  '.ttf':     'font/ttf',
  '.otf':     'font/otf',
};

// ── Cache-Control values ──────────────────────────────────────────────────────
function cacheControl(filePath) {
  const name = filePath.replace(/\\/g, '/');
  const ext  = extname(name).toLowerCase();

  if (name.endsWith('robots.txt'))          return 'public, max-age=3600';
  if (name.endsWith('sitemap.xml'))         return 'public, max-age=3600';
  if (name.endsWith('site.webmanifest'))    return 'public, max-age=86400';
  if (name.endsWith('.ico'))                return 'public, max-age=86400';
  if (ext === '.html' || name === '')       return 'public, max-age=0, must-revalidate';

  // Hashed Astro build artifacts (_astro/) are immutable
  if (name.includes('/_astro/'))            return 'public, max-age=31536000, immutable';

  // Other fonts / images outside the hashed dir get a 1-year TTL
  if (['.woff', '.woff2', '.ttf', '.otf'].includes(ext)) return 'public, max-age=31536000, immutable';
  if (['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg'].includes(ext)) return 'public, max-age=31536000, immutable';

  return 'public, max-age=0, must-revalidate';
}

function mime(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME[ext] ?? 'application/octet-stream';
}

// ── Walk directory recursively ───────────────────────────────────────────────
function* walkDir(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walkDir(full);
    } else {
      yield full;
    }
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
function run(cmd) {
  return execSync(cmd, { stdio: 'inherit' });
}

async function upload() {
  console.log(`\n[deploy-s3] Uploading dist/ → s3://${BUCKET}\n`);

  const files = [...walkDir(DIST_DIR)];
  const htmlPaths = [];

  for (const file of files) {
    const key      = relative(DIST_DIR, file).replace(/\\/g, '/');
    const cc       = cacheControl(key);
    const ct       = mime(file);

    console.log(`  → ${key}`);

    run(
      `aws s3 cp "${file}" "s3://${BUCKET}/${key}" ` +
      `--region ${REGION} ` +
      `--content-type "${ct}" ` +
      `--cache-control "${cc}" ` +
      `--metadata-directive REPLACE`
    );

    if (ct.startsWith('text/html')) {
      htmlPaths.push(`/${key}`);
    }
  }

  console.log(`\n[deploy-s3] Upload complete. ${files.length} files.\n`);
  return htmlPaths;
}

async function invalidate(htmlPaths) {
  if (!CDN_ID) {
    console.log('[deploy-s3] CDN_ID not set — skipping CloudFront invalidation.');
    return;
  }

  // Invalidate all HTML pages plus well-known root paths
  const paths = [
    '/',
    ...htmlPaths,
    '/sitemap.xml',
    '/robots.txt',
    '/og-image.png',
  ];

  // Deduplicate and limit to 3000 paths (CloudFront max per invalidation)
  const unique = [...new Set(paths)].slice(0, 3000);

  console.log(`[deploy-s3] Creating CloudFront invalidation for ${unique.length} paths…`);

  const pathsJson = JSON.stringify({ Paths: { Quantity: unique.length, Items: unique } });

  run(
    `aws cloudfront create-invalidation ` +
    `--distribution-id ${CDN_ID} ` +
    `--paths ${unique.map((p) => `"${p}"`).join(' ')}`
  );

  console.log('[deploy-s3] CloudFront invalidation submitted.\n');
}

async function main() {
  const htmlPaths = await upload();
  await invalidate(htmlPaths);
  console.log('[deploy-s3] Deployment complete.\n');
}

main().catch((err) => {
  console.error('[deploy-s3] Fatal:', err.message);
  process.exit(1);
});
