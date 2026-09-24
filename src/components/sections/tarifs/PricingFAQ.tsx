"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Collapse, ToggleIcon } from "@/components/motion/Disclosure";
import { Link } from "@/i18n/navigation";
import type { Messages } from "@/i18n/dictionaries";

export function PricingFAQ({ t }: { t: Messages["pricing"]["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(3);
  const baseId = useId();

  return (
    <section className="border-t border-zinc-200 bg-[#fafafa] py-24">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-extrabold text-black">
              {t.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-text">
              {t.text}
            </p>
            <Link
              href="/ressources"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-[#3f3f46] hover:bg-white"
            >
              {t.cta}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal stagger className="divide-y divide-[#e4e4e7] border-t border-[#e4e4e7]">
            {t.items.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question} data-reveal-item>
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
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-500">
                      <ToggleIcon open={isOpen} openClassName="text-orange-500" />
                    </span>
                  </button>
                  <Collapse open={isOpen} id={`${baseId}-${i}`}>
                    <p className="pb-5 text-sm leading-relaxed text-gray-text">
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
