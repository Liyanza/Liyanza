"use client";

import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

const faqs = [
  {
    question: "Comment accéder aux rapports ?",
    answer:
      "Rendez-vous dans l'onglet Rapports de votre tableau de bord pour générer, exporter et partager vos rapports de campagne en quelques clics.",
  },
  {
    question: "Comment modifier le budget d'une campagne active ?",
    answer:
      "Ouvrez la campagne concernée depuis la liste de vos campagnes, puis ajustez le budget directement depuis son panneau de paramètres — le changement est pris en compte immédiatement.",
  },
  {
    question: "Puis-je connecter plusieurs comptes publicitaires ?",
    answer:
      "Oui, KIYANZA permet de connecter plusieurs comptes (Facebook, Instagram, WhatsApp, Google Ads) et de les piloter depuis un seul tableau de bord unifié.",
  },
  {
    question: "Comment fonctionne l'assistant IA ?",
    answer:
      "L'assistant IA analyse vos campagnes et vos objectifs pour générer des scénarios et des recommandations concrètes, que vous restez libre d'appliquer ou d'ajuster.",
  },
  {
    question: "KIYANZA est-il disponible en version mobile ?",
    answer:
      "L'interface est pensée responsive pour être consultée depuis un mobile ou une tablette ; une application dédiée est envisagée pour une prochaine étape.",
  },
  {
    question: "Comment contacter le support ?",
    answer:
      "Notre équipe est joignable via le bouton « Contacter le support » ci-contre ou directement depuis le chat intégré à la plateforme.",
  },
];

export function ResourcesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-[#e4e4e7] bg-white py-20">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <SectionEyebrow variant="pill" tone="orange">FAQ</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-black text-black">
              Questions fréquentes
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#71717a]">
              Vous ne trouvez pas votre réponse ? Notre équipe est là pour
              vous aider.
            </p>
            <button
              type="button"
              className="mt-6 flex items-center gap-2 rounded-full border border-[#e4e4e7] px-5 py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa]"
            >
              Contacter le support
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </Reveal>

          <Reveal stagger className="divide-y divide-[#e4e4e7] border-t border-[#e4e4e7]">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question} data-reveal-item>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-black">
                      {faq.question}
                    </span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#d4d4d8] text-[#71717a]">
                      {isOpen ? (
                        <Minus className="size-4 text-orange-500" aria-hidden="true" />
                      ) : (
                        <Plus className="size-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm leading-relaxed text-[#71717a]">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
