import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

const challenges = [
  {
    number: "01",
    title: "Trop de données",
    description:
      "Des volumes impossibles à analyser manuellement, des tableaux de bord qui ne parlent pas à l'humain.",
  },
  {
    number: "02",
    title: "Trop de canaux",
    description:
      "Facebook, Google, WhatsApp, Instagram — piloter chaque plateforme séparément, sans vue d'ensemble.",
  },
  {
    number: "03",
    title: "Décisions hasardeuses",
    description:
      "Sans vision claire, chaque choix budgétaire devient un pari. L'intuition remplace la data.",
  },
  {
    number: "04",
    title: "Outils dispersés",
    description:
      "Une dizaine d'outils qui ne communiquent pas, des heures perdues en consolidation manuelle.",
  },
];

export function ChallengesSection() {
  return (
    <section className="border-t border-[#e4e4e7] bg-[#fafafa] py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill" tone="orange">Le contexte</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            Des défis qui grandissent plus vite que les outils
          </h2>
          <p className="mt-3 text-base text-gray-text">
            Les équipes marketing font face à une complexité croissante.
            KIYANZA répond à ces frictions concrètes.
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {challenges.map((item) => (
            <div
              key={item.number}
              data-reveal-item
              className="flex gap-5 rounded-[5px] border border-[#e4e4e7] bg-white p-7"
            >
              <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full border border-green-accent-dark/20 bg-green-accent-dark/10">
                <span className="text-xs font-black tracking-wide text-green-accent-dark">
                  {item.number}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-text">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-[5px] bg-[#e7ebf2]/40 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-base font-extrabold text-orange-500">
              KIYANZA rassemble tout ça en une seule interface.
            </p>
            <p className="mt-1 text-sm text-black/45">
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
