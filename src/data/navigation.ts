import { getCollection } from 'astro:content';
import { sections } from './site';

export type NavLink = { label: string; href: string };
export type NavSection = NavLink & { children: NavLink[] };

export function pageHref(id: string): string {
  return '/' + id.replace(/\/?index$/, '') + '/';
}

// Construit le menu à partir des sections et des pages Markdown.
export async function getNavigation(): Promise<NavSection[]> {
  const pages = await getCollection('pages', ({ data }) => !data.hidden);
  return sections.map(({ slug, label }) => {
    const children = pages
      .filter((p) => p.id.startsWith(slug + '/') && !p.id.endsWith('/index'))
      .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, 'fr'))
      .map((p) => ({ label: p.data.title, href: pageHref(p.id) }));
    return { label, href: `/${slug}/`, children };
  });
}
