"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { CampagnesKpiRow } from "@/components/dashboard/campagnes/CampagnesKpiRow";
import { CampaignsFilterTabs } from "@/components/dashboard/campagnes/CampaignsFilterTabs";
import { CampaignsFilterBar } from "@/components/dashboard/campagnes/CampaignsFilterBar";
import { CampaignsTable } from "@/components/dashboard/campagnes/CampaignsTable";
import { Pagination } from "@/components/dashboard/campagnes/Pagination";
import { allCampaigns, type CampaignFilter } from "@/data/dashboard";

const PAGE_SIZE = 4;

export function CampagnesListClient() {
  const [activeFilter, setActiveFilter] = useState<CampaignFilter>("Toutes");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return allCampaigns.filter((row) => {
      const matchesFilter = activeFilter === "Toutes" || row.filterGroup === activeFilter;
      const matchesSearch = row.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleFilterChange(filter: CampaignFilter) {
    setActiveFilter(filter);
    setPage(1);
  }

  function handleReset() {
    setActiveFilter("Toutes");
    setSearch("");
    setPage(1);
  }

  return (
    <>
      <TopBar title="Campagnes" />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="flex flex-col gap-6 px-8 py-6">
          <div className="flex justify-end">
            <Button href="/dashboard/campagnes/nouvelle" variant="cta" size="md" icon={<Plus className="size-4" aria-hidden="true" />} iconPosition="left">
              Nouvelle campagne
            </Button>
          </div>

          <CampagnesKpiRow />

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CampaignsFilterTabs active={activeFilter} onChange={handleFilterChange} />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Rechercher par nom de campagne..."
                className="w-full max-w-xs rounded-full border border-border bg-white px-4 py-2 text-xs text-gray-700 outline-none focus:border-green-accent-dark sm:w-auto"
              />
            </div>
            <CampaignsFilterBar onReset={handleReset} />
          </div>

          <CampaignsTable rows={pageRows} />
          <Pagination page={currentPage} pageCount={pageCount} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />

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
