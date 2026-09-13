import { Cloud, Download, Play, Sparkles, Target, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";

const steps = [
  { icon: Target, label: "Créer", bg: "bg-green-600" },
  { icon: Sparkles, label: "Simuler", bg: "bg-blue-500" },
  { icon: Play, label: "Lancer", bg: "bg-orange-500" },
  { icon: Cloud, label: "Monitorer", bg: "bg-violet-600" },
  { icon: Zap, label: "Optimiser", bg: "bg-[#fbc92d]" },
  { icon: Download, label: "Exporter", bg: "bg-[#5489de]" },
];

export function ProcessSteps() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill">Comment ça marche ?</SectionEyebrow>
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
                <span
                  className={`flex size-14 items-center justify-center rounded-full border-4 border-border-light shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)] ${step.bg}`}
                >
                  <step.icon className="size-6 text-white" aria-hidden="true" />
                </span>
                <p className="text-xs font-bold text-navy">{step.label}</p>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="mt-7 h-px w-6 border-t-2 border-dashed border-border sm:w-10"
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
