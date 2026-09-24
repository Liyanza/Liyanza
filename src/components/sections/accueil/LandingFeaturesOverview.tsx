import { ReactNode } from "react";
import { FileBarChart, Megaphone, Radar, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { getMessages } from "@/i18n/server";

/** Icônes dans l'ordre des fonctionnalités du dictionnaire (home.overview.features). */
const icons: ReactNode[] = [
  <Megaphone key="campaigns" className="size-5 text-green-accent-dark" aria-hidden="true" />,
  <Sparkles key="ai" className="size-5 text-green-accent-dark" aria-hidden="true" />,
  <Radar key="monitoring" className="size-5 text-green-accent-dark" aria-hidden="true" />,
  <FileBarChart key="reports" className="size-5 text-green-accent-dark" aria-hidden="true" />,
  <TrendingUp key="roas" className="size-5 text-green-accent-dark" aria-hidden="true" />,
  <ShieldCheck key="security" className="size-5 text-green-accent-dark" aria-hidden="true" />,
];

export async function LandingFeaturesOverview() {
  const t = (await getMessages("home")).overview;

  return (
    <section id="fonctionnalites" className="scroll-pt-20 bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <SectionEyebrow variant="pill" tone="orange">
            {t.eyebrow}
          </SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black leading-tight text-zinc-950 sm:text-4xl lg:text-5xl">
            {t.titleStart} <br className="hidden lg:inline" />
            {t.titleEnd}
          </h2>
          <p className="mt-4 text-lg text-gray-text">
            {t.text}
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature, i) => (
            <div
              key={feature.title}
              data-reveal-item
              className="rounded-[5px] border border-zinc-200 bg-white p-7"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-green-accent-dark/[0.08]">
                {icons[i]}
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
