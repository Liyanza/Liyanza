import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/api/cookie-names";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { hasTranslatedSlug, localizePath, parsePath } from "@/i18n/paths";

/**
 * Proxy (nommé `proxy.ts` et non `middleware.ts`, déprécié depuis Next.js 16).
 *
 * 1. Langue : toutes les pages vivent sous app/[lang]/ (slugs français). Les
 *    URL visibles sont réécrites en interne : /tarifs → /fr/tarifs,
 *    /en/pricing → /en/tarifs. L'adresse affichée ne change pas.
 * 2. Adresses canoniques (redirections 308) : /fr/… → /…, et un slug
 *    français sous /en (/en/tarifs) → son slug anglais (/en/pricing).
 * 3. Première visite sur « / » sans choix mémorisé : un navigateur qui
 *    préfère l'anglais est envoyé vers /en. Les liens profonds ne sont
 *    jamais redirigés.
 * 3 bis. Pages ouvertes depuis un lien produit par le backend (retour OAuth,
 *    lien de preuve d'installation), qui ne connaît pas la langue : sans
 *    préfixe, on suit le choix mémorisé, sinon la langue du navigateur.
 * 4. Garde-fou grossier sur le dashboard : sans cookie de session, renvoi
 *    vers la page de connexion (dans la langue courante). Il ne valide PAS
 *    le token (impossible sans le secret JWT) ; l'autorisation réelle est
 *    vérifiée par /api/auth/me et par le backend — voir src/lib/api/proxy.ts.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const segments = url.pathname.split("/").filter(Boolean);

  // Images de partage générées par Next : il les référence par leur chemin
  // interne (/fr/tarifs/opengraph-image/…), déjà valide — on le sert tel quel.
  if (isLocale(segments[0]) && segments.some((s) => s === "opengraph-image" || s === "twitter-image")) {
    return NextResponse.next();
  }

  // /fr/… n'est pas une adresse publique : le français est à la racine.
  if (segments[0] === defaultLocale) {
    return redirect(request, "/" + segments.slice(1).join("/"));
  }

  const prefixed = isLocale(segments[0]) ? (segments[0] as Locale) : null;

  // Slug français sous un préfixe de langue : on redirige vers le slug traduit.
  if (prefixed && segments[1] && hasTranslatedSlug(segments[1], prefixed)) {
    return redirect(request, localizePath("/" + segments.slice(1).join("/"), prefixed));
  }

  const { locale, canonical } = parsePath(url.pathname);

  if (!prefixed && isExternalEntry(canonical)) {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    const target = isLocale(saved) ? saved : preferredLocale(request.headers.get("accept-language"));
    if (target !== defaultLocale) return redirect(request, localizePath(canonical, target), 307);
  }

  if (url.pathname === "/" && !request.cookies.has(LOCALE_COOKIE)) {
    const preferred = preferredLocale(request.headers.get("accept-language"));
    if (preferred !== defaultLocale) return redirect(request, localizePath("/", preferred));
  }

  if (canonical === "/dashboard" || canonical.startsWith("/dashboard/")) {
    const hasSession = request.cookies.has(ACCESS_COOKIE) || request.cookies.has(REFRESH_COOKIE);
    if (!hasSession) return redirect(request, localizePath("/connexion", locale), 307);
  }

  const internal = url.clone();
  internal.pathname = `/${locale}${canonical === "/" ? "" : canonical}`;
  return NextResponse.rewrite(internal);
}

function redirect(request: NextRequest, pathname: string, status = 308) {
  const target = request.nextUrl.clone();
  target.pathname = pathname;
  return NextResponse.redirect(target, status);
}

function isExternalEntry(canonical: string) {
  return canonical === "/social-accounts/callback" || canonical.startsWith("/preuve-installation/");
}

/** Langue préférée du navigateur parmi celles du site (en-tête Accept-Language). */
function preferredLocale(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((r) => (locales as readonly string[]).includes(r.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}

export const config = {
  // Tout sauf l'API, les fichiers internes de Next et les fichiers statiques
  // (icon.svg, robots.txt, sitemap.xml, manifest.webmanifest, images…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
