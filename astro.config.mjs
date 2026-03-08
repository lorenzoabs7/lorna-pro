import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://lornadev.com',
  output: 'static',
  trailingSlash: 'never',
  vite: {
    define: {
      __ASTRO_STATIC_BUILD__: true
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react(),
    mdx()
  ]
});