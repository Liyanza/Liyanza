import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/Badge";

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
            <SectionEyebrow variant="pill" tone="orange">Fonctionnalités</SectionEyebrow>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-6xl">
              Tout pour piloter
              <br />
              vos campagnes
              <br />
              <span className="text-orange-500">marketing</span>
            </h1>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-gray-text">
              De la planification à l&apos;analyse, KIYANZA vous aide à prendre
              de meilleures décisions et à optimiser vos performances.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="solid"
                size="md"
                href="/inscription"
                className="!bg-green-accent hover:!bg-green-accent-dark"
                icon={<ArrowRight className="size-4" aria-hidden="true" />}
              >
                Commencer gratuitement
              </Button>
              <Button
                variant="outline"
                size="md"
                href="#demo"
                className="!border-green-accent !text-green-accent hover:!bg-green-accent/5"
                icon={<PlayCircle className="size-[18px]" aria-hidden="true" />}
                iconPosition="left"
              >
                Voir comment ça marche
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[480px] lg:ml-auto lg:mr-[-24px] lg:max-w-[620px]">
            <div className="relative aspect-[692/499] w-full">
              <Image
                src="/fonctionnalites-hero.png"
                alt="Une professionnelle du marketing souriante, ordinateur portable à la main, prête à piloter ses campagnes avec KIYANZA"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
