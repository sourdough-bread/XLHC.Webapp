// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { redirects } from './src/data/redirects.mjs';

export default defineConfig({
  site: 'https://www.ixelles.hockey',
  trailingSlash: 'ignore',
  redirects,
  markdown: {
    // Permet d'écrire « ## Charte {#charte} » pour fixer l'ancre d'un titre.
    processor: satteri({ features: { headingAttributes: true } }),
  },
});
