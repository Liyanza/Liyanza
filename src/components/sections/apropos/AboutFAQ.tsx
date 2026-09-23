"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

const faqs = [
  {
    question: "KIYANZA est-il conçu spécifiquement pour l'Afrique ?",
    answer:
      "Oui, KIYANZA est pensé pour répondre aux réalités des équipes marketing africaines et de la diaspora, tout en restant utilisable partout.",
  },
  {
    question: "Êtes-vous une startup ou une entreprise établie ?",
    answer:
      "KIYANZA est une jeune structure née lors de l'Orange Summer Challenge 2026, actuellement en phase de croissance.",
  },
  {
    question: "Puis-je contacter l'équipe fondatrice ?",
    answer:
      "Oui, vous pouvez nous contacter directement via la page Contact ou notre formulaire dédié.",
  },
  {
    question: "Proposez-vous des partenariats ou intégrations ?",
    answer:
      "Nous sommes ouverts aux partenariats et intégrations — contactez notre équipe pour en discuter.",
  },
];

export function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-[#e4e4e7] bg-[#fafafa] py-24">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <SectionEyebrow variant="pill" tone="orange">FAQ</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-extrabold text-black">
              Questions sur KIYANZA
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-text">
              Des doutes sur qui nous sommes ou comment nous travaillons ?
              Voici les réponses.
            </p>
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
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-gray-text">
                      {isOpen ? (
                        <Minus className="size-4 text-orange-500" aria-hidden="true" />
                      ) : (
                        <Plus className="size-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm leading-relaxed text-gray-text">
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
