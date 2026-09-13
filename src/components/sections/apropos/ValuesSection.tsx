import { Eye, Target, Users, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";

const values = [
  {
    icon: Eye,
    title: "Clarté",
    description:
      "Rendre les données lisibles par tous, sans jargon ni surcharge cognitive. La simplicité est un acte de respect envers les équipes.",
  },
  {
    icon: Zap,
    title: "Intelligence",
    description:
      "Transformer la donnée brute en recommandations actionnables. L'IA doit servir la décision humaine, pas la remplacer.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "Concentrer les efforts sur ce qui produit de vrais résultats mesurables. Chaque fonctionnalité doit justifier son existence par la valeur créée.",
  },
  {
    icon: Users,
    title: "Accessibilité",
    description:
      "Démocratiser les outils de pilotage marketing pour les équipes de toutes tailles, pas seulement les grandes entreprises.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Nos valeurs
          </span>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            Ce qui guide chaque décision
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="border border-border-light p-7">
              <div className="flex size-10 items-center justify-center rounded-lg bg-orange-500">
                <value.icon className="size-5 text-white" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-base font-bold text-black">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-text">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
