import { ArrowRight, Database, HelpCircle, LayoutGrid, Share2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

const challenges = [
  {
    number: "01",
    icon: Database,
    title: "Trop de données",
    description:
      "Des volumes impossibles à analyser manuellement, des tableaux de bord qui ne parlent pas à l'humain.",
  },
  {
    number: "02",
    icon: Share2,
    title: "Trop de canaux",
    description:
      "Facebook, Google, WhatsApp, Instagram — piloter chaque plateforme séparément, sans vue d'ensemble.",
  },
  {
    number: "03",
    icon: HelpCircle,
    title: "Décisions hasardeuses",
    description:
      "Sans vision claire, chaque choix budgétaire devient un pari. L'intuition remplace la data.",
  },
  {
    number: "04",
    icon: LayoutGrid,
    title: "Outils dispersés",
    description:
      "Une dizaine d'outils qui ne communiquent pas, des heures perdues en consolidation manuelle.",
  },
];

export function ChallengesSection() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Le contexte
          </span>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            Des défis qui grandissent plus vite que les outils
          </h2>
          <p className="mt-3 text-base text-gray-text">
            Les équipes marketing font face à une complexité croissante.
            KIYANZA répond à ces frictions concrètes.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {challenges.map((item) => (
            <div
              key={item.number}
              className="flex gap-5 rounded-xl border border-border bg-white p-7"
            >
              <div>
                <p className="text-xs font-black text-border">{item.number}</p>
                <div className="mt-3 flex size-10 items-center justify-center rounded-lg bg-orange-500">
                  <item.icon className="size-5 text-white" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-text">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-xl bg-blue-500 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-base font-extrabold text-white">
              KIYANZA rassemble tout ça en une seule interface.
            </p>
            <p className="mt-1 text-sm text-white/90">
              Un cockpit unique pour planifier, piloter, optimiser et
              rapporter — alimenté par l&apos;IA.
            </p>
          </div>
          <a
            href="/fonctionnalites"
            className="flex shrink-0 items-center gap-2 rounded-full bg-green-accent-dark px-6 py-3 text-sm font-bold text-white transition hover:brightness-105"
          >
            Voir les fonctionnalités
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
