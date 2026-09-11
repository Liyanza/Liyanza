import Image from "next/image";
import { Database, LineChart, Lightbulb, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { InfoCard } from "@/components/ui/InfoCard";

export function IntelligenceSection() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div
              className="absolute inset-0 rounded-full border border-black/5"
              aria-hidden="true"
            />
            <div
              className="absolute inset-10 rounded-full border border-black/5"
              aria-hidden="true"
            />
            <div
              className="absolute inset-16 rounded-full bg-gradient-to-br from-green-accent/25 via-teal-100/40 to-cyan-100/60 opacity-70"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/kiyanza-logo-mark.svg"
                alt=""
                width={90}
                height={60}
                aria-hidden="true"
              />
            </div>

            <StatCard label="Répartition du budget" className="left-[2%] top-[52%]">
              <p>WhatsApp 60%</p>
              <p>Facebook 40%</p>
            </StatCard>
            <StatCard label="Conversions" className="left-[22%] top-[8%]">
              <span className="text-green-accent">+28%</span>
            </StatCard>
            <StatCard label="ROI" className="right-[8%] top-[16%]">
              <span className="text-orange-500">320%</span>
            </StatCard>
            <StatCard label="Meilleure audience" className="right-0 top-[38%]">
              25 – 45 ans
            </StatCard>
          </div>

          <div>
            <SectionEyebrow variant="plain" className="text-green-accent-dark">
              L&apos;Intelligence KIYANZA
            </SectionEyebrow>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              Plus qu&apos;un outil,
              <br />
              un véritable copilote
            </h2>
            <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-gray-text">
              KIYANZA combine la puissance de l&apos;IA et la richesse de vos
              données marketing pour vous offrir des recommandations
              précises, pertinentes et actionnables.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard
                icon={<Database className="size-4 text-white" aria-hidden="true" />}
                iconBg="bg-green-accent"
                title="Vos données"
                description="Centralisez toutes vos données marketing."
              />
              <InfoCard
                icon={<LineChart className="size-4 text-white" aria-hidden="true" />}
                iconBg="bg-[#3b82f6]"
                title="Analyse IA"
                description="Identifie les opportunités et les tendances."
              />
              <InfoCard
                icon={<Lightbulb className="size-4 text-white" aria-hidden="true" />}
                iconBg="bg-orange-500"
                title="Recommandations"
                titleColor="text-navy"
                description="Recevez des conseils personnalisés."
              />
              <InfoCard
                icon={<Zap className="size-4 text-white" aria-hidden="true" />}
                iconBg="bg-violet-500"
                title="Décisions"
                titleColor="text-navy"
                description="Prenez de meilleures décisions, plus vite."
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
