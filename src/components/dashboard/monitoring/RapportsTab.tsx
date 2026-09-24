"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Activity, ArrowRight, Radio, Sparkles, Target, Users } from "lucide-react";
import {
  apiGenerateRecommendations,
  apiGetCampagne,
  apiGetRapportConformite,
  apiListRecommendations,
  ApiError,
} from "@/lib/api/client";
import type { CampagneRecord, CampaignRecommendation, RapportConformite } from "@/lib/api/types";
import { SkeletonPanel } from "@/components/dashboard/ui/Skeleton";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

const PRIORITY_CLASS: Record<string, string> = {
  high: "bg-red-600/10 text-red-600",
  medium: "bg-orange-500/10 text-orange-500",
  low: "bg-slate-100 text-slate-500",
};

export function RapportsTab({ campaignId }: { campaignId: string }) {
  const ti = useT("dashInsights");
  const t = ti.monitoring.report;
  const dash = useT("dash");
  const f = useFormat();
  const formatDate = (iso: string) => f.date(iso, { day: "numeric", month: "short", year: "numeric" });
  const [campaign, setCampaign] = useState<CampagneRecord | null>(null);
  const [report, setReport] = useState<RapportConformite | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [recommendations, setRecommendations] = useState<CampaignRecommendation[]>([]);
  const [recoLoading, setRecoLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    Promise.all([apiGetCampagne(campaignId), apiGetRapportConformite(campaignId)]).then(
      ([campaignResult, reportResult]) => {
        setCampaign(campaignResult);
        setReport(reportResult);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : t.loadError);
        setLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- messages stables, rechargement sur l'identifiant seulement
  }, [campaignId]);

  useEffect(() => {
    apiListRecommendations(campaignId).then(
      (result) => {
        setRecommendations(result);
        setRecoLoading(false);
      },
      () => setRecoLoading(false)
    );
  }, [campaignId]);

  function handleGenerate() {
    setGenerating(true);
    apiGenerateRecommendations(campaignId)
      .then(() => apiListRecommendations(campaignId))
      .then((result) => setRecommendations(result))
      .finally(() => setGenerating(false));
  }

  if (loading) return <SkeletonPanel lines={4} label={t.loading} />;
  if (loadError) return <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{loadError}</p>;
  if (!campaign || !report) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-dash-heading">{t.title}</h2>
          <p className="mt-0.5 text-sm text-dash-muted">{t.subtitle}</p>
        </div>
        <Link
          href="/dashboard/rapports"
          className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-dash-heading"
        >
          {t.export}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-green-accent-dark/10">
              <Radio className="size-4 text-green-accent-dark" aria-hidden="true" />
            </span>
            <h3 className="text-sm font-semibold text-dash-heading">{campaign.name}</h3>
          </div>
          <dl className="flex flex-col gap-2.5 text-sm">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-dash-muted">{t.objective}</dt>
              <dd className="text-right font-semibold text-dash-heading">{campaign.objective}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">{t.period}</dt>
              <dd className="font-semibold text-dash-heading">
                {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">{t.budget}</dt>
              <dd className="font-semibold text-dash-heading">{f.money(campaign.plannedBudget)}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold text-dash-heading">
            <Activity className="size-4 text-green-accent-dark" aria-hidden="true" />
            {t.results}
          </h3>
          <dl className="flex flex-col gap-2.5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">{t.planned}</dt>
              <dd className="font-bold text-dash-heading">{report.totalDiffusions}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">{t.broadcasted}</dt>
              <dd className="font-bold text-dash-heading">{report.diffusionsDiffusees}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">{t.missed}</dt>
              <dd className="font-bold text-orange-600">{report.diffusionsManquees}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">{t.compliance}</dt>
              <dd className="font-bold text-green-accent-dark">
                {report.tauxConformite !== null ? `${Math.round(report.tauxConformite * 100)}%` : "—"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold text-dash-heading">
            <Sparkles className="size-4 text-blue-500" aria-hidden="true" />
            {t.recommendations}
          </h3>
          {recoLoading ? (
            <p className="text-xs text-dash-muted">{t.loadingReco}</p>
          ) : recommendations.length === 0 ? (
            <p className="text-xs text-dash-muted">{t.noReco}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recommendations.slice(0, 3).map((reco) => (
                <div key={reco.id} className={`rounded-xl p-3 text-xs ${PRIORITY_CLASS[reco.priority.toLowerCase()] ?? "bg-slate-100 text-slate-600"}`}>
                  {reco.content}
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="mt-1 flex items-center justify-center gap-1.5 rounded-full bg-green-accent px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            {generating ? ti.generating : ti.generate}
          </button>
          <Link href="/dashboard/recommandations" className="text-center text-xs font-semibold text-green-accent-dark">
            {t.seeAll}
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-dash-canvas p-4 text-xs text-dash-muted">
        <span className="flex items-center gap-1.5">
          <Target className="size-3.5" aria-hidden="true" />
          {dash.campaignTypes[campaign.type]}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="size-3.5" aria-hidden="true" />
          {fill(report.diffusionsAnnulees > 1 ? t.cancelledMany : t.cancelledOne, { count: report.diffusionsAnnulees })}
        </span>
      </div>
    </div>
  );
}
