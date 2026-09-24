"use client";

import NextLink from "next/link";
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from "next/navigation";
import { forwardRef, useMemo, type ComponentProps } from "react";
import { useLocale } from "./client";
import { localizePath, parsePath } from "./paths";

/**
 * Navigation consciente de la langue. Le code écrit toujours des chemins
 * canoniques (slugs français) ; ils sont traduits ici selon la langue
 * courante. Remplace next/link et next/navigation dans les composants.
 */

type LinkProps = ComponentProps<typeof NextLink>;

/** <Link href="/tarifs"> → /tarifs en français, /en/pricing en anglais. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ href, ...props }, ref) {
  const locale = useLocale();
  const localized = typeof href === "string" ? localizePath(href, locale) : href;
  return <NextLink ref={ref} href={localized} {...props} />;
});

/** Chemin canonique de la page courante (ex. "/tarifs", même sur /en/pricing). */
export function usePathname(): string {
  return parsePath(useNextPathname() ?? "/").canonical;
}

/** useRouter dont push/replace/prefetch acceptent des chemins canoniques. */
export function useRouter() {
  const router = useNextRouter();
  const locale = useLocale();
  return useMemo(
    () => ({
      ...router,
      push: (href: string, options?: Parameters<typeof router.push>[1]) =>
        router.push(localizePath(href, locale), options),
      replace: (href: string, options?: Parameters<typeof router.replace>[1]) =>
        router.replace(localizePath(href, locale), options),
      prefetch: (href: string, options?: Parameters<typeof router.prefetch>[1]) =>
        router.prefetch(localizePath(href, locale), options),
    }),
    [router, locale],
  );
}

/** Traduit un chemin canonique dans la langue courante (pour un <a> ou window.location). */
export function useLocalizedHref() {
  const locale = useLocale();
  return (href: string) => localizePath(href, locale);
}
