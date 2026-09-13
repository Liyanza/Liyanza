"use client";

import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";

const popularSearches = [
  "Créer une campagne",
  "Scénarios IA",
  "Monitoring",
  "Rapports",
  "Budget",
];

export function ResourcesHero() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          Centre de ressources
        </span>
        <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
          Comment pouvons-nous
          <br />
          vous aider ?
        </h1>
        <p className="mt-4 text-lg text-gray-text">
          Guides, tutoriels, vidéos et FAQ — tout ce qu&apos;il faut pour
          piloter vos campagnes comme un expert.
        </p>

        <form
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-1 items-center gap-3 border border-black/80 bg-white px-5 py-4">
            <Search className="size-[18px] shrink-0 text-black" aria-hidden="true" />
            <input
              type="text"
              placeholder="Chercher un guide, tutoriel, question..."
              className="w-full text-base text-black placeholder:text-[#52525b] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-full bg-green-accent px-8 py-4 text-sm font-bold text-white transition hover:brightness-105"
          >
            Rechercher
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-black">Populaires :</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              className="rounded-full border border-black/80 px-3 py-1.5 font-medium text-black transition hover:bg-black/5"
            >
              {term}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
