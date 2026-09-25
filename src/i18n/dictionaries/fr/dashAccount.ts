/**
 * Dashboard — équipes, entreprise (création, comptes sociaux),
 * notifications, profil et aide.
 */
const dashAccount = {
  search: "Rechercher...",
  sending: "Envoi...",
  teams: {
    loadError: "Impossible de charger l'équipe.",
    createError: "Impossible de créer ce membre.",
    roleError: "Impossible de changer le rôle.",
    deactivateError: "Impossible de désactiver ce membre.",
    /** {name} = prénom et nom du membre. */
    confirmDeactivate: "Désactiver {name} ? Cette action est irréversible depuis Liyanza.",
    invite: "Inviter un membre",
    inviteTitle: "Inviter un nouveau membre",
    inviteText: "Un mot de passe temporaire lui sera envoyé par email.",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    sendInvite: "Envoyer l'invitation",
    loading: "Chargement des membres…",
    headers: {
      member: "Membre",
      phone: "Téléphone",
      role: "Rôle",
      status: "Statut",
      actions: "Actions",
    },
    you: "(vous)",
    deactivated: "Désactivé",
    active: "Actif",
    deactivate: "Désactiver",
    /** {name} = nom de la personne invitée. */
    invitedTitle: "Invitation envoyée à {name}",
    invitedText:
      "Cette personne a déjà un compte Liyanza : elle a reçu un email sans mot de passe et rejoindra l'équipe dès qu'elle aura cliqué sur le lien.",
  },
  createCompany: {
    error: "Impossible de créer votre entreprise.",
    welcome: "Bienvenue sur KIYANZA",
    intro:
      "Avant de créer des campagnes, renseignez les informations de votre entreprise. Vous en deviendrez automatiquement l'administrateur.",
    name: "Nom de l'entreprise",
    namePlaceholder: "Ex : Kiyanza SARL",
    sector: "Secteur d'activité",
    sectorPlaceholder: "Ex : Commerce de détail",
    address: "Adresse",
    addressPlaceholder: "Ex : Douala, Cameroun",
    submit: "Créer mon entreprise",
  },
  social: {
    statuses: {
      ACTIVE: "Actif",
      EXPIRED: "Expiré",
      REVOKED: "Déconnecté",
    },
    neverSynced: "Jamais synchronisé",
    syncedToday: "Synchronisé aujourd'hui",
    syncedYesterday: "Synchronisé hier",
    /** {days} = nombre de jours. */
    syncedDaysAgo: "Synchronisé il y a {days} jours",
    loadError: "Impossible de charger les comptes.",
    popupBlocked: "Votre navigateur a bloqué la fenêtre d'autorisation. Autorisez les popups pour ce site.",
    connectError: "Impossible de démarrer la connexion.",
    revokeError: "Impossible de déconnecter ce compte.",
    syncError: "Impossible de resynchroniser ce compte.",
    title: "Pages Facebook",
    intro: "Liez la Page Facebook de votre entreprise pour diffuser et suivre vos campagnes digitales.",
    connectFacebook: "Connecter Facebook",
    connectInstagram: "Connecter Instagram",
    loading: "Chargement des comptes…",
    empty: "Aucun compte lié",
    emptyManager: "Connectez votre Page Facebook pour commencer à diffuser vos campagnes digitales.",
    emptyReader: "Un administrateur ou un responsable marketing doit lier un compte Meta.",
    resync: "Resynchroniser",
    disconnect: "Déconnecter",
    readOnly:
      "Lecture seule : seuls les rôles Administrateur et Responsable Marketing peuvent lier, resynchroniser ou déconnecter un compte.",
    health: {
      title: "Santé de la Page",
      /** {days} = nombre de jours. */
      period: "{days} derniers jours, comparés aux {days} précédents",
      loading: "Analyse de votre Page Facebook…",
      unavailable: "Les statistiques de la Page sont momentanément indisponibles.",
      reconnect: "Reconnectez votre Page Facebook pour voir ses statistiques.",
      retry: "Réessayer",
      refresh: "Actualiser",
      /** {time} = heure. */
      updatedAt: "Mis à jour à {time}",
      followers: "Abonnés",
      kpis: {
        views: "Vues",
        engagement: "Interactions",
        newFollowers: "Nouveaux abonnés",
      },
      /** {value} = variation en %. */
      changeUp: "+{value} % vs période précédente",
      changeDown: "−{value} % vs période précédente",
      changeFlat: "Stable vs période précédente",
      noChange: "Pas de comparaison disponible",
      /** {posts} = publications, {perWeek} = rythme hebdomadaire. */
      rhythm: "{posts} publications · {perWeek} par semaine",
      /** {rate} = taux d'engagement. */
      engagementRate: "Taux d'engagement : {rate} %",
      engagementHint: "Interactions moyennes par publication, rapportées au nombre d'abonnés.",
      trendTitle: "Vues par jour",
      /** {date}, {value}. */
      dayTitle: "{date} : {value} vues",
      bestTimesTitle: "Meilleurs moments pour publier",
      /** {count} = publications analysées. */
      bestTimesBasis: "D'après vos {count} dernières publications (heure du Cameroun).",
      bestTimesNotEnough:
        "Pas encore assez de publications pour trouver vos meilleurs moments : publiez régulièrement, Kiyanza les calculera.",
      /** {interactions} = moyenne, {posts} = nombre de publications. */
      slotDetail: "{interactions} interactions en moyenne · {posts} publications",
      weekdays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
      weekdaysShort: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      /** {from}, {to} = heures. */
      slotRange: "{from}h – {to}h",
      heatmapLabel: "Interactions moyennes par jour et par tranche de 3 heures",
      /** {day}, {range}, {value}, {posts}. */
      cellTitle: "{day} {range} : {value} interactions en moyenne ({posts} publications)",
      cellEmpty: "{day} {range} : aucune publication",
      less: "Moins",
      more: "Plus",
      topPostsTitle: "Publications les plus engageantes",
      noPosts: "Aucune publication récente sur cette Page.",
      reactions: "réactions",
      comments: "commentaires",
      shares: "partages",
      viewPost: "Voir sur Facebook",
      noText: "(publication sans texte)",
      aiTitle: "Bilan de l'assistant IA",
      aiIntro: "Un bilan de votre Page et 3 actions concrètes pour la semaine.",
      aiGenerate: "Générer le bilan IA",
      aiRegenerate: "Régénérer",
      aiGenerating: "Analyse en cours… (jusqu'à 30 s)",
      aiError: "Le bilan IA est momentanément indisponible. Réessayez dans un instant.",
      /** {date} = date de génération. */
      aiGeneratedAt: "Bilan du {date}",
      strengths: "Ce qui fonctionne",
      watchouts: "Points de vigilance",
      actions: "Vos 3 actions de la semaine",
    },
  },
  notifications: {
    filters: {
      ALL: "Toutes",
      UNREAD: "Non lues",
      READ: "Lues",
    },
    justNow: "À l'instant",
    /** {count} = durée écoulée. */
    minutesAgo: "Il y a {count} min",
    hoursAgo: "Il y a {count} h",
    daysAgo: "Il y a {count} j",
    loadError: "Impossible de charger les notifications.",
    loading: "Chargement des notifications…",
    empty: "Aucune notification",
    markRead: "Marquer comme lue",
    pagination: "Affichage de {start} à {end} sur {total} notifications",
  },
  profile: {
    loadError: "Impossible de charger votre profil.",
    loading: "Chargement du profil…",
    account: "Informations du compte",
    email: "Email",
    phone: "Téléphone",
    role: "Rôle",
    company: "Entreprise",
    linked: "Rattaché",
    none: "Aucune",
    memberSince: "Membre depuis",
    security: "Sécurité",
    securityText:
      "Aucune modification du profil n'est disponible depuis l'application pour le moment. Pour changer de mot de passe, un lien de réinitialisation vous sera envoyé par email.",
    emailSent: "Email envoyé",
    changePassword: "Changer mon mot de passe",
    resetError: "L'envoi a échoué, réessayez plus tard.",
  },
  help: {
    title: "Questions fréquentes",
    subtitle: "Retrouvez ici les réponses aux questions les plus courantes sur Liyanza.",
    moreHelp: "Besoin d'aide supplémentaire ?",
    moreHelpText: "Notre équipe vous répond rapidement par email.",
    faq: [
      {
        question: "Comment créer une campagne ?",
        answer:
          "Depuis Campagnes, cliquez sur « Nouvelle campagne » puis suivez l'assistant : choisissez le type (Digitale ou Radio), définissez vos objectifs, votre audience et votre budget. Chaque type de campagne a son propre parcours.",
      },
      {
        question: "Quelle est la différence entre une campagne Digitale et Radio ?",
        answer:
          "Une campagne Digitale cible Facebook/Instagram via vos comptes liés et propose une simulation chiffrée avant lancement. Une campagne Radio vous fait choisir une station, importer un spot audio et définir sa fréquence de diffusion, puis se suit dans Monitoring.",
      },
      {
        question: "Où voir si mes spots radio sont bien diffusés ?",
        answer:
          "Dans Monitoring, l'onglet « Diffusions » liste chaque passage détecté avec son statut (diffusé, à venir, anomalie). L'onglet « Planning » affiche le calendrier de diffusion.",
      },
      {
        question: "Comment inviter un collègue et gérer les rôles ?",
        answer:
          "Un administrateur peut inviter un membre depuis Équipes : un mot de passe temporaire lui est envoyé par email. Le rôle (Administrateur, Responsable Marketing, Community Manager, Prestataire) détermine les actions disponibles.",
      },
      {
        question: "Comment fonctionnent les recommandations IA ?",
        answer:
          "Depuis Recommandations IA, sélectionnez une campagne puis générez des recommandations : notre moteur analyse son objectif et son budget pour suggérer des actions concrètes, classées par priorité.",
      },
      {
        question: "Je ne reçois pas mes notifications par email",
        answer:
          "Vérifiez d'abord vos courriers indésirables. Les notifications importantes (mot de passe temporaire, alertes de diffusion, échéances de tâches) sont également toujours visibles dans la cloche en haut de l'écran.",
      },
    ],
  },
};

export default dashAccount;
