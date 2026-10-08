"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Loader2, RadioTower } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiRecordBroadcast, ApiError } from "@/lib/api/client";
import type { RapportConformiteItem } from "@/lib/api/types";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { LATE_THRESHOLD_MINUTES, punctuality } from "./conformityAnalysis";
import { useConformityReport } from "./useConformityReport";

/** AAAA-MM-JJTHH:MM local, pour un <input type="datetime-local">. */
function localInputValue(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function ConstatRow({ item, canRecord, onDone }: { item: RapportConformiteItem; canRecord: boolean; onDone: () => void }) {
  const t = useT("dashInsights").monitoring.alerts;
  const f = useFormat();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => localInputValue(item.scheduledAt));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function save() {
    setSaving(true);
    setError(null);
    apiRecordBroadcast(item.diffusionId, new Date(value).toISOString()).then(
      () => {
        setSaving(false);
        setOpen(false);
        onDone();
      },
      (err: unknown) => {
        setError(err instanceof ApiError ? err.message : t.recordError);
        setSaving(false);
      }
    );
  }

  return (
    <li className="rounded-xl border border-border-light p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-dash-heading">
          {f.date(item.scheduledAt, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
        </span>
        {canRecord && !open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full bg-green-accent-dark px-3.5 py-1.5 text-xs font-semibold text-white"
          >
            {t.record}
          </button>
        )}
      </div>
      {open && (
        <div className="mt-2.5 flex flex-wrap items-end gap-2">
          <label className="flex flex-col gap-1 text-[11px] font-semibold text-dash-muted">
            {t.actualTime}
            <input
              type="datetime-local"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-dash-heading outline-none focus:border-green-accent-dark"
            />
          </label>
          <button
            type="button"
            disabled={saving || !value}
            onClick={save}
            className="flex items-center gap-1.5 rounded-full bg-green-accent-dark px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            {saving && <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />}
            {t.confirm}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="px-2 py-2 text-xs font-semibold text-dash-muted">
            {t.cancel}
          </button>
          {error && <p className="w-full text-xs font-medium text-red-600">{error}</p>}
        </div>
      )}
    </li>
  );
}

/**
 * Alertes de diffusion : passages manqués (heure passée sans constat), avec
 * constat possible pour les responsables ; retards ; prochains passages.
 */
export function AlertsTab({ campaignId }: { campaignId: string }) {
  const ti = useT("dashInsights");
  const t = ti.monitoring.alerts;
  const f = useFormat();
  const { user } = useAuth();
  const canRecord = user?.role === "ADMIN" || user?.role === "MARKETING_MANAGER";
  const { report, error, loading, reload } = useConformityReport(campaignId, t.loadError);
  // Instant de référence des « prochaines 24 h », figé à l'ouverture de l'onglet.
  const [now] = useState(() => Date.now());

  if (loading) return <SkeletonRows rows={4} label={t.loading} />;
  if (error || !report) return <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{error}</p>;

  const missed = report.diffusions.filter((d) => d.status === "MISSED");
  const late = punctuality(report.diffusions).late;
  const soon = report.diffusions.filter(
    (d) => d.status === "PENDING" && new Date(d.scheduledAt).getTime() - now < 24 * 3600 * 1000
  );

  if (missed.length === 0 && late.length === 0 && soon.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-10 text-center">
        <CheckCircle2 className="size-8 text-green-accent-dark" aria-hidden="true" />
        <p className="text-sm font-semibold text-dash-heading">{t.allGood}</p>
        <p className="text-xs text-dash-muted">{t.allGoodText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {missed.length > 0 && (
        <section className="rounded-2xl border border-red-600/20 bg-white p-5 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-red-700">
            <AlertTriangle className="size-4" aria-hidden="true" />
            {fill(t.missedTitle, { count: missed.length })}
          </h2>
          <p className="mt-1 text-xs text-dash-muted">{canRecord ? t.missedText : t.missedTextReadOnly}</p>
          <ul className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
            {missed.map((item) => (
              <ConstatRow key={item.diffusionId} item={item} canRecord={canRecord} onDone={reload} />
            ))}
          </ul>
        </section>
      )}

      {late.length > 0 && (
        <section className="rounded-2xl border border-orange-500/20 bg-white p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-orange-600">
            <Clock className="size-4" aria-hidden="true" />
            {fill(t.lateTitle, { count: late.length, minutes: LATE_THRESHOLD_MINUTES })}
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5 text-xs">
            {late.map((item) => (
              <li key={item.diffusionId} className="flex justify-between gap-3 text-dash-body">
                <span>{f.date(item.scheduledAt, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                <span className="font-semibold text-orange-600">
                  {fill((item.ecartMinutes ?? 0) > 0 ? t.lateBy : t.earlyBy, { minutes: Math.abs(item.ecartMinutes ?? 0) })}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {soon.length > 0 && (
        <section className="rounded-2xl border border-border bg-white p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-dash-heading">
            <RadioTower className="size-4 text-blue-500" aria-hidden="true" />
            {fill(t.soonTitle, { count: soon.length })}
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5 text-xs text-dash-body">
            {soon.map((item) => (
              <li key={item.diffusionId}>{f.date(item.scheduledAt, { weekday: "long", hour: "2-digit", minute: "2-digit" })}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
