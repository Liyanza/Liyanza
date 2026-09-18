import { Calendar } from "lucide-react";
import { WeeklySpendBarChart } from "./charts";
import type { DigitalSimulationWeekPoint } from "@/lib/api/types";

export function BudgetTab({ weeklySeries }: { weeklySeries: DigitalSimulationWeekPoint[] }) {
  const totalSpend = weeklySeries.reduce((sum, w) => sum + w.budgetSpent, 0);

  if (weeklySeries.length === 0) {
    return (
      <p className="rounded-xl border border-border-light bg-white p-6 text-center text-sm text-dash-muted">
        Aucune donnée de budget disponible pour cette simulation.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-dash-heading">Répartition hebdomadaire du budget</h3>
        <span className="flex items-center gap-1.5 rounded-full bg-green-accent-dark/10 px-3 py-1 text-[11px] font-semibold text-green-accent-dark">
          <Calendar className="size-3.5" aria-hidden="true" />
          Budget total : {Math.round(totalSpend).toLocaleString("fr-FR")} FCFA
        </span>
      </div>
      <WeeklySpendBarChart points={weeklySeries} />
      <p className="text-center text-xs text-dash-muted">
        Cadence adaptative : montée en charge progressive avec un pic en milieu de campagne.
      </p>
    </div>
  );
}
