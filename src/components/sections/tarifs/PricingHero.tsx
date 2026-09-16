"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";

export function PricingHero() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="bg-white py-20">
      <Container className="mx-auto max-w-3xl text-center">
        <SectionEyebrow variant="pill" tone="orange">Tarifs</SectionEyebrow>
        <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl">
          Des tarifs simples pour des campagnes{" "}
          <span className="text-orange-500">plus intelligentes</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-black/50">
          Choisissez la formule adaptée à vos besoins et faites évoluer votre
          utilisation de KIYANZA avec votre activité.
        </p>

        <div className="mt-10 inline-flex items-center rounded-full bg-[#e8f5e9] p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              !annual ? "bg-green-600 text-white" : "text-black"
            }`}
          >
            Mensuel
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              annual ? "bg-green-600 text-white" : "text-black"
            }`}
          >
            Annuel
          </button>
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-black/35">
          <Check className="size-3.5 text-green-accent" aria-hidden="true" />
          Économisez avec la facturation annuelle
        </p>
      </Container>
    </section>
  );
}
