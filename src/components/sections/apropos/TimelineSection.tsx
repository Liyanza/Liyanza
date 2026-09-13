import { Container } from "@/components/ui/Container";

const milestones = [
  {
    year: "2026",
    title: "L'idée naît",
    description:
      "Face à la fragmentation des outils marketing, l'idée d'une plateforme unifiée prend forme lors de la participation à l'Orange Summer Challenge 2026.",
  },
  {
    year: "2026",
    title: "Premiers prototypes",
    description: "Les premières maquettes voient le jour.",
  },
  {
    year: "202x",
    title: "Version bêta",
    description: "KIYANZA est lancé en accès anticipé.",
  },
  {
    year: "202x",
    title: "IA intégrée",
    description:
      "Les scénarios IA et recommandations automatiques révolutionnent l'expérience. Le produit atteint 300 équipes actives.",
  },
  {
    year: "202x",
    title: "Aujourd'hui",
    description:
      "KIYANZA s'impose comme la référence du pilotage marketing intelligent pour les équipes africaines et diaspora.",
  },
];

function MilestoneCard({
  year,
  title,
  description,
  align,
}: {
  year: string;
  title: string;
  description: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={`rounded-xl border border-border-light bg-white p-6 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.07)] ${
        align === "left" ? "text-right" : "text-left"
      }`}
    >
      <p className="text-xl font-black text-orange-500">{year}</p>
      <h3 className="mt-1 text-base font-bold text-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-text">
        {description}
      </p>
    </div>
  );
}

export function TimelineSection() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Notre histoire
          </span>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            De l&apos;idée à la plateforme
          </h2>
          <p className="mt-3 text-base text-gray-text">
            Un chemin guidé par les besoins réels des équipes marketing
            africaines.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-orange-200 sm:block"
            aria-hidden="true"
          />
          <div className="space-y-10">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={milestone.title}
                  className="relative grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]"
                >
                  <div className="hidden sm:block">
                    {isLeft && <MilestoneCard {...milestone} align="left" />}
                  </div>
                  <span
                    className="hidden size-3.5 shrink-0 rounded-full border-2 border-white bg-orange-500 shadow sm:block"
                    aria-hidden="true"
                  />
                  <div className="hidden sm:block">
                    {!isLeft && <MilestoneCard {...milestone} align="right" />}
                  </div>
                  <div className="sm:hidden">
                    <MilestoneCard {...milestone} align="right" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
