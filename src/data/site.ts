// Réglages généraux du site. Modifiez ici les coordonnées, liens et partenaires.

export const site = {
  name: 'Ixelles Hockey Club',
  shortName: 'Ixelles HC',
  tagline: 'Club de hockey sur gazon à Ixelles',
  address: 'Rue Volta 18, 1050 Ixelles',
  email: 'manager@ixelles.hockey',
  social: {
    facebook: 'https://www.facebook.com/IxellesHC',
    instagram: 'https://www.instagram.com/ixelles_hockey_club',
    // Lien d'invitation à la communauté WhatsApp du club (à compléter).
    whatsapp: '/le-club/whatsapp/',
  },
};

// État du terrain affiché sur la page d'accueil.
// status: 'ok' (praticable), 'warning' (incertain) ou 'closed' (impraticable).
export const pitch = {
  status: 'ok' as 'ok' | 'warning' | 'closed',
  label: 'Praticable',
  note: '',
};

// Sections du menu principal, dans l'ordre d'affichage.
// Chaque section correspond à un dossier dans src/content/pages/ (sauf « actu »).
export const sections = [
  { slug: 'le-club', label: 'Le Club' },
  { slug: 'sport', label: 'Sport' },
  { slug: 'admin', label: 'Admin' },
  { slug: 'juniors', label: 'Juniors' },
  { slug: 'seniors', label: 'Seniors' },
  { slug: 'xl-card', label: 'XL-Card' },
  { slug: 'events', label: 'Events' },
  { slug: 'actu', label: 'Actu' },
] as const;

export const partners = [
  { name: 'Hockey-Player' },
  { name: 'Weinvest' },
  { name: 'BX1' },
  { name: 'Digitribe' },
  { name: 'Victor Avocats' },
];

export const supporters = [
  { name: 'ADEPS' },
  { name: 'COCOF' },
  { name: 'Région de Bruxelles-Capitale' },
  { name: 'Centre Sportif Ixellois' },
  { name: 'Commune d’Ixelles' },
];
