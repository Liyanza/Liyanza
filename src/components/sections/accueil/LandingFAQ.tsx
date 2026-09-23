"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { homeFaqs } from "@/data/faqs";

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(homeFaqs.length - 1);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div className="lg:col-start-1 lg:row-start-1">
            <SectionEyebrow variant="pill" tone="orange">
              FAQ
            </SectionEyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-[1.5] tracking-[-0.02em] text-zinc-950 sm:text-[40px]">
              Questions fréquentes
            </h2>
            <p className="mt-4 text-base leading-[26px] text-zinc-500">
              Tout ce que vous devez savoir sur KIYANZA. Vous ne trouvez pas votre
              réponse ?
            </p>
          </div>

          <div className="order-2 divide-y divide-zinc-200 border-b border-zinc-200 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
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
                    <span className="flex size-6 shrink-0 items-center justify-center border-2 border-zinc-300 text-zinc-500">
                      {isOpen ? (
                        <Minus className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                      ) : (
                        <Plus className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm leading-[1.625] text-zinc-500">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <a
            href="/ressources"
            className="order-3 inline-flex items-center self-start justify-self-start rounded-full border-2 border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white lg:order-none lg:col-start-1 lg:row-start-2"
          >
            Voir toutes les ressources
          </a>
        </div>
      </Container>
    </section>
  );
}
