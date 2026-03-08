import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SRC  = join(root, 'src/assets/logo/favicon.svg');
const DEST = join(root, 'public/favicon.svg');

/**
 * Copies src/assets/logo/favicon.svg → public/favicon.svg.
 *
 * The source file is the real brand favicon exported from Canva.
 * It contains a <metadata> block with a C2PA certificate chain
 * (Canva's content-authenticity payload) that has no visual effect
 * and adds ~22KB to every page load. We strip that block only.
 * All drawing instructions (clipPaths, masks, embedded PNGs) are preserved.
 */
const raw = readFileSync(SRC, 'utf8');
const cleaned = raw.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');

mkdirSync(dirname(DEST), { recursive: true });
writeFileSync(DEST, cleaned, 'utf8');

const srcSize  = Buffer.byteLength(raw,     'utf8');
const destSize = Buffer.byteLength(cleaned, 'utf8');
const saved    = srcSize - destSize;

console.log(`Favicon copied: public/favicon.svg`);
console.log(`  Source : ${(srcSize  / 1024).toFixed(1)}KB  (src/assets/logo/favicon.svg)`);
console.log(`  Output : ${(destSize / 1024).toFixed(1)}KB  (metadata block stripped, ${(saved / 1024).toFixed(1)}KB saved)`);
