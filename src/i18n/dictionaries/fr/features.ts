/** Page Fonctionnalités. */
const features = {
  meta: {
    title: "Fonctionnalités",
    description:
      "Découvrez toutes les fonctionnalités de KIYANZA : création de campagnes, scénarios IA, gestion centralisée, monitoring temps réel, recommandations et rapports.",
  },
  hero: {
    eyebrow: "Fonctionnalités",
    titleLines: ["Tout pour piloter", "vos campagnes"],
    titleHighlight: "marketing",
    text: "De la planification à l'analyse, KIYANZA vous aide à prendre de meilleures décisions et à optimiser vos performances.",
    ctaPrimary: "Commencer gratuitement",
    ctaSecondary: "Voir comment ça marche",
    imageAlt:
      "Une professionnelle du marketing souriante, ordinateur portable à la main, prête à piloter ses campagnes avec KIYANZA",
  },
  tabs: {
    label: "Sections de fonctionnalités",
    items: ["Campagnes", "Scénarios IA", "Gestion des Campagnes", "Monitoring", "Recommandations IA", "Rapports"],
  },
  sections: {
    campaigns: {
      eyebrow: "Création de campagne",
      heading: ["Créez vos campagnes", "avec précision"],
      description:
        "Définissez vos objectifs, votre budget, votre audience et vos canaux avant de lancer votre campagne.",
      items: [
        "Définition des objectifs marketing",
        "Gestion du budget par canal",
        "Ciblage de l'audience",
        "Sélection des canaux de diffusion",
        "Planification et calendrier de campagne",
      ],
      cta: "Explorer la planification",
    },
    scenarios: {
      eyebrow: "Scénarios IA",
      heading: ["Testez vos stratégies", "avant d'investir"],
      description:
        "Simulez différents scénarios marketing grâce à l'intelligence artificielle pour choisir la meilleure stratégie.",
      items: [
        "Simulation multi-scénarios en temps réel",
        "Analyse du potentiel de chaque scénario",
        "Recommandation automatique du meilleur scénario",
        "Comparaison budget / performances estimées",
        "Ajustements automatiques par canal",
      ],
      cta: "Explorer les scénarios IA",
    },
    monitoring: {
      eyebrow: "Monitoring",
      heading: ["Suivez vos campagnes", "en temps réel"],
      description: "Visualisez vos performances et détectez instantanément les problèmes ou opportunités.",
      items: [
        "Tableau de bord en temps réel",
        "Notifications automatiques sur seuils",
        "Suivi multi-campagnes simultané",
        "Indicateurs ROAS, CPC, CPA normalisés",
        "Historique et comparaison de périodes",
      ],
      cta: "Découvrir le monitoring",
    },
    recommendations: {
      eyebrow: "Recommandations IA",
      heading: ["Transformez vos données", "en décisions"],
      description:
        "KIYANZA analyse vos performances et vous propose des recommandations concrètes pour améliorer vos résultats.",
      items: [
        "Analyse automatique des performances",
        "Recommandations actionnables en 1 clic",
        "Estimation d'impact avant application",
        "Priorisation et calendrier des actions",
      ],
      cta: "Découvrir les recommandations",
      tip: "💡 L'IA KIYANZA génère en moyenne 3 à 5 recommandations par semaine, adaptées à votre secteur et vos objectifs.",
    },
    reports: {
      eyebrow: "Rapports",
      heading: ["Comprenez vos résultats", "en quelques secondes"],
      description:
        "Transformez les données de vos campagnes en rapports clairs et exploitables, prêts à partager.",
      items: [
        "Synthèse visuelle des indicateurs clés",
        "Export PDF et partage direct",
        "Rapports personnalisés par campagne",
        "Comparaison multi-période",
        "Intégration avec Google Sheets et Excel",
      ],
      cta: "Voir un exemple de rapport",
    },
  },
  table: {
    eyebrow: "03 · Gestion des Campagnes",
    title: "Centralisez toutes vos campagnes",
    text: "Retrouvez toutes vos campagnes au même endroit et suivez leur statut, leur budget et leurs performances.",
    search: "Rechercher une campagne…",
    actions: ["Filtre avancée", "Export CSV", "Monitoring complet", "Comparer périodes"],
    columns: ["Campagne", "Statut", "Canaux", "Budget", "ROI", "Actions"],
    campaignLabel: "Campagne",
    status: { running: "En cours", planned: "Planifiée", done: "Terminée" },
    rows: [
      { name: "Promo Orange Money", budget: "500 000 FCFA" },
      { name: "Vente spéciale", budget: "75 000 FCFA" },
      { name: "Lancement produit", budget: "70 000 FCFA" },
      { name: "Fidélisation clients", budget: "50 000 FCFA" },
    ],
    footer: "4 campagnes · Mise à jour il y a 2 min",
    seeAll: "Voir toutes les campagnes →",
  },
  mockups: {
    form: {
      title: "Nouvelle campagne",
      objective: "Objectif",
      objectiveValue: "Conversions",
      budget: "Budget",
      budgetValue: "500 000 FCFA",
      perCampaign: "/ campagne",
      audience: "Audience cible",
      audienceValue: "25 – 45 ans · Cameroun",
      channels: "Canaux de diffusion",
      period: "Période",
      periodValue: "15 Jan – 28 Jan 2025",
      periodDays: "14 jours",
      continue: "Continuer",
    },
    scenarios: {
      title: "Simulation de scénarios IA",
      budget: "Budget : 500 000 FCFA",
      estimatedRoi: "ROI estimé",
      recommended: "Recommandé IA",
      seeAll: "Voir tous les scénarios",
      items: [
        { name: "Scénario A", budget: "200 000 FCFA" },
        { name: "Scénario B", budget: "350 000 FCFA" },
        { name: "Scénario C", budget: "275 000 FCFA" },
      ],
    },
    monitoring: {
      title: "Monitoring temps réel",
      live: "En direct · 12–18 Mai 2025",
      range: "7 derniers jours",
      stats: [
        { label: "Impressions", value: "124 400" },
        { label: "Clics", value: "9 240" },
        { label: "Conversions", value: "1 384" },
        { label: "Dépenses", value: "89 000F" },
        { label: "ROAS", value: "5.8x" },
      ],
      alertsTitle: "Alertes automatiques",
      alerts: [
        { text: "CPC dépasse le seuil sur Facebook", time: "Il y a 2h" },
        { text: "Conversion rate en hausse : +4.2%", time: "Il y a 4h" },
      ],
    },
    recommendation: {
      title: "Recommandation IA",
      meta: "Priorité haute · Confiance 87%",
      badge: "Nouveau",
      headline:
        "Réallouez 20% de votre budget Facebook Ads vers WhatsApp pour améliorer votre performance globale.",
      detail:
        "Basé sur vos 30 derniers jours de données, WhatsApp génère 2x plus de conversions au même coût.",
      stats: [
        { value: "-18.5%", label: "CPC estimé" },
        { value: "87%", label: "Probabilité de succès" },
        { value: "3–5j", label: "Délai de résultat" },
      ],
      apply: "✓ Appliquer cette recommandation",
      details: "Voir les détails de l'analyse →",
    },
    report: {
      title: "Rapport de campagne",
      subtitle: "Promo Orange Money · Mai 2025",
      stats: [
        { label: "Impressions", value: "124 400" },
        { label: "Conversions", value: "1 384" },
        { label: "Taux conv.", value: "4.5%" },
        { label: "Budget dépensé", value: "85 000F" },
        { label: "ROAS", value: "5.8x" },
        { label: "CPA", value: "85 FCFA" },
      ],
      export: "Exporter PDF",
      share: "Partager →",
    },
  },
  process: {
    eyebrow: "Comment ça marche ?",
    titleLines: ["Un seul parcours pour piloter", "vos campagnes"],
    text: "Un flux simple et intégré, du paramétrage jusqu'au rapport final.",
    steps: ["Créer", "Simuler", "Lancer", "Monitorer", "Optimiser", "Exporter"],
  },
};

export default features;
