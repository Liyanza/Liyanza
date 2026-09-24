/**
 * Page publique d'acceptation d'une invitation envoyée à un compte existant.
 */
const invitation = {
  metaTitle: "Invitation",
  loading: "Validation de votre invitation…",
  successTitle: "Invitation acceptée",
  /** {company} = nom de l'entreprise. */
  successText: "Vous faites maintenant partie de {company}. Connectez-vous comme d'habitude pour accéder au tableau de bord.",
  dashboard: "Accéder au tableau de bord",
  invalidTitle: "Invitation invalide ou expirée",
  invalidText: "Ce lien n'est plus valide (il a déjà servi ou a expiré). Demandez à l'administrateur de vous renvoyer une invitation.",
  otherCompanyTitle: "Invitation impossible",
  otherCompanyText: "Votre compte fait déjà partie d'une autre entreprise. Un compte ne peut appartenir qu'à une seule entreprise.",
  home: "Retour à l'accueil",
};

export default invitation;
