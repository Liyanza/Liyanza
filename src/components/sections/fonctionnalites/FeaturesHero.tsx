import { ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/Badge";
import { MiniDashboard } from "@/components/sections/fonctionnalites/MiniDashboard";

export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0fdf4] via-white to-[#eff6ff]">
      <div
        className="pointer-events-none absolute -left-40 -top-40 size-96 rounded-full bg-green-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionEyebrow variant="pill">Fonctionnalités</SectionEyebrow>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-6xl">
              Tout pour piloter
              <br />
              vos campagnes
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text text-transparent">
                marketing
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-gray-text">
              De la planification à l&apos;analyse, KIYANZA vous aide à prendre
              de meilleures décisions et à optimiser vos performances.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="hero"
                size="md"
                href="#essai"
                icon={<ArrowRight className="size-4" aria-hidden="true" />}
              >
                Commencer gratuitement
              </Button>
              <Button
                variant="outline-white"
                size="md"
                href="#demo"
                icon={<PlayCircle className="size-[18px]" aria-hidden="true" />}
                iconPosition="left"
              >
                Voir comment ça marche
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <MiniDashboard />
          </div>
        </div>
      </Container>
    </section>
  );
}
