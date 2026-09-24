"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LOCALE_COOKIE, localeMeta, locales, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/paths";
import { useLocale, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

const SCROLL_KEY = "kiyanza-locale-scroll";

/** Mémorise le choix (1 an) : le proxy ne redirigera plus selon le navigateur. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Bascule vers la même page dans l'autre langue, en gardant ?query, #ancre
 * et la position de défilement. Ce sont de vrais liens (crawlables) ; le
 * clic passe par le routeur pour une navigation fluide sans rechargement.
 */
function useSwitchTo() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  return {
    hrefFor: (target: Locale) => switchLocalePath(pathname, target),
    go: (event: MouseEvent, target: Locale) => {
      rememberLocale(target);
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      // Même endroit de la page après le changement de langue.
      try {
        sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)));
      } catch {
        // stockage indisponible : on garde simplement le défilement du routeur
      }
      const { search, hash } = window.location;
      router.push(switchLocalePath(pathname + search + hash, target), { scroll: false });
    },
  };
}

/** Rétablit la position de défilement mémorisée au changement de langue. */
function useRestoreScroll() {
  useEffect(() => {
    let y: string | null = null;
    try {
      y = sessionStorage.getItem(SCROLL_KEY);
      sessionStorage.removeItem(SCROLL_KEY);
    } catch {
      return;
    }
    if (y === null) return;
    const top = Number(y);
    requestAnimationFrame(() => window.scrollTo({ top, behavior: "instant" }));
  }, []);
}

/** Menu déroulant de l'en-tête (desktop ; monté aussi sur mobile, masqué). */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  useRestoreScroll();
  const locale = useLocale();
  const t = useT("common").language;
  const { hrefFor, go } = useSwitchTo();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        rootRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={fill(t.switcher, { current: localeMeta[locale].name })}
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-black transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent"
      >
        <Globe className="size-4" aria-hidden="true" />
        {localeMeta[locale].label}
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={menuId}
        role="menu"
        aria-label={t.menu}
        className={`absolute right-0 top-full z-50 mt-2 min-w-40 origin-top-right rounded-2xl border border-black/10 bg-white p-1.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.18)] transition-[opacity,transform,visibility] duration-200 ease-[var(--ease-out)] ${
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        {locales.map((l) => {
          const active = l === locale;
          return (
            <NextLink
              key={l}
              href={hrefFor(l)}
              hrefLang={localeMeta[l].htmlLang}
              lang={localeMeta[l].htmlLang}
              role="menuitemradio"
              aria-checked={active}
              onClick={(e) => {
                setOpen(false);
                if (!active) go(e, l);
                else e.preventDefault();
              }}
              className={`flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-sm transition hover:bg-green-600/5 focus-visible:bg-green-600/5 focus-visible:outline-none ${
                active ? "font-semibold text-green-600" : "text-black"
              }`}
            >
              <span>
                <span className="mr-2 text-xs font-bold text-black/40">{localeMeta[l].label}</span>
                {localeMeta[l].name}
              </span>
              {active && <Check className="size-4" aria-hidden="true" />}
            </NextLink>
          );
        })}
      </div>
    </div>
  );
}

/** Variante « boutons » pour le menu mobile : les langues côte à côte. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = useT("common").language;
  const { hrefFor, go } = useSwitchTo();
  return (
    <div role="group" aria-label={t.menu} className={`flex items-center gap-2 ${className}`}>
      <Globe className="size-4 text-black/40" aria-hidden="true" />
      {locales.map((l) => {
        const active = l === locale;
        return (
          <NextLink
            key={l}
            href={hrefFor(l)}
            hrefLang={localeMeta[l].htmlLang}
            lang={localeMeta[l].htmlLang}
            aria-current={active ? "true" : undefined}
            onClick={(e) => (active ? e.preventDefault() : go(e, l))}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              active ? "bg-green-600 text-white" : "text-black hover:bg-black/5"
            }`}
          >
            {localeMeta[l].name}
          </NextLink>
        );
      })}
    </div>
  );
}
