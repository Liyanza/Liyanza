"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { CampaignKpiRow } from "@/components/dashboard/CampaignKpiRow";
import { CampaignsFilterTabs } from "@/components/dashboard/campagnes/CampaignsFilterTabs";
import { CampaignsFilterBar } from "@/components/dashboard/campagnes/CampaignsFilterBar";
import { CampaignsTable } from "@/components/dashboard/campagnes/CampaignsTable";
import { Pagination } from "@/components/dashboard/campagnes/Pagination";
import { apiGetDashboard, apiListCampagnes, ApiError } from "@/lib/api/client";
import type { CampagneRecord, CampaignStatus, DashboardSummary } from "@/lib/api/types";

const PAGE_SIZE = 4;

// "En pause"/"Suspendu" (maquette d'origine) retirés : aucun statut backend
// ne les représente (CampaignStatus = DRAFT|PLANNED|IN_PROGRESS|COMPLETED|
// CANCELLED). Ces 6 onglets reflètent exactement l'enum réel + "Toutes".
const FILTERS: { label: string; status?: CampaignStatus }[] = [
  { label: "Toutes" },
  { label: "Brouillons", status: "DRAFT" },
  { label: "Programmées", status: "PLANNED" },
  { label: "En cours", status: "IN_PROGRESS" },
  { label: "Terminées", status: "COMPLETED" },
  { label: "Annulées", status: "CANCELLED" },
];

export function CampagnesListClient() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0].label);
  const [page, setPage] = useState(1);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [campaigns, setCampaigns] = useState<CampagneRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const activeStatus = FILTERS.find((filter) => filter.label === activeFilter)?.status;

  // Le chargement (setLoading(true)/setLoadError(null)) est déclenché par les
  // handlers utilisateur ci-dessous, jamais depuis l'effet lui-même : la règle
  // react-hooks/set-state-in-effect interdit tout setState synchrone dans un
  // effet (même via une fonction appelée), seuls les setState situés dans un
  // callback .then() (donc asynchrones) sont autorisés — même pattern que
  // SocialAccountsPanel.fetchAccounts.
  const fetchData = useCallback(() => {
    return Promise.all([
      apiGetDashboard(),
      apiListCampagnes({ page, limit: PAGE_SIZE, status: activeStatus }),
    ]).then(
      ([dashboard, list]) => {
        setSummary(dashboard);
        setCampaigns(list.items);
        setTotal(list.total);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : "Impossible de charger les campagnes.");
        setLoading(false);
      }
    );
  }, [page, activeStatus]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  function handleFilterChange(filter: string) {
    setActiveFilter(filter);
    setPage(1);
    setLoading(true);
    setLoadError(null);
  }

  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    setLoading(true);
    setLoadError(null);
  }

  function handleReset() {
    setActiveFilter(FILTERS[0].label);
    setPage(1);
    setLoading(true);
    setLoadError(null);
  }

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <TopBar title="Campagnes" />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="flex flex-col gap-6 px-8 py-6">
          <div className="flex justify-end">
            <Button
              href="/dashboard/campagnes/nouvelle"
              variant="cta"
              size="md"
              icon={<Plus className="size-4" aria-hidden="true" />}
              iconPosition="left"
            >
              Nouvelle campagne
            </Button>
          </div>

          {summary && <CampaignKpiRow summary={summary} />}

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CampaignsFilterTabs
                filters={FILTERS.map((filter) => ({
                  label: filter.label,
                  count: filter.status
                    ? (summary?.campaignsByStatus[filter.status] ?? 0)
                    : (summary?.totalCampaigns ?? 0),
                }))}
                active={activeFilter}
                onChange={handleFilterChange}
              />
            </div>
            <CampaignsFilterBar onReset={handleReset} />
          </div>

          {loadError && <p className="text-sm text-red-600">{loadError}</p>}

          <CampaignsTable rows={loading ? [] : campaigns} onChanged={fetchData} />
          <Pagination page={page} pageCount={pageCount} total={total} pageSize={PAGE_SIZE} onChange={handlePageChange} />

          <p className="text-center text-[11px] text-gray-text-light">
            Besoin de plus de détails ?{" "}
            <Link href="/dashboard/rapports" className="font-semibold text-green-accent-dark">
              Consultez les rapports
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
