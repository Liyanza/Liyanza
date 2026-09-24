"use client";

import { useT } from "@/i18n/client";

const TABS = ["resume", "canaux", "budget", "performances"] as const;

export type ResultsTabId = (typeof TABS)[number];

export function ResultsTabs({
  active,
  onChange,
}: {
  active: ResultsTabId;
  onChange: (tab: ResultsTabId) => void;
}) {
  const t = useT("dashCampaigns").results.tabs;
  return (
    <div className="flex gap-6 border-b border-border-light">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`pb-2.5 pt-1 text-sm font-medium transition-colors ${
            active === tab
              ? "border-b-2 border-green-accent-dark text-green-accent-dark"
              : "text-dash-muted hover:text-dash-heading"
          }`}
        >
          {t[tab]}
        </button>
      ))}
    </div>
  );
}
