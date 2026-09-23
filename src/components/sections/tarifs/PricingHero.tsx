"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { HeroIntro } from "@/components/motion/HeroIntro";

export function PricingHero() {
  const [annual, setAnnual] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const placedOnce = useRef(false);

  // Slide the green pill under the selected option. Absolute element, so
  // animating its width doesn't reflow anything else. Until this runs (or
  // without JS) the selected button keeps its own background.
  useLayoutEffect(() => {
    const toggle = toggleRef.current;
    const pill = pillRef.current;
    const button = toggle?.querySelectorAll("button")[annual ? 1 : 0];
    if (!toggle || !pill || !button) return;
    if (!placedOnce.current) pill.style.transition = "none";
    pill.style.width = `${button.offsetWidth}px`;
    pill.style.transform = `translateX(${button.offsetLeft}px)`;
    if (!placedOnce.current) {
      void pill.offsetWidth;
      pill.style.transition = "";
      placedOnce.current = true;
      toggle.setAttribute("data-ready", "");
    }
  }, [annual]);

  return (
    <section className="bg-white py-20">
      <Container className="mx-auto max-w-3xl text-center">
        <HeroIntro>
          <div data-intro="badge">
            <SectionEyebrow variant="pill" tone="orange">Tarifs</SectionEyebrow>
          </div>
          <h1 data-intro="title" className="mt-6 text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl">
            Des tarifs simples pour des campagnes{" "}
            <span className="text-orange-500">plus intelligentes</span>
          </h1>
          <p data-intro="text" className="mx-auto mt-4 max-w-xl text-lg font-medium text-black/50">
            Choisissez la formule adaptée à vos besoins et faites évoluer votre
            utilisation de KIYANZA avec votre activité.
          </p>

          <div
            ref={toggleRef}
            data-intro="actions"
            className="group relative mt-10 inline-flex items-center rounded-full bg-[#e8f5e9] p-1"
          >
            <span
              ref={pillRef}
              aria-hidden="true"
              className="absolute inset-y-1 left-0 hidden rounded-full bg-green-600 transition-[transform,width] duration-300 ease-[var(--ease-out)] group-data-[ready]:block"
            />
            <button
              type="button"
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`relative rounded-full px-6 py-2 text-sm font-semibold transition ${
                !annual ? "bg-green-600 text-white group-data-[ready]:bg-transparent" : "text-black"
              }`}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`relative rounded-full px-6 py-2 text-sm font-semibold transition ${
                annual ? "bg-green-600 text-white group-data-[ready]:bg-transparent" : "text-black"
              }`}
            >
              Annuel
            </button>
          </div>

          <p data-intro="meta" className="mt-4 flex items-center justify-center gap-2 text-sm text-black/35">
            <Check className="size-3.5 text-green-accent" aria-hidden="true" />
            Économisez avec la facturation annuelle
          </p>
        </HeroIntro>
      </Container>
    </section>
  );
}
