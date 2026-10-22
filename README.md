# XLHC.Webapp

Le site web de l'Ixelles Hockey Club, pensé d'abord pour le téléphone. Il est construit avec [Astro](https://astro.build) et produit un site statique qui peut être hébergé gratuitement (Netlify, Vercel, Cloudflare Pages…).

## Modifier le contenu

Tout le texte du site se trouve dans des fichiers Markdown. Pas besoin de connaître la programmation : on peut les modifier directement sur GitHub avec le bouton crayon.

| Quoi | Où |
| --- | --- |
| Pages des sections (Le Club, Sport, Admin, Juniors, Seniors, XL-Card, Events) | `src/content/pages/<section>/` |
| Actualités | `src/content/news/` |
| Coordonnées, réseaux sociaux, état du terrain, partenaires | `src/data/site.ts` |
| Couleurs et police | `src/styles/global.css` (variables en haut du fichier) |

### Ajouter une page

Créez un fichier `.md` dans le dossier de la section, par exemple `src/content/pages/juniors/u12.md` :

```markdown
---
title: "U12"
order: 20
---

Le texte de la page, en Markdown.
```

La page apparaît automatiquement dans le menu et à l'adresse `/juniors/u12/`. `order` règle sa position dans le menu (plus petit = plus haut). Ajoutez `hidden: true` pour la retirer du menu sans la supprimer.

Le fichier `index.md` de chaque dossier est la page d'accueil de la section.

### Publier une actualité

Créez un fichier dans `src/content/news/`, par exemple `2026-11-05-tournoi.md` :

```markdown
---
title: "Tournoi de novembre"
date: 2026-11-05
summary: "Une phrase qui apparaît dans la liste des actus."
---

Le texte de l'article.
```

Ajoutez `draft: true` pour préparer un article sans le publier.

### Changer l'état du terrain

Dans `src/data/site.ts`, modifiez `pitch` : `status` vaut `'ok'`, `'warning'` ou `'closed'`, et `label` est le texte affiché.

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
