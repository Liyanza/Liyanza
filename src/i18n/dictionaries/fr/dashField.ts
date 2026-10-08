/**
 * Suivi terrain (dashboard), page publique de preuve d'installation et
 * retour de connexion des comptes sociaux (popup OAuth).
 */
const dashField = {
  terrain: {
    searchPlaceholder: "Rechercher un emplacement…",
    mapLoading: "Chargement de la carte...",
    loadError: "Impossible de charger le suivi terrain.",
    missingFields: "Indiquez le nom, la campagne et la date, et placez un point sur la carte.",
    createError: "Impossible de créer ce panneau.",
    title: "Suivi terrain",
    subtitle: "Emplacements d'affichage et preuves photo : cliquez sur un emplacement pour le voir sur la carte.",
    add: "Ajouter un emplacement",
    /** Filtres et liste. */
    campaignFilter: "Filtrer par campagne",
    allCampaigns: "Toutes les campagnes",
    stateFilter: "Filtrer par état de la preuve",
    filterAll: "Tous",
    noMatch: "Aucun emplacement ne correspond à ces filtres.",
    emptyManager: "Aucun emplacement pour le moment. Cliquez sur « Ajouter un emplacement » puis sur la carte.",
    /** {shown}, {total} = nombres d'emplacements. */
    shown: "{shown} emplacement(s) affiché(s) sur {total}",
    gapBadge: "Lieu à vérifier",
    /** {date} = date de pose prévue. */
    plannedOn: "pose prévue le {date}",
    closeDetail: "Fermer la fiche",
    linkHint: "Envoyez ce lien à la personne qui pose le support : elle prend la photo sur place, sans compte.",
    /** Ajout d'un emplacement. */
    addressPlaceholder: "Rechercher une adresse (ex. Carrefour Ndokoti)",
    addressNoResult: "Aucune adresse trouvée.",
    locationLabel: "Nom de l'emplacement",
    campaignLabel: "Campagne",
    dateLabel: "Date de pose",
    providerLabel: "Prestataire (facultatif)",
    providerNone: "Aucun : preuve par lien",
    providerHint: "Sans prestataire inscrit, générez ensuite un lien de preuve à envoyer au poseur.",
    /** {lat}, {lng} = coordonnées du point placé. */
    pointPlaced: "Point placé ({lat}, {lng}) — complétez le formulaire ci-dessous.",
    clickMap: "Cherchez l'adresse ou déplacez la carte, puis cliquez à l'endroit exact du support.",
    newPanel: "Nouvel emplacement",
    locationPlaceholder: "Lieu (ex : Rond-point Akwa)",
    campaignPlaceholder: "Campagne...",
    providerPlaceholder: "Prestataire...",
    noProvider: "Aucun prestataire — invitez-en un avec le rôle Prestataire depuis Équipes.",
    creating: "Création...",
    create: "Ajouter l'emplacement",
    /** {count} = nombre de panneaux. */
    panels: "Panneaux ({count})",
    loading: "Chargement des panneaux…",
    empty: "Aucun panneau pour le moment.",
    statuses: {
      awaiting: "En attente de preuve",
      pending: "À valider",
      validated: "Validée",
      rejected: "Refusée",
    },
    /** {distance} = écart en mètres. */
    distanceOk: "Emplacement conforme ({distance} m)",
    distanceGap: "Écart de {distance} m avec l'emplacement prévu",
    /** {date} = date de la photo. */
    takenAt: "Photo prise le {date}",
    enlarge: "Agrandir la photo",
    closePhoto: "Fermer la photo",
    photoAlt: "Photo de preuve : {location}",
    validate: "Valider",
    reject: "Refuser",
    rejectPlaceholder: "Motif du refus (facultatif, conservé dans l'historique)…",
    confirmReject: "Confirmer le refus",
    reviewError: "Impossible d'enregistrer la décision.",
    /** {comment} = motif du refus. */
    rejectedReason: "Motif : {comment}",
    newLink: "Générer un nouveau lien de preuve →",
    copyLink: "Copier le lien",
    generating: "Génération...",
    generateLink: "Générer le lien de preuve →",
    popupValidated: "✅ Preuve validée",
    popupPending: "🕓 Preuve reçue — à valider",
    popupRejected: "❌ Preuve refusée",
    popupAwaiting: "⏳ En attente de la preuve du prestataire",
  },
  proof: {
    metaTitle: "Preuve d'installation",
    readError: "Impossible de lire le fichier.",
    invalidImage: "Image invalide.",
    compressError: "Compression impossible sur cet appareil.",
    noGeolocation: "La géolocalisation n'est pas disponible sur cet appareil.",
    captureError:
      "Impossible de capturer la photo et la position. Autorisez la caméra et la localisation, puis réessayez.",
    sendError: "Impossible d'envoyer la preuve. Réessayez.",
    loading: "Chargement...",
    invalidTitle: "Lien invalide ou expiré",
    invalidText: "Ce lien de preuve n'est plus valide. Demandez-en un nouveau à la personne qui vous l'a envoyé.",
    alreadyTitle: "Preuve déjà envoyée",
    /** {location} = emplacement. */
    alreadyText: "Une preuve a déjà été soumise pour l'emplacement « {location} ». Merci !",
    title: "Preuve d'installation",
    /** {date} = date de pose prévue. */
    plannedOn: "Pose prévue le {date}",
    instructions:
      "Prenez une photo de l'affiche installée. Votre position sera enregistrée automatiquement pour confirmer l'emplacement.",
    locating: "Localisation en cours...",
    takePhoto: "Prendre la photo",
    checkTitle: "Vérifiez avant d'envoyer",
    photoAlt: "Photo de l'affiche installée",
    positionCaptured: "Position capturée avec la photo",
    sending: "Envoi...",
    send: "Envoyer la preuve",
    retake: "Reprendre la photo",
    doneTitle: "Preuve envoyée",
    doneMatch: "Merci ! L'emplacement correspond bien à celui demandé.",
    doneMismatch:
      "Merci ! La preuve a été enregistrée, mais l'emplacement détecté diffère de celui demandé — l'entreprise va vérifier.",
  },
  oauth: {
    metaTitle: "Connexion du compte",
    denied: "Vous avez annulé l'autorisation côté Meta.",
    error: "Une erreur est survenue pendant la connexion. Réessayez depuis la page Mon entreprise.",
    successTitle: "Compte connecté !",
    errorTitle: "Connexion impossible",
    /** {platform} = Facebook, Instagram ou Meta. */
    successText: "Votre compte {platform} est maintenant lié à votre entreprise.",
    closing: "Cette fenêtre va se fermer automatiquement…",
  },
};

export default dashField;
