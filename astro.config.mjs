import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lornadev.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react(),
    mdx(),
    sitemap()
  ],
  vite: {
    optimizeDeps: {
      exclude: ['better-sqlite3']
    }
  }
});