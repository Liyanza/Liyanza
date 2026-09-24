import type { Metadata } from "next";
import { defaultLocale, localeMeta, locales } from "./config";
import { localizePath } from "./paths";
import { getLocale } from "./server";

/**
 * Métadonnées d'une page dans la langue courante : URL canonique traduite et
 * liens hreflang vers les autres langues (+ x-default = français).
 *
 *   export async function generateMetadata() {
 *     const t = await getMessages("home");
 *     return localizedMetadata({ path: "/", title: t.meta.title, description: t.meta.description });
 *   }
 */
export async function localizedMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  /** Chemin canonique (slugs français), ex. "/tarifs". */
  path: string;
  title: string;
  description: string;
  /** true : titre utilisé tel quel, sans le suffixe « | KIYANZA ». */
  absoluteTitle?: boolean;
}): Promise<Metadata> {
  const locale = await getLocale();
  const url = localizePath(path, locale);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, localizePath(path, l)])),
        "x-default": localizePath(path, defaultLocale),
      },
    },
    openGraph: { title, description, url, locale: localeMeta[locale].ogLocale },
    twitter: { title, description },
  };
}
