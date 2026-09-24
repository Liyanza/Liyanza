"use client";

import { useT } from "@/i18n/client";

/** Onglets ; libellés dans dashInsights.monitoring.tabs. */
export const MONITORING_TABS = [
  "overview",
  "diffusions",
  "planning",
  "alertes",
  "analyses",
  "rapports",
  "recommandation",
  "annulees",
] as const;

export type MonitoringTabId = (typeof MONITORING_TABS)[number];

export function MonitoringTabs({
  active,
  onChange,
}: {
  active: MonitoringTabId;
  onChange: (id: MonitoringTabId) => void;
}) {
  const t = useT("dashInsights").monitoring.tabs;
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      {MONITORING_TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              isActive ? "bg-green-accent text-white" : "text-dash-body hover:bg-slate-50"
            }`}
          >
            {t[tab]}
          </button>
        );
      })}
    </div>
  );
}
