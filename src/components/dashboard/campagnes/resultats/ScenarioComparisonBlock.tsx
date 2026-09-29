"use client";

import { MousePointerClick, Star } from "lucide-react";
import type { DigitalSimulationScenario } from "@/lib/api/types";
import { useFormat, useT } from "@/i18n/client";
import { hasDetail } from "./scenarioView";

function ScenarioMetrics({ scenario }: { scenario: DigitalSimulationScenario }) {
  const t = useT("dashCampaigns").results.metrics;
  const f = useFormat();
  // Notation compacte (125K / 125 k) selon la langue.
  const formatCompact = (value: number) =>
    value >= 1000 ? f.number(value, { notation: "compact", maximumFractionDigits: 1 }) : f.number(value);
  const metrics = [
    { label: t.reach, value: formatCompact(scenario.predictedReach) },
    { label: t.clicks, value: formatCompact(scenario.predictedClicks) },
    { label: t.conversionsShort, value: formatCompact(scenario.predictedConversions) },
    { label: t.roi, value: `${scenario.predictedRoas}x` },
  ];

  return (
    <div className="mt-3 grid grid-cols-4 gap-2">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-lg border border-border-light bg-white/80 py-2 text-center">
          <p className="text-[13px] font-bold text-dash-heading">{metric.value}</p>
          <p className="text-[10px] text-dash-muted">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Scénarios comparés, tous cliquables : le scénario choisi est détaillé
 * dans les onglets en dessous. Le recommandé est présélectionné.
 */
export function ScenarioComparisonBlock({
  scenarios,
  selectedId,
  onSelect,
}: {
  scenarios: DigitalSimulationScenario[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
}) {
  const t = useT("dashCampaigns").results.scenarios;
  // Le recommandé d'abord, puis les autres dans l'ordre du moteur.
  const ordered = [...scenarios].sort((a, b) => Number(b.isRecommended) - Number(a.isRecommended));
  const detailed = scenarios.some(hasDetail);

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-dash-heading">{t.title}</h2>
        {detailed && (
          <p className="flex items-center gap-1.5 text-[11px] text-dash-muted">
            <MousePointerClick className="size-3.5" aria-hidden="true" />
            {t.selectHint}
          </p>
        )}
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3" role="radiogroup" aria-label={t.title}>
        {ordered.map((scenario) => {
          const selected = scenario.id === selectedId;
          const clickable = detailed ? hasDetail(scenario) : false;
          const label = scenario.strategy ? t.strategies[scenario.strategy].label : scenario.label;
          const description = scenario.strategy ? t.strategies[scenario.strategy].description : null;
          return (
            <button
              key={scenario.id}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={!clickable && !selected}
              onClick={() => onSelect(scenario.id)}
              className={`flex flex-col rounded-xl p-4 text-left transition-colors ${
                selected
                  ? "border-2 border-blue-500 bg-blue-500/5"
                  : "border border-border-light bg-white hover:border-blue-300 disabled:cursor-default disabled:hover:border-border-light"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  {scenario.isRecommended && <Star className="size-4 shrink-0 text-blue-500" aria-hidden="true" />}
                  <span className="truncate text-sm font-bold text-dash-heading">{label}</span>
                </div>
                <span className="shrink-0 text-right text-[10px] font-semibold text-dash-muted">
                  {t.score}
                  <span className="ml-1 text-sm font-bold text-dash-heading">{scenario.score}</span>/100
                </span>
              </div>
              {scenario.isRecommended && (
                <span className="mt-1.5 w-fit rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  {t.recommended}
                </span>
              )}
              {description && <p className="mt-2 text-[11px] leading-relaxed text-dash-body">{description}</p>}
              <ScenarioMetrics scenario={scenario} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
