"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { apiGetDigitalSimulations, ApiError } from "@/lib/api/client";
import type { DigitalSimulationRecord } from "@/lib/api/types";
import { ScenarioComparisonBlock } from "./ScenarioComparisonBlock";
import { ResultsTabs, type ResultsTabId } from "./ResultsTabs";
import { ResumeTab } from "./ResumeTab";
import { CanauxTab } from "./CanauxTab";
import { BudgetTab } from "./BudgetTab";
import { PerformancesTab } from "./PerformancesTab";
import { SkeletonKpis, SkeletonPanel } from "@/components/dashboard/ui/Skeleton";
import { useT } from "@/i18n/client";

function normalizeList(
  result: DigitalSimulationRecord[] | { items: DigitalSimulationRecord[] }
): DigitalSimulationRecord[] {
  return Array.isArray(result) ? result : result.items;
}

export function DigitalResultsPage({ campaignId }: { campaignId: string }) {
  const t = useT("dashCampaigns").results;
  const dash = useT("dash");
  const [simulation, setSimulation] = useState<DigitalSimulationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ResultsTabId>("resume");

  useEffect(() => {
    apiGetDigitalSimulations(campaignId).then(
      (result) => {
        const items = normalizeList(result);
        setSimulation(items[0] ?? null);
        setLoading(false);
      },
      (err) => {
        setError(err instanceof ApiError ? err.message : t.loadError);
        setLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- rechargé seulement si la campagne change
  }, [campaignId]);

  return (
    <>
      <TopBar title={t.title} searchPlaceholder={dash.home.searchPlaceholder} />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-8 py-8">
          <div>
            <Link href="/dashboard/campagnes" className="flex w-fit items-center gap-1.5 text-xs font-semibold text-dash-body hover:text-black">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              {t.back}
            </Link>
            <h1 className="mt-3 text-2xl font-bold text-dash-heading">{t.title}</h1>
            <p className="mt-0.5 text-sm text-dash-muted">{t.subtitle}</p>
          </div>

          {loading ? (
            <div className="flex flex-col gap-4">
              <SkeletonKpis label={t.loading} />
              <SkeletonPanel lines={5} />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-2 rounded-xl bg-white p-10 text-center shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
              <AlertTriangle className="size-6 text-orange-500" aria-hidden="true" />
              <p className="text-sm text-dash-body">{error}</p>
            </div>
          ) : !simulation ? (
            <div className="rounded-xl bg-white p-10 text-center text-sm text-dash-muted shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
              {t.empty}
            </div>
          ) : (
            <>
              {simulation.scenarios.length > 0 && <ScenarioComparisonBlock scenarios={simulation.scenarios} />}

              <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-dash-heading">{t.detail}</h2>
                </div>
                <div className="mt-2">
                  <ResultsTabs active={activeTab} onChange={setActiveTab} />
                </div>
                <div className="pt-6">
                  {activeTab === "resume" && <ResumeTab simulation={simulation} />}
                  {activeTab === "canaux" && <CanauxTab channels={simulation.channelBreakdown} />}
                  {activeTab === "budget" && <BudgetTab weeklySeries={simulation.weeklySeries} />}
                  {activeTab === "performances" && <PerformancesTab simulation={simulation} />}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
