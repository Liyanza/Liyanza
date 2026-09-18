import { Lightbulb, Sparkles } from "lucide-react";

/**
 * L'assistant IA (module `assistant-ia`) n'est pas encore branché côté
 * dashboard — ce panneau affichait jusqu'ici 2 recommandations 100%
 * fictives. En attendant la vraie page (voir nav "Recommandations IA"),
 * on grise plutôt que d'inventer du contenu, même pattern que les canaux
 * non supportés du wizard (StepChannels : opacity-50 + pastille "Bientôt
 * disponible").
 */
export function AiRecommendations() {
  return (
    <div className="flex h-full flex-col rounded-[5px] border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-black">
          <Sparkles className="size-4 text-blue-500" aria-hidden="true" />
          Recommandations IA
        </h2>
        <span className="rounded-full bg-dash-pill-bg px-2.5 py-1 text-[11px] font-semibold text-dash-muted">
          Bientôt disponible
        </span>
      </div>
      <p className="mt-0.5 text-[11px] text-gray-text">KIYANZA analysera bientôt vos données en continu.</p>

      <div className="mt-4 flex flex-1 items-center justify-center opacity-50">
        <div className="w-full rounded-xl border border-dashed border-border-light bg-slate-50 p-6 text-center">
          <Lightbulb className="mx-auto size-6 text-gray-text-light" aria-hidden="true" />
          <p className="mt-2 text-xs font-semibold text-gray-text">Aucune recommandation pour l&apos;instant</p>
        </div>
      </div>
    </div>
  );
}
