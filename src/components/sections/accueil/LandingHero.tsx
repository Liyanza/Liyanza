import { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/Badge";

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
      className={`absolute hidden flex-col gap-1 whitespace-nowrap rounded-xl border border-zinc-100 bg-white px-3 py-2 shadow-[0_4px_16px_-2px_rgba(13,31,60,0.15)] sm:flex ${className}`}
    >
      <p className="text-[10px] text-gray-text-light">{label}</p>
      {children ?? <p className={`text-sm font-bold ${valueClassName}`}>{value}</p>}
    </div>
  );
}

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-green-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/3 size-80 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-6">
          <div>
            <SectionEyebrow variant="pill" tone="orange">
              Plateforme marketing intelligente
            </SectionEyebrow>

            <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              Pilotez vos campagnes avec{" "}
              <span className="text-orange-500">l&apos;intelligence artificielle</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-text">
              KIYANZA centralise la création, le monitoring et l&apos;optimisation de
              vos campagnes marketing grâce à l&apos;IA.
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

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-gray-text">
                  <CheckCircle2 className="size-3.5 text-green-accent-dark" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full max-w-[640px] justify-self-center lg:ml-auto lg:mr-[-48px] lg:max-w-[720px] xl:mr-[-96px]">
            <Image
              src="/hero-dashboard.png"
              alt="Une professionnelle du marketing souriante, ordinateur portable à la main, prête à piloter ses campagnes avec KIYANZA"
              width={1546}
              height={1232}
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
              <p className="text-[11px] font-semibold text-zinc-950">WhatsApp 60%</p>
              <p className="text-[11px] font-semibold text-zinc-950">Facebook 40%</p>
            </FloatingStat>
            <FloatingStat
              label="ROI"
              value="320%"
              valueClassName="text-orange-500"
              className="left-[12%] top-[41%]"
            />
            <FloatingStat
              label="Meilleure audience"
              value="25 – 45 ans"
              className="left-[75%] top-[35%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
