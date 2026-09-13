import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function AboutFinalCTA() {
  return (
    <section className="bg-green-accent-dark py-24">
      <Container className="mx-auto max-w-2xl text-center">
        <h2 className="text-5xl font-extrabold leading-tight text-white">
          Rejoignez les équipes qui pilotent mieux
        </h2>
        <p className="mt-4 text-lg text-white/90">
          Commencez gratuitement et découvrez comment KIYANZA transforme vos
          données en décisions gagnantes.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#essai"
            className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-green-accent-dark transition hover:bg-white/90"
          >
            Commencer gratuitement
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="/tarifs"
            className="rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Voir les tarifs
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
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
