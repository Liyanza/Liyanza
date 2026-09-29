"use client";

import { Search, X } from "lucide-react";
import type { CampaignPeriod, CampaignType } from "@/lib/api/types";
import { useT } from "@/i18n/client";

export interface CampaignFilters {
  search: string;
  type: CampaignType | "";
  period: CampaignPeriod | "";
}

export const EMPTY_FILTERS: CampaignFilters = { search: "", type: "", period: "" };

const TYPES: CampaignType[] = ["DIGITAL", "RADIO", "POSTER"];
const PERIODS: CampaignPeriod[] = ["7d", "30d", "90d"];

/** Recherche par nom, type de campagne et période ; le statut est dans les onglets. */
export function CampaignsFilterBar({
  filters,
  onChange,
  onReset,
}: {
  filters: CampaignFilters;
  onChange: (filters: CampaignFilters) => void;
  onReset: () => void;
}) {
  const t = useT("dashCampaigns").filterBar;
  const active = filters.search !== "" || filters.type !== "" || filters.period !== "";
  const selectClass =
    "rounded-full bg-dash-pill-bg px-3 py-2 text-xs font-semibold text-[#141b2b] outline-none focus-visible:ring-2 focus-visible:ring-green-accent-dark";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-full bg-white px-1 py-1">
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-1.5 rounded-full bg-dash-pill-bg px-3 py-2">
          <Search className="size-3 text-dash-muted" aria-hidden="true" />
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
            placeholder={t.search}
            aria-label={t.search}
            className="w-40 bg-transparent text-xs text-[#141b2b] outline-none placeholder:text-dash-muted"
          />
        </label>
        <select
          aria-label={t.type}
          value={filters.type}
          onChange={(event) => onChange({ ...filters, type: event.target.value as CampaignFilters["type"] })}
          className={selectClass}
        >
          <option value="">{t.allTypes}</option>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {t.types[type]}
            </option>
          ))}
        </select>
        <select
          aria-label={t.period}
          value={filters.period}
          onChange={(event) => onChange({ ...filters, period: event.target.value as CampaignFilters["period"] })}
          className={selectClass}
        >
          <option value="">{t.allPeriods}</option>
          {PERIODS.map((period) => (
            <option key={period} value={period}>
              {t.periods[period]}
            </option>
          ))}
        </select>
      </div>
      {active && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] font-medium text-dash-muted hover:text-black"
        >
          <X className="size-3" aria-hidden="true" />
          {t.reset}
        </button>
      )}
    </div>
  );
}
