import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Une image doit toujours avoir un texte alternatif.
const withImageAlt = <T extends { image?: unknown; imageAlt?: string }>(data: T, ctx: z.RefinementCtx) => {
  if (data.image && !data.imageAlt) {
    ctx.addIssue({ code: 'custom', path: ['imageAlt'], message: "imageAlt est obligatoire quand il y a une image" });
  }
};

// L'éditeur web enregistre parfois un champ vide ("" ou null) : on le traite comme absent.
const blank = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema);

const action = z.object({ label: z.string(), href: z.string() });

// Pages du site : src/content/pages/<langue>/<section>/<page>.md
// Le fichier index.md d'un dossier est la page d'accueil de la section.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z
    .object({
      title: z.string(),
      // Résumé d'une ou deux phrases, utilisé par Google et les partages.
      description: z.string().min(20),
      // Position dans le menu (plus petit = plus haut).
      order: blank(z.number().default(100)),
      // Masquer la page du menu sans la supprimer.
      hidden: blank(z.boolean().default(false)),
      // Même valeur sur la version française et anglaise d'une page.
      translationKey: blank(z.string().optional()),
      // Boutons affichés sous le titre (inscription Twizzit, etc.).
      actions: blank(z.array(action).default([])),
      // Liste affichée après le texte de la page.
      listing: blank(z.enum(['news', 'events', 'camps', 'juniors', 'seniors', 'partners']).optional()),
      // Chemin d'une image de public/media, par exemple /media/tournoi.jpg.
      image: blank(z.string().optional()),
      imageAlt: blank(z.string().optional()),
    })
    .superRefine(withImageAlt),
});

// Actualités : src/content/news/<date>-<titre>.md
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().min(20),
      // Chemin d'une image de public/media, par exemple /media/tournoi.jpg.
      image: blank(z.string().optional()),
      imageAlt: blank(z.string().optional()),
      draft: blank(z.boolean().default(false)),
    })
    .superRefine(withImageAlt),
});

// Événements : src/content/events/<date>-<nom>.yml
const events = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: blank(z.coerce.date().optional()),
    location: blank(z.string().optional()),
    summary: blank(z.string().optional()),
    // Lien d'inscription Twizzit.
    signupUrl: blank(z.string().url().optional()),
    // Photo affichée en vignette sur l'accueil (chemin dans public/media).
    image: blank(z.string().optional()),
  }),
});

// Matchs des équipes premières : src/content/matches/<date>-<équipe>.yml
// Sans score, c'est un match à venir ; avec score, un résultat.
const matches = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/matches' }),
  schema: z.object({
    team: z.string(),
    opponent: z.string(),
    date: z.coerce.date(),
    // Heure du coup d'envoi, par exemple 15:00.
    time: blank(z.string().optional()),
    home: blank(z.boolean().default(true)),
    scoreFor: blank(z.number().int().min(0).optional()),
    scoreAgainst: blank(z.number().int().min(0).optional()),
  }),
});

// Stages : src/content/camps/<date>-<nom>.yml
const camps = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/camps' }),
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    ages: z.string(),
    price: z.string(),
    summary: blank(z.string().optional()),
    // Lien de réservation et paiement Twizzit.
    bookingUrl: blank(z.string().url().optional()),
  }),
});

// Équipes : src/content/teams/<nom>.yml
const teams = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/teams' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['juniors', 'seniors']),
    // Catégorie d'âge (juniors) ou division (seniors).
    level: z.string(),
    training: blank(z.string().optional()),
    hockeyBelgiumUrl: blank(z.string().url().optional()),
    // Adresse de rôle (juniors@…), jamais une adresse personnelle.
    email: blank(z.string().email().optional()),
    recruiting: blank(z.boolean().default(false)),
    order: blank(z.number().default(100)),
  }),
});

export const collections = { pages, news, events, camps, teams, matches };
