/**
 * Dashboard — structure et libellés partagés (navigation, barre du haut,
 * rôles, statuts, accueil). Les zones métier ont leur propre dictionnaire
 * (dashCampaigns, dashWizard, dashMonitoring, dashInsights, dashAccount).
 */
const dash = {
  titles: {
    home: "Accueil",
    campaigns: "Campagnes",
    newCampaign: "Nouvelle campagne",
    results: "Résultats de simulation",
    monitoring: "Monitoring",
    terrain: "Terrain",
    recommendations: "Recommandations IA",
    reports: "Rapports",
    teams: "Équipes",
    company: "Mon entreprise",
    createCompany: "Créer mon entreprise",
    profile: "Profil",
    notifications: "Notifications",
    help: "Aide",
  },
  nav: {
    label: "Navigation principale",
    settings: "Paramètres",
    home: "Accueil",
    campaigns: "Campagnes",
    monitoring: "Monitoring",
    terrain: "Terrain",
    recommendations: "Recommandations IA",
    reports: "Rapports",
    teams: "Equipes",
    company: "Mon entreprise",
    profile: "Profil",
    notifications: "Notifications",
    help: "Aide",
  },
  topBar: {
    searchCampaign: "Rechercher une campagne...",
    period: "7 derniers jours",
    notifications: "Notifications",
    /** {count} = nombre de notifications non lues. */
    notificationsUnread: "Notifications ({count} non lues)",
    closeMenu: "Fermer le menu",
    logout: "Se déconnecter",
  },
  roles: {
    ADMIN: "Administrateur",
    MARKETING_MANAGER: "Responsable Marketing",
    COMMUNITY_MANAGER: "Community Manager",
    PROVIDER: "Prestataire",
  },
  statuses: {
    DRAFT: "Brouillon",
    PLANNED: "Planifiée",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminée",
    CANCELLED: "Annulée",
  },
  campaignTypes: {
    DIGITAL: "Digitale",
    RADIO: "Radio",
    POSTER: "Affichage",
  },
  common: {
    loading: "Chargement…",
    comingSoon: "Bientôt disponible",
    genericError: "Une erreur est survenue.",
    cancel: "Annuler",
    confirm: "Confirmer",
    save: "Enregistrer",
    close: "Fermer",
    retry: "Réessayer",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    seeAll: "Voir tout",
    search: "Rechercher",
  },
  roleGate: {
    title: "Accès réservé",
    /** {roles} = liste des rôles autorisés. */
    text: "Cette section est réservée aux rôles {roles}. Contactez un administrateur de votre entreprise si vous pensez qu'il s'agit d'une erreur.",
  },
  home: {
    searchPlaceholder: "Rechercher une campagne, un rapport...",
    loading: "Chargement du tableau de bord…",
    loadError: "Impossible de charger le tableau de bord.",
    /** {name} = prénom (le « , » est inclus seulement si le prénom existe). */
    hello: "Bonjour",
    subtitle: "Voici un aperçu de la performance de vos campagnes.",
    trend: "Vos performances sont en hausse de 18 % cette semaine.",
    newCampaign: "Nouvelle campagne",
    kpis: {
      total: "Campagnes totales",
      inProgress: "En cours",
      completed: "Terminées",
      drafts: "Brouillons",
      plannedBudget: "Budget prévu total",
    },
    budget: {
      title: "Budget prévu vs réel",
      subtitle: "Cumulé sur l'ensemble de vos campagnes.",
      planned: "Budget prévu",
      actual: "Budget réel",
      /** {percent} = écart en %. */
      over: "{percent}% au-dessus du prévu",
      under: "{percent}% sous le prévu",
    },
    donut: {
      title: "Répartition des campagnes",
      subtitle: "Par statut, sur l'ensemble de l'entreprise.",
      empty: "Aucune campagne créée pour l'instant.",
      unit: "campagnes",
    },
    ai: {
      title: "Recommandations IA",
      subtitle: "KIYANZA analysera bientôt vos données en continu.",
      empty: "Aucune recommandation pour l'instant",
    },
  },
};

export default dash;
