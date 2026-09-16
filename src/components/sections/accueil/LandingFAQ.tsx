"use client";

import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { homeFaqs } from "@/data/faqs";

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(homeFaqs.length - 1);

  return (
    <section className="bg-zinc-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <SectionEyebrow variant="pill" tone="orange">
              FAQ
            </SectionEyebrow>
            <h2 className="mt-5 text-3xl font-black text-zinc-950 sm:text-4xl">
              Questions fréquentes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-text">
              Tout ce que vous devez savoir sur KIYANZA. Vous ne trouvez pas votre
              réponse ?
            </p>
            <a
              href="/ressources"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white"
            >
              Voir toutes les ressources
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="divide-y divide-zinc-200 border-t border-zinc-200">
            {homeFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-zinc-950">
                      {faq.question}
                    </span>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-gray-text">
                      {isOpen ? (
                        <Minus className="size-3.5" aria-hidden="true" />
                      ) : (
                        <Plus className="size-3.5" aria-hidden="true" />
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
          </div>
        </div>
      </Container>
    </section>
  );
}
