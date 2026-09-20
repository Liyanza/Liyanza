export interface FaqEntry {
  question: string;
  answer: string;
}

export const faqEntries: FaqEntry[] = [
  {
    question: "Comment créer une campagne ?",
    answer:
      "Depuis Campagnes, cliquez sur \"Nouvelle campagne\" puis suivez l'assistant : choisissez le type (Digitale ou Radio), définissez vos objectifs, votre audience et votre budget. Chaque type de campagne a son propre parcours.",
  },
  {
    question: "Quelle est la différence entre une campagne Digitale et Radio ?",
    answer:
      "Une campagne Digitale cible Facebook/Instagram via vos comptes liés et propose une simulation chiffrée avant lancement. Une campagne Radio vous fait choisir une station, importer un spot audio et définir sa fréquence de diffusion, puis se suit dans Monitoring.",
  },
  {
    question: "Où voir si mes spots radio sont bien diffusés ?",
    answer:
      "Dans Monitoring, l'onglet \"Diffusions\" liste chaque passage détecté avec son statut (diffusé, à venir, anomalie). L'onglet \"Planning\" affiche le calendrier de diffusion.",
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
];
