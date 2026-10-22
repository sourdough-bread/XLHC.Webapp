import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Pages du site, une par fichier Markdown dans src/content/pages/<section>/.
// Le fichier index.md d'un dossier est la page d'accueil de la section.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Position dans le menu (plus petit = plus haut).
    order: z.number().default(100),
    // Masquer la page du menu sans la supprimer.
    hidden: z.boolean().default(false),
  }),
});

// Actualités, une par fichier Markdown dans src/content/news/.
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, news };
