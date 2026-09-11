import {
  ArrowRight,
  Cloud,
  Lightbulb,
  LineChart,
  Play,
  Sparkles,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProcessStepCard } from "@/components/ui/ProcessStepCard";

const steps = [
  {
    icon: <Target className="size-[18px] text-green-accent-dark" aria-hidden="true" />,
    number: "01",
    numberColor: "text-green-600",
    title: "Concevoir",
    description: "Définissez vos objectifs, budgets et audiences.",
  },
  {
    icon: <Sparkles className="size-[18px] text-blue-500" aria-hidden="true" />,
    number: "02",
    numberColor: "text-blue-500",
    title: "Simuler avec l'IA",
    description: "Testez plusieurs scénarios et recevez des recommandations.",
  },
  {
    icon: <Play className="size-[18px] text-orange-accent" aria-hidden="true" />,
    number: "03",
    numberColor: "text-orange-accent",
    title: "Lancer",
    description: "Activez vos campagnes en un clic.",
  },
  {
    icon: <Cloud className="size-[18px] text-green-600" aria-hidden="true" />,
    number: "04",
    numberColor: "text-green-600",
    title: "Monitorer",
    description: "Suivez les performances en temps réel.",
  },
  {
    icon: <Lightbulb className="size-[18px] text-blue-500" aria-hidden="true" />,
    number: "05",
    numberColor: "text-blue-500",
    title: "Optimiser",
    description: "Appliquez les recommandations IA.",
  },
  {
    icon: <LineChart className="size-[18px] text-orange-500" aria-hidden="true" />,
    number: "06",
    numberColor: "text-orange-500",
    title: "Analyser",
    description: "Générez des rapports et mesurez l'impact.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr]">
          <div>
            <SectionEyebrow variant="plain" className="text-green-600">
              Un processus simple
            </SectionEyebrow>
            <h2 className="mt-3 text-3xl font-extrabold text-black sm:text-4xl">
              De l&apos;idée au résultat
            </h2>
            <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-gray-text">
              En quelques étapes, transformez vos données en campagnes
              performantes.
            </p>
            <Button
              variant="outline"
              size="sm"
              href="#fonctionnalites"
              className="mt-6 border-green-600 text-green-accent-dark"
              icon={<ArrowRight className="size-3.5" aria-hidden="true" />}
            >
              Découvrir toutes les fonctionnalités
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <ProcessStepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
