"use client";

const TABS = [
  { id: "resume", label: "Résumé" },
  { id: "canaux", label: "Canaux" },
  { id: "budget", label: "Budget" },
  { id: "performances", label: "Performances" },
] as const;

export type ResultsTabId = (typeof TABS)[number]["id"];

export function ResultsTabs({
  active,
  onChange,
}: {
  active: ResultsTabId;
  onChange: (tab: ResultsTabId) => void;
}) {
  return (
    <div className="flex gap-6 border-b border-border-light">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`pb-2.5 pt-1 text-sm font-medium transition-colors ${
            active === tab.id
              ? "border-b-2 border-green-accent-dark text-green-accent-dark"
              : "text-dash-muted hover:text-dash-heading"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
