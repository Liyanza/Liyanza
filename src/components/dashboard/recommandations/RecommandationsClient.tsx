"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Lightbulb, Sparkles } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import {
  apiGenerateRecommendations,
  apiListCampagnes,
  apiListRecommendations,
  ApiError,
} from "@/lib/api/client";
import type { CampagneRecord, CampaignRecommendation } from "@/lib/api/types";

const PRIORITY_META: Record<string, { label: string; className: string }> = {
  high: { label: "Priorité haute", className: "bg-red-600/10 text-red-600" },
  medium: { label: "Priorité moyenne", className: "bg-orange-500/10 text-orange-500" },
  low: { label: "Priorité basse", className: "bg-slate-100 text-slate-500" },
};

function priorityMeta(priority: string) {
  return PRIORITY_META[priority.toLowerCase()] ?? { label: priority, className: "bg-slate-100 text-slate-500" };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function RecommandationsClient() {
  const [campaigns, setCampaigns] = useState<CampagneRecord[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [campaignsError, setCampaignsError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  const [recommendations, setRecommendations] = useState<CampaignRecommendation[]>([]);
  const [recoLoading, setRecoLoading] = useState(false);
  const [recoError, setRecoError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    apiListCampagnes({ limit: 100 }).then(
      (result) => {
        setCampaigns(result.items);
        setCampaignsLoading(false);
      },
      (error: unknown) => {
        setCampaignsError(error instanceof ApiError ? error.message : "Impossible de charger vos campagnes.");
        setCampaignsLoading(false);
      }
    );
  }, []);

  const fetchRecommendations = useCallback((campaignId: string) => {
    setRecoLoading(true);
    setRecoError(null);
    return apiListRecommendations(campaignId).then(
      (result) => {
        setRecommendations(result);
        setRecoLoading(false);
      },
      (error: unknown) => {
        setRecoError(error instanceof ApiError ? error.message : "Impossible de charger les recommandations.");
        setRecoLoading(false);
      }
    );
  }, []);

  function handleSelect(campaignId: string) {
    setSelectedId(campaignId);
    setRecommendations([]);
    if (campaignId) void fetchRecommendations(campaignId);
  }

  function handleGenerate() {
    if (!selectedId) return;
    setGenerating(true);
    setRecoError(null);
    apiGenerateRecommendations(selectedId)
      .then(() => fetchRecommendations(selectedId))
      .catch((error: unknown) => {
        setRecoError(error instanceof ApiError ? error.message : "Impossible de générer des recommandations.");
      })
      .finally(() => setGenerating(false));
  }

  const selectedCampaign = campaigns.find((c) => c.id === selectedId);

  return (
    <>
      <TopBar title="Recommandations IA" />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[860px] flex-col gap-6 px-8 py-6">
          <div>
            <h1 className="text-lg font-bold text-dash-heading">Recommandations IA</h1>
            <p className="mt-1 text-sm text-dash-muted">
              Choisissez une campagne pour voir ou générer des recommandations personnalisées.
            </p>
          </div>

          {campaignsError && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{campaignsError}</p>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">Campagne</span>
            <span className="relative">
              <select
                value={selectedId}
                onChange={(event) => handleSelect(event.target.value)}
                disabled={campaignsLoading}
                className="w-full appearance-none rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-dash-heading outline-none disabled:opacity-50"
              >
                <option value="">
                  {campaignsLoading ? "Chargement des campagnes..." : "Sélectionnez une campagne"}
                </option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name} ({campaign.type})
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-dash-muted" aria-hidden="true" />
            </span>
          </label>

          {!campaignsLoading && !campaignsError && campaigns.length === 0 && (
            <p className="rounded-xl border border-border-light bg-white p-6 text-center text-sm text-dash-muted">
              Vous n&apos;avez pas encore de campagne. Créez-en une pour recevoir des recommandations.
            </p>
          )}

          {selectedId && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-dash-heading">
                  Recommandations pour {selectedCampaign?.name}
                </h2>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex items-center gap-2 rounded-full bg-green-accent px-5 py-2.5 text-xs font-semibold text-white disabled:opacity-50"
                >
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {generating ? "Génération..." : "Générer des recommandations"}
                </button>
              </div>

              {recoError && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{recoError}</p>
              )}

              {recoLoading ? (
                <p className="text-sm text-dash-muted">Chargement...</p>
              ) : recommendations.length === 0 ? (
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-border-light bg-white p-10 text-center">
                  <span className="flex size-10 items-center justify-center rounded-full bg-dash-pill-bg">
                    <Lightbulb className="size-5 text-dash-muted" aria-hidden="true" />
                  </span>
                  <p className="text-sm text-dash-muted">
                    Aucune recommandation pour cette campagne. Générez-en avec le bouton ci-dessus.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {recommendations.map((reco) => {
                    const meta = priorityMeta(reco.priority);
                    return (
                      <div key={reco.id} className="rounded-2xl border border-border bg-white p-5">
                        <div className="flex items-start justify-between gap-3">
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.className}`}>
                            {meta.label}
                          </span>
                          <span className="shrink-0 text-[11px] text-dash-muted">{formatDate(reco.generatedAt)}</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-dash-body">{reco.content}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
