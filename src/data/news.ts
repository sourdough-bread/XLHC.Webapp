import { getCollection } from 'astro:content';

export async function getNews() {
  const news = await getCollection('news', ({ data }) => !data.draft);
  return news.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' });
