/**
 * Dashboard — assistant de création de campagne (flux Digital et Radio).
 */
const dashWizard = {
  breadcrumb: "Assistant de Création",
  close: "Fermer l'assistant de création",
  continue: "Continuer",
  creating: "Création...",
  errors: {
    incomplete: "Formulaire incomplet : revenez aux étapes précédentes.",
    noBroadcast: "Aucune diffusion ne correspond à la période et aux jours sélectionnés.",
  },
  steps: ["Choix de la campagne", "Définition de la campagne", "Objectif principal", "Cibles", "Budget", "Canal", "Simulation"],
  stepper: {
    /** {current}/{total} = étape courante et nombre d'étapes. */
    step: "Étape {current} / {total}",
    draftSaved: "Brouillon sauvegardé",
    progress: "Progression",
  },
  type: {
    title: "Quel type de campagne souhaitez-vous créer ?",
    options: {
      digital: { title: "Campagne Digitale", description: "Facebook, Instagram, Google Ads & Email" },
      radio: { title: "Campagne Radio", description: "Diffusion sur les radios locales et nationales" },
      print: { title: "Supports Publicitaires", description: "Affiches, bâches, roll-ups, street marketing" },
    },
    tip: "Combinez plusieurs types de campagnes pour maximiser votre impact. Une campagne radio + supports publicitaires crée une présence forte.",
  },
  definition: {
    title: "Parlons de votre campagne.",
    subtitle:
      "Donnez une identité claire à votre campagne pour permettre à l'IA d'ajuster ses analyses et ses recommandations.",
    name: "Nom de la campagne",
    required: "Obligatoire",
    namePlaceholder: "Donnez un nom à votre campagne",
    nameHint: "Choisissez un libellé explicite pour votre équipe et vos rapports de performance.",
    product: "Que souhaitez-vous promouvoir ?",
    productHint: "Produit ou service actif",
    productPlaceholder: "Entrez le nom du produit à promouvoir",
    description: "Description",
    optional: "(optionnel)",
    generate: "Générer une description avec l'IA",
    descriptionPlaceholder: "Décrivez le contexte marketing de votre campagne...",
    poweredBy: "Optimisé par KIYANZA AI",
  },
  objective: {
    title: "Quel résultat souhaitez-vous obtenir ?",
    subtitle: "Choisissez l'objectif prioritaire de cette campagne.",
    add: "Ajouter un objectif",
    options: {
      AWARENESS: {
        title: "Notoriété",
        description: "Faire connaître votre marque et maximiser la mémorisation publicitaire sur l'ensemble de vos canaux.",
        optimization: "OPTIMISATION CPM",
      },
      LEADS: {
        title: "Génération de leads",
        description: "Obtenir des contacts qualifiés et des intentions d'achat directes pour alimenter vos équipes commerciales.",
        optimization: "OPTIMISATION CPM",
      },
      CONVERSION: {
        title: "Conversions",
        description: "Transformer davantage de prospects en utilisateurs actifs d'un service ou testeurs d'une application.",
        optimization: "OPTIMISATION CPA",
      },
      SALES: {
        title: "Ventes directes",
        description: "Accélérer les transactions directes et maximiser le chiffre d'affaires immédiat sur boutique ou catalogue.",
        optimization: "OPTIMISATION ROAS",
      },
      TRAFFIC: {
        title: "Trafic qualifié",
        description: "Augmenter massivement les visites sur votre site web, page produit ou application avec un rebond minimal.",
        optimization: "OPTIMISATION CPC",
      },
      ENGAGEMENT: {
        title: "Engagement",
        description: "Créer des interactions fortes, des partages, des commentaires et un dialogue communautaire pérenne.",
        optimization: "OPTIMISATION CPE",
      },
    },
  },
  audience: {
    title: "Qui souhaitez-vous atteindre ?",
    subtitle: "Définissez les segments démographiques et affinitaires prioritaires.",
    demographics: "Démographie & Tranche d'Âge",
    gender: "Répartition par genre",
    genders: {
      ALL: "Tous (Hommes/Femmes)",
      MALE: "Hommes uniquement",
      FEMALE: "Femmes uniquement",
    },
    interests: "Centres d'intérêt & Comportements",
    /** {count} = nombre de centres d'intérêt choisis. */
    selectedOne: "{count} sélectionné",
    selectedMany: "{count} sélectionnés",
    interestsHint:
      "Affinez la sélection pour toucher les utilisateurs ayant montré une intention d'achat ou une interaction vérifiée sur ces verticaux.",
    /** Même ordre que interestTags (data/dashboard.ts). */
    interestLabels: [
      "Fintech & Mobile Money",
      "Entrepreneuriat",
      "Commerce & PME",
      "E-commerce",
      "Études supérieures",
      "Investissement immobilier",
    ],
    age: {
      selected: "Tranche d'âge sélectionnée",
      /** {age} = âge. */
      years: "{age} ans",
      max: "65+ ans",
      minLabel: "Âge minimum",
      maxLabel: "Âge maximum",
    },
  },
  budget: {
    title: "Combien souhaitez-vous investir et sur quelle période ?",
    subtitle: "Définissez le budget que vous souhaitez allouer à cette campagne et sur quelle période.",
    typeAndAmount: "Type de budget et Montant",
    total: "Budget total",
    daily: "Budget quotidien",
    amount: "Montant global alloué",
    adaptive: "Cadence adaptative activée",
    presets: "Préréglages :",
    period: "Période de diffusion",
    /** {days} = durée en jours. */
    duration: "Durée totale : {days} jours",
    startDate: "Date de début",
    endDate: "Date de fin",
  },
  channels: {
    title: "Configurez vos canaux de diffusion",
    subtitle: "Choisissez vos canaux !",
    loading: "Chargement de vos comptes liés…",
    loadError: "Impossible de charger les comptes liés.",
    notLinked: "Aucun compte connecté — vous pourrez le lier depuis Mon entreprise",
    descriptions: {
      FACEBOOK: "Atteignez votre audience sur Facebook",
      INSTAGRAM: "Touchez votre communauté",
      WHATSAPP: "Communiquez directement",
      TIKTOK: "Captez une audience engagée",
      YOUTUBE: "Vidéo et visibilité maximale",
    },
  },
  simulation: {
    failed: "La création a échoué",
    title1: "Nous analysons et simulons",
    title2: "vos scénarios...",
    text1: "Notre IA compare les performances prévisionnelles",
    text2: "pour vous proposer la meilleure stratégie.",
    analysing: "Analyse en cours",
    checklist: ["Analyse de l'audience", "Performance par canal", "Optimisation du budget", "Recommandations IA"],
  },
  radio: {
    /** Nom de la campagne créée ; {month} = mois et année de début. */
    campaignName: "Campagne Radio {month}",
    /** Objectif enregistré ; {station} = nom de la station. */
    objective: "Diffusion radio — {station}",
    station: {
      title: "Sur quelle radio souhaitez-vous communiquer ?",
      subtitle: "Sélectionnez la station de diffusion principale.",
      search: "Rechercher une radio...",
      empty: "Aucune radio ne correspond à votre recherche.",
    },
    coverage: {
      national: "Couverture nationale",
      douala: "Couverture Douala",
      yaounde: "Couverture Yaoundé",
    },
    zones: {
      national: "Nationale",
      douala: "Douala",
      yaounde: "Yaoundé",
    },
    spot: {
      title: "Importez votre spot radio",
      badFormat: "Format non supporté : seuls MP3 et WAV sont acceptés.",
      tooLarge: "Fichier trop volumineux : 30 Mo maximum.",
      imported: "Fichier importé",
      remove: "Retirer le fichier",
      import: "Importer un spot",
      formats: "MP3, WAV (max 30Mo)",
      orRecord: "Ou enregistrer un message",
      record: "Enregistrer",
      name: "Nom du spot",
      namePlaceholder: "Donnez un nom à votre spot",
      duration: "La durée de votre spot",
      /** Durées : {s} secondes, {m} minutes. */
      seconds: "{s} sec",
      minutes: "{m} min",
      minutesSeconds: "{m} min {s} sec",
    },
    frequency: {
      title: "Fréquence de diffusion",
      /** {count} = nombre de diffusions par jour. */
      perDayOne: "{count} diffusion par jour",
      perDayMany: "{count} diffusions par jour",
      slots: "Créneaux horaires",
      /** {slot} = créneau horaire. */
      removeSlot: "Retirer {slot}",
      addSlot: "Ajouter un créneau",
      allSlots: "Tous les créneaux sont ajoutés.",
      days: "Jours de diffusion",
      period: "Période de diffusion",
      from: "Du",
      to: "Au",
    },
    days: { MON: "Lun", TUE: "Mar", WED: "Mer", THU: "Jeu", FRI: "Ven", SAT: "Sam", SUN: "Dim" },
    recap: {
      title: "Récapitulatif",
      radio: "Radio",
      period: "Période",
      spot: "Spot",
      frequency: "Fréquence",
      slots: "Créneaux",
      days: "Jours",
      zone: "Zone",
    },
    confirmation: {
      title: "Campagne radio créée !",
      /** {date} = date de début. */
      text: "Votre campagne est prête et sera diffusée à partir du {date}.",
      draft: "Brouillon",
      budget: "Budget",
      period: "Période",
      broadcasts: "Diffusions planifiées",
      /** {count} = nombre de diffusions planifiées. */
      truncated:
        "Limite technique atteinte : seules les {count} premières diffusions ont été planifiées. Réduisez la fréquence ou la période pour tout couvrir.",
      monitoring: "Aller au monitoring",
      viewCampaign: "Voir la campagne",
    },
  },
};

export default dashWizard;
