import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://bluluceart.com',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const url = item.url;
        // Homepages (es / en / it) get top priority
        if (/\/(es|en|it)\/$/.test(url)) {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        // Individual collection pages (mare / terra / ulivo)
        if (/\/(mare|terra|ulivo)\/?$/.test(url)) {
          return { ...item, priority: 0.9 };
        }
        // Collection listing (tienda / shop / collezione)
        if (/\/(tienda|shop|collezione)\/?$/.test(url)) {
          return { ...item, priority: 0.8 };
        }
        // Gallery
        if (url.includes('/gallery')) {
          return { ...item, priority: 0.8 };
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
