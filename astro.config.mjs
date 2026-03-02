import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://lornadev.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react(),
    mdx()
  ],
  vite: {
    optimizeDeps: {
      exclude: ['better-sqlite3']
    }
  }
});