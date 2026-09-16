"use client";

import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";

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
        <SectionEyebrow variant="pill" tone="orange">Centre de ressources</SectionEyebrow>
        <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
          Comment pouvons-nous
          <br />
          <span className="text-orange-500">vous aider ?</span>
        </h1>
        <p className="mt-4 text-lg text-black/45">
          Guides, tutoriels, vidéos et FAQ — tout ce qu&apos;il faut pour
          piloter vos campagnes comme un expert.
        </p>

        <form
          className="mt-10 flex items-center gap-2 rounded-full border border-[#e8f5e9] bg-white py-1.5 pl-5 pr-1.5"
          onSubmit={(e) => e.preventDefault()}
        >
          <Search className="size-[18px] shrink-0 text-black/40" aria-hidden="true" />
          <input
            type="text"
            placeholder="Chercher un guide, tutoriel, question..."
            className="w-full text-base text-black placeholder:text-black/50 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-accent-dark"
          >
            Rechercher
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-black/25">Populaires :</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              className="rounded-full border border-black/10 px-3 py-1.5 font-medium text-black/50 transition hover:bg-black/5"
            >
              {term}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
