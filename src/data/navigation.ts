import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n/ui';
import { sections } from './site';

export type NavLink = { label: string; href: string };
export type NavSection = NavLink & { children: NavLink[] };

// fr/rejoindre/index -> /rejoindre/ ; en/join/fees -> /en/join/fees/
export function pageHref(id: string): string {
  const [locale, ...rest] = id.replace(/(^|\/)index$/, '').split('/');
  const path = rest.filter(Boolean).join('/');
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  return `${prefix}/${path}${path ? '/' : ''}`;
}

export const pageLocale = (page: CollectionEntry<'pages'>) => page.id.split('/')[0] as Locale;

// Construit le menu d'une langue à partir des sections et des pages Markdown.
export async function getNavigation(locale: Locale): Promise<NavSection[]> {
  const pages = await getCollection('pages', (p) => !p.data.hidden && p.id.startsWith(locale + '/'));
  return sections[locale].map(({ slug, label, href }) => {
    if (href) return { label, href, children: [] };
    const base = `${locale}/${slug}/`;
    const children = pages
      .filter((p) => p.id.startsWith(base) && p.id !== base + 'index')
      .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, locale))
      .map((p) => ({ label: p.data.title, href: pageHref(p.id) }));
    return { label, href: pageHref(base + 'index'), children };
  });
}

// La même page dans l'autre langue, si elle existe.
export async function getTranslation(translationKey: string | undefined, locale: Locale) {
  if (!translationKey) return undefined;
  const pages = await getCollection('pages');
  const match = pages.find((p) => p.data.translationKey === translationKey && pageLocale(p) === locale);
  return match && pageHref(match.id);
}
