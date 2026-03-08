import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/** Static site build date — used as lastmod for pages without explicit dates. */
const BUILD_DATE = new Date().toISOString().split('T')[0];

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') || 'https://lornadev.com';

  interface SitemapEntry {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: number;
  }

  const staticPages: SitemapEntry[] = [
    { loc: `${base}/`,        lastmod: BUILD_DATE, changefreq: 'weekly',  priority: 1.0 },
    { loc: `${base}/about`,   lastmod: BUILD_DATE, changefreq: 'monthly', priority: 0.9 },
    { loc: `${base}/contact`, lastmod: BUILD_DATE, changefreq: 'monthly', priority: 0.9 },
    { loc: `${base}/solutions`, lastmod: BUILD_DATE, changefreq: 'weekly', priority: 0.9 },
    { loc: `${base}/work`,    lastmod: BUILD_DATE, changefreq: 'weekly',  priority: 0.9 },
    { loc: `${base}/store`,   lastmod: BUILD_DATE, changefreq: 'weekly',  priority: 0.8 },
    { loc: `${base}/privacy`, lastmod: BUILD_DATE, changefreq: 'yearly',  priority: 0.3 },
    { loc: `${base}/terms`,   lastmod: BUILD_DATE, changefreq: 'yearly',  priority: 0.3 },
  ];

  const solutions = await getCollection('solutions');
  const work = await getCollection('work');

  const solutionEntries: SitemapEntry[] = solutions.map((s) => ({
    loc: `${base}/solutions/${s.slug}`,
    lastmod: BUILD_DATE,
    changefreq: 'monthly',
    priority: 0.8,
  }));

  const workEntries: SitemapEntry[] = work.map((w) => ({
    loc: `${base}/work/${w.slug}`,
    lastmod: w.data.publishedAt
      ? w.data.publishedAt.toISOString().split('T')[0]
      : BUILD_DATE,
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const allEntries = [...staticPages, ...solutionEntries, ...workEntries];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
