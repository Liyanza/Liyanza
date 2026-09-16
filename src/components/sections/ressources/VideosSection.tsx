import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";

const videos = [
  { title: "Présentation générale de KIYANZA", views: "1,2k vues", duration: "5:12" },
  { title: "Créer votre première campagne", views: "986 vues", duration: "8:30" },
  { title: "Dashboard & KPIs : tour d'horizon", views: "754 vues", duration: "6:45" },
];

export function VideosSection() {
  return (
    <section className="border-t border-[#e4e4e7] bg-[#fafafa] py-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <SectionEyebrow variant="pill" tone="orange">Vidéos</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
              Apprenez en regardant
            </h2>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-[#e4e4e7] px-5 py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-white"
          >
            Voir toutes les vidéos
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.title} className="rounded-[5px] border border-[#e4e4e7] bg-white">
              <div className="relative flex h-[140px] items-center justify-center rounded-t-[5px] bg-[#18181b]">
                <button
                  type="button"
                  aria-label={`Lire la vidéo ${video.title}`}
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
        </div>
      </Container>
    </section>
  );
}
