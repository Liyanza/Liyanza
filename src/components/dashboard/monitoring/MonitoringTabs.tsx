export interface MonitoringTabDef {
  id: string;
  label: string;
}

export const MONITORING_TABS: MonitoringTabDef[] = [
  { id: "overview", label: "Vue d'ensemble" },
  { id: "diffusions", label: "Diffusions" },
  { id: "planning", label: "Planning" },
  { id: "alertes", label: "Alertes" },
  { id: "analyses", label: "Analyses" },
  { id: "rapports", label: "Rapports" },
  { id: "recommandation", label: "Recommandation" },
  { id: "annulees", label: "Annulées" },
];

export function MonitoringTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      {MONITORING_TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              isActive ? "bg-green-accent text-white" : "text-dash-body hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
