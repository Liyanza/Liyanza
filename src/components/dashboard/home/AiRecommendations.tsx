"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiListRecommendations } from "@/lib/api/client";
import type { CampagneRecord, CampaignRecommendation } from "@/lib/api/types";
import { RecommendationCard } from "@/components/dashboard/recommandations/RecommendationCard";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

/**
 * Aperçu des recommandations IA de la campagne à suivre en priorité (la
 * première en cours parmi les plus récentes) : les 2 plus urgentes, et un
 * lien vers la page Recommandations sur cette campagne.
 */
export function AiRecommendations({ campaigns }: { campaigns: CampagneRecord[] }) {
  const dash = useT("dash");
  const t = dash.home.ai;
  const { user } = useAuth();
  const allowed = user?.role === "ADMIN" || user?.role === "MARKETING_MANAGER";
  const campaign = campaigns.find((c) => c.status === "IN_PROGRESS") ?? campaigns[0];

  const [recommendations, setRecommendations] = useState<CampaignRecommendation[] | null>(null);

  useEffect(() => {
    if (!allowed || !campaign) return;
    let active = true;
    apiListRecommendations(campaign.id).then(
      (result) => active && setRecommendations(result),
      () => active && setRecommendations([])
    );
    return () => {
      active = false;
    };
  }, [allowed, campaign]);

  const pageHref = campaign ? `/dashboard/recommandations?campagne=${campaign.id}` : "/dashboard/recommandations";

  return (
    <div className="flex h-full flex-col rounded-[5px] border border-border bg-white p-5">
      <h2 className="flex items-center gap-1.5 text-sm font-bold text-black">
        <Sparkles className="size-4 text-blue-500" aria-hidden="true" />
        {t.title}
      </h2>
      <p className="mt-0.5 truncate text-[11px] text-gray-text">
        {campaign && allowed ? fill(t.forCampaign, { name: campaign.name }) : t.subtitle}
      </p>

      {!allowed || !campaign ? (
        <EmptyState text={!campaign ? t.noCampaign : t.restricted} />
      ) : recommendations === null ? (
        <div className="mt-4 flex flex-1 flex-col gap-2" aria-busy="true">
          <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      ) : recommendations.length === 0 ? (
        <>
          <EmptyState text={t.empty} />
          <Link
            href={pageHref}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-green-accent px-4 py-2 text-xs font-semibold text-white"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            {t.generate}
          </Link>
        </>
      ) : (
        <>
          <div className="mt-4 flex flex-1 flex-col gap-2">
            {recommendations.slice(0, 2).map((reco) => (
              <RecommendationCard key={reco.id} recommendation={reco} compact />
            ))}
          </div>
          <Link
            href={pageHref}
            className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-green-accent-dark"
          >
            {fill(t.seeAll, { count: recommendations.length })}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </>
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="mt-4 flex flex-1 items-center justify-center">
      <div className="w-full rounded-xl border border-dashed border-border-light bg-slate-50 p-6 text-center">
        <Lightbulb className="mx-auto size-6 text-gray-text-light" aria-hidden="true" />
        <p className="mt-2 text-xs font-semibold text-gray-text">{text}</p>
      </div>
    </div>
  );
}
