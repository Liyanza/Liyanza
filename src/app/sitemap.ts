import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { defaultLocale, localeMeta, locales } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const publicRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/fonctionnalites", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tarifs", changeFrequency: "monthly", priority: 0.9 },
    { path: "/a-propos", changeFrequency: "monthly", priority: 0.6 },
    { path: "/ressources", changeFrequency: "weekly", priority: 0.7 },
    { path: "/conditions-utilisation", changeFrequency: "yearly", priority: 0.3 },
    { path: "/politique-confidentialite", changeFrequency: "yearly", priority: 0.3 },
    { path: "/suppression-des-donnees", changeFrequency: "yearly", priority: 0.3 },
  ];

  // Les pages de compte (connexion, inscription, mot de passe oublié) sont
  // volontairement exclues du sitemap : elles sont en `noindex` (voir leurs
  // métadonnées) et n'ont aucun intérêt SEO.

  // Une entrée par page et par langue, chacune annonçant ses équivalents
  // (hreflang) — le français sert de version par défaut (x-default).
  return publicRoutes.flatMap((route) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, absoluteUrl(localizePath(route.path, l))])),
      "x-default": absoluteUrl(localizePath(route.path, defaultLocale)),
    };
    return locales.map((locale) => ({
      url: absoluteUrl(localizePath(route.path, locale)),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    }));
  });
}
