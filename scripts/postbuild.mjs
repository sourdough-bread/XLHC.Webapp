// Ajustements après « astro build », selon la cible choisie par SITE_TARGET :
// - production (par défaut) : le site public sur OVH ;
// - preview : l'aperçu nouveau.ixelles.hockey sur OVH, caché de Google ;
// - github-pages : l'aperçu gratuit sur GitHub Pages, caché de Google et servi
//   sous un sous-dossier (BASE_PATH, par exemple /XLHC.Webapp).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { redirects } from '../src/data/redirects.mjs';

const dist = new URL('../dist/', import.meta.url).pathname;
const target = process.env.SITE_TARGET || 'production';
const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
const isPreview = target !== 'production';

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// .htaccess pour Apache (OVH) : de vraies redirections 301 depuis les anciennes
// adresses Google Sites. Les pages de redirection d'Astro restent en secours.
function htaccess() {
  const lines = ['# Généré par scripts/postbuild.mjs, ne pas modifier à la main.', 'RewriteEngine On', ''];
  if (target === 'production') {
    // OVH conseille de tester le port plutôt que %{HTTPS}.
    lines.push(
      'RewriteCond %{SERVER_PORT} 80 [OR]',
      'RewriteCond %{HTTP_HOST} ^ixelles\\.hockey$ [NC]',
      'RewriteRule ^(.*)$ https://www.ixelles.hockey/$1 [R=301,L]',
      '',
    );
  } else {
    lines.push('<IfModule mod_headers.c>', '  Header set X-Robots-Tag "noindex, nofollow"', '</IfModule>', '');
  }
  for (const [from, to] of Object.entries(redirects)) {
    const path = escapeRegex(from.replace(/^\//, ''));
    // NE : garde le « # » des ancres tel quel.
    lines.push(`RewriteRule ^${path}/?$ ${to} [R=301,L,NE]`);
  }
  lines.push('', 'ErrorDocument 404 /404.html', '');
  return lines.join('\n');
}

await writeFile(join(dist, '.htaccess'), htaccess());

if (isPreview) {
  await writeFile(join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
}

for await (const file of files(dist)) {
  if (!/\.(html|css)$/.test(file)) continue;
  let text = await readFile(file, 'utf8');
  const original = text;
  if (isPreview && file.endsWith('.html')) {
    text = text.replace(/<head>/, '<head><meta name="robots" content="noindex, nofollow">');
  }
  if (basePath) {
    // Les liens du site et du contenu Markdown commencent par « / » : on les
    // fait pointer vers le sous-dossier de GitHub Pages.
    text = text
      .replace(/(\s(?:href|src|action|poster)=["'])\/(?!\/)/g, `$1${basePath}/`)
      .replace(/(content=["']\d+;\s*url=)\/(?!\/)/gi, `$1${basePath}/`)
      .replace(/url\((["']?)\/(?!\/)/g, `url($1${basePath}/`);
  }
  if (text !== original) await writeFile(file, text);
}

console.log(`postbuild: cible ${target}${basePath ? `, sous-dossier ${basePath}` : ''}`);
