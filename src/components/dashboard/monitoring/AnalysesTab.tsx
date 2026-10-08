"use client";

import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { groupBy, ON_TIME_MINUTES, punctuality, weekStart, type Bucket } from "./conformityAnalysis";
import { useConformityReport } from "./useConformityReport";

const WEEKDAY_ORDER = ["1", "2", "3", "4", "5", "6", "0"];

function pct(value: number | null) {
  return value === null ? "—" : `${Math.round(value * 100)} %`;
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-dash-heading">{value}</p>
      <p className="mt-0.5 text-[11px] text-dash-muted">{hint}</p>
    </div>
  );
}

/**
 * Taux de conformité par groupe : une seule série (barres verticales fines,
 * extrémité arrondie, valeur au-dessus), détail au survol.
 */
function RateBars({ title, buckets, labelOf }: { title: string; buckets: Bucket[]; labelOf: (key: string) => string }) {
  const t = useT("dashInsights").monitoring.analyses;
  const played = buckets.some((b) => b.rate !== null);
  return (
    <section className="rounded-2xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-dash-heading">{title}</h3>
      {!played ? (
        <p className="mt-6 text-center text-xs text-dash-muted">{t.noData}</p>
      ) : (
        <div className="mt-4 flex h-44 items-end gap-2 border-b border-border-light" role="list">
          {buckets.map((b) => {
            const label = labelOf(b.key);
            const detail = fill(t.barDetail, { broadcasted: b.broadcasted, missed: b.missed });
            return (
              <div
                key={b.key}
                role="listitem"
                tabIndex={0}
                aria-label={`${label} : ${pct(b.rate)} (${detail})`}
                className="group relative flex h-full min-w-0 flex-1 flex-col items-center justify-end outline-none"
              >
                <span className="mb-1 text-[10px] font-semibold text-dash-body">{b.rate === null ? "" : pct(b.rate)}</span>
                <span
                  className="w-full max-w-[28px] rounded-t-[4px] bg-[#00a846] transition-opacity group-hover:opacity-80"
                  style={{ height: b.rate === null ? 0 : `${Math.max(2, b.rate * 100) * 0.8}%` }}
                />
                <span className="pointer-events-none absolute bottom-full z-10 mb-1 hidden whitespace-nowrap rounded-lg bg-dash-heading px-2.5 py-1.5 text-[11px] text-white shadow group-hover:block group-focus:block">
                  <strong>{label}</strong> · {detail}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {played && (
        <div className="mt-1.5 flex gap-2">
          {buckets.map((b) => (
            <span key={b.key} className="min-w-0 flex-1 truncate text-center text-[10px] text-dash-muted">
              {labelOf(b.key)}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

/** Analyses de conformité et de ponctualité, calculées sur le rapport de diffusion. */
export function AnalysesTab({ campaignId }: { campaignId: string }) {
  const t = useT("dashInsights").monitoring.analyses;
  const f = useFormat();
  const { report, error, loading } = useConformityReport(campaignId, t.loadError);

  if (loading) return <SkeletonRows rows={4} label={t.loading} />;
  if (error || !report) return <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{error}</p>;

  const items = report.diffusions;
  const p = punctuality(items);
  const byWeekday = groupBy(items, (d) => String(d.getDay()), WEEKDAY_ORDER);
  // Heures où au moins une diffusion est déjà passée (diffusée ou manquée).
  const played = items.filter((i) => i.status === "BROADCASTED" || i.status === "MISSED");
  const usedHours = [...new Set(played.map((i) => new Date(i.scheduledAt).getHours()))].sort((a, b) => a - b);
  const byHour = groupBy(items, (d) => String(d.getHours()).padStart(2, "0"), usedHours.map((h) => String(h).padStart(2, "0")));
  const byWeek = groupBy(items, weekStart).slice(-8);
  // 2026-10-05 est un lundi : sert à nommer les jours dans la langue courante.
  const weekdayLabel = (key: string) => f.date(new Date(2026, 9, 4 + (Number(key) || 7)), { weekday: "short" });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label={t.compliance} value={pct(report.tauxConformite)} hint={fill(t.complianceHint, { broadcasted: report.diffusionsDiffusees, missed: report.diffusionsManquees })} />
        <Stat label={t.onTime} value={pct(p.onTimeRate)} hint={fill(t.onTimeHint, { minutes: ON_TIME_MINUTES })} />
        <Stat
          label={t.averageGap}
          value={p.averageGap === null ? "—" : fill(t.minutes, { count: Math.round(p.averageGap) })}
          hint={fill(t.averageGapHint, { count: p.measured })}
        />
        <Stat label={t.upcoming} value={String(report.diffusionsEnAttente)} hint={fill(t.upcomingHint, { total: report.totalDiffusions })} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RateBars title={t.byWeekday} buckets={byWeekday} labelOf={weekdayLabel} />
        <RateBars title={t.byHour} buckets={byHour} labelOf={(key) => `${key}h`} />
      </div>
      <RateBars
        title={t.byWeek}
        buckets={byWeek}
        labelOf={(key) => fill(t.weekOf, { date: f.date(key, { day: "numeric", month: "short" }) })}
      />
    </div>
  );
}
