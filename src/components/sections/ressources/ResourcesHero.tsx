"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { focusResource, searchResources } from "@/lib/resources-search";

const popularSearches = [
  "Créer une campagne",
  "Scénarios IA",
  "Monitoring",
  "Rapports",
  "Budget",
];

export function ResourcesHero() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const panelId = useId();

  const results = useMemo(() => searchResources(query), [query]);
  const showPanel = open && query.trim().length > 1;
  const status = results.length
    ? `${results.length} résultat${results.length > 1 ? "s" : ""} pour « ${query.trim()} »`
    : `Aucun résultat pour « ${query.trim()} »`;

  // Ferme le panneau au clic en dehors.
  useEffect(() => {
    if (!showPanel) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [showPanel]);

  const runSearch = (term: string) => {
    setQuery(term);
    setOpen(true);
    inputRef.current?.focus();
  };

  const select = (id: string) => {
    setOpen(false);
    focusResource(id);
  };

  // Clavier : ↓/↑ parcourent les résultats, Échap ferme et revient au champ.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && showPanel) {
      e.preventDefault();
      setOpen(false);
      inputRef.current?.focus();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const items = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    if (!items.length) return;
    e.preventDefault();
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    const next =
      e.key === "ArrowDown"
        ? items[Math.min(index + 1, items.length - 1)]
        : index <= 0
          ? null
          : items[index - 1];
    if (next) next.focus();
    else inputRef.current?.focus();
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="mx-auto max-w-3xl text-center">
        <HeroIntro>
          <div data-intro="badge">
            <SectionEyebrow variant="pill" tone="orange">Centre de ressources</SectionEyebrow>
          </div>
          <h1 data-intro="title" className="mt-6 text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
            Comment pouvons-nous
            <br />
            <span className="text-orange-500">vous aider ?</span>
          </h1>
          <p data-intro="text" className="mt-4 text-lg text-black/45">
            Guides, tutoriels, vidéos et FAQ — tout ce qu&apos;il faut pour
            piloter vos campagnes comme un expert.
          </p>

          <div
            ref={rootRef}
            data-intro="actions"
            className="relative z-20 mt-10 text-left"
            onKeyDown={onKeyDown}
          >
            <form
              role="search"
              aria-label="Rechercher dans les ressources"
              className="flex items-center gap-2 rounded-full border border-[#e8f5e9] bg-white py-1.5 pl-5 pr-1.5 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-green-accent"
              onSubmit={(e) => {
                e.preventDefault();
                // Un seul résultat : on y va directement.
                if (results.length === 1) select(results[0].id);
                else setOpen(true);
              }}
            >
              <Search className="size-[18px] shrink-0 text-black/40" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Chercher un guide, tutoriel, question..."
                aria-label="Chercher un guide, un tutoriel ou une question"
                aria-controls={panelId}
                autoComplete="off"
                className="w-full bg-transparent text-base text-black placeholder:text-black/50 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => runSearch("")}
                  aria-label="Effacer la recherche"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-black/40 transition hover:bg-black/5 hover:text-black"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
              <button
                type="submit"
                className="shrink-0 rounded-full bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-accent-dark"
              >
                Rechercher
              </button>
            </form>

            <p aria-live="polite" className="sr-only">
              {showPanel ? status : ""}
            </p>

            <div
              id={panelId}
              hidden={!showPanel}
              className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.18)]"
            >
              <p className="border-b border-black/5 px-5 py-3 text-xs font-medium text-black/45">{status}</p>
              {results.length > 0 ? (
                <ul ref={listRef} className="max-h-[360px] overflow-y-auto py-1">
                  {results.map((r) => (
                    <li key={r.id}>
                      <button
                        type="button"
                        onClick={() => select(r.id)}
                        className="group flex w-full items-start gap-3 px-5 py-3 text-left transition hover:bg-green-600/5 focus-visible:bg-green-600/5 focus-visible:outline-none"
                      >
                        <span className="mt-0.5 shrink-0 rounded-full border border-[#e4e4e7] bg-[#f4f4f5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#52525b]">
                          {r.kind}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-black">{r.title}</span>
                          <span className="mt-0.5 block truncate text-xs text-black/45">{r.text}</span>
                        </span>
                        <ArrowRight
                          className="mt-1 size-3.5 shrink-0 text-green-accent-dark opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-5 py-4 text-sm text-black/55">
                  Essayez un autre mot-clé, par exemple « campagne », « budget » ou « rapports ».
                </p>
              )}
            </div>
          </div>

          <div data-intro="meta" className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-black/25">Populaires :</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => runSearch(term)}
                className="rounded-full border border-black/10 px-3 py-1.5 font-medium text-black/50 transition hover:bg-black/5"
              >
                {term}
              </button>
            ))}
          </div>
        </HeroIntro>
      </Container>
    </section>
  );
}
