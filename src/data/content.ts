import { getCollection } from 'astro:content';

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export async function getNews() {
  const news = await getCollection('news', ({ data }) => !data.draft);
  return news.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Les événements passés disparaissent d'eux-mêmes (au build et dans le navigateur).
export async function getUpcomingEvents() {
  const today = startOfToday();
  const events = await getCollection('events', ({ data }) => (data.endDate ?? data.date) >= today);
  return events.sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}

export async function getUpcomingCamps() {
  const today = startOfToday();
  const camps = await getCollection('camps', ({ data }) => data.endDate >= today);
  return camps.sort((a, b) => a.data.startDate.getTime() - b.data.startDate.getTime());
}

export async function getTeams(category: 'juniors' | 'seniors') {
  const teams = await getCollection('teams', ({ data }) => data.category === category);
  return teams.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

// Résout les liens spéciaux « twizzit:join » et « twizzit:trial » des boutons.
import { site } from './site';
export function resolveHref(href: string): string {
  const match = href.match(/^twizzit:(\w+)$/);
  if (!match) return href;
  return site.twizzit[match[1] as keyof typeof site.twizzit] ?? '';
}
