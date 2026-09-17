import { Lightbulb, Sparkles } from "lucide-react";
import { aiRecommendations } from "@/data/dashboard";

export function AiRecommendations() {
  return (
    <div className="flex h-full flex-col rounded-[5px] border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-black">
          <Sparkles className="size-4 text-blue-500" aria-hidden="true" />
          Recommandations IA
        </h2>
        <a href="/dashboard/recommandations" className="text-xs font-semibold text-green-accent-dark">
          Voir tout
        </a>
      </div>
      <p className="mt-0.5 text-[11px] text-gray-text">KIYANZA analyse vos données en continu.</p>

      <div className="mt-4 space-y-3">
        {aiRecommendations.map((rec) => (
          <div key={rec.id} className="rounded-xl border border-border-light bg-slate-50 p-4">
            <div className="flex items-start gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                <Lightbulb className="size-3.5 text-blue-500" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-black">{rec.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-gray-text">{rec.description}</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-3 w-full rounded-full border border-green-accent-dark px-3 py-2 text-[11px] font-semibold text-green-accent-dark transition-colors hover:bg-green-accent-dark/5"
            >
              Voir la recommandation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
