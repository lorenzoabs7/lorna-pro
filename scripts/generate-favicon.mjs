import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const logoPath = join(root, 'src/assets/logo/lornaLogo.svg');
const faviconPath = join(root, 'public/favicon.svg');

let svg = readFileSync(logoPath, 'utf8');
// Strip metadata so the favicon is smaller and avoids C2PA/other payloads
svg = svg.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
// Extract inner content (between first <svg...> and </svg>)
const openEnd = svg.indexOf('>', svg.indexOf('<svg')) + 1;
const closeStart = svg.lastIndexOf('</svg>');
const inner = svg.slice(openEnd, closeStart).trim();
// Logo viewBox from original (keep aspect ratio)
const viewBox = '0 0 345.75 479.249994';

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <circle cx="16" cy="16" r="15" fill="white"/>
  <svg x="2" y="2" width="28" height="28" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
${inner}
  </svg>
</svg>
`;

mkdirSync(dirname(faviconPath), { recursive: true });
writeFileSync(faviconPath, faviconSvg, 'utf8');
console.log('Favicon generated with inlined logo at public/favicon.svg');
