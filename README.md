# XLHC.Webapp

Le site web de l'Ixelles Hockey Club, pensé d'abord pour le téléphone. Il est construit avec [Astro](https://astro.build) et produit un site statique qui peut être hébergé gratuitement (Netlify, Vercel, Cloudflare Pages…).

## Modifier le contenu

Tout le texte du site se trouve dans des fichiers texte (Markdown, YAML ou JSON) de ce dépôt.

### Avec l'éditeur web (recommandé pour les bénévoles)

Le site est configuré pour [Pages CMS](https://pagescms.org), un éditeur web gratuit (fichier `.pages.yml`).

1. Un administrateur ouvre [app.pagescms.org](https://app.pagescms.org), se connecte avec GitHub et choisit le dépôt `XLHC.Webapp`.
2. Il invite les bénévoles par e-mail depuis l'éditeur : ils n'ont pas besoin de compte GitHub.
3. Les bénévoles modifient les actus, événements, stages, équipes, pages et réglages via des formulaires. Chaque enregistrement met le site à jour en une minute environ.

Dans le texte d'une page, deux choses passent mieux en mode « Source » de l'éditeur : les tableaux et les ancres de titre (`{#ancre}`).

### Directement dans les fichiers

On peut aussi modifier les fichiers sur GitHub avec le bouton crayon.

| Quoi | Où |
| --- | --- |
| Pages en français (Rejoindre, Équipes, Club, Membres, Contact) | `src/content/pages/fr/` |
| Pages en anglais (Join us, Teams, Contact) | `src/content/pages/en/` |
| Actualités | `src/content/news/` |
| Événements (dates, inscription Twizzit) | `src/content/events/` |
| Stages (dates, âges, prix, réservation Twizzit) | `src/content/camps/` |
| Équipes (cartes des pages Juniors et Seniors) | `src/content/teams/` |
| Coordonnées, liens Twizzit, état du terrain, partenaires, pouvoirs publics | `src/data/settings.json` |
| Images | `public/media/` |
| Textes de l'interface (menu, boutons) en FR et EN | `src/i18n/ui.ts` |
| Anciennes adresses redirigées | `astro.config.mjs` |
| Couleurs et police | `src/styles/global.css` |

Les fichiers marqués « exemple » sont là pour montrer le format : remplacez-les ou supprimez-les.

### Ajouter une page

Créez un fichier `.md` dans le dossier de la section, par exemple `src/content/pages/fr/club/historique.md` :

```markdown
---
title: "Historique"
description: "Une ou deux phrases qui résument la page, pour Google et les partages."
order: 50
---

Le texte de la page, en Markdown.

## Un titre avec une ancre fixe {#mon-ancre}
```

La page apparaît automatiquement dans le menu, à l'adresse `/club/historique/`. Champs utiles :

- `description` : obligatoire.
- `order` : position dans le menu (plus petit = plus haut).
- `hidden: true` : retire la page du menu sans la supprimer.
- `translationKey` : même valeur sur la version FR et EN d'une page, pour que le bouton FR/EN mène à la bonne page.
- `image` et `imageAlt` : image de partage (chemin dans `public/media/`, par exemple `/media/tournoi.jpg`) ; le texte alternatif est obligatoire dès qu'il y a une image.
- `actions` : boutons sous le titre. `twizzit:join` et `twizzit:trial` renvoient aux liens Twizzit des réglages du site (le bouton reste caché tant que le lien est vide).
- `listing` : ajoute une liste après le texte (`news`, `events`, `camps`, `juniors`, `seniors` ou `partners`).

Le fichier `index.md` d'un dossier est la page d'accueil de la section.

### Publier une actualité

Créez un fichier dans `src/content/news/`, par exemple `2026-11-05-tournoi.md` :

```markdown
---
title: "Tournoi de novembre"
date: 2026-11-05
description: "Une phrase qui apparaît dans la liste des actus."
---

Le texte de l'article.
```

Ajoutez `draft: true` pour préparer un article sans le publier. Les trois dernières actus s'affichent sur l'accueil.

### Événements et stages

Un fichier `.yml` par événement ou par stage. Les dates passées disparaissent d'elles-mêmes, et les trois prochains événements s'affichent sur l'accueil.

### État du terrain

Le bandeau en haut de chaque page lit l'état du terrain en direct depuis une feuille Google publiée en CSV, alimentée par un Google Form rempli depuis un téléphone. Colonnes : horodatage, état (Praticable / Incertain / Impraticable), remarque. Collez l'adresse CSV dans « Réglages du site » de l'éditeur (`pitchSheetCsvUrl` dans `src/data/settings.json`). Tant qu'elle est vide, c'est l'état choisi dans `pitchFallbackStatus` qui s'affiche.

## Développement

Il faut Node.js 22.12 ou plus récent.

```sh
npm install
npm run dev      # serveur local sur http://localhost:4321
npm run build    # génère le site dans dist/
npm run preview  # prévisualise le site généré
```

### Structure

```
src/
  components/   en-tête (menu), pied de page, liste d'actus
  content/      textes en Markdown (pages et actualités)
  data/         réglages du site et construction du menu
  layouts/      gabarit commun à toutes les pages
  pages/        routes : accueil, actus, pages de contenu, 404
  styles/       styles globaux
public/         fichiers servis tels quels (favicon, images)
```

### Development setup (Claude Code)

- **Matt Pocock's skills** are enabled for this repo via `.claude/settings.json`
  (marketplace `mattpocock/skills`, plugin `mattpocock-skills`). Claude Code offers
  to install them when you open the project; use them as `/mattpocock-skills:grill-me`,
  `/mattpocock-skills:tdd`, `/mattpocock-skills:to-spec`, and so on.
- **Google Stitch MCP** is configured in `.mcp.json`. It reads your key from the
  `STITCH_API_KEY` environment variable, so the key never lives in git.
  Create a key at https://stitch.withgoogle.com (settings, API keys), then set
  `STITCH_API_KEY` in your shell or in the Claude cloud environment's variables.
