import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const articles = [
  {
    tag: "IA & Marketing",
    title: "Comment l'IA transforme la gestion des campagnes marketing",
    date: "28 août 2026",
    readingTime: "8 min",
  },
  {
    tag: "Cas d'usage",
    title: "Comment une PME camerounaise a doublé son ROI en 3 mois",
    date: "20 août 2026",
    readingTime: "5 min",
  },
  {
    tag: "Stratégie",
    title: "Budget marketing : les indicateurs clés à suivre chaque semaine",
    date: "15 août 2026",
    readingTime: "7 min",
  },
];

export function ArticlesSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              Blog
            </span>
            <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
              Derniers articles &amp; conseils
            </h2>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-[#e4e4e7] px-5 py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa]"
          >
            Voir tous les articles
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border border-[#e4e4e7]">
            <div className="relative flex h-[200px] items-center justify-center bg-[#18181b]">
              <span className="absolute left-4 top-4 bg-orange-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
                À la une
              </span>
              <span className="text-5xl font-black text-white/10">BLOG</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-[#f4f4f5] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#52525b]">
                  Stratégie
                </span>
                <span className="text-xs text-[#a1a1aa]">6 min de lecture</span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug text-black">
                5 erreurs à éviter dans vos campagnes Facebook Ads en Afrique
              </h3>
              <div className="mt-4 flex items-center justify-between border-t border-[#f4f4f5] pt-4">
                <span className="text-xs text-[#a1a1aa]">3 sept. 2026</span>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-semibold text-green-accent-dark"
                >
                  Lire
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {articles.map((article) => (
              <div
                key={article.title}
                className="border border-[#e4e4e7] p-5"
              >
                <span className="rounded-md bg-[#f4f4f5] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#52525b]">
                  {article.tag}
                </span>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-black">
                  {article.title}
                </h3>
                <div className="mt-3 flex items-center gap-3 text-xs text-[#a1a1aa]">
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
