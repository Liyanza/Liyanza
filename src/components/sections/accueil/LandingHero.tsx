import { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const trustItems = [
  "Aucune carte requise",
  "Annulation à tout moment",
  "IA incluse",
];

function FloatingStat({
  label,
  value,
  valueClassName = "text-zinc-950",
  className = "",
  children,
}: {
  label: string;
  value?: string;
  valueClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`absolute hidden flex-col whitespace-nowrap rounded-xl border-[3px] border-border-light bg-white px-3 py-2 shadow-lg sm:flex ${className}`}
    >
      <p className="text-[10px] leading-[15px] text-gray-text-light">{label}</p>
      {children ?? <p className={`text-sm font-bold leading-5 ${valueClassName}`}>{value}</p>}
    </div>
  );
}

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-green-accent-dark/5">
      <Container className="relative py-16 lg:pb-[108px] lg:pt-[140px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-6 xl:grid-cols-[536px_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/[0.08] px-4 py-2 text-xs font-semibold leading-4 text-orange-500">
              <span aria-hidden="true">✦</span>
              Découvrez l&apos;intelligence de KIYANZA
              <span className="ml-1 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold leading-[13px] text-white">
                NOUVEAU
              </span>
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.25] tracking-[-0.02em] text-black sm:text-5xl lg:text-6xl">
              Pilotez vos campagnes avec{" "}
              <span className="text-orange-500">l&apos;intelligence artificielle</span>
            </h1>

            <p className="mt-6 max-w-[480px] text-lg leading-[1.625] text-black/55">
              KIYANZA centralise la création, le monitoring et l&apos;optimisation de
              vos campagnes marketing. Prenez de meilleures décisions, plus vite.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                variant="solid"
                size="lg"
                href="/inscription"
                className="!bg-green-600 hover:!bg-green-accent-dark"
                icon={<ArrowRight className="size-4" aria-hidden="true" />}
              >
                Commencer gratuitement
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/#fonctionnalites"
                className="!border-green-600 !text-green-600 hover:!bg-green-600/5"
              >
                Voir les fonctionnalités
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-black/40">
                  <Check className="size-3.5 text-green-accent-dark" strokeWidth={2.5} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full max-w-[640px] justify-self-center lg:ml-auto lg:mr-[-48px] lg:max-w-[773px] xl:ml-0 xl:mr-0 xl:w-[773px] xl:max-w-none xl:justify-self-start">
            <Image
              src="/hero-dashboard.png"
              alt="Une professionnelle du marketing souriante, ordinateur portable à la main, prête à piloter ses campagnes avec KIYANZA"
              width={1285}
              height={1024}
              className="relative h-auto w-full object-contain"
              priority
            />

            <FloatingStat
              label="Conversions"
              value="+28%"
              valueClassName="text-green-accent"
              className="left-[21%] top-[12%]"
            />
            <FloatingStat label="Répartition du budget" className="left-[70%] top-[11%]">
              <p className="text-[11px] font-semibold leading-[16.5px] text-black">WhatsApp 60%</p>
              <p className="text-[11px] font-semibold leading-[16.5px] text-black">Facebook 40%</p>
            </FloatingStat>
            <FloatingStat
              label="ROI"
              value="320%"
              valueClassName="text-orange-500"
              className="left-[12%] top-[41%]"
            />
            <FloatingStat label="Meilleure audience" className="left-[75%] top-[35%]">
              <p className="text-[11px] font-semibold leading-[16.5px] text-black">25 – 45 ans</p>
            </FloatingStat>
          </div>
        </div>
      </Container>
    </section>
  );
}
