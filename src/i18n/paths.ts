import { defaultLocale, isLocale, locales, segmentSlugs, type Locale } from "./config";

/**
 * Conversion entre chemins canoniques (slugs français, sans préfixe — ceux
 * du code) et chemins affichés (préfixe de langue + slugs traduits).
 * Utilisable côté serveur, client et proxy.
 */

// Slug traduit → slug français, par langue (table inverse, calculée une fois).
const reverseSlugs = Object.fromEntries(
  locales.map((locale) => [
    locale,
    Object.fromEntries(
      Object.entries(segmentSlugs)
        .filter(([, bySlug]) => bySlug[locale])
        .map(([fr, bySlug]) => [bySlug[locale] as string, fr]),
    ),
  ]),
) as Record<Locale, Record<string, string>>;

function splitSuffix(path: string) {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ""] : [path.slice(0, i), path.slice(i)];
}

/** Lien interne (commence par "/", hors /api) ? */
export function isInternalPath(href: string) {
  return href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/api/") && href !== "/api";
}

/**
 * Chemin canonique → chemin affiché dans `locale`.
 *   localizePath("/tarifs#faq", "en") → "/en/pricing#faq"
 *   localizePath("/tarifs", "fr")     → "/tarifs"
 */
export function localizePath(href: string, locale: Locale): string {
  if (!isInternalPath(href)) return href;
  const [path, suffix] = splitSuffix(href);
  const segments = path.split("/").filter(Boolean);
  if (segments.length && locale !== defaultLocale) {
    segments[0] = segmentSlugs[segments[0]]?.[locale] ?? segments[0];
  }
  const localized = "/" + segments.join("/");
  if (locale === defaultLocale) return localized + suffix;
  return (localized === "/" ? `/${locale}` : `/${locale}${localized}`) + suffix;
}

/**
 * Chemin affiché (ou interne /fr/…) → langue + chemin canonique.
 *   parsePath("/en/pricing") → { locale: "en", canonical: "/tarifs" }
 *   parsePath("/tarifs")     → { locale: "fr", canonical: "/tarifs" }
 */
export function parsePath(pathname: string): { locale: Locale; canonical: string } {
  const segments = pathname.split("/").filter(Boolean);
  let locale: Locale = defaultLocale;
  if (isLocale(segments[0])) locale = segments.shift() as Locale;
  if (segments.length && locale !== defaultLocale) {
    segments[0] = reverseSlugs[locale][segments[0]] ?? segments[0];
  }
  return { locale, canonical: "/" + segments.join("/") };
}

/** Même page, autre langue (conserve ?query et #ancre). */
export function switchLocalePath(currentHref: string, target: Locale): string {
  const [path, suffix] = splitSuffix(currentHref);
  return localizePath(parsePath(path).canonical + suffix, target);
}

/** Slug français d'un segment traduit (ex. "pricing" en anglais → "tarifs"), sinon null. */
export function canonicalSegment(segment: string, locale: Locale): string | null {
  return reverseSlugs[locale][segment] ?? null;
}

/** Le premier segment est-il un slug français qui a une traduction dans `locale` ? */
export function hasTranslatedSlug(segment: string, locale: Locale): boolean {
  return !!segmentSlugs[segment]?.[locale];
}
