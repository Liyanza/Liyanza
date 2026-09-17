import { campaignFilters, type CampaignFilter } from "@/data/dashboard";

export function CampaignsFilterTabs({
  active,
  onChange,
}: {
  active: CampaignFilter;
  onChange: (filter: CampaignFilter) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full border border-border bg-white p-1">
      {campaignFilters.map((filter) => {
        const isActive = filter.label === active;
        return (
          <button
            key={filter.label}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(filter.label)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
              isActive ? "bg-green-accent-dark text-white shadow-sm" : "text-gray-text hover:bg-slate-50"
            }`}
          >
            {filter.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                isActive ? "bg-white/20 text-white" : "bg-slate-50 text-gray-text-light"
              }`}
            >
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
