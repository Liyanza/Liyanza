/**
 * Pages légales : en-têtes et libellés. Le corps de chaque document existe
 * en une version par langue (components/sections/legal/*Content[.en].tsx).
 */
const legal = {
  lastUpdated: "Dernière mise à jour : {date}",
  toc: "Sommaire",
  terms: {
    meta: {
      title: "Conditions d'utilisation",
      description: "Les conditions qui régissent l'accès et l'utilisation de la plateforme KIYANZA.",
    },
    eyebrow: "Cadre légal",
    title: "Conditions d'utilisation",
    intro: "Les règles qui encadrent l'accès et l'utilisation de KIYANZA, pour vous comme pour nous.",
    date: "17 septembre 2026",
  },
  privacy: {
    meta: {
      title: "Politique de confidentialité",
      description: "Comment KIYANZA collecte, utilise et protège vos données à caractère personnel.",
    },
    eyebrow: "Vos données",
    title: "Politique de confidentialité",
    intro: "Comment nous collectons, utilisons et protégeons vos données à caractère personnel sur KIYANZA.",
    date: "17 septembre 2026",
  },
  deletion: {
    meta: {
      title: "Suppression des données",
      description: "Comment demander la suppression de vos données à caractère personnel sur KIYANZA.",
    },
    eyebrow: "Vos données",
    title: "Suppression des données",
    intro:
      "Comment demander la suppression de vos données à caractère personnel, y compris pour les comptes créés via Google ou Facebook.",
    date: "18 septembre 2026",
  },
};

export default legal;
