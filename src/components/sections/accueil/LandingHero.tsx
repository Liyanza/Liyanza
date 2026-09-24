import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FloatingStat, StatLine } from "@/components/ui/FloatingStat";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { getMessages } from "@/i18n/server";

export async function LandingHero() {
  const t = (await getMessages("home")).hero;

  return (
    <section className="relative overflow-hidden bg-green-accent-dark/5">
      <Container className="relative py-16 lg:pb-[108px] lg:pt-[140px]">
        <HeroIntro className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-6 xl:grid-cols-[660px_1fr]">
          <div>
            <span
              data-intro="badge"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500/[0.08] px-4 py-2 text-xs font-semibold leading-4 text-orange-500"
            >
              <span aria-hidden="true">✦</span>
              {t.badge}
              <span className="ml-1 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold leading-[13px] text-white">
                {t.badgeNew}
              </span>
            </span>

            <h1 data-intro="title" className="mt-6 text-4xl font-bold leading-[1.25] tracking-[-0.02em] text-black sm:text-5xl lg:text-6xl xl:text-[56px]">
              {t.titleStart}{" "}
              <span className="text-orange-500">{t.titleHighlight}</span>
            </h1>

            <p data-intro="text" className="mt-6 max-w-[480px] text-lg leading-[1.625] text-black/55">
              {t.text}
            </p>

            <div data-intro="actions" className="mt-8 flex flex-wrap gap-4">
              <Button
                variant="solid"
                size="lg"
                href="/inscription"
                className="!bg-green-600 hover:!bg-green-accent-dark"
                icon={<ArrowRight className="size-4" aria-hidden="true" />}
              >
                {t.ctaPrimary}
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/#fonctionnalites"
                className="!border-green-600 !text-green-600 hover:!bg-green-600/5"
              >
                {t.ctaSecondary}
              </Button>
            </div>

            <ul data-intro="meta" className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {t.trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-black/40">
                  <Check className="size-3.5 text-green-accent-dark" strokeWidth={2.5} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-intro="visual"
            className="relative w-full max-w-[640px] justify-self-center lg:ml-auto lg:mr-[-48px] lg:max-w-[773px] xl:ml-[-80px] xl:mr-[-24px] xl:w-[calc(100%+104px)] 2xl:w-[773px] xl:max-w-none xl:justify-self-start"
          >
            <Image
              src="/hero-home.png"
              alt={t.imageAlt}
              width={1285}
              height={1024}
              sizes="(min-width: 1280px) 773px, (min-width: 1024px) 50vw, (min-width: 640px) 640px, 100vw"
              className="relative h-auto w-full object-contain"
              loading="eager"
              fetchPriority="high"
            />
            {/* Logo gravé sur le capot : SVG net à toutes les tailles, posé sur
                la zone laissée vierge dans la photo (centre 65,2 % / 75,1 %). */}
            <Image
              src="/kiyanza-logo-mark.svg"
              alt=""
              aria-hidden="true"
              width={85}
              height={56}
              className="pointer-events-none absolute left-[65.2%] top-[75.1%] h-auto w-[15%] -translate-x-1/2 -translate-y-1/2"
            />

            <FloatingStat
              label={t.stats.conversions}
              value="+28%"
              valueClassName="text-green-accent"
              className="hidden left-[21%] top-[12%] sm:flex"
              index={0}
            />
            <FloatingStat
              label={t.stats.budgetSplit}
              className="hidden left-[70%] top-[11%] sm:flex"
              index={1}
            >
              <StatLine>WhatsApp 60%</StatLine>
              <StatLine>Facebook 40%</StatLine>
            </FloatingStat>
            <FloatingStat
              label={t.stats.roi}
              value="320%"
              valueClassName="text-orange-500"
              className="hidden left-[12%] top-[41%] sm:flex"
              index={2}
            />
            <FloatingStat
              label={t.stats.bestAudience}
              className="hidden left-[75%] top-[35%] sm:flex"
              index={3}
            >
              <StatLine>{t.stats.audienceValue}</StatLine>
            </FloatingStat>
          </div>
        </HeroIntro>
      </Container>
    </section>
  );
}
