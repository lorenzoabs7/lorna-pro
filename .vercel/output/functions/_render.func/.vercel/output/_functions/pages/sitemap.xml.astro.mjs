import { g as getCollection } from '../chunks/_astro_content_B1O02SQD.mjs';
export { renderers } from '../renderers.mjs';

const GET = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, "") || "https://lornadev.com";
  const staticPages = [
    { path: "/", changefreq: "weekly", priority: 1 },
    { path: "/about", changefreq: "monthly", priority: 0.9 },
    { path: "/contact", changefreq: "monthly", priority: 0.9 },
    { path: "/solutions", changefreq: "weekly", priority: 0.9 },
    { path: "/work", changefreq: "weekly", priority: 0.9 },
    { path: "/store", changefreq: "weekly", priority: 0.8 },
    { path: "/privacy", changefreq: "yearly", priority: 0.3 },
    { path: "/terms", changefreq: "yearly", priority: 0.3 }
  ];
  const solutions = await getCollection("solutions");
  const work = await getCollection("work");
  const urls = [
    ...staticPages.map((p) => ({
      loc: `${base}${p.path}`,
      changefreq: p.changefreq,
      priority: p.priority
    })),
    ...solutions.map((s) => ({
      loc: `${base}/solutions/${s.slug}`,
      changefreq: "monthly",
      priority: 0.8
    })),
    ...work.map((w) => ({
      loc: `${base}/work/${w.slug}`,
      changefreq: "monthly",
      priority: 0.7
    }))
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.changefreq ? `
    <changefreq>${u.changefreq}</changefreq>` : ""}${u.priority !== void 0 ? `
    <priority>${u.priority}</priority>` : ""}
  </url>`
  ).join("\n")}
</urlset>`;
  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
