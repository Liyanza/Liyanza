import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { locales } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pages de compte, dans toutes les langues (/connexion, /en/login…).
      disallow: locales.flatMap((l) =>
        ["/connexion", "/inscription", "/mot-de-passe-oublie"].map((path) => localizePath(path, l)),
      ),
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
