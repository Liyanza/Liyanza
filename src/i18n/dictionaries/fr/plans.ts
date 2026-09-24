/** Cartes des formules (accueil et /tarifs). */
const plans = {
  recommended: "Recommandé",
  included: "Inclus",
  items: [
    {
      tier: "FREE",
      tagline: "Pour découvrir KIYANZA",
      price: "Gratuit",
      priceNote: "",
      cta: "Commencer gratuitement",
      featured: false,
      features: [
        "Gestion de campagnes",
        "Dashboard",
        "Suivi des performances",
        "Rapports de base",
        "Accès limité à l'IA",
      ],
    },
    {
      tier: "PRO",
      tagline: "Pour les équipes marketing",
      price: "XX XXX FCFA/mois",
      priceNote: "par mois",
      cta: "Commencer avec PRO",
      featured: true,
      features: [
        "Tout Free inclus",
        "Scénarios IA",
        "Recommandations IA avancées",
        "Monitoring avancé",
        "Rapports avancés",
        "Multi-campagnes",
        "Analyse des performances",
      ],
    },
    {
      tier: "BUSINESS",
      tagline: "Pour les entreprises avancées",
      price: "XX XXX FCFA/mois",
      priceNote: "par mois",
      cta: "Choisir Business",
      featured: false,
      features: [
        "Tout PRO inclus",
        "Collaboration d'équipe",
        "Gestion des accès",
        "Analyse approfondie",
        "Reporting avancé",
        "Monitoring avancé",
      ],
    },
    {
      tier: "ENTERPRISE",
      tagline: "Pour les besoins spécifiques",
      price: "Sur devis",
      priceNote: "",
      cta: "Contacter l'équipe",
      /** Le bouton ouvre un email plutôt que l'inscription. */
      contact: true,
      featured: false,
      features: [
        "Solution personnalisée",
        "Accompagnement dédié",
        "Gestion avancée des équipes",
        "Support personnalisé",
        "Fonctionnalités sur mesure",
      ],
    },
  ],
};

export default plans;
