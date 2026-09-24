/**
 * Page Ressources. Le contenu (guides, articles, vidéos, FAQ) alimente aussi
 * l'index de la barre de recherche (voir data/resources.ts).
 */
const resources = {
  meta: {
    title: "Ressources",
    description:
      "Guides, tutoriels, vidéos et FAQ — tout ce qu'il faut pour piloter vos campagnes comme un expert avec KIYANZA.",
  },
  hero: {
    eyebrow: "Centre de ressources",
    titleStart: "Comment pouvons-nous",
    titleHighlight: "vous aider ?",
    text: "Guides, tutoriels, vidéos et FAQ — tout ce qu'il faut pour piloter vos campagnes comme un expert.",
  },
  search: {
    formLabel: "Rechercher dans les ressources",
    placeholder: "Chercher un guide, tutoriel, question...",
    inputLabel: "Chercher un guide, un tutoriel ou une question",
    clear: "Effacer la recherche",
    submit: "Rechercher",
    /** {count} résultat(s) pour « {query} » */
    resultsOne: "1 résultat pour « {query} »",
    resultsMany: "{count} résultats pour « {query} »",
    noResults: "Aucun résultat pour « {query} »",
    hint: "Essayez un autre mot-clé, par exemple « campagne », « budget » ou « rapports ».",
    popularLabel: "Populaires :",
    popular: ["Créer une campagne", "Scénarios IA", "Monitoring", "Rapports", "Budget"],
    kinds: {
      guide: "Guide",
      tutorial: "Tutoriel",
      article: "Article",
      video: "Vidéo",
      featured: "Guide vedette",
      faq: "FAQ",
    },
  },
  categories: {
    eyebrow: "Accès rapide",
    title: "Trouvez ce dont vous avez besoin",
    items: [
      { title: "Centre d'aide", description: "Obtenez rapidement des réponses à vos questions les plus fréquentes.", cta: "Consulter" },
      { title: "Documentation", description: "Découvrez en détail toutes les fonctionnalités de KIYANZA.", cta: "Lire la doc" },
      { title: "Guides & Tutoriels", description: "Apprenez à mieux piloter vos campagnes pas à pas.", cta: "Voir les guides" },
      { title: "Vidéos", description: "Regardez des démonstrations et tutoriels en quelques minutes.", cta: "Regarder" },
    ],
  },
  guides: {
    eyebrow: "Guides & Tutoriels",
    title: "Apprenez à mieux piloter vos campagnes",
    seeAll: "Voir tous les guides",
    filters: { all: "Tous", guide: "Guide", tutorial: "Tutoriel", video: "Vidéo", faq: "FAQ" },
    levels: { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" },
    read: "Lire",
    empty: "Aucun contenu disponible pour ce filtre pour le moment.",
    items: [
      {
        type: "guide",
        level: "beginner",
        title: "Comment créer sa première campagne avec KIYANZA",
        description: "Découvrez étape par étape comment définir vos objectifs, votre budget et vos canaux.",
        readingTime: "8 min de lecture",
      },
      {
        type: "tutorial",
        level: "intermediate",
        title: "Utiliser les scénarios IA pour optimiser vos campagnes",
        description: "Comparez différents scénarios et laissez l'IA recommander la meilleure stratégie.",
        readingTime: "5 min de lecture",
      },
      {
        type: "guide",
        level: "intermediate",
        title: "Interpréter les performances d'une campagne",
        description: "Apprenez à lire vos KPIs, graphiques et alertes de monitoring.",
        readingTime: "6 min de lecture",
      },
      {
        type: "guide",
        level: "advanced",
        title: "Optimiser son budget marketing",
        description: "Stratégies concrètes pour répartir efficacement votre budget sur plusieurs canaux.",
        readingTime: "7 min de lecture",
      },
      {
        type: "tutorial",
        level: "beginner",
        title: "Exporter et partager vos rapports",
        description: "Générez des PDF, planifiez des envois automatiques et partagez avec votre équipe.",
        readingTime: "4 min de lecture",
      },
      {
        type: "guide",
        level: "advanced",
        title: "Stratégie multi-canaux avec KIYANZA",
        description: "Pilotez Facebook, Instagram, WhatsApp et Google Ads depuis un seul tableau de bord.",
        readingTime: "9 min de lecture",
      },
    ] as { type: "guide" | "tutorial"; level: "beginner" | "intermediate" | "advanced"; title: string; description: string; readingTime: string }[],
  },
  featuredGuide: {
    label: "Guide",
    complete: "COMPLET",
    duration: "45 min",
    category: "Stratégie",
    eyebrow: "Guide vedette",
    title: "Le guide complet du pilotage de campagnes marketing",
    description:
      "De la stratégie à l'analyse des performances, ce guide complet vous accompagne à chaque étape pour tirer le meilleur de KIYANZA et de vos investissements marketing.",
    tags: ["Stratégie", "Budgets", "KPIs", "IA", "Multi-canaux"],
    download: "Télécharger le guide",
    readOnline: "Lire en ligne",
  },
  articles: {
    eyebrow: "Blog",
    title: "Derniers articles & conseils",
    seeAll: "Voir tous les articles",
    featuredBadge: "À la une",
    read: "Lire",
    featured: {
      tag: "Stratégie",
      title: "5 erreurs à éviter dans vos campagnes Facebook Ads en Afrique",
      date: "3 sept. 2026",
      readingTime: "6 min de lecture",
    },
    items: [
      { tag: "IA & Marketing", title: "Comment l'IA transforme la gestion des campagnes marketing", date: "28 août 2026", readingTime: "8 min" },
      { tag: "Cas d'usage", title: "Comment une PME camerounaise a doublé son ROI en 3 mois", date: "20 août 2026", readingTime: "5 min" },
      { tag: "Stratégie", title: "Budget marketing : les indicateurs clés à suivre chaque semaine", date: "15 août 2026", readingTime: "7 min" },
    ],
  },
  videos: {
    eyebrow: "Vidéos",
    title: "Apprenez en regardant",
    seeAll: "Voir toutes les vidéos",
    /** {title} = titre de la vidéo. */
    play: "Lire la vidéo {title}",
    items: [
      { title: "Présentation générale de KIYANZA", views: "1,2k vues", duration: "5:12" },
      { title: "Créer votre première campagne", views: "986 vues", duration: "8:30" },
      { title: "Dashboard & KPIs : tour d'horizon", views: "754 vues", duration: "6:45" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    text: "Vous ne trouvez pas votre réponse ? Notre équipe est là pour vous aider.",
    cta: "Contacter le support",
    items: [
      {
        question: "Comment accéder aux rapports ?",
        answer:
          "Rendez-vous dans l'onglet Rapports de votre tableau de bord pour générer, exporter et partager vos rapports de campagne en quelques clics.",
      },
      {
        question: "Comment modifier le budget d'une campagne active ?",
        answer:
          "Ouvrez la campagne concernée depuis la liste de vos campagnes, puis ajustez le budget directement depuis son panneau de paramètres — le changement est pris en compte immédiatement.",
      },
      {
        question: "Puis-je connecter plusieurs comptes publicitaires ?",
        answer:
          "Oui, KIYANZA permet de connecter plusieurs comptes (Facebook, Instagram, WhatsApp, Google Ads) et de les piloter depuis un seul tableau de bord unifié.",
      },
      {
        question: "Comment fonctionne l'assistant IA ?",
        answer:
          "L'assistant IA analyse vos campagnes et vos objectifs pour générer des scénarios et des recommandations concrètes, que vous restez libre d'appliquer ou d'ajuster.",
      },
      {
        question: "KIYANZA est-il disponible en version mobile ?",
        answer:
          "L'interface est pensée responsive pour être consultée depuis un mobile ou une tablette ; une application dédiée est envisagée pour une prochaine étape.",
      },
      {
        question: "Comment contacter le support ?",
        answer:
          "Notre équipe est joignable via le bouton « Contacter le support » ci-contre ou directement depuis le chat intégré à la plateforme.",
      },
    ],
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Restez informé des dernières ressources",
    text: "Recevez chaque semaine les nouveaux guides, articles et conseils directement dans votre boîte mail.",
    placeholder: "Votre adresse email",
    submit: "S'inscrire",
    note: "Désinscription à tout moment · Pas de spam",
    social: "Apprécié par + de 500 marketeurs",
  },
};

export default resources;
