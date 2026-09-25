"use client";

import { AlertTriangle, CheckCircle2, Lightbulb, Sparkles } from "lucide-react";
import { useFormat, useT } from "@/i18n/client";
import { BudgetDonutChart } from "./charts";
import type { DigitalSimulationAnalysis, DigitalSimulationRecord } from "@/lib/api/types";

const PLATFORM_LABEL: Record<string, string> = {
  FACEBOOK: "Facebook Ads",
  INSTAGRAM: "Instagram Ads",
};

const PLATFORM_COLOR: Record<string, string> = {
  FACEBOOK: "#1877f2",
  INSTAGRAM: "#e1306c",
};

export function ResumeTab({ simulation }: { simulation: DigitalSimulationRecord }) {
  const t = useT("dashCampaigns").results.resume;
  const f = useFormat();
  const totalBudget = simulation.channelBreakdown.reduce((sum, c) => sum + c.budgetAmount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: t.reach, value: simulation.predictedReach },
          { label: t.engagement, value: simulation.predictedEngagementRate ? `${simulation.predictedEngagementRate}%` : null },
          { label: t.ctr, value: simulation.predictedCtr ? `${simulation.predictedCtr}%` : null },
          { label: t.roas, value: simulation.predictedRoas ? `${simulation.predictedRoas}x` : null },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border-light p-3">
            <p className="text-[11px] text-dash-muted">{metric.label}</p>
            <p className="mt-1 text-lg font-bold text-dash-heading">
              {metric.value !== null && metric.value !== undefined
                ? typeof metric.value === "number"
                  ? f.number(metric.value)
                  : metric.value
                : "—"}
            </p>
          </div>
        ))}
      </div>

      {simulation.channelBreakdown.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-dash-heading">{t.budgetSplit}</h3>
          <div className="mt-4">
            <BudgetDonutChart
              totalLabel={f.number(Math.round(totalBudget))}
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

      {simulation.aiAnalysis ? (
        <AiAnalysisPanel analysis={simulation.aiAnalysis} />
      ) : simulation.narrativeSummary && (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-accent-dark/10">
            <Lightbulb className="size-4 text-green-accent-dark" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold text-dash-heading">{t.why}</p>
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

/**
 * Analyse de la simulation par l'assistant IA (backend → service IA) : les
 * chiffres restent ceux du moteur, l'IA les explique et propose des actions.
 */
function AiAnalysisPanel({ analysis }: { analysis: DigitalSimulationAnalysis }) {
  const t = useT("dashCampaigns").results.resume;

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-white p-5" aria-label={t.aiTitle}>
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-[#1a3460] text-white">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold text-dash-heading">{t.aiTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-dash-body">{analysis.summary}</p>
        </div>
      </div>

      {(analysis.strengths.length > 0 || analysis.risks.length > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {analysis.strengths.length > 0 && (
            <div className="rounded-lg bg-green-accent-dark/5 p-4">
              <p className="text-xs font-bold text-green-accent-dark">{t.strengths}</p>
              <ul className="mt-2 flex flex-col gap-2">
                {analysis.strengths.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-dash-body">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-green-accent-dark" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {analysis.risks.length > 0 && (
            <div className="rounded-lg bg-orange-500/5 p-4">
              <p className="text-xs font-bold text-orange-600">{t.risks}</p>
              <ul className="mt-2 flex flex-col gap-2">
                {analysis.risks.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-dash-body">
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-orange-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {analysis.recommendations.length > 0 && (
        <div>
          <p className="text-xs font-bold text-dash-heading">{t.recommendations}</p>
          <ol className="mt-2 grid gap-2 sm:grid-cols-2">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={recommendation.title} className="flex gap-3 rounded-lg border border-border p-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-dash-body">
                  {index + 1}
                </span>
                <div>
                  <p className="text-xs font-semibold text-dash-heading">{recommendation.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-dash-body">{recommendation.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {analysis.scenarioChoice && (
        <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold text-dash-heading">{t.why}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-dash-body">{analysis.scenarioChoice}</p>
          </div>
        </div>
      )}

      <p className="text-[10px] leading-relaxed text-gray-text-light">{t.aiDisclaimer}</p>
    </section>
  );
}
