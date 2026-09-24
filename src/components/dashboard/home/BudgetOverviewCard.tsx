"use client";

import type { DashboardSummary } from "@/lib/api/types";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

/**
 * Remplace l'ancien PerformanceChart (courbe quotidienne portée/clics/
 * conversions) : ces données n'existent tout simplement pas côté backend
 * (aucune agrégation quotidienne cross-campagnes). `DashboardResponseDto`
 * expose en revanche totalPlannedBudget/totalActualBudget/budgetDeviation —
 * un vrai indicateur, cumulé sur toutes les campagnes de l'entreprise.
 */
export function BudgetOverviewCard({ summary }: { summary: DashboardSummary }) {
  const t = useT("dash").home.budget;
  const f = useFormat();
  const { totalPlannedBudget, totalActualBudget, budgetDeviation } = summary;
  const max = Math.max(totalPlannedBudget, totalActualBudget, 1);
  const overBudget = budgetDeviation < 0;
  const deviationPercent =
    totalPlannedBudget > 0 ? Math.round((Math.abs(budgetDeviation) / totalPlannedBudget) * 100) : 0;

  const bars = [
    { label: t.planned, value: totalPlannedBudget, color: "#3b82f6" },
    { label: t.actual, value: totalActualBudget, color: overBudget ? "#ef4444" : "#00c853" },
  ];

  return (
    <div className="rounded-[5px] border border-border bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-black">{t.title}</h2>
          <p className="mt-0.5 text-[11px] text-gray-text">{t.subtitle}</p>
        </div>
        {totalPlannedBudget > 0 && (
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
              overBudget ? "bg-red-600/10 text-red-600" : "bg-green-accent-dark/10 text-green-accent-dark"
            }`}
          >
            {overBudget ? "↑" : "↓"} {fill(overBudget ? t.over : t.under, { percent: deviationPercent })}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-gray-text">{bar.label}</span>
              <span className="font-semibold text-black">{f.money(bar.value)}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="dash-fill h-full rounded-full"
                style={{
                  width: `${Math.max(2, Math.round((bar.value / max) * 100))}%`,
                  backgroundColor: bar.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
