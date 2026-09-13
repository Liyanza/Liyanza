"use client";

import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";

type GuideType = "Guide" | "Tutoriel";
type Level = "Débutant" | "Intermédiaire" | "Avancé";

interface GuideCard {
  type: GuideType;
  level: Level;
  title: string;
  description: string;
  readingTime: string;
}

const filters = ["Tous", "Guide", "Tutoriel", "Vidéo", "FAQ"] as const;

const guides: GuideCard[] = [
  {
    type: "Guide",
    level: "Débutant",
    title: "Comment créer sa première campagne avec KIYANZA",
    description:
      "Découvrez étape par étape comment définir vos objectifs, votre budget et vos canaux.",
    readingTime: "8 min de lecture",
  },
  {
    type: "Tutoriel",
    level: "Intermédiaire",
    title: "Utiliser les scénarios IA pour optimiser vos campagnes",
    description:
      "Comparez différents scénarios et laissez l'IA recommander la meilleure stratégie.",
    readingTime: "5 min de lecture",
  },
  {
    type: "Guide",
    level: "Intermédiaire",
    title: "Interpréter les performances d'une campagne",
    description: "Apprenez à lire vos KPIs, graphiques et alertes de monitoring.",
    readingTime: "6 min de lecture",
  },
  {
    type: "Guide",
    level: "Avancé",
    title: "Optimiser son budget marketing",
    description:
      "Stratégies concrètes pour répartir efficacement votre budget sur plusieurs canaux.",
    readingTime: "7 min de lecture",
  },
  {
    type: "Tutoriel",
    level: "Débutant",
    title: "Exporter et partager vos rapports",
    description:
      "Générez des PDF, planifiez des envois automatiques et partagez avec votre équipe.",
    readingTime: "4 min de lecture",
  },
  {
    type: "Guide",
    level: "Avancé",
    title: "Stratégie multi-canaux avec KIYANZA",
    description:
      "Pilotez Facebook, Instagram, WhatsApp et Google Ads depuis un seul tableau de bord.",
    readingTime: "9 min de lecture",
  },
];

const levelStyles: Record<Level, string> = {
  Débutant: "bg-blue-500 text-white",
  Intermédiaire: "bg-orange-500 text-white",
  Avancé: "bg-red-500 text-white",
};

export function GuidesSection() {
  const [active, setActive] = useState<(typeof filters)[number]>("Tous");

  const visible =
    active === "Tous" ? guides : guides.filter((g) => g.type === active);

  return (
    <section className="border-y border-[#e4e4e7] bg-[#fafafa] py-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              Guides &amp; Tutoriels
            </span>
            <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
              Apprenez à mieux piloter vos campagnes
            </h2>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-[#e4e4e7] px-5 py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-white"
          >
            Voir tous les guides
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = active === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-green-accent text-white"
                    : "border border-[#e4e4e7] bg-white text-[#52525b] hover:bg-[#f4f4f5]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((guide) => (
            <div
              key={guide.title}
              className="flex flex-col border border-[#e4e4e7] bg-white p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-[#f4f4f5] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#52525b]">
                  {guide.type}
                </span>
                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-bold tracking-wide ${levelStyles[guide.level]}`}
                >
                  {guide.level}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold text-black">{guide.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#71717a]">
                {guide.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-[#f4f4f5] pt-4">
                <span className="flex items-center gap-1.5 text-xs text-[#a1a1aa]">
                  <Clock className="size-3" aria-hidden="true" />
                  {guide.readingTime}
                </span>
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs font-semibold text-green-accent-dark"
                >
                  Lire
                  <ArrowRight className="size-3" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-[#71717a]">
              Aucun contenu disponible pour ce filtre pour le moment.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
