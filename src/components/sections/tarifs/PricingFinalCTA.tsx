import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PricingFinalCTA() {
  return (
    <section className="bg-gradient-to-br from-[#0a2e1a] via-[#0c252e] to-navy py-24">
      <Container className="mx-auto max-w-2xl text-center">
        <h2 className="text-5xl font-extrabold leading-tight text-white">
          Prêt à mieux piloter vos campagnes ?
        </h2>
        <p className="mt-4 text-lg text-white/90">
          Commencez avec KIYANZA et faites évoluer votre utilisation selon
          vos besoins.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#essai"
            className="flex items-center gap-2 rounded-full bg-green-accent px-8 py-4 text-base font-bold text-white transition hover:bg-green-accent-dark"
          >
            Commencer gratuitement
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-green-accent bg-white px-8 py-4 text-base font-semibold text-green-accent-dark transition hover:bg-green-accent/5"
          >
            Parler à l&apos;équipe
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
          {["Aucune carte pour FREE", "Annulation à tout moment", "Support inclus"].map(
            (item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-white" aria-hidden="true" />
                {item}
              </span>
            )
          )}
        </div>
      </Container>
    </section>
  );
}
