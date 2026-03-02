#!/usr/bin/env node
/**
 * Vercel deprecated nodejs18.x. Patch generated .vc-config.json to use nodejs20.x.
 * Run after astro build when using @astrojs/vercel.
 */
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, '.vercel', 'output', 'functions');

async function patchDir(dir) {
  let patched = 0;
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory()) patched += await patchDir(full);
      else if (e.name === '.vc-config.json') {
        const raw = await readFile(full, 'utf8');
        if (raw.includes('nodejs18.x')) {
          await writeFile(full, raw.replace(/nodejs18\.x/g, 'nodejs20.x'));
          patched++;
        }
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
  return patched;
}

const n = await patchDir(outDir);
if (n > 0) console.log(`[vercel-runtime-fix] Updated ${n} function config(s) to nodejs20.x`);
