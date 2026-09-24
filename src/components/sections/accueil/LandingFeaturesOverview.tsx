import { ReactNode } from "react";
import { FileBarChart, Megaphone, Radar, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Megaphone className="size-5 text-green-accent-dark" aria-hidden="true" />,
    title: "Gestion des campagnes",
    description:
      "Planifiez, lancez et gérez toutes vos campagnes depuis un tableau de bord centralisé.",
  },
  {
    icon: <Sparkles className="size-5 text-green-accent-dark" aria-hidden="true" />,
    title: "Scénarios & Recommandations IA",
    description:
      "Comparez des scénarios générés par l'IA et recevez des recommandations d'optimisation.",
  },
  {
    icon: <Radar className="size-5 text-green-accent-dark" aria-hidden="true" />,
    title: "Monitoring en temps réel",
    description:
      "Suivez vos KPI en continu. Recevez des alertes automatiques quand une campagne nécessite votre attention.",
  },
  {
    icon: <FileBarChart className="size-5 text-green-accent-dark" aria-hidden="true" />,
    title: "Rapports avancés",
    description:
      "Générez des rapports de performance complets en quelques secondes. Exportez et partagez-les facilement.",
  },
  {
    icon: <TrendingUp className="size-5 text-green-accent-dark" aria-hidden="true" />,
    title: "Optimisation du ROAS",
    description:
      "Identifiez les canaux les plus rentables et réallouez votre budget automatiquement pour maximiser vos résultats.",
  },
  {
    icon: <ShieldCheck className="size-5 text-green-accent-dark" aria-hidden="true" />,
    title: "Données sécurisées",
    description:
      "Vos données marketing sont chiffrées et hébergées de manière sécurisée. Vous conservez le contrôle total.",
  },
];

export function LandingFeaturesOverview() {
  return (
    <section id="fonctionnalites" className="scroll-pt-20 bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <SectionEyebrow variant="pill" tone="orange">
            Fonctionnalités
          </SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black leading-tight text-zinc-950 sm:text-4xl lg:text-5xl">
            Tout ce dont vous avez besoin <br className="hidden lg:inline" />
            pour piloter vos campagnes.
          </h2>
          <p className="mt-4 text-lg text-gray-text">
            De la planification à l&apos;optimisation, KIYANZA couvre l&apos;ensemble du
            cycle marketing.
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              data-reveal-item
              className="rounded-[5px] border border-zinc-200 bg-white p-7"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-green-accent-dark/[0.08]">
                {feature.icon}
              </span>
              <h3 className="mt-5 text-base font-bold text-zinc-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-text">
                {feature.description}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
