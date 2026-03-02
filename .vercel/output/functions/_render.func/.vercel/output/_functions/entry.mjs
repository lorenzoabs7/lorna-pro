import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_af7gc_79.mjs';
import { manifest } from './manifest_s1MvIC-_.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/privacy.astro.mjs');
const _page5 = () => import('./pages/sitemap.xml.astro.mjs');
const _page6 = () => import('./pages/solutions.astro.mjs');
const _page7 = () => import('./pages/solutions/_---slug_.astro.mjs');
const _page8 = () => import('./pages/store.astro.mjs');
const _page9 = () => import('./pages/terms.astro.mjs');
const _page10 = () => import('./pages/work.astro.mjs');
const _page11 = () => import('./pages/work/_---slug_.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.16.19_@types+node@25.0.10_rollup@4.56.0_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/privacy.astro", _page4],
    ["src/pages/sitemap.xml.ts", _page5],
    ["src/pages/solutions.astro", _page6],
    ["src/pages/solutions/[...slug].astro", _page7],
    ["src/pages/store.astro", _page8],
    ["src/pages/terms.astro", _page9],
    ["src/pages/work.astro", _page10],
    ["src/pages/work/[...slug].astro", _page11],
    ["src/pages/index.astro", _page12]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "b36278de-0b19-44f4-b3de-e6f956ab3757",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
