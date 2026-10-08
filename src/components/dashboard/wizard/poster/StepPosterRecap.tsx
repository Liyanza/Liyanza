"use client";

import { AlertCircle } from "lucide-react";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import type { PosterPlacement } from "./StepPosterPlacements";

/** Récapitulatif avant création de la campagne d'affichage. */
export function StepPosterRecap({
  name,
  product,
  budget,
  startDate,
  endDate,
  placements,
  error,
}: {
  name: string;
  product: string;
  budget: number;
  startDate: string;
  endDate: string;
  placements: PosterPlacement[];
  error: string | null;
}) {
  const t = useT("dashWizard").poster;
  const f = useFormat();
  const day = (iso: string) => f.date(iso, { day: "numeric", month: "short", year: "numeric" });
  const rows: [string, string][] = [
    [t.recap.name, name],
    [t.recap.product, product],
    [t.recap.budget, f.money(budget)],
    [t.recap.period, `${day(startDate)} – ${day(endDate)}`],
    [t.recap.placements, String(placements.length)],
  ];

  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-4 py-5">
      <div>
        <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">{t.recap.title}</h1>
        <p className="mt-1 text-sm text-dash-body">{t.recap.subtitle}</p>
      </div>

      {error && (
        <p className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <dl className="divide-y divide-border-light rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
            <dt className="text-dash-muted">{label}</dt>
            <dd className="text-right font-semibold text-dash-heading">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <h2 className="text-sm font-semibold text-dash-heading">{fill(t.placements.listTitle, { count: placements.length })}</h2>
        <ol className="mt-3 flex flex-col gap-2">
          {placements.map((p, index) => (
            <li key={p.key} className="flex items-center justify-between gap-3 text-xs">
              <span className="min-w-0 truncate text-dash-heading">
                <span className="mr-2 font-bold text-blue-600">{index + 1}.</span>
                {t.placements.kinds[p.kind]} — {p.location}
              </span>
              <span className="shrink-0 text-dash-muted">{day(p.date)}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
