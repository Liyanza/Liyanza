"use client";

import { useCallback, useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Collapse, ToggleIcon } from "@/components/motion/Disclosure";
import { useT } from "@/i18n/client";
import { resourceId } from "@/data/resources";
import { useResourceFocus } from "@/lib/resources-search";


export function ResourcesFAQ() {
  const t = useT("resources").faq;
  const faqs = t.items;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  // Une question trouvée par la recherche s'ouvre d'elle-même.
  useResourceFocus(
    useCallback((id: string) => {
      const i = faqs.findIndex((f) => resourceId(f.question) === id);
      if (i !== -1) setOpenIndex(i);
    }, [faqs]),
  );

  return (
    <section className="border-t border-[#e4e4e7] bg-white py-20">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-black text-black">
              {t.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#71717a]">
              {t.text}
            </p>
            <button
              type="button"
              className="mt-6 flex items-center gap-2 rounded-full border border-[#e4e4e7] px-5 py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa]"
            >
              {t.cta}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </Reveal>

          <Reveal stagger className="divide-y divide-[#e4e4e7] border-t border-[#e4e4e7]">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question} id={resourceId(faq.question)} data-reveal-item className="scroll-mt-24">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`${baseId}-${i}`}
                  >
                    <span className="text-base font-semibold text-black">
                      {faq.question}
                    </span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#d4d4d8] text-[#71717a]">
                      <ToggleIcon open={isOpen} openClassName="text-orange-500" />
                    </span>
                  </button>
                  <Collapse open={isOpen} id={`${baseId}-${i}`}>
                    <p className="pb-5 text-sm leading-relaxed text-[#71717a]">
                      {faq.answer}
                    </p>
                  </Collapse>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
