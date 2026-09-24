import { CircleCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PricingPlanGrid } from "@/components/sections/PricingPlans";

export function PricingCards() {
  return (
    <section className="bg-green-accent-dark/[0.02] pb-20 pt-16">
      <Container>
        <PricingPlanGrid />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-black/[0.08] pt-8">
          {[
            "Aucune carte pour FREE",
            "Changement de formule à tout moment",
            "Annulation sans engagement",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-black/40">
              <CircleCheck className="size-4 text-green-accent-dark" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
