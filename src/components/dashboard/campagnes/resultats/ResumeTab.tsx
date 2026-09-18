import { Lightbulb } from "lucide-react";
import { BudgetDonutChart } from "./charts";
import type { DigitalSimulationRecord } from "@/lib/api/types";

const PLATFORM_LABEL: Record<string, string> = {
  FACEBOOK: "Facebook Ads",
  INSTAGRAM: "Instagram Ads",
};

const PLATFORM_COLOR: Record<string, string> = {
  FACEBOOK: "#1877f2",
  INSTAGRAM: "#e1306c",
};

export function ResumeTab({ simulation }: { simulation: DigitalSimulationRecord }) {
  const totalBudget = simulation.channelBreakdown.reduce((sum, c) => sum + c.budgetAmount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Portée estimée", value: simulation.predictedReach },
          { label: "Taux d'engagement", value: simulation.predictedEngagementRate ? `${simulation.predictedEngagementRate}%` : null },
          { label: "CTR estimé", value: simulation.predictedCtr ? `${simulation.predictedCtr}%` : null },
          { label: "ROAS estimé", value: simulation.predictedRoas ? `${simulation.predictedRoas}x` : null },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border-light p-3">
            <p className="text-[11px] text-dash-muted">{metric.label}</p>
            <p className="mt-1 text-lg font-bold text-dash-heading">
              {metric.value !== null && metric.value !== undefined
                ? typeof metric.value === "number"
                  ? metric.value.toLocaleString("fr-FR")
                  : metric.value
                : "—"}
            </p>
          </div>
        ))}
      </div>

      {simulation.channelBreakdown.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-dash-heading">Répartition du budget</h3>
          <div className="mt-4">
            <BudgetDonutChart
              totalLabel={Math.round(totalBudget).toLocaleString("fr-FR")}
              segments={simulation.channelBreakdown.map((channel) => ({
                label: PLATFORM_LABEL[channel.platform] ?? channel.platform,
                value: channel.budgetAmount,
                percent: channel.budgetPercent,
                color: PLATFORM_COLOR[channel.platform] ?? "#94a3b8",
              }))}
            />
          </div>
        </div>
      )}

      {simulation.narrativeSummary && (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-accent-dark/10">
            <Lightbulb className="size-4 text-green-accent-dark" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold text-dash-heading">Pourquoi ce scénario ?</p>
            <p className="mt-1 text-xs leading-relaxed text-dash-body">{simulation.narrativeSummary}</p>
          </div>
        </div>
      )}

      {simulation.warnings.length > 0 && (
        <ul className="flex flex-col gap-1.5 rounded-lg bg-orange-500/5 p-4 text-xs text-orange-600">
          {simulation.warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
