import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Lightbulb,
  Megaphone,
  PlayCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const trustItems = [
  "IA avancée",
  "Données en temps réel",
  "Recommandations personnalisées",
];

function FloatingBadge({
  icon,
  className = "",
  ringClassName = "",
}: {
  icon: React.ReactNode;
  className?: string;
  ringClassName?: string;
}) {
  return (
    <div
      className={`absolute hidden size-[71px] items-center justify-center rounded-full bg-white shadow-[0_4px_16px_-2px_rgba(249,115,22,0.15)] sm:flex ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex size-[53px] items-center justify-center rounded-full bg-white shadow-[0_4px_14px_-2px_rgba(22,163,74,0.12)] ${ringClassName}`}
      >
        {icon}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_12px_32px_-8px_rgba(13,31,60,0.25)] ring-1 ring-black/5 backdrop-blur-sm sm:flex ${className}`}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f5e9]">
        {icon}
      </div>
      <div className="leading-tight">
        <p className="text-[11px] font-medium text-gray-text">{label}</p>
        <p className="text-sm font-extrabold text-navy">{value}</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0fdf4] via-white to-[#eff6ff]">
      <div
        className="pointer-events-none absolute -left-40 -top-40 size-96 rounded-full bg-green-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/3 size-80 rounded-full bg-cyan-500/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-16 lg:py-20">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-gradient-to-r from-[#3b82f6] to-sky-400 px-4 py-2 text-xs font-semibold text-white shadow-sm">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Découvrez l&apos;intelligence de KIYANZA
            <span className="ml-1 rounded-full bg-green-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
              Nouveau
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-black sm:text-6xl">
              Pilotez vos campagnes.
              <br />
              <span className="bg-gradient-to-r from-green-accent-dark to-cyan-500 bg-clip-text text-transparent">
                Laissez l&apos;IA vous guider.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-gray-text">
              KIYANZA analyse vos données marketing, simule vos stratégies et
              vous recommande les meilleures actions pour améliorer vos
              résultats — plus rapidement.
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

            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-b border-border-light pb-4">
              {trustItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-gray-text"
                >
                  <CheckCircle2
                    className="size-3.5 text-green-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-full w-full">
            {/* Organic gradient backdrop — stretches to match the text column's height */}
            <div
              className="absolute inset-0 -z-10 rounded-[48%_52%_54%_46%/50%_45%_55%_50%] bg-gradient-to-br from-[#d5f5e1] via-[#e3f8ee] to-[#dbeafe] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
              aria-hidden="true"
            />
            {/* Ground shadow anchored to the true bottom of the backdrop */}
            <div
              className="absolute bottom-[6%] left-1/2 h-10 w-3/5 -translate-x-1/2 rounded-full bg-navy/15 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative mx-auto w-full max-w-[600px] px-4 pt-6 sm:px-8">
              <Image
                src="/hero-photo.png"
                alt="Une professionnelle du marketing souriante, ordinateur portable à la main, prête à piloter ses campagnes avec KIYANZA"
                width={1536}
                height={1024}
                className="relative h-auto w-full object-contain mix-blend-multiply"
                priority
              />

              <StatCard
                icon={<Sparkles className="size-4 text-blue-500" aria-hidden="true" />}
                label="Recommandations IA"
                value="Temps réel"
                className="-right-4 top-10 sm:right-0"
              />

              <FloatingBadge
                icon={<Lightbulb className="size-5 text-orange-accent" aria-hidden="true" />}
                className="-left-2 top-2"
              />
              <FloatingBadge
                icon={<Megaphone className="size-5 text-blue-500" aria-hidden="true" />}
                className="-right-2 bottom-6"
              />
              <div
                className="absolute -top-4 left-[38%] hidden size-[62px] items-center justify-center rounded-full bg-white shadow-[0_4px_16px_-2px_rgba(249,115,22,0.15)] sm:flex"
                aria-hidden="true"
              >
                <div className="relative flex size-[46px] items-center justify-center rounded-full bg-white shadow-[0_4px_14px_-2px_rgba(22,163,74,0.12)]">
                  <Cloud className="size-4 text-green-600" aria-hidden="true" />
                  <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                </div>
              </div>
            </div>

            {/* Anchored lower in the backdrop to balance the composition against the text column's full height */}
            <StatCard
              icon={<TrendingUp className="size-4 text-green-600" aria-hidden="true" />}
              label="Croissance ROI"
              value="+320%"
              className="bottom-[14%] left-[4%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
