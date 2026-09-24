import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { resourceId } from "@/data/resources";
import { getMessages } from "@/i18n/server";


export async function ArticlesSection() {
  const t = (await getMessages("resources")).articles;
  const { featured: featuredArticle, items: articles } = t;

  return (
    <section className="bg-white py-20">
      <Container>
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
              {t.title}
            </h2>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-[#e4e4e7] px-5 py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa]"
          >
            {t.seeAll}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </Reveal>

        <Reveal stagger className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <div
            id={resourceId(featuredArticle.title)}
            data-reveal-item
            className="scroll-mt-24 rounded-[5px] border border-[#e4e4e7] lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="relative flex h-[200px] items-center justify-center bg-green-accent-dark">
              <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
                {t.featuredBadge}
              </span>
              <span className="text-5xl font-black text-white/10">BLOG</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-500">
                  {featuredArticle.tag}
                </span>
                <span className="text-xs text-[#a1a1aa]">{featuredArticle.readingTime}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug text-black">
                {featuredArticle.title}
              </h3>
              <div className="mt-4 flex items-center justify-between border-t border-[#f4f4f5] pt-4">
                <span className="text-xs text-[#a1a1aa]">{featuredArticle.date}</span>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-semibold text-green-accent-dark"
                >
                  {t.read}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {articles.map((article, i) => (
            <div
              key={article.title}
              id={resourceId(article.title)}
              data-reveal-item
              className={`scroll-mt-24 rounded-[5px] border border-[#e4e4e7] p-5 ${
                i === 0
                  ? "lg:col-start-2 lg:row-start-1"
                  : i === 1
                    ? "lg:col-start-3 lg:row-start-1"
                    : "lg:col-start-2 lg:row-start-2"
              }`}
            >
              <span className="rounded-full border border-[#e4e4e7] bg-[#f4f4f5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#52525b]">
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
        </Reveal>
      </Container>
    </section>
  );
}
