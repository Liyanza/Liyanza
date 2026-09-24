"use client";

import { Link } from "@/i18n/navigation";
import { useCallback, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { resourceId } from "@/data/resources";
import { useT } from "@/i18n/client";
import { useResourceFocus } from "@/lib/resources-search";

const filters = ["all", "guide", "tutorial", "video", "faq"] as const;

const levelStyles = {
  beginner: "bg-blue-500/10 text-blue-500",
  intermediate: "bg-orange-500/10 text-orange-500",
  advanced: "bg-red-500/10 text-red-600",
};

export function GuidesSection() {
  const t = useT("resources").guides;
  const guides = t.items;
  const [active, setActive] = useState<(typeof filters)[number]>("all");

  // Un résultat de recherche vise un guide masqué par le filtre : on repasse sur « Tous ».
  useResourceFocus(
    useCallback((id: string) => {
      if (guides.some((g) => resourceId(g.title) === id)) setActive("all");
    }, [guides]),
  );

  const visible =
    active === "all" ? guides : guides.filter((g) => g.type === active);

  return (
    <section className="border-t border-[#e4e4e7] bg-blue-500/[0.09] py-20">
      <Container>
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
              {t.title}
            </h2>
          </div>
          <Link
            href="/inscription"
            className="flex items-center gap-2 rounded-full border border-[#e4e4e7] px-5 py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-white"
          >
            {t.seeAll}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = active === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "border border-[#e4e4e7] bg-white text-[#52525b] hover:bg-[#f4f4f5]"
                }`}
              >
                {t.filters[filter]}
              </button>
            );
          })}
        </div>

        <Reveal stagger className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((guide) => (
            <div
              key={guide.title}
              id={resourceId(guide.title)}
              data-reveal-item
              className="flex scroll-mt-24 flex-col rounded-[5px] border border-[#e4e4e7] bg-white p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-[#e4e4e7] bg-[#f4f4f5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#52525b]">
                  {t.filters[guide.type]}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-bold tracking-wide ${levelStyles[guide.level]}`}
                >
                  {t.levels[guide.level]}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold text-black">{guide.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#71717a]">
                {guide.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-[#f4f4f5] pt-4">
                <span className="flex items-center gap-1.5 text-xs text-[#a1a1aa]">
                  <Clock className="size-3" aria-hidden="true" />
                  {guide.readingTime}
                </span>
                <Link
                  href="/inscription"
                  className="flex items-center gap-1 text-xs font-semibold text-green-accent-dark"
                >
                  {t.read}
                  <ArrowRight className="size-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-[#71717a]">
              {t.empty}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
