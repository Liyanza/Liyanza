/**
 * Internationalisation — réglages centraux.
 *
 * - Le français est la langue par défaut et reste à la racine (/tarifs).
 * - Les autres langues sont préfixées (/en/pricing).
 * - Les dossiers de app/[lang]/ portent les slugs français : ce sont les
 *   chemins « canoniques » utilisés partout dans le code (liens, redirections).
 *   La traduction des slugs se fait à l'affichage (voir ./paths.ts) et dans
 *   le proxy, jamais dans l'arborescence.
 *
 * Ajouter une langue : l'ajouter à `locales`, `localeMeta`, compléter
 * `segmentSlugs`, puis créer ses dictionnaires (dictionaries/<code>/).
 */

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/** Cookie qui mémorise le choix du visiteur (posé par le sélecteur de langue). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeMeta: Record<Locale, { label: string; name: string; htmlLang: string; ogLocale: string }> = {
  fr: { label: "FR", name: "Français", htmlLang: "fr", ogLocale: "fr_FR" },
  en: { label: "EN", name: "English", htmlLang: "en", ogLocale: "en_US" },
};

/**
 * Slugs traduits du premier segment d'URL : slug français (= dossier) → slug
 * par langue. Un segment absent de la table garde le même slug dans toutes
 * les langues (ex. /en/dashboard/…).
 */
export const segmentSlugs: Record<string, Partial<Record<Locale, string>>> = {
  fonctionnalites: { en: "features" },
  tarifs: { en: "pricing" },
  ressources: { en: "resources" },
  "a-propos": { en: "about" },
  "conditions-utilisation": { en: "terms" },
  "politique-confidentialite": { en: "privacy" },
  "suppression-des-donnees": { en: "data-deletion" },
  connexion: { en: "login" },
  inscription: { en: "signup" },
  "mot-de-passe-oublie": { en: "forgot-password" },
  "reinitialiser-mot-de-passe": { en: "reset-password" },
  "preuve-installation": { en: "installation-proof" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
