"use client";

import { PerformanceLineChart } from "./charts";
import { useT } from "@/i18n/client";
import type { DigitalSimulationRecord } from "@/lib/api/types";

export function PerformancesTab({ simulation }: { simulation: DigitalSimulationRecord }) {
  const t = useT("dashCampaigns").results.performances;
  const kpis = [
    { label: t.avgCpc, value: simulation.avgCpc, suffix: " FCFA" },
    { label: t.cpa, value: simulation.costPerAcquisition, suffix: " FCFA" },
    { label: t.conversionRate, value: simulation.conversionRate, suffix: "%" },
    { label: t.roi, value: simulation.predictedRoas, suffix: "x" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {simulation.weeklySeries.length > 0 && (
        <div>
          <h3 className="mb-4 text-center text-sm font-semibold text-dash-heading">{t.title}</h3>
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
