// Récupère les matchs d'Ixelles chez Hockey Belgium et les écrit dans src/content/matches/.
// Utilisé par .github/workflows/scores.yml ; peut aussi se lancer à la main : node scripts/fetch-matches.mjs
//
// Source : l'API publique qu'utilise la page « Calendrier, résultats et classements » de hockey.be.
// Elle n'est pas documentée : si elle change, le script échoue (sans toucher aux fichiers existants).
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const CLUB_ID = 'CC6VC0I'; // Ixelles sur hockey.be
const API = 'https://hockey.be/wp-json/sportlink-api';
const OUT = fileURLToPath(new URL('../src/content/matches/', import.meta.url));

// Équipes affichées dans le bandeau : code Hockey Belgium → nom du site.
// Pour en ajouter, ajoutez une ligne (codes visibles sur hockey.be, par exemple D-2 ou H-2).
const TEAMS = {
  'D-1': 'Dames 1',
  'H-1': 'Messieurs 1',
};

// Fichiers gérés par ce script ; les matchs encodés à la main dans Pages CMS ne sont jamais touchés.
const PREFIX = 'hb-';

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#0?39;|&#8217;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ');

const text = (html) => decode(html.replace(/<br\s*\/?>.*$/s, '').replace(/<[^>]+>/g, '')).trim();
const code = (html) => html.match(/<strong>([^<]+)<\/strong>/)?.[1];

async function load(endpoint) {
  const res = await fetch(`${API}/${endpoint}?clubid=${CLUB_ID}&wpml_language=fr`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; IxellesHC-site/1.0; +https://ixelles.hockey)', Accept: 'application/json' },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`${endpoint}: HTTP ${res.status}`);
  const json = await res.json();
  if (!Array.isArray(json?.data)) throw new Error(`${endpoint}: réponse inattendue`);
  return json.data;
}

// Une ligne de l'API : [date, heure, compétition, domicile, logo, score|logo, (logo), extérieur].
function parse(row, played) {
  const home = row[3];
  const away = row[row.length - 1];
  const isHome = text(home) === 'Ixelles' && TEAMS[code(home)] !== undefined;
  const mine = isHome ? home : away;
  const team = TEAMS[code(mine)];
  if (!team || text(mine) !== 'Ixelles') return null;

  const rawDate = played ? row[0] : row[0].replace(/<[^>]+>/g, ' ');
  const [, d, m, y] = rawDate.match(/(\d{2})\/(\d{2})\/(\d{4})/) ?? [];
  if (!y) return null;
  const match = { team, opponent: text(isHome ? away : home), date: `${y}-${m}-${d}`, home: isHome };

  if (played) {
    const score = row[5].match(/(\d+)\s*-\s*(\d+)/);
    if (!score) return null; // forfait, report… : on n'affiche rien plutôt qu'un faux score
    const [homeGoals, awayGoals] = [Number(score[1]), Number(score[2])];
    match.scoreFor = isHome ? homeGoals : awayGoals;
    match.scoreAgainst = isHome ? awayGoals : homeGoals;
  } else {
    const time = row[1]?.match(/^(\d{2}:\d{2})/)?.[1];
    if (time && time !== '00:00') match.time = time;
  }
  return match;
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const yaml = (m) =>
  [
    '# Importé automatiquement depuis hockey.be (ne pas modifier : le fichier sera réécrit).',
    ...Object.entries(m).map(([k, v]) => `${k}: ${typeof v === 'string' && k !== 'date' ? JSON.stringify(v) : v}`),
    '',
  ].join('\n');

const [results, program] = await Promise.all([load('results'), load('program')]);
// Le programme contient aussi des matchs déjà joués : on les ignore, le résultat vient de « results ».
const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Brussels' });
const all = [
  ...results.map((r) => parse(r, true)),
  ...program.map((r) => parse(r, false)).filter((m) => m && m.date >= today),
].filter(Boolean);
// L'API renvoie chaque match en double : on garde un seul fichier par équipe et par jour.
const matches = [...new Map(all.map((m) => [`${m.date}-${m.team}`, m])).values()];

if (matches.length === 0) {
  console.log('Aucun match trouvé pour les équipes suivies : fichiers existants conservés.');
  process.exit(0);
}

await mkdir(OUT, { recursive: true });
for (const f of await readdir(OUT)) if (f.startsWith(PREFIX)) await rm(OUT + f);
for (const m of matches) await writeFile(`${OUT}${PREFIX}${m.date}-${slug(m.team)}.yml`, yaml(m));
console.log(`${matches.length} match(s) écrits.`);
