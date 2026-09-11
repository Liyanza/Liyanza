import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy via-[#0a2e1a] to-navy py-20">
      <div
        className="pointer-events-none absolute left-1/3 top-0 size-64 rounded-full bg-green-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 size-48 rounded-full bg-cyan-500/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <SectionEyebrow variant="line" className="text-green-accent">
            Commencez dès aujourd&apos;hui
          </SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Prêt à piloter votre prochaine campagne autrement ?
          </h2>
          <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-[#6b8ab0]">
            Rejoignez KIYANZA et transformez vos idées en résultats concrets.
            Gratuit pour commencer.
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-4 lg:w-auto lg:items-center">
          <Button
            variant="cta"
            size="lg"
            href="#essai"
            className="w-full lg:w-auto"
            icon={<ArrowRight className="size-4" aria-hidden="true" />}
          >
            Commencer gratuitement
          </Button>
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#6b8ab0]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3.5 text-green-accent" aria-hidden="true" />
              Annulation à tout moment
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3.5 text-green-accent" aria-hidden="true" />
              Support inclus
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
