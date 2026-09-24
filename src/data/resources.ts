import { resourcesFaqs } from "@/data/faqs";

/**
 * Contenus de la page Ressources. Source unique : les sections les affichent
 * et la barre de recherche du hero les indexe (voir lib/resources-search).
 */

export type GuideType = "Guide" | "Tutoriel";
export type Level = "Débutant" | "Intermédiaire" | "Avancé";

export interface Guide {
  type: GuideType;
  level: Level;
  title: string;
  description: string;
  readingTime: string;
}

export const guides: Guide[] = [
  {
    type: "Guide",
    level: "Débutant",
    title: "Comment créer sa première campagne avec KIYANZA",
    description:
      "Découvrez étape par étape comment définir vos objectifs, votre budget et vos canaux.",
    readingTime: "8 min de lecture",
  },
  {
    type: "Tutoriel",
    level: "Intermédiaire",
    title: "Utiliser les scénarios IA pour optimiser vos campagnes",
    description:
      "Comparez différents scénarios et laissez l'IA recommander la meilleure stratégie.",
    readingTime: "5 min de lecture",
  },
  {
    type: "Guide",
    level: "Intermédiaire",
    title: "Interpréter les performances d'une campagne",
    description: "Apprenez à lire vos KPIs, graphiques et alertes de monitoring.",
    readingTime: "6 min de lecture",
  },
  {
    type: "Guide",
    level: "Avancé",
    title: "Optimiser son budget marketing",
    description:
      "Stratégies concrètes pour répartir efficacement votre budget sur plusieurs canaux.",
    readingTime: "7 min de lecture",
  },
  {
    type: "Tutoriel",
    level: "Débutant",
    title: "Exporter et partager vos rapports",
    description:
      "Générez des PDF, planifiez des envois automatiques et partagez avec votre équipe.",
    readingTime: "4 min de lecture",
  },
  {
    type: "Guide",
    level: "Avancé",
    title: "Stratégie multi-canaux avec KIYANZA",
    description:
      "Pilotez Facebook, Instagram, WhatsApp et Google Ads depuis un seul tableau de bord.",
    readingTime: "9 min de lecture",
  },
];

export const featuredArticle = {
  tag: "Stratégie",
  title: "5 erreurs à éviter dans vos campagnes Facebook Ads en Afrique",
  date: "3 sept. 2026",
  readingTime: "6 min de lecture",
};

export const articles = [
  {
    tag: "IA & Marketing",
    title: "Comment l'IA transforme la gestion des campagnes marketing",
    date: "28 août 2026",
    readingTime: "8 min",
  },
  {
    tag: "Cas d'usage",
    title: "Comment une PME camerounaise a doublé son ROI en 3 mois",
    date: "20 août 2026",
    readingTime: "5 min",
  },
  {
    tag: "Stratégie",
    title: "Budget marketing : les indicateurs clés à suivre chaque semaine",
    date: "15 août 2026",
    readingTime: "7 min",
  },
];

export const videos = [
  { title: "Présentation générale de KIYANZA", views: "1,2k vues", duration: "5:12" },
  { title: "Créer votre première campagne", views: "986 vues", duration: "8:30" },
  { title: "Dashboard & KPIs : tour d'horizon", views: "754 vues", duration: "6:45" },
];

export const featuredGuide = {
  title: "Le guide complet du pilotage de campagnes marketing",
  description:
    "De la stratégie à l'analyse des performances, ce guide complet vous accompagne à chaque étape pour tirer le meilleur de KIYANZA et de vos investissements marketing.",
  tags: ["Stratégie", "Budgets", "KPIs", "IA", "Multi-canaux"],
};

/** id DOM stable d'un contenu, dérivé de son titre (cible des résultats). */
export function resourceId(title: string): string {
  return (
    "ressource-" +
    title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

export type ResourceKind = GuideType | "Article" | "Vidéo" | "Guide vedette" | "FAQ";

export interface ResourceEntry {
  id: string;
  kind: ResourceKind;
  title: string;
  /** Texte secondaire, indexé et affiché sous le titre du résultat. */
  text: string;
  /** Mots-clés indexés mais non affichés (niveau, étiquettes). */
  keywords?: string;
}

export const resourceIndex: ResourceEntry[] = [
  {
    id: resourceId(featuredGuide.title),
    kind: "Guide vedette",
    title: featuredGuide.title,
    text: featuredGuide.description,
    keywords: featuredGuide.tags.join(" "),
  },
  ...guides.map((g) => ({
    id: resourceId(g.title),
    kind: g.type,
    title: g.title,
    text: g.description,
    keywords: g.level,
  })),
  ...[featuredArticle, ...articles].map((a) => ({
    id: resourceId(a.title),
    kind: "Article" as const,
    title: a.title,
    text: a.tag,
  })),
  ...videos.map((v) => ({
    id: resourceId(v.title),
    kind: "Vidéo" as const,
    title: v.title,
    text: `Vidéo · ${v.duration}`,
  })),
  ...resourcesFaqs.map((f) => ({
    id: resourceId(f.question),
    kind: "FAQ" as const,
    title: f.question,
    text: f.answer,
  })),
];
