"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Lightbulb, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import {
  apiGenerateRecommendations,
  apiListCampagnes,
  apiListRecommendations,
  ApiError,
} from "@/lib/api/client";
import type { CampagneRecord, CampaignRecommendation } from "@/lib/api/types";
import { SkeletonPanel } from "@/components/dashboard/ui/Skeleton";
import { RecommendationCard } from "@/components/dashboard/recommandations/RecommendationCard";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

/**
 * Campagne ouverte par défaut : celle passée dans `?campagne=` (lien du
 * panneau de l'accueil), sinon la première en cours, sinon la plus récente.
 */
function initialCampaignId(campaigns: CampagneRecord[]) {
  let requested: string | null = null;
  try {
    requested = new URLSearchParams(window.location.search).get("campagne");
  } catch {
    // URL illisible : on retombe sur la sélection par défaut.
  }
  if (requested && campaigns.some((c) => c.id === requested)) return requested;
  return (campaigns.find((c) => c.status === "IN_PROGRESS") ?? campaigns[0])?.id ?? "";
}

export function RecommandationsClient() {
  const ti = useT("dashInsights");
  const t = ti.recommendations;
  const dash = useT("dash");
  const f = useFormat();
  const formatDate = (iso: string) => f.date(iso, { day: "numeric", month: "long", year: "numeric" });

  const [campaigns, setCampaigns] = useState<CampagneRecord[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [campaignsError, setCampaignsError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const selectedRef = useRef("");

  const [recommendations, setRecommendations] = useState<CampaignRecommendation[]>([]);
  const [recoLoading, setRecoLoading] = useState(false);
  const [recoError, setRecoError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const fetchRecommendations = useCallback((campaignId: string) => {
    setRecoLoading(true);
    setRecoError(null);
    return apiListRecommendations(campaignId).then(
      (result) => {
        setRecommendations(result);
        setRecoLoading(false);
      },
      (error: unknown) => {
        setRecoError(error instanceof ApiError ? error.message : t.loadError);
        setRecoLoading(false);
      }
    );
  }, [t]);

  useEffect(() => {
    apiListCampagnes({ limit: 100 }).then(
      (result) => {
        setCampaigns(result.items);
        setCampaignsLoading(false);
        const first = initialCampaignId(result.items);
        if (first) {
          selectedRef.current = first;
          setSelectedId(first);
          void fetchRecommendations(first);
        }
      },
      (error: unknown) => {
        setCampaignsError(error instanceof ApiError ? error.message : t.campaignsError);
        setCampaignsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chargement initial uniquement
  }, []);

  function handleSelect(campaignId: string) {
    selectedRef.current = campaignId;
    setSelectedId(campaignId);
    setRecommendations([]);
    if (campaignId) void fetchRecommendations(campaignId);
  }

  function handleGenerate() {
    if (!selectedId) return;
    const campaignId = selectedId;
    setGenerating(true);
    setRecoError(null);
    apiGenerateRecommendations(campaignId)
      .then((result) => {
        // Réponse arrivée après un changement de campagne : on l'ignore.
        if (selectedRef.current === campaignId) setRecommendations(result);
      })
      .catch((error: unknown) => {
        setRecoError(error instanceof ApiError ? error.message : t.generateError);
      })
      .finally(() => setGenerating(false));
  }

  const selectedCampaign = campaigns.find((c) => c.id === selectedId);
  const generatedAt = recommendations.reduce<string | null>(
    (latest, reco) => (!latest || reco.generatedAt > latest ? reco.generatedAt : latest),
    null
  );

  return (
    <>
      <TopBar title={dash.titles.recommendations} />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[860px] flex-col gap-6 px-4 py-6 sm:px-8">
          <div>
            <h1 className="text-lg font-bold text-dash-heading">{dash.titles.recommendations}</h1>
            <p className="mt-1 text-sm text-dash-muted">{t.subtitle}</p>
          </div>

          {campaignsError && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{campaignsError}</p>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">{t.campaign}</span>
            <span className="relative">
              <select
                value={selectedId}
                onChange={(event) => handleSelect(event.target.value)}
                disabled={campaignsLoading || generating}
                className="w-full appearance-none rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-dash-heading outline-none disabled:opacity-50"
              >
                <option value="">{campaignsLoading ? t.loadingCampaigns : t.select}</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name} ({dash.campaignTypes[campaign.type]})
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-dash-muted" aria-hidden="true" />
            </span>
          </label>

          {!campaignsLoading && !campaignsError && campaigns.length === 0 && (
            <p className="rounded-xl border border-border-light bg-white p-6 text-center text-sm text-dash-muted">
              {t.noCampaign}
            </p>
          )}

          {selectedId && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-dash-heading">
                    {fill(t.forCampaign, { name: selectedCampaign?.name ?? "" })}
                  </h2>
                  {generatedAt && !generating && (
                    <p className="mt-0.5 text-[11px] text-dash-muted">
                      {fill(t.generatedOn, { date: formatDate(generatedAt) })}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating || recoLoading}
                  className="flex items-center gap-2 rounded-full bg-green-accent px-5 py-2.5 text-xs font-semibold text-white transition-opacity disabled:opacity-50"
                >
                  {generating ? (
                    <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                  ) : recommendations.length > 0 ? (
                    <RefreshCw className="size-3.5" aria-hidden="true" />
                  ) : (
                    <Sparkles className="size-3.5" aria-hidden="true" />
                  )}
                  {generating ? ti.generating : recommendations.length > 0 ? t.regenerate : ti.generate}
                </button>
              </div>

              {recoError && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                  {recoError}
                </p>
              )}

              {generating ? (
                <div
                  role="status"
                  className="flex flex-col items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 text-center"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-blue-500/10">
                    <Sparkles className="size-5 animate-pulse text-blue-500" aria-hidden="true" />
                  </span>
                  <p className="max-w-md text-sm text-dash-body">{t.thinking}</p>
                </div>
              ) : recoLoading ? (
                <SkeletonPanel lines={3} label={t.loading} />
              ) : recommendations.length === 0 ? (
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-border-light bg-white p-10 text-center">
                  <span className="flex size-10 items-center justify-center rounded-full bg-dash-pill-bg">
                    <Lightbulb className="size-5 text-dash-muted" aria-hidden="true" />
                  </span>
                  <p className="text-sm text-dash-muted">{t.empty}</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-3">
                    {recommendations.map((reco) => (
                      <RecommendationCard key={reco.id} recommendation={reco} />
                    ))}
                  </div>
                  <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-dash-muted">
                    <Sparkles className="mt-0.5 size-3 shrink-0 text-blue-500" aria-hidden="true" />
                    {t.aiNote}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
