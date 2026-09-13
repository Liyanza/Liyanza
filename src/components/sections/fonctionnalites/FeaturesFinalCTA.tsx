import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FeaturesFinalCTA() {
  return (
    <section className="bg-white py-20">
      <Container className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-extrabold leading-tight text-black">
          Prêt à mieux piloter
          <br />
          vos campagnes ?
        </h2>
        <p className="mt-4 text-sm text-gray-text">
          Planifiez, simulez et optimisez vos campagnes depuis une seule
          plateforme.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="cta"
            size="lg"
            href="#essai"
            icon={<ArrowRight className="size-4" aria-hidden="true" />}
          >
            Commencer gratuitement
          </Button>
          <Button variant="outline" size="md" href="/">
            Découvrir KIYANZA
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-text-light">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-green-accent" aria-hidden="true" />
            Annulation à tout moment
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-green-accent" aria-hidden="true" />
            Support inclus
          </span>
        </div>
      </Container>
    </section>
  );
}
