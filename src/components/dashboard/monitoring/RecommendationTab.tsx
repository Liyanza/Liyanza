"use client";

import { useEffect, useState } from "react";
import { Lightbulb, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiGenerateRecommendations, apiListRecommendations, ApiError } from "@/lib/api/client";
import type { CampaignRecommendation } from "@/lib/api/types";
import { RecommendationCard } from "@/components/dashboard/recommandations/RecommendationCard";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useT } from "@/i18n/client";

/** Conseils de l'IA pour la campagne radio : diffusions, conformité, créneaux. */
export function RecommendationTab({ campaignId }: { campaignId: string }) {
  const ti = useT("dashInsights");
  const t = ti.recommendations;
  const { user } = useAuth();
  const canUse = user?.role === "ADMIN" || user?.role === "MARKETING_MANAGER";
  const [items, setItems] = useState<CampaignRecommendation[] | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canUse) return;
    let active = true;
    apiListRecommendations(campaignId).then(
      (result) => active && setItems(result),
      (err: unknown) => active && (setItems([]), setError(err instanceof ApiError ? err.message : t.loadError))
    );
    return () => {
      active = false;
    };
  }, [campaignId, canUse, t.loadError]);

  function generate() {
    setGenerating(true);
    setError(null);
    apiGenerateRecommendations(campaignId)
      .then((result) => setItems(result))
      .catch((err: unknown) => setError(err instanceof ApiError ? err.message : t.generateError))
      .finally(() => setGenerating(false));
  }

  if (!canUse) {
    return <p className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-dash-muted">{ti.monitoring.restricted}</p>;
  }
  if (items === null) return <SkeletonRows rows={3} label={t.loading} />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-xs text-dash-muted">{ti.monitoring.recommendationIntro}</p>
        <button
          type="button"
          onClick={generate}
          disabled={generating}
          className="flex items-center gap-2 rounded-full bg-green-accent px-5 py-2.5 text-xs font-semibold text-white disabled:opacity-50"
        >
          {generating ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          ) : items.length > 0 ? (
            <RefreshCw className="size-3.5" aria-hidden="true" />
          ) : (
            <Sparkles className="size-3.5" aria-hidden="true" />
          )}
          {generating ? ti.generating : items.length > 0 ? t.regenerate : ti.generate}
        </button>
      </div>
      {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{error}</p>}
      {generating ? (
        <div role="status" className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 text-center text-sm text-dash-body">
          {t.thinking}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border-light bg-white p-10 text-center">
          <Lightbulb className="size-6 text-dash-muted" aria-hidden="true" />
          <p className="text-sm text-dash-muted">{t.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {items.map((reco) => (
            <RecommendationCard key={reco.id} recommendation={reco} />
          ))}
        </div>
      )}
    </div>
  );
}
