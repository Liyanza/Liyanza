import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

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

  return publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
