import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { resourceId } from "@/data/resources";
import { getMessages } from "@/i18n/server";
import { fill } from "@/i18n/format";


export async function VideosSection() {
  const t = (await getMessages("resources")).videos;

  return (
    <section className="border-t border-[#e4e4e7] bg-[#fafafa] py-20">
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
            className="flex items-center gap-2 rounded-full border border-[#e4e4e7] px-5 py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-white"
          >
            {t.seeAll}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </Reveal>

        <Reveal stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((video) => (
            <div key={video.title} id={resourceId(video.title)} data-reveal-item className="scroll-mt-24 rounded-[5px] border border-[#e4e4e7] bg-white">
              <div className="relative flex h-[140px] items-center justify-center rounded-t-[5px] bg-[#18181b]">
                <button
                  type="button"
                  aria-label={fill(t.play, { title: video.title })}
                  className="flex size-12 items-center justify-center rounded-[5px] border border-white/20 bg-green-accent-dark transition hover:brightness-105"
                >
                  <Play className="size-4 fill-white text-white" aria-hidden="true" />
                </button>
                <span className="absolute bottom-3 right-3 bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-black">{video.title}</h3>
                <p className="mt-2 text-xs text-[#a1a1aa]">{video.views}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
