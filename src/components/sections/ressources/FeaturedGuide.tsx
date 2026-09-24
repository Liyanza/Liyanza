import { BookOpen, Clock, Download, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { featuredGuide, resourceId } from "@/data/resources";


export function FeaturedGuide() {
  return (
    <section className="bg-[#f4f4f4] py-20">
      <Container>
        <Reveal id={resourceId(featuredGuide.title)} className="scroll-mt-24 grid grid-cols-1 overflow-hidden border border-black/5 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-[5px] bg-white p-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-green-accent/20">
                <BookOpen className="size-5 text-green-accent-dark" aria-hidden="true" />
              </div>
              <p className="mt-6 text-4xl font-black text-black">Guide</p>
              <p className="mt-2 text-base font-black tracking-wide text-orange-500">
                COMPLET
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-black/30">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden="true" />
                  45 min
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Tag className="size-3.5" aria-hidden="true" />
                  Stratégie
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-[5px] p-10 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Guide vedette
            </span>
            <h3 className="mt-4 text-3xl font-black leading-tight text-black">
              {featuredGuide.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-black/45">
              {featuredGuide.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredGuide.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-black/40"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-green-accent-dark px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                <Download className="size-3.5" aria-hidden="true" />
                Télécharger le guide
              </button>
              <button
                type="button"
                className="rounded-full border border-green-accent-dark px-6 py-3 text-sm font-semibold text-green-accent-dark transition hover:bg-green-accent-dark/5"
              >
                Lire en ligne
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
