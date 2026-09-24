import type { Messages } from "@/i18n/dictionaries";
import { slugify } from "@/lib/text";

/**
 * Page Ressources : le contenu vit dans le dictionnaire « resources » (une
 * version par langue). Ce module calcule les identifiants DOM des contenus et
 * construit l'index de la barre de recherche à partir de ce dictionnaire.
 */

type ResourcesMessages = Messages["resources"];

/** id DOM stable d'un contenu, dérivé de son titre (cible des résultats). */
export function resourceId(title: string): string {
  return "ressource-" + slugify(title);
}

export type ResourceKind = keyof ResourcesMessages["search"]["kinds"];

export interface ResourceEntry {
  id: string;
  kind: ResourceKind;
  title: string;
  /** Texte secondaire, indexé et affiché sous le titre du résultat. */
  text: string;
  /** Mots-clés indexés mais non affichés (niveau, étiquettes). */
  keywords?: string;
}

/** Index de recherche de la page, dans la langue du dictionnaire fourni. */
export function buildResourceIndex(t: ResourcesMessages): ResourceEntry[] {
  const { featuredGuide: fg, guides, articles, videos, faq } = t;
  return [
    {
      id: resourceId(fg.title),
      kind: "featured",
      title: fg.title,
      text: fg.description,
      keywords: fg.tags.join(" "),
    },
    ...guides.items.map((g) => ({
      id: resourceId(g.title),
      kind: g.type,
      title: g.title,
      text: g.description,
      keywords: guides.levels[g.level],
    })),
    ...[articles.featured, ...articles.items].map((a) => ({
      id: resourceId(a.title),
      kind: "article" as const,
      title: a.title,
      text: a.tag,
    })),
    ...videos.items.map((v) => ({
      id: resourceId(v.title),
      kind: "video" as const,
      title: v.title,
      text: `${t.search.kinds.video} · ${v.duration}`,
    })),
    ...faq.items.map((f) => ({
      id: resourceId(f.question),
      kind: "faq" as const,
      title: f.question,
      text: f.answer,
    })),
  ];
}
