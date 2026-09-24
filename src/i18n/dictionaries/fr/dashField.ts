/**
 * Suivi terrain (dashboard), page publique de preuve d'installation et
 * retour de connexion des comptes sociaux (popup OAuth).
 */
const dashField = {
  terrain: {
    searchPlaceholder: "Rechercher un panneau...",
    mapLoading: "Chargement de la carte...",
    loadError: "Impossible de charger le suivi terrain.",
    missingFields: "Remplissez tous les champs et placez un point sur la carte.",
    createError: "Impossible de créer ce panneau.",
    title: "Suivi terrain",
    subtitle:
      "Panneaux/affiches suivis par géolocalisation — vert : emplacement confirmé, orange : écart détecté, gris : en attente de preuve.",
    add: "Ajouter un panneau",
    /** {lat}, {lng} = coordonnées du point placé. */
    pointPlaced: "Point placé ({lat}, {lng}) — complétez le formulaire ci-dessous.",
    clickMap: "Cliquez sur la carte à l'endroit exact où le panneau doit être installé.",
    newPanel: "Nouveau panneau",
    locationPlaceholder: "Lieu (ex : Rond-point Akwa)",
    campaignPlaceholder: "Campagne...",
    providerPlaceholder: "Prestataire...",
    noProvider: "Aucun prestataire — invitez-en un avec le rôle Prestataire depuis Équipes.",
    creating: "Création...",
    create: "Créer le panneau",
    /** {count} = nombre de panneaux. */
    panels: "Panneaux ({count})",
    loading: "Chargement des panneaux…",
    empty: "Aucun panneau pour le moment.",
    pending: "En attente",
    confirmed: "Confirmé",
    gap: "Écart",
    copyLink: "Copier le lien",
    generating: "Génération...",
    generateLink: "Générer le lien de preuve →",
    popupConfirmed: "✅ Emplacement confirmé",
    /** {distance} = écart en mètres. */
    popupGap: "⚠️ Écart de {distance} m avec l'emplacement prévu",
    popupPending: "⏳ En attente de la preuve du prestataire",
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
