/** Page d'accueil. */
const home = {
  meta: {
    title: "KIYANZA — Plateforme marketing intelligente propulsée par l'IA",
    description:
      "KIYANZA centralise la création, le monitoring et l'optimisation de vos campagnes marketing grâce à l'IA.",
  },
  hero: {
    badge: "Découvrez l'intelligence de KIYANZA",
    badgeNew: "NOUVEAU",
    titleStart: "Pilotez vos campagnes avec",
    titleHighlight: "l'intelligence artificielle",
    text: "KIYANZA centralise la création, le monitoring et l'optimisation de vos campagnes marketing. Prenez de meilleures décisions, plus vite.",
    ctaPrimary: "Commencer gratuitement",
    ctaSecondary: "Voir les fonctionnalités",
    trust: ["Aucune carte requise", "Annulation à tout moment", "IA incluse"],
    imageAlt:
      "Une professionnelle du marketing souriante, ordinateur portable à la main, prête à piloter ses campagnes avec KIYANZA",
    stats: {
      conversions: "Conversions",
      budgetSplit: "Répartition du budget",
      roi: "ROI",
      bestAudience: "Meilleure audience",
      audienceValue: "25 – 45 ans",
    },
  },
  overview: {
    eyebrow: "Fonctionnalités",
    titleStart: "Tout ce dont vous avez besoin",
    titleEnd: "pour piloter vos campagnes.",
    text: "De la planification à l'optimisation, KIYANZA couvre l'ensemble du cycle marketing.",
    features: [
      {
        title: "Gestion des campagnes",
        description: "Planifiez, lancez et gérez toutes vos campagnes depuis un tableau de bord centralisé.",
      },
      {
        title: "Scénarios & Recommandations IA",
        description: "Comparez des scénarios générés par l'IA et recevez des recommandations d'optimisation.",
      },
      {
        title: "Monitoring en temps réel",
        description:
          "Suivez vos KPI en continu. Recevez des alertes automatiques quand une campagne nécessite votre attention.",
      },
      {
        title: "Rapports avancés",
        description:
          "Générez des rapports de performance complets en quelques secondes. Exportez et partagez-les facilement.",
      },
      {
        title: "Optimisation du ROAS",
        description:
          "Identifiez les canaux les plus rentables et réallouez votre budget automatiquement pour maximiser vos résultats.",
      },
      {
        title: "Données sécurisées",
        description:
          "Vos données marketing sont chiffrées et hébergées de manière sécurisée. Vous conservez le contrôle total.",
      },
    ],
  },
  details: {
    campaigns: {
      heading: "Créez et pilotez vos campagnes en quelques minutes",
      description:
        "Un workflow guidé pour définir vos objectifs, sélectionner vos canaux et allouer votre budget.",
      items: [
        "Planification multi-canaux centralisée",
        "Suivi du budget en temps réel",
        "Alertes automatiques sur les performances",
        "Collaboration d'équipe intégrée",
      ],
      cta: "En savoir plus",
    },
    ai: {
      heading: "L'IA comme copilote de vos décisions marketing",
      description:
        "KIYANZA génère et compare des scénarios marketing pour vous. Comprenez l'impact de chaque décision avant de l'appliquer.",
      items: [
        "Génération de scénarios IA en un clic",
        "Score de performance estimé par scénario",
        "Recommandations de réallocation budgétaire",
        "Aide à la décision — vous restez aux commandes",
      ],
      cta: "Explorer l'IA KIYANZA",
    },
    monitoring: {
      heading: "Ne manquez plus aucun signal important",
      description:
        "KIYANZA surveille vos campagnes en continu et vous alerte immédiatement quand quelque chose nécessite votre attention.",
      items: [
        "Dashboard de monitoring en temps réel",
        "Alertes budget, performance et objectifs",
        "Comparaison des canaux par ROAS",
        "Historique et évolution des métriques",
      ],
      cta: "Voir le monitoring",
    },
  },
  mockups: {
    wizard: {
      title: "Nouvelle campagne",
      subtitle: "Promo de fin d'année — Facebook & Instagram",
      steps: ["Définir l'objectif", "Choisir les canaux", "Fixer le budget", "Lancer"],
      objective: "Objectif",
      objectiveValue: "Augmenter les conversions",
      budget: "Budget",
      budgetValue: "150 000 FCFA",
      duration: "Durée",
      durationValue: "14 jours",
      add: "+ Ajouter",
    },
    scenarios: {
      title: "Comparateur de scénarios IA",
      recommended: "RECOMMANDÉ IA",
      roas: "ROAS estimé",
      conversions: "Conversions",
      items: [
        { name: "Scénario A — Budget focus", roas: "4,2×", conversions: "1 450" },
        { name: "Scénario B — Portée max", roas: "3,6×", conversions: "2 100" },
        { name: "Scénario C — Équilibré", roas: "3,9×", conversions: "1 780" },
      ],
    },
    monitoring: {
      title: "Monitoring en temps réel",
      /** {value} = pourcentage déjà formaté. */
      ofGoal: "de l'objectif",
      percent: "{value} %",
      activities: [
        { text: "Budget Promo Orange Money à 85 %", time: "Il y a 1 h" },
        { text: "Objectif conversions Instagram atteint", time: "Il y a 3 h" },
        { text: "Nouvelle recommandation IA disponible", time: "Il y a 4 h" },
      ],
    },
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Des tarifs simples et transparents",
    text: "Commencez gratuitement. Évoluez selon vos besoins.",
    compare: "Voir tous les tarifs et comparer les formules →",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    text: "Tout ce que vous devez savoir sur KIYANZA. Vous ne trouvez pas votre réponse ?",
    cta: "Voir toutes les ressources",
    items: [
      {
        question: "KIYANZA est-il adapté aux petites entreprises ?",
        answer:
          "Oui, KIYANZA s'adapte à la taille de votre équipe, de l'indépendant à la grande entreprise, grâce à des formules progressives.",
      },
      {
        question: "L'IA prend-elle les décisions à ma place ?",
        answer:
          "Non. KIYANZA est un outil d'aide à la décision. L'IA analyse vos données et formule des recommandations — la décision finale vous appartient toujours.",
      },
      {
        question: "Puis-je connecter plusieurs canaux ?",
        answer:
          "Oui, vous pouvez centraliser et piloter Facebook, Instagram, WhatsApp et d'autres canaux depuis un seul tableau de bord.",
      },
      {
        question: "Les données sont-elles sécurisées ?",
        answer:
          "Vos données sont chiffrées et hébergées de manière sécurisée. KIYANZA ne partage jamais vos données avec des tiers.",
      },
    ],
  },
};

export default home;
