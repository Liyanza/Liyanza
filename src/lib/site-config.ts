/**
 * Configuration centrale du site — SEO & réseaux sociaux.
 *
 * ⚠️ À FAIRE avant la mise en production :
 * 1. Définir la variable d'environnement NEXT_PUBLIC_SITE_URL avec le vrai
 *    nom de domaine (ex: https://kiyanza.com) dans .env.local ET dans les
 *    variables d'environnement de votre hébergeur (Vercel, etc.).
 * 2. Mettre à jour `twitterHandle` et `sameAs` avec vos vrais comptes.
 * 3. Renseigner les codes de vérification Search Console / Bing si besoin.
 */

const FALLBACK_SITE_URL = "https://kiyanza.com";

export const siteConfig = {
  name: "KIYANZA",
  legalName: "KIYANZA",
  // Doit toujours être une URL absolue, sans slash final.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, ""),
  locale: "fr_FR",
  defaultTitle: "KIYANZA — Pilotez vos campagnes avec l'intelligence artificielle",
  titleTemplate: "%s — KIYANZA",
  defaultDescription:
    "KIYANZA centralise la création, le monitoring et l'optimisation de vos campagnes marketing grâce à l'IA.",
  keywords: [
    "KIYANZA",
    "logiciel marketing IA",
    "pilotage de campagnes marketing",
    "marketing automation Afrique",
    "recommandations IA marketing",
    "gestion de campagnes publicitaires",
    "analyse de données marketing",
  ],
  // Comptes sociaux officiels — à mettre à jour.
  twitterHandle: "@kiyanza_app",
  sameAs: [
    // "https://www.linkedin.com/company/kiyanza",
    // "https://www.facebook.com/kiyanza",
    // "https://www.instagram.com/kiyanza",
  ],
  // Codes de vérification pour les moteurs de recherche (optionnel).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Construit une URL absolue à partir d'un chemin relatif. */
export function absoluteUrl(path: string = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
