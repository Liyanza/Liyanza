"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import type { FaqEntry } from "@/data/faqs";
import { Reveal } from "@/components/motion/Reveal";
import { Collapse, ToggleIcon } from "@/components/motion/Disclosure";

export function LandingFAQ({
  eyebrow,
  title,
  text,
  cta,
  items,
}: {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  items: FaqEntry[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(items.length - 1);
  const baseId = useId();

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <SectionEyebrow variant="pill" tone="orange">
              {eyebrow}
            </SectionEyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-[1.5] tracking-[-0.02em] text-zinc-950 sm:text-[40px]">
              {title}
            </h2>
            <p className="mt-4 text-base leading-[26px] text-zinc-500">
              {text}
            </p>
          </Reveal>

          <Reveal
            stagger
            className="order-2 divide-y divide-zinc-200 border-b border-zinc-200 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2"
          >
            {items.map((faq, i) => {
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
                    <span className="text-base font-semibold text-zinc-950">
                      {faq.question}
                    </span>
                    <span className="flex size-6 shrink-0 items-center justify-center border-2 border-zinc-300 text-zinc-500">
                      <ToggleIcon open={isOpen} className="size-3.5" strokeWidth={2.5} />
                    </span>
                  </button>
                  <Collapse open={isOpen} id={`${baseId}-${i}`}>
                    <p className="pb-5 text-sm leading-[1.625] text-zinc-500">
                      {faq.answer}
                    </p>
                  </Collapse>
                </div>
              );
            })}
          </Reveal>

          <Link
            href="/ressources"
            className="order-3 inline-flex items-center self-start justify-self-start rounded-full border-2 border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white lg:order-none lg:col-start-1 lg:row-start-2"
          >
            {cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
