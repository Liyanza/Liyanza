"use client";

import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

const faqs = [
  {
    question: "Puis-je commencer gratuitement ?",
    answer:
      "Oui, la formule FREE vous permet de découvrir KIYANZA sans engagement ni carte bancaire.",
  },
  {
    question: "Puis-je changer de formule à tout moment ?",
    answer:
      "Oui, vous pouvez passer à une formule supérieure ou inférieure à tout moment depuis votre espace client.",
  },
  {
    question:
      "Quelle est la différence entre facturation mensuelle et annuelle ?",
    answer:
      "La facturation annuelle vous permet de bénéficier d'une réduction par rapport au paiement mensuel, pour le même accès à toutes les fonctionnalités.",
  },
  {
    question:
      "Les fonctionnalités IA sont-elles disponibles dans toutes les offres ?",
    answer:
      "Un accès limité aux recommandations IA est inclus dans la formule FREE. Les scénarios IA et recommandations avancées sont disponibles à partir de la formule PRO.",
  },
  {
    question: "Comment fonctionne la formule ENTERPRISE ?",
    answer:
      "La formule ENTERPRISE est sur devis et s'adapte aux besoins spécifiques de votre organisation, avec un accompagnement dédié.",
  },
  {
    question: "Puis-je annuler mon abonnement ?",
    answer:
      "Oui, vous pouvez annuler votre abonnement à tout moment, sans engagement ni frais cachés.",
  },
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(3);

  return (
    <section className="border-t border-zinc-200 bg-[#fafafa] py-24">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <SectionEyebrow variant="pill" tone="orange">FAQ Tarifs</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-extrabold text-black">
              Questions fréquentes
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-text">
              Vous ne trouvez pas votre réponse ? Notre équipe est
              disponible pour vous aider.
            </p>
            <a
              href="/ressources"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-[#3f3f46] hover:bg-white"
            >
              Voir toutes les ressources
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
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
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-500">
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
