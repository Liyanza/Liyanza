import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { PricingPlanGrid } from "@/components/sections/PricingPlans";

export function LandingPricing() {
  return (
    <section id="tarifs" className="scroll-pt-20 bg-green-accent-dark/[0.02] py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <SectionEyebrow variant="pill" tone="orange">
            Tarifs
          </SectionEyebrow>
          <h2 className="mt-5 text-3xl font-bold leading-[1.5] tracking-[-0.02em] text-zinc-950 sm:text-4xl lg:text-5xl">
            Des tarifs simples et transparents
          </h2>
          <p className="mt-4 text-lg text-zinc-500">
            Commencez gratuitement. Évoluez selon vos besoins.
          </p>
        </Reveal>

        <PricingPlanGrid className="mt-14" />

        <p className="mt-10 text-center">
          <a
            href="/tarifs"
            className="text-sm font-semibold text-green-accent-dark underline hover:no-underline"
          >
            Voir tous les tarifs et comparer les formules →
          </a>
        </p>
      </Container>
    </section>
  );
}
