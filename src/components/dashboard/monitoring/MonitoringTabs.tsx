import { monitoringTabs } from "@/data/monitoring";

export function MonitoringTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      {monitoringTabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              isActive ? "bg-green-accent text-white" : "text-dash-body hover:bg-slate-50"
            }`}
          >
            {tab.label}
            {!isActive && Boolean(tab.count) && (
              <span className="flex size-4 items-center justify-center rounded-full bg-dash-pill-bg text-[10px] font-bold text-dash-muted">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
