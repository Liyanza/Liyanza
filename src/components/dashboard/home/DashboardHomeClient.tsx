"use client";

import { useCallback, useEffect, useState } from "react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { WelcomeBanner } from "@/components/dashboard/home/WelcomeBanner";
import { CampaignKpiRow } from "@/components/dashboard/CampaignKpiRow";
import { BudgetOverviewCard } from "@/components/dashboard/home/BudgetOverviewCard";
import { CampaignStatusDonut } from "@/components/dashboard/home/CampaignStatusDonut";
import { CampaignsTable } from "@/components/dashboard/campagnes/CampaignsTable";
import { AiRecommendations } from "@/components/dashboard/home/AiRecommendations";
import { apiGetDashboard, apiListCampagnes, ApiError } from "@/lib/api/client";
import type { CampagneRecord, DashboardSummary } from "@/lib/api/types";
import { SkeletonKpis, SkeletonPanel } from "@/components/dashboard/ui/Skeleton";
import { useT } from "@/i18n/client";

export function DashboardHomeClient() {
  const dash = useT("dash");
  const t = dash.home;
  const loadErrorText = t.loadError;
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentCampaigns, setRecentCampaigns] = useState<CampagneRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchDashboard = useCallback(() => {
    return Promise.all([apiGetDashboard(), apiListCampagnes({ limit: 5 })]).then(
      ([dashboard, campaigns]) => {
        setSummary(dashboard);
        setRecentCampaigns(campaigns.items);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : loadErrorText);
        setLoading(false);
      }
    );
  }, [loadErrorText]);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return (
    <>
      <TopBar title={dash.titles.home} searchPlaceholder={t.searchPlaceholder} showPeriodFilter />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="flex flex-col gap-6 px-8 py-6">
          <WelcomeBanner />

          {loading && (
            <div className="flex flex-col gap-6">
              <SkeletonKpis label={t.loading} />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
                <SkeletonPanel lines={4} />
                <SkeletonPanel lines={4} />
              </div>
            </div>
          )}
          {loadError && <p className="text-sm text-red-600">{loadError}</p>}

          {summary && (
            <>
              <CampaignKpiRow summary={summary} />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
                <BudgetOverviewCard summary={summary} />
                <CampaignStatusDonut summary={summary} />
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
                <CampaignsTable rows={recentCampaigns} viewAllHref="/dashboard/campagnes" onChanged={fetchDashboard} />
                <AiRecommendations />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
