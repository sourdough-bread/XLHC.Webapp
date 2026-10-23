// Les réglages modifiables (coordonnées, liens, partenaires) sont dans settings.json,
// éditable depuis Pages CMS. Ce fichier ajoute ce qui touche à la structure du site.
import type { Locale } from '../i18n/ui';
import settings from './settings.json';

export const site = {
  name: settings.name,
  shortName: settings.shortName,
  // Logo chargé dans Pages CMS ; sinon l'en-tête affiche le monogramme « XL ».
  logo: settings.logo,
  address: settings.address,
  // Lien « ouvrir dans Maps » (pas de carte intégrée, donc pas de cookies).
  mapUrl: settings.mapUrl,
  email: settings.email,
  social: {
    facebook: settings.facebook,
    instagram: settings.instagram,
    whatsapp: settings.whatsapp,
  },
  // Liens Twizzit (inscription, séance d'essai). Vides tant que les formulaires n'existent pas.
  twizzit: {
    join: settings.twizzitJoin,
    trial: settings.twizzitTrial,
  },
};

// État du terrain, affiché en haut de chaque page.
// Si sheetCsvUrl est rempli (feuille Google publiée en CSV, alimentée par un Google Form),
// le site lit la dernière ligne en direct : horodatage, état, remarque.
// Sinon, il affiche la valeur « fallback ».
export const pitch = {
  sheetCsvUrl: settings.pitchSheetCsvUrl,
  fallback: {
    status: settings.pitchFallbackStatus as PitchStatus,
    note: settings.pitchFallbackNote,
  },
};

export type PitchStatus = 'ok' | 'warning' | 'closed';

export const pitchLabels: Record<Locale, Record<PitchStatus, string>> = {
  fr: { ok: 'Praticable', warning: 'Incertain', closed: 'Impraticable' },
  en: { ok: 'Playable', warning: 'Uncertain', closed: 'Closed' },
};

// Menu principal par langue. Chaque section correspond à un dossier dans
// src/content/pages/<langue>/. Les sous-pages sont ajoutées automatiquement.
// Une entrée avec href pointe vers une page existante sans dossier (les actus et
// événements n'existent qu'en français, signalés par « (FR) » dans le menu anglais).
export const sections: Record<Locale, { slug: string; label: string; href?: string }[]> = {
  fr: [
    { slug: 'rejoindre', label: 'Rejoindre' },
    { slug: 'equipes', label: 'Équipes' },
    { slug: 'club', label: 'Club' },
    { slug: 'membres', label: 'Membres' },
    { slug: 'contact', label: 'Contact' },
  ],
  en: [
    { slug: 'join', label: 'Join us' },
    { slug: 'teams', label: 'Teams' },
    { slug: 'news', label: 'News (FR)', href: '/club/actus/' },
    { slug: 'events', label: 'Events (FR)', href: '/club/evenements/' },
    { slug: 'contact', label: 'Contact' },
  ],
};

export type Partner = { name: string; url: string; tier?: string; logo?: string };

export const partners: Partner[] = settings.partners;
// Le ou les sponsors principaux sont mis en avant sur l'accueil et dans le pied de page.
export const mainSponsors = partners.filter((p) => p.tier === 'main');
export const otherPartners = partners.filter((p) => p.tier !== 'main');
export const partnersHref = '/club/partenaires/';

// Pouvoirs publics, affichés dans le pied de page (souvent exigé par les subsides).
export const funders = settings.funders;
