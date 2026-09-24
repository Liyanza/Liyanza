"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useT } from "@/i18n/client";

export function CampaignsFilterBar({ onReset }: { onReset: () => void }) {
  const t = useT("dashCampaigns").filterBar;
  const dropdowns = [
    { label: t.type, value: t.allChannels },
    { label: t.period, value: t.last30Days },
    { label: t.performance, value: null },
  ];
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-full bg-white px-1 py-1">
      <div className="flex flex-wrap items-center gap-2">
        {dropdowns.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-dash-pill-bg px-3 py-2 text-xs text-dash-body"
          >
            {item.value ? (
              <>
                <span className="text-dash-muted">{item.label}:</span>
                <span className="font-semibold text-[#141b2b]">{item.value}</span>
              </>
            ) : (
              <span className="font-semibold text-[#141b2b]">{item.label}</span>
            )}
            <ChevronDown className="size-3 text-dash-muted" aria-hidden="true" />
          </button>
        ))}
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-dash-pill-bg px-3 py-2 text-xs font-semibold text-dash-body"
        >
          <SlidersHorizontal className="size-3" aria-hidden="true" />
          {t.moreFilters}
        </button>
      </div>
      <button type="button" onClick={onReset} className="text-[11px] font-medium text-dash-muted hover:text-black">
        {t.reset}
      </button>
    </div>
  );
}
