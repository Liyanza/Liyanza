import { PerformanceLineChart } from "./charts";
import type { DigitalSimulationRecord } from "@/lib/api/types";

export function PerformancesTab({ simulation }: { simulation: DigitalSimulationRecord }) {
  const kpis = [
    { label: "CPC moyen", value: simulation.avgCpc, suffix: " FCFA" },
    { label: "Coût par acquisition", value: simulation.costPerAcquisition, suffix: " FCFA" },
    { label: "Taux de conversion", value: simulation.conversionRate, suffix: "%" },
    { label: "ROI estimé", value: simulation.predictedRoas, suffix: "x" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {simulation.weeklySeries.length > 0 && (
        <div>
          <h3 className="mb-4 text-center text-sm font-semibold text-dash-heading">Performances dans le temps</h3>
          <PerformanceLineChart points={simulation.weeklySeries} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-border-light bg-white p-4 text-center">
            <p className="text-[11px] text-dash-muted">{kpi.label}</p>
            <p className="mt-1.5 text-lg font-bold text-dash-heading">
              {kpi.value !== null && kpi.value !== undefined ? `${kpi.value}${kpi.suffix}` : "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
