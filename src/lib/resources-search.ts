"use client";

import { useEffect } from "react";
import { resourceIndex, type ResourceEntry } from "@/data/resources";

const FOCUS_EVENT = "resources:focus";

/** Mots vides ignorés : « Créer une campagne » doit trouver « créer sa première campagne ». */
const STOP_WORDS = new Set([
  "un", "une", "le", "la", "les", "de", "des", "du", "et", "en", "au", "aux",
  "pour", "sur", "par", "sa", "son", "ses", "mon", "ma", "mes", "vos", "votre",
  "avec", "comment", "est", "il", "je", "on",
]);

/** Minuscules, sans accents ni ponctuation : « Scénarios » trouve « scenario ». */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Recherche plein texte locale : chaque mot de la requête doit apparaître
 * (en début de mot) dans le titre ou le texte. Les correspondances dans le
 * titre pèsent plus lourd.
 */
export function searchResources(query: string, limit = 8): ResourceEntry[] {
  const terms = normalize(query)
    .split(" ")
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
  if (!terms.length) return [];

  const scored: { entry: ResourceEntry; score: number }[] = [];
  for (const entry of resourceIndex) {
    const title = ` ${normalize(entry.title)}`;
    const text = ` ${normalize(`${entry.text} ${entry.keywords ?? ""}`)}`;
    let score = 0;
    const all = terms.every((term) => {
      const inTitle = title.includes(` ${term}`);
      const inText = text.includes(` ${term}`);
      if (inTitle) score += 3;
      else if (inText) score += 1;
      return inTitle || inText;
    });
    if (all) scored.push({ entry, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.entry);
}

/**
 * Amène un contenu de la page à l'écran : prévient les sections (pour
 * qu'elles le rendent visible — filtre à réinitialiser, question à ouvrir),
 * puis fait défiler jusqu'à lui, le met en évidence et lui donne le focus.
 */
export function focusResource(id: string) {
  window.dispatchEvent(new CustomEvent(FOCUS_EVENT, { detail: id }));
  // Deux frames : laisse React appliquer l'état déclenché par l'évènement.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      el.classList.remove("search-hit");
      void el.offsetWidth; // relance l'animation si on recherche deux fois le même contenu
      el.classList.add("search-hit");
      el.addEventListener("animationend", () => el.classList.remove("search-hit"), { once: true });
    }),
  );
}

/** Écoute les demandes de focus émises par la recherche. */
export function useResourceFocus(handler: (id: string) => void) {
  useEffect(() => {
    const listener = (e: Event) => handler((e as CustomEvent<string>).detail);
    window.addEventListener(FOCUS_EVENT, listener);
    return () => window.removeEventListener(FOCUS_EVENT, listener);
  }, [handler]);
}
