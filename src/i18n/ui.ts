// Textes de l'interface (menu, pied de page, boutons) dans chaque langue.

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const ui = {
  fr: {
    home: 'Accueil',
    menu: 'Menu',
    mainNav: 'Navigation principale',
    submenu: 'Sous-menu',
    skip: 'Aller au contenu',
    join: 'Rejoindre le club',
    tryIt: 'Essayer une séance',
    pitch: 'Terrain :',
    pitchUpdated: 'mis à jour',
    latestNews: 'Dernières actus',
    allNews: 'Toutes les actus',
    nextEvents: 'Prochains événements',
    allEvents: 'Tous les événements',
    partners: 'Nos partenaires',
    mainSponsor: 'Sponsor principal',
    allPartners: 'Tous nos partenaires',
    becomeSponsor: 'Devenir sponsor',
    funders: 'Avec le soutien de',
    privacy: 'Vie privée',
    followUs: 'Suivez-nous',
    signup: "S'inscrire",
    book: 'Réserver',
    recruiting: 'Recrute',
    training: 'Entraînement :',
    results: 'Matchs et résultats',
    noItems: 'Rien de prévu pour le moment.',
    notFound: 'Page introuvable',
    notFoundText: "Cette page n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
    otherLanguage: 'English',
    tagline: 'Club de hockey sur gazon à Ixelles',
    teamsNav: 'Nos équipes',
    scoreboard: 'Résultats et prochains matchs',
    lastResult: 'Dernier résultat',
    nextMatch: 'Prochain match',
    home_ground: 'Domicile',
    away: 'Déplacement',
    captainsTitle: 'Clubs adverses : écrivez aux capitaines',
    captainsNote: 'Chaque adresse est transmise au capitaine de la saison.',
    write: 'Écrire',
  },
  en: {
    home: 'Home',
    menu: 'Menu',
    mainNav: 'Main navigation',
    submenu: 'Submenu',
    skip: 'Skip to content',
    join: 'Join the club',
    tryIt: 'Try a session',
    pitch: 'Pitch:',
    pitchUpdated: 'updated',
    latestNews: 'Latest news',
    allNews: 'All news',
    nextEvents: 'Upcoming events',
    allEvents: 'All events',
    partners: 'Our partners',
    mainSponsor: 'Main sponsor',
    allPartners: 'All our partners',
    becomeSponsor: 'Become a sponsor',
    funders: 'Supported by',
    privacy: 'Privacy',
    followUs: 'Follow us',
    signup: 'Sign up',
    book: 'Book',
    recruiting: 'Recruiting',
    training: 'Training:',
    results: 'Fixtures and results',
    noItems: 'Nothing planned right now.',
    notFound: 'Page not found',
    notFoundText: 'This page does not exist or has moved.',
    backHome: 'Back to the home page',
    otherLanguage: 'Français',
    tagline: 'Field hockey club in Ixelles, Brussels',
    teamsNav: 'Our teams',
    scoreboard: 'Results and upcoming matches',
    lastResult: 'Last result',
    nextMatch: 'Next match',
    home_ground: 'Home',
    away: 'Away',
    captainsTitle: 'Other clubs: contact our captains',
    captainsNote: "Each address forwards to this season's captain.",
    write: 'Email',
  },
} satisfies Record<Locale, Record<string, string>>;

export const homeHref = (locale: Locale) => (locale === defaultLocale ? '/' : `/${locale}/`);

export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/')[1];
  return (locales as readonly string[]).includes(first) ? (first as Locale) : defaultLocale;
}

export const dateFormat = (locale: Locale, date: Date, opts: Intl.DateTimeFormatOptions = {}) =>
  date.toLocaleDateString(locale === 'fr' ? 'fr-BE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Brussels',
    ...opts,
  });
