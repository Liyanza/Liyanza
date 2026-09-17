"use client";

import { useState } from "react";
import { performanceSeries, performanceTotals } from "@/data/dashboard";

const periods = ["7j", "30j", "90j"] as const;

const series = [
  { key: "reach" as const, label: "Portée", color: "#296bd6" },
  { key: "clicks" as const, label: "Clics", color: "#00a846" },
  { key: "conversions" as const, label: "Conversions", color: "#f97316" },
];

const CHART_WIDTH = 760;
const CHART_HEIGHT = 220;
const PAD_X = 6;
const PAD_TOP = 14;
const PAD_BOTTOM = 14;

function buildPoints(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const innerWidth = CHART_WIDTH - PAD_X * 2;
  const innerHeight = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;

  return values.map((value, index) => {
    const x = PAD_X + (index / (values.length - 1)) * innerWidth;
    const y = PAD_TOP + innerHeight - ((value - min) / span) * innerHeight;
    return { x, y };
  });
}

export function PerformanceChart() {
  const [period, setPeriod] = useState<(typeof periods)[number]>("7j");

  const lines = series.map((s) => ({
    ...s,
    points: buildPoints(performanceSeries.map((p) => p[s.key])),
  }));

  return (
    <div className="rounded-[5px] border border-border bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-black">Performance de vos campagnes</h2>
          <p className="mt-0.5 text-[11px] text-gray-text">
            Suivez l&apos;évolution de vos résultats sur la période sélectionnée.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            {series.map((s) => (
              <span key={s.key} className="flex items-center gap-1.5 text-[11px] text-gray-text">
                <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} aria-hidden="true" />
                {s.label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1">
            {periods.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                aria-pressed={period === p}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  period === p ? "bg-dash-pill-bg text-black" : "text-gray-text hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-56 w-full"
          role="img"
          aria-label="Évolution de la portée, des clics et des conversions sur 7 jours"
        >
          {lines.map((line) => (
            <polyline
              key={line.key}
              points={line.points.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke={line.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {lines.map((line) => {
            const last = line.points[line.points.length - 1];
            return (
              <circle key={`${line.key}-dot`} cx={last.x} cy={last.y} r={4} fill={line.color} stroke="white" strokeWidth={1.5} />
            );
          })}
        </svg>

        <div className="pointer-events-none absolute left-[52%] top-2 w-[190px] -translate-x-1/2 rounded-lg border border-border bg-white p-3 shadow-[0_6px_15px_-4px_rgba(0,0,0,0.15)]">
          <p className="text-[11px] font-semibold text-black">{performanceTotals.date}</p>
          <dl className="mt-1.5 space-y-1">
            {[
              { label: "Portée", value: performanceTotals.reach, color: "#296bd6" },
              { label: "Clics", value: performanceTotals.clicks, color: "#00a846" },
              { label: "Conversions", value: performanceTotals.conversions, color: "#f97316" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 text-[11px]">
                <dt className="flex items-center gap-1.5 text-gray-text">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: row.color }} aria-hidden="true" />
                  {row.label}
                </dt>
                <dd className="font-semibold text-black">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-1 flex justify-between text-[10px] text-gray-text-light">
          {performanceSeries.map((point) => (
            <span key={point.label}>{point.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
