# Site content

Pages migrated from https://www.ixelles.hockey/ live here as Markdown, one file per page, so they stay independent of the site's framework. French is the default; the English pages live under `en/`.

## Page format

```markdown
---
title: Cotisations
description: Montants des cotisations 2026-2027 pour les juniors et seniors du Ixelles Hockey Club.  # meta description, 120-160 characters, required
slug: /rejoindre/cotisations
translation: /en/join/fees  # only on pages that have an English version
legacy_urls:
  - /le-club/cotisations
  - /xl-card
---

Body in Markdown. Every image needs alt text: ![Équipe dames 1 à l'entraînement](/images/dames-1.jpg)
```

Use role addresses (info@, juniors@, seniors@, partners@), never a volunteer's personal email. Sign-up links point to Twizzit, not Google Forms.

## Page map

| New page | Path | English | Old pages folded in |
|---|---|---|---|
| Accueil | `/` | | `/`, `/accueil` |
| Rejoindre | `/rejoindre` | `/en/join` | `/admin/demande-daffiliation` |
| Premiers pas | `/rejoindre/premiers-pas` | `/en/join/getting-started` | `/sport/je-découvre` |
| Cotisations | `/rejoindre/cotisations` | `/en/join/fees` | `/le-club/cotisations`, `/xl-card` |
| FAQ | `/rejoindre/faq` | `/en/join/faq` | new |
| Juniors | `/equipes/juniors` | `/en/teams/juniors` | `/juniors` |
| Stages | `/equipes/stages` | | `/juniors/stages` |
| Seniors | `/equipes/seniors` | `/en/teams/seniors` | `/seniors`, `/seniors_1` |
| À propos (ADN, charte, ROI) | `/club/a-propos` | | `/le-club`, `/le-club/adn`, `/le-club/charte`, `/le-club/roi`, `/le-club/equipe` |
| Partenaires et Business Club | `/club/partenaires` | | `/le-club/business-club`, `/le-club/sponsoring` |
| Actualités | `/actualites` | | `/actu` (news items only) |
| Événements | `/evenements` | | `/events`, `/events/mixettes` (2022 page and past list dropped) |
| Membres | `/membres` | | `/admin` |
| Terrain et météo | `/membres/terrain` | | `/sport/occupation-du-terrain`, `/meteo` |
| Sport (entraînements, rôles, arbitrage) | `/membres/sport` | | `/sport`, `/sport/entrainements`, `/sport/rôles`, `/sport/arbitrage`, `/sport/règles-du-jeu` (now a link to Hockey Belgium) |
| Documents | `/membres/documents` | | `/admin/conditions-générales`, `/admin/etalement-de-cotisation`, `/admin/remisereport`, `/admin/attestations-mutuelles`, `/admin/déclaration-daccident`, `/admin/app-hockey-belgium`, `/admin/désaffiliation` |
| Bénévolat | `/membres/benevolat` | | `/admin/bénévoles` |
| WhatsApp | `/membres/whatsapp` | | `/le-club/whatsapp` |
| Contact et accès | `/contact` | `/en/contact` | `/le-club/accès`, `/le-club/contact` |
| Confidentialité | `/confidentialite` | `/en/privacy` | new |

## Redirects

`redirects.json` sends every old path to its new page with a 301. Old paths with accents appear twice, raw and percent-encoded, because hosts differ in which form they match.
