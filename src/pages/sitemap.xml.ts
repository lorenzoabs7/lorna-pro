import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') || 'https://lornadev.com';

  const staticPages: Array<{ path: string; changefreq?: string; priority?: number }> = [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/about', changefreq: 'monthly', priority: 0.9 },
    { path: '/contact', changefreq: 'monthly', priority: 0.9 },
    { path: '/solutions', changefreq: 'weekly', priority: 0.9 },
    { path: '/work', changefreq: 'weekly', priority: 0.9 },
    { path: '/store', changefreq: 'weekly', priority: 0.8 },
    { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
    { path: '/terms', changefreq: 'yearly', priority: 0.3 }
  ];

  const solutions = await getCollection('solutions');
  const work = await getCollection('work');

  const urls: Array<{ loc: string; changefreq?: string; priority?: number }> = [
    ...staticPages.map((p) => ({
      loc: `${base}${p.path}`,
      changefreq: p.changefreq,
      priority: p.priority
    })),
    ...solutions.map((s) => ({
      loc: `${base}/solutions/${s.slug}`,
      changefreq: 'monthly' as const,
      priority: 0.8
    })),
    ...work.map((w) => ({
      loc: `${base}/work/${w.slug}`,
      changefreq: 'monthly' as const,
      priority: 0.7
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.changefreq ? `\n    <changefreq>${u.changefreq}</changefreq>` : ''}${u.priority !== undefined ? `\n    <priority>${u.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
