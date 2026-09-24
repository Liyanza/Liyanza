import { ArrowRight, BarChart3, Cloud, Download, Play, Sparkles, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { PinnedSteps } from "@/components/motion/PinnedSteps";
import { Reveal } from "@/components/motion/Reveal";
import { getMessages } from "@/i18n/server";

/** Icônes des étapes, dans l'ordre de features.process.steps. */
const stepIcons = [BarChart3, Sparkles, Play, Cloud, TrendingUp, Download];

export async function ProcessSteps() {
  const t = (await getMessages("features")).process;
  const steps = t.steps.map((label, i) => ({ label, icon: stepIcons[i] }));

  return (
    <PinnedSteps className="bg-white py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-extrabold text-black">
            {t.titleLines[0]}
            <br />
            {t.titleLines[1]}
          </h2>
          <p className="mt-3 text-sm text-gray-text">
            {t.text}
          </p>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-start justify-center gap-x-2 gap-y-10">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-start">
              <div data-step className="flex w-20 flex-col items-center gap-2.5">
                <span className="relative flex size-14 items-center justify-center rounded-full border-4 border-green-accent/40 bg-green-accent/20 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]">
                  <step.icon className="size-6 text-green-accent-dark" aria-hidden="true" />
                  <span
                    data-step-pulse
                    className="absolute -inset-1 rounded-full border-2 border-green-accent opacity-0"
                    aria-hidden="true"
                  />
                </span>
                <p className="text-xs font-bold text-navy">{step.label}</p>
              </div>
              {i < steps.length - 1 && (
                <span data-step-link className="mt-7 inline-flex shrink-0">
                  <ArrowRight className="size-4 text-gray-text-light" aria-hidden="true" />
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </PinnedSteps>
  );
}
