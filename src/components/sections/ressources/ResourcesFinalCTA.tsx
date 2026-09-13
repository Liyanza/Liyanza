import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function ResourcesFinalCTA() {
  return (
    <section className="bg-green-accent-dark py-24">
      <Container className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">
          Prêt à passer à l&apos;action ?
        </h2>
        <p className="mt-4 text-lg text-white/90">
          Mettez en pratique ce que vous avez appris — lancez votre première
          campagne avec KIYANZA.
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
      </Container>
    </section>
  );
}
