// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

// Anciennes adresses de ixelles.hockey (Google Sites) vers les nouvelles pages,
// pour que les liens partagés dans WhatsApp et sur Google continuent de marcher.
const redirects = {
  '/accueil': '/',
  '/actu': '/club/actus/',
  '/le-club': '/club/',
  '/le-club/accès': '/contact/',
  '/le-club/adn': '/club/a-propos/',
  '/le-club/business-club': '/club/partenaires/',
  '/le-club/charte': '/club/a-propos/#charte',
  '/le-club/roi': '/club/a-propos/#roi',
  '/le-club/contact': '/contact/',
  '/le-club/cotisations': '/rejoindre/cotisations/',
  '/le-club/equipe': '/club/a-propos/',
  '/le-club/sponsoring': '/club/partenaires/',
  '/le-club/whatsapp': '/membres/whatsapp/',
  '/sport': '/membres/sport/',
  '/sport/je-découvre': '/rejoindre/premiers-pas/',
  '/sport/occupation-du-terrain': '/membres/terrain/',
  '/sport/entrainements': '/membres/sport/#entrainements',
  '/sport/rôles': '/membres/sport/#roles',
  '/sport/arbitrage': '/membres/sport/#arbitrage',
  '/sport/règles-du-jeu': '/membres/sport/#regles',
  '/admin': '/membres/formalites/',
  '/admin/conditions-générales': '/membres/formalites/#conditions-generales',
  '/admin/demande-daffiliation': '/rejoindre/inscription/',
  '/admin/désaffiliation': '/membres/formalites/#desaffiliation',
  '/admin/etalement-de-cotisation': '/rejoindre/cotisations/#etalement',
  '/admin/remisereport': '/rejoindre/cotisations/#reductions',
  '/admin/attestations-mutuelles': '/membres/formalites/#mutuelle',
  '/admin/déclaration-daccident': '/membres/formalites/#accident',
  '/admin/app-hockey-belgium': '/membres/formalites/#app-hockey-belgium',
  '/admin/bénévoles': '/membres/benevolat/',
  '/juniors': '/equipes/juniors/',
  '/juniors/stages': '/equipes/stages/',
  '/seniors': '/equipes/seniors/',
  '/seniors_1': '/equipes/seniors/',
  '/xl-card': '/rejoindre/',
  '/events': '/club/evenements/',
  '/events/mixettes': '/club/evenements/',
  '/meteo': '/membres/terrain/',
};

export default defineConfig({
  site: 'https://www.ixelles.hockey',
  trailingSlash: 'ignore',
  redirects,
  markdown: {
    // Permet d'écrire « ## Charte {#charte} » pour fixer l'ancre d'un titre.
    processor: satteri({ features: { headingAttributes: true } }),
  },
});
