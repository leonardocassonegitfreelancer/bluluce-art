import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://lalimentari.lt',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/menu/100heartdemo'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [],
      serialize(item) {
        // Homepage gets higher priority
        if (item.url.endsWith('/lt/') || item.url.endsWith('/en/') || item.url.endsWith('/it/')) {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        // Menu pages
        if (item.url.includes('/menu')) {
          return { ...item, priority: 0.8 };
        }
        // Product pages
        if (item.url.includes('/produktai') || item.url.includes('/products') || item.url.includes('/prodotti')) {
          return { ...item, priority: 0.9 };
        }
        return item;
      },
    }),
  ],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
