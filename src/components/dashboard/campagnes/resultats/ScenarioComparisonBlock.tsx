import { Star } from "lucide-react";
import type { DigitalSimulationScenario } from "@/lib/api/types";

function formatCompact(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(".0", "")}K`;
  return value.toLocaleString("fr-FR");
}

function ScenarioMetrics({ scenario, compact }: { scenario: DigitalSimulationScenario; compact?: boolean }) {
  const metrics = [
    { label: "Portée", value: formatCompact(scenario.predictedReach) },
    { label: "Clics", value: formatCompact(scenario.predictedClicks) },
    { label: "Conv.", value: formatCompact(scenario.predictedConversions) },
    { label: "ROI", value: `${scenario.predictedRoas}x` },
  ];

  return (
    <div className={`grid grid-cols-4 gap-2 ${compact ? "" : "mt-3"}`}>
      {metrics.map((metric) => (
        <div key={metric.label} className={compact ? "text-center" : "rounded-lg border border-border-light bg-white/80 py-2.5 text-center"}>
          <p className="text-[13px] font-bold text-dash-heading">{metric.value}</p>
          <p className="text-[10px] text-dash-muted">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}

export function ScenarioComparisonBlock({ scenarios }: { scenarios: DigitalSimulationScenario[] }) {
  const recommended = scenarios.find((s) => s.isRecommended) ?? scenarios[0];
  const others = scenarios.filter((s) => s.id !== recommended?.id);

  if (!recommended) return null;

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-blue-500 bg-blue-500/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-dash-heading">Scénario actuel</span>
              <span className="rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white">Recommandé</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-b border-border-light pb-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10">
                <Star className="size-5 text-blue-500" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-dash-heading">{recommended.label}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-dash-muted">Score global</p>
              <p className="text-xl font-bold text-dash-heading">
                {recommended.score}
                <span className="text-xs font-medium text-dash-muted">/100</span>
              </p>
            </div>
          </div>
          <ScenarioMetrics scenario={recommended} />
        </div>

        {others.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold text-dash-heading">Autres scénarios</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {others.map((scenario) => (
                <div key={scenario.id} className="rounded-xl border border-border-light bg-white p-3.5">
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-bold text-dash-heading">{scenario.label}</p>
                    <p className="text-right text-[10px] font-semibold text-dash-muted">
                      Score
                      <br />
                      {scenario.score}/100
                    </p>
                  </div>
                  <div className="mt-2 border-t border-border-light pt-2">
                    <ScenarioMetrics scenario={scenario} compact />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
