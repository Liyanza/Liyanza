import { ArrowRight, BarChart3, Cloud, Download, Play, Sparkles, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";

const steps = [
  { icon: BarChart3, label: "Créer" },
  { icon: Sparkles, label: "Simuler" },
  { icon: Play, label: "Lancer" },
  { icon: Cloud, label: "Monitorer" },
  { icon: TrendingUp, label: "Optimiser" },
  { icon: Download, label: "Exporter" },
];

export function ProcessSteps() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill" tone="orange">Comment ça marche ?</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-extrabold text-black">
            Un seul parcours pour piloter
            <br />
            vos campagnes
          </h2>
          <p className="mt-3 text-sm text-gray-text">
            Un flux simple et intégré, du paramétrage jusqu&apos;au rapport
            final.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-start justify-center gap-x-2 gap-y-10">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-start">
              <div className="flex w-20 flex-col items-center gap-2.5">
                <span className="flex size-14 items-center justify-center rounded-full border-4 border-green-accent/40 bg-green-accent/20 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]">
                  <step.icon className="size-6 text-green-accent-dark" aria-hidden="true" />
                </span>
                <p className="text-xs font-bold text-navy">{step.label}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight
                  className="mt-7 size-4 shrink-0 text-gray-text-light sm:mt-7"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
