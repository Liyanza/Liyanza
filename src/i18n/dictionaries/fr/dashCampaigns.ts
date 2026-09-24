/**
 * Dashboard — liste des campagnes, tableau, résultats de simulation et
 * graphiques associés.
 */
const dashCampaigns = {
  list: {
    loadError: "Impossible de charger les campagnes.",
    newCampaign: "Nouvelle campagne",
    filters: {
      all: "Toutes",
      DRAFT: "Brouillons",
      PLANNED: "Programmées",
      IN_PROGRESS: "En cours",
      COMPLETED: "Terminées",
      CANCELLED: "Annulées",
    },
    moreDetails: "Besoin de plus de détails ?",
    seeReports: "Consultez les rapports",
  },
  filterBar: {
    type: "Type",
    allChannels: "Tous canaux",
    period: "Période",
    last30Days: "30 derniers jours",
    performance: "Performance",
    moreFilters: "Plus de filtres",
    reset: "Réinitialiser les filtres",
  },
  pagination: {
    /** {start}, {end}, {total} = bornes affichées et total. */
    summary: "Affichage de {start} à {end} sur {total} campagnes",
    previous: "Page précédente",
    next: "Page suivante",
  },
  table: {
    title: "Campagnes récentes",
    description: "Suivez l'évolution de vos campagnes et leurs performances.",
    viewAll: "Voir toutes",
    emptyTitle: "Aucune campagne ne correspond à ces filtres",
    emptyText: "Essayez une autre recherche ou réinitialisez les filtres.",
    headers: {
      campaign: "Campagne",
      type: "Type",
      status: "Statut",
      budget: "Budget prévu",
      actions: "Actions",
    },
    view: "Voir",
    transitions: {
      launch: "Lancer",
      start: "Démarrer",
      complete: "Terminer",
      cancel: "Annuler",
    },
    confirmCancel: "Annuler cette campagne ? Cette action est irréversible.",
    statusError: "Impossible de changer le statut.",
  },
  results: {
    title: "Simulation",
    loadError: "Impossible de charger la simulation.",
    back: "Retour aux campagnes",
    subtitle: "Voici les résultats estimés pour vos scénarios.",
    loading: "Chargement des résultats…",
    empty: "Aucune simulation trouvée pour cette campagne.",
    detail: "Détail du scénario",
    tabs: {
      resume: "Résumé",
      canaux: "Canaux",
      budget: "Budget",
      performances: "Performances",
    },
    metrics: {
      reach: "Portée",
      clicks: "Clics",
      conversionsShort: "Conv.",
      roi: "ROI",
    },
    resume: {
      reach: "Portée estimée",
      engagement: "Taux d'engagement",
      ctr: "CTR estimé",
      roas: "ROAS estimé",
      budgetSplit: "Répartition du budget",
      why: "Pourquoi ce scénario ?",
    },
    channels: {
      empty: "Aucun canal sélectionné pour cette simulation.",
      title: "Répartition par canal",
    },
    budget: {
      empty: "Aucune donnée de budget disponible pour cette simulation.",
      title: "Répartition hebdomadaire du budget",
      /** {amount} = montant formaté avec « FCFA ». */
      total: "Budget total : {amount}",
      pacing: "Cadence adaptative : montée en charge progressive avec un pic en milieu de campagne.",
    },
    performances: {
      title: "Performances dans le temps",
      avgCpc: "CPC moyen",
      cpa: "Coût par acquisition",
      conversionRate: "Taux de conversion",
      roi: "ROI estimé",
    },
    scenarios: {
      current: "Scénario actuel",
      recommended: "Recommandé",
      globalScore: "Score global",
      others: "Autres scénarios",
      score: "Score",
    },
  },
  charts: {
    /** {segments} = liste « libellé pourcentage ». */
    donutLabel: "Répartition du budget : {segments}",
    /** {week} = numéro de semaine, {amount} = montant formaté. */
    weekSpend: "Semaine {week} : {amount}",
    /** Abréviation de « semaine » sur l'axe : S1, S2… */
    weekShort: "S{week}",
    /** {series} = série, {week} = numéro, {value} = valeur. */
    pointTitle: "{series} — semaine {week} : {value}",
    conversions: "Conversions",
    lineLabel: "Évolution hebdomadaire de la portée, des clics et des conversions",
    lineNote:
      "Chaque courbe est indexée sur son propre maximum (échelles très différentes) — survolez un point pour la valeur exacte.",
  },
};

export default dashCampaigns;
