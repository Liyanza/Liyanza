import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/Badge";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { getMessages } from "@/i18n/server";

export async function FeaturesHero() {
  const t = (await getMessages("features")).hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0fdf4] via-white to-[#eff6ff]">
      <div
        className="pointer-events-none absolute -left-40 -top-40 size-96 rounded-full bg-green-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-16 lg:py-20">
        <HeroIntro className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <div data-intro="badge">
              <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
            </div>
            <h1 data-intro="title" className="mt-5 text-5xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-6xl">
              {t.titleLines[0]}
              <br />
              {t.titleLines[1]}
              <br />
              <span className="text-orange-500">{t.titleHighlight}</span>
            </h1>
            <p data-intro="text" className="mt-5 max-w-md text-base font-medium leading-relaxed text-gray-text">
              {t.text}
            </p>
            <div data-intro="actions" className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="solid"
                size="md"
                href="/inscription"
                className="!bg-green-accent hover:!bg-green-accent-dark"
                icon={<ArrowRight className="size-4" aria-hidden="true" />}
              >
                {t.ctaPrimary}
              </Button>
              <Button
                variant="outline"
                size="md"
                href="/inscription"
                className="!border-green-accent !text-green-accent hover:!bg-green-accent/5"
                icon={<PlayCircle className="size-[18px]" aria-hidden="true" />}
                iconPosition="left"
              >
                {t.ctaSecondary}
              </Button>
            </div>
          </div>

          <div data-intro="visual" className="relative mx-auto w-full max-w-[480px] lg:ml-auto lg:mr-[-24px] lg:max-w-[620px]">
            <div className="relative aspect-[692/499] w-full">
              <Image
                src="/fonctionnalites-hero.png"
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) 620px, (min-width: 520px) 480px, 100vw"
                className="object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </HeroIntro>
      </Container>
    </section>
  );
}
