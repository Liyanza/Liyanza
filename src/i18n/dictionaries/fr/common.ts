/**
 * Textes partagés par tout le site (en-tête, pied de page, splash, SEO par
 * défaut). Le français est la référence : les autres langues doivent avoir
 * exactement les mêmes clés (vérifié à la compilation).
 */
const common = {
  meta: {
    defaultTitle: "KIYANZA — Plateforme marketing intelligente propulsée par l'IA",
    description:
      "KIYANZA centralise la création, le monitoring et l'optimisation de vos campagnes marketing grâce à l'IA.",
  },
  nav: {
    label: "Navigation principale",
    mobileLabel: "Navigation principale mobile",
    home: "Accueil",
    features: "Fonctionnalités",
    pricing: "Tarifs",
    resources: "Ressources",
    about: "À propos",
    homeAria: "KIYANZA — Accueil",
    login: "Se connecter",
    tryFree: "Essayer gratuitement",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  language: {
    /** Libellé accessible du bouton : {current} = langue actuelle. */
    switcher: "Changer de langue, actuellement {current}",
    menu: "Choisir la langue",
  },
  footer: {
    tagline:
      "La plateforme intelligente qui vous aide à planifier, suivre et optimiser vos campagnes marketing grâce à la puissance de l'IA.",
    columns: {
      product: "Produit",
      resources: "Ressources",
      company: "Entreprise",
      legal: "Légal",
    },
    links: {
      features: "Fonctionnalités",
      pricing: "Tarifs",
      aiScenarios: "Scénarios IA",
      updates: "Mises à jour",
      blog: "Blog",
      guides: "Guides",
      caseStudies: "Études de cas",
      helpCenter: "Centre d'aide",
      about: "À propos",
      contact: "Contact",
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
      dataDeletion: "Suppression des données",
      legalNotice: "Mentions légales",
      cookies: "Cookies",
    },
    newsletter: {
      title: "Restez informé",
      text: "Recevez nos conseils et nouveautés chaque semaine.",
      emailLabel: "Votre adresse email",
      placeholder: "Votre email",
      submit: "S'inscrire à la newsletter",
    },
    /** {year} = année en cours. */
    copyright: "© {year} Kiyanza. Tous droits réservés.",
  },
  splash: {
    skip: "Passer",
    logoLabel: "KIYANZA — Light your future",
  },
  finalCta: {
    eyebrow: "Commencez dès aujourd'hui",
    title: "Prêt à piloter votre prochaine campagne autrement ?",
    text: "Rejoignez KIYANZA et transformez vos idées en résultats concrets. Gratuit pour commencer.",
    primary: "Commencer gratuitement",
    secondary: "Voir comment ça marche",
    points: ["Annulation à tout moment", "Support inclus"],
  },
  chatbot: {
    label: "Posez vos questions",
    open: "Ouvrir le chat marketing",
    close: "Fermer le chat",
    dialog: "Assistant marketing KIYANZA",
    name: "Assistant KIYANZA",
    status: "Expert Marketing IA · En ligne",
    welcome:
      "Bonjour ! 👋 Je suis votre assistant marketing KIYANZA. Posez-moi toutes vos questions sur vos campagnes, budgets, audiences ou stratégies marketing !",
    thinking: "L'assistant rédige sa réponse…",
    loginRequired: "Connectez-vous à votre espace KIYANZA pour discuter avec l'assistant.",
    loginCta: "Se connecter",
    forbidden: "L'assistant est réservé aux administrateurs et responsables marketing de votre entreprise.",
    error: "L'assistant est momentanément indisponible. Réessayez dans quelques instants.",
    quickActions: ["Améliorer mon ROI", "Stratégie réseaux sociaux ?", "Comment optimiser mon budget ?"],
    inputLabel: "Votre question marketing",
    placeholder: "Posez votre question marketing…",
    send: "Envoyer le message",
    poweredBy: "Propulsé par KIYANZA IA",
  },
  notFound: {
    title: "Page introuvable",
    text: "La page que vous cherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
};

export default common;
