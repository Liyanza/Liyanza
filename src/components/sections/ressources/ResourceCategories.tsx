import { ArrowRight, BookOpen, FileText, HelpCircle, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";

const categories = [
  {
    number: "01",
    icon: HelpCircle,
    title: "Centre d'aide",
    description: "Obtenez rapidement des réponses à vos questions les plus fréquentes.",
    cta: "Consulter",
  },
  {
    number: "02",
    icon: FileText,
    title: "Documentation",
    description: "Découvrez en détail toutes les fonctionnalités de KIYANZA.",
    cta: "Lire la doc",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Guides & Tutoriels",
    description: "Apprenez à mieux piloter vos campagnes pas à pas.",
    cta: "Voir les guides",
  },
  {
    number: "04",
    icon: PlayCircle,
    title: "Vidéos",
    description: "Regardez des démonstrations et tutoriels en quelques minutes.",
    cta: "Regarder",
  },
];

export function ResourceCategories() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Accès rapide
          </span>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            Trouvez ce dont vous avez besoin
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.number} className="border border-[#e4e4e7] p-7">
              <span className="text-[10px] font-black tracking-widest text-[#e4e4e7]">
                {cat.number}
              </span>
              <div className="mt-5 flex size-10 items-center justify-center rounded-full border border-green-accent-dark bg-green-accent">
                <cat.icon className="size-5 text-white" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-base font-bold text-black">{cat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#71717a]">
                {cat.description}
              </p>
              <button
                type="button"
                className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-green-accent-dark"
              >
                {cat.cta}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
