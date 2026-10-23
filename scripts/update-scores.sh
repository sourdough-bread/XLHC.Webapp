#!/usr/bin/env bash
# Mise à jour quotidienne des scores : récupère hockey.be, vérifie le build, publie sur main seulement si ça a changé.
# Sortie : une seule ligne (OK / RIEN A FAIRE / ERREUR). Code de retour non nul en cas d'erreur.
set -euo pipefail
cd "$(dirname "$0")/.."

git checkout -q main
git pull -q --ff-only origin main

if ! node scripts/fetch-matches.mjs >/tmp/fetch-matches.log 2>&1; then
  echo "ERREUR: récupération hockey.be impossible ($(tail -n1 /tmp/fetch-matches.log))"
  exit 1
fi

if [ -z "$(git status --porcelain src/content/matches)" ]; then
  echo "RIEN A FAIRE"
  exit 0
fi

[ -d node_modules ] || npm ci --silent >/dev/null 2>&1
if ! npm run build --silent >/tmp/build.log 2>&1; then
  git checkout -q -- src/content/matches
  git clean -fdq src/content/matches
  echo "ERREUR: le build échoue avec les nouvelles données ($(tail -n1 /tmp/build.log))"
  exit 1
fi

git add -A src/content/matches
git commit -q -m "Scores : mise à jour depuis hockey.be

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git push -q origin HEAD:main
echo "OK: scores publiés"
