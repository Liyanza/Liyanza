import { ArrowRight, BookOpen, FileText, HelpCircle, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { getMessages } from "@/i18n/server";

/** Icônes des catégories, dans l'ordre de resources.categories.items. */
const categoryIcons = [HelpCircle, FileText, BookOpen, PlayCircle];

export async function ResourceCategories() {
  const t = (await getMessages("resources")).categories;
  const categories = t.items.map((item, i) => ({ ...item, icon: categoryIcons[i], number: String(i + 1).padStart(2, "0") }));

  return (
    <section className="bg-white py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            {t.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.number} data-reveal-item className="rounded-[5px] border border-[#e4e4e7] p-7">
              <span className="text-[10px] font-black tracking-widest text-[#e4e4e7]">
                {cat.number}
              </span>
              <div className="mt-5 flex size-10 items-center justify-center rounded-full border border-green-accent-dark/20 bg-green-accent/[0.08]">
                <cat.icon className="size-5 text-green-accent-dark" aria-hidden="true" />
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
        </Reveal>
      </Container>
    </section>
  );
}
