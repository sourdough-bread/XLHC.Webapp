# Site content

Pages migrated from https://www.ixelles.hockey/ live here as Markdown, one file per page, so they stay independent of the site's framework.

## Page format

```markdown
---
title: Cotisations
description: Montants des cotisations 2026-2027 pour les juniors et seniors du Ixelles Hockey Club.  # meta description, 120-160 characters
slug: /club/cotisations
legacy_urls:
  - /le-club/cotisations
---

Body in Markdown. Every image needs alt text: ![Équipe dames 1 à l'entraînement](/images/dames-1.jpg)
```

## Redirects

`redirects.json` maps every old URL to its new path with a 301. Old paths with accents appear twice, raw and percent-encoded, because hosts differ in which form they match. Paths that keep the same URL (`/sport`, `/juniors`, `/meteo`, …) have no rule.

Accents are dropped from new slugs, `/le-club/*` becomes `/club/*`, `/events` becomes `/evenements`, and the duplicate `/seniors_1` folds into `/seniors`.
