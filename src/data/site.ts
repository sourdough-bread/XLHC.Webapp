// Réglages généraux du site. Modifiez ici les coordonnées, liens et partenaires.
import type { Locale } from '../i18n/ui';

export const site = {
  name: 'Ixelles Hockey Club',
  shortName: 'Ixelles HC',
  address: 'Rue Volta 18, 1050 Ixelles',
  // Lien « ouvrir dans Maps » de la page Contact (pas de carte intégrée, donc pas de cookies).
  mapUrl: 'https://www.openstreetmap.org/search?query=Rue%20Volta%2018%2C%201050%20Ixelles',
  email: 'manager@ixelles.hockey',
  social: {
    facebook: 'https://www.facebook.com/IxellesHC',
    instagram: 'https://www.instagram.com/ixelles_hockey_club',
    whatsapp: '/membres/whatsapp/',
  },
  // Liens Twizzit (inscription, séance d'essai). À compléter quand les formulaires existent.
  twizzit: {
    join: '',
    trial: '',
  },
  hockeyBelgiumRules: 'https://www.hockey.be',
};

// État du terrain, affiché en haut de chaque page.
// Si sheetCsvUrl est rempli (feuille Google publiée en CSV, alimentée par un Google Form),
// le site lit la dernière ligne en direct : horodatage, état, remarque.
// Sinon, il affiche la valeur « fallback » ci-dessous.
export const pitch = {
  sheetCsvUrl: '',
  fallback: {
    status: 'ok' as PitchStatus,
    note: '',
  },
};

export type PitchStatus = 'ok' | 'warning' | 'closed';

export const pitchLabels: Record<Locale, Record<PitchStatus, string>> = {
  fr: { ok: 'Praticable', warning: 'Incertain', closed: 'Impraticable' },
  en: { ok: 'Playable', warning: 'Uncertain', closed: 'Closed' },
};

// Menu principal par langue. Chaque section correspond à un dossier dans
// src/content/pages/<langue>/. Les sous-pages sont ajoutées automatiquement.
export const sections: Record<Locale, { slug: string; label: string }[]> = {
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
    { slug: 'contact', label: 'Contact' },
  ],
};

export const partners = [
  { name: 'Hockey-Player', url: '' },
  { name: 'Weinvest', url: '' },
  { name: 'BX1', url: '' },
  { name: 'Digitribe', url: '' },
  { name: 'Victor Avocats', url: '' },
];

// Pouvoirs publics, affichés dans le pied de page (souvent exigé par les subsides).
export const funders = [
  { name: 'ADEPS' },
  { name: 'COCOF' },
  { name: 'Région de Bruxelles-Capitale' },
  { name: 'Centre Sportif Ixellois' },
  { name: 'Commune d’Ixelles' },
];
