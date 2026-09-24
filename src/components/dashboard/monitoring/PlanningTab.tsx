"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DiffusionStatusPill } from "./DiffusionStatusPill";
import { apiGetSchedule, ApiError } from "@/lib/api/client";
import type { BroadcastRecord } from "@/lib/api/types";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

function startOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day; // recule jusqu'au lundi
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function PlanningTab({ campaignId }: { campaignId: string }) {
  const ti = useT("dashInsights");
  const t = ti.monitoring.planning;
  const headers = ti.monitoring.headers;
  const f = useFormat();
  const formatDayLabel = (date: Date) => f.date(date, { weekday: "short", day: "numeric", month: "short" });
  const formatTime = (iso: string) => f.date(iso, { hour: "2-digit", minute: "2-digit" });
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [broadcasts, setBroadcasts] = useState<BroadcastRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => new Date(weekStart.getTime() + i * 86_400_000)),
    [weekStart]
  );
  const weekEnd = weekDays[6];

  useEffect(() => {
    apiGetSchedule(campaignId, {
      dateFrom: toDateKey(weekStart),
      dateTo: toDateKey(weekEnd),
      limit: 100,
    }).then(
      (result) => {
        setBroadcasts(result.items);
        setLoadError(null);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : t.loadError);
        setLoading(false);
      }
    );
    // weekEnd est dérivé de weekStart (même semaine) : l'inclure dupliquerait la dépendance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId, weekStart]);

  const byDay = useMemo(() => {
    const map = new Map<string, BroadcastRecord[]>();
    for (const broadcast of broadcasts) {
      const key = broadcast.scheduledAt.slice(0, 10);
      const list = map.get(key) ?? [];
      list.push(broadcast);
      map.set(key, list);
    }
    return map;
  }, [broadcasts]);

  // Pas de reset de `selectedDay` au changement de semaine (setState dans un
  // effet) : on retombe simplement sur le premier jour de la nouvelle
  // semaine tant que le jour choisi n'en fait plus partie.
  const weekDayKeys = useMemo(() => weekDays.map(toDateKey), [weekDays]);
  const activeDay = selectedDay && weekDayKeys.includes(selectedDay) ? selectedDay : weekDayKeys[0];
  const activeDayBroadcasts = (byDay.get(activeDay) ?? []).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-border bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-dash-heading">{t.title}</h2>
          <div className="flex items-center gap-2 rounded-full border border-border-light px-3 py-1.5 text-xs font-medium text-dash-body">
            <button type="button" aria-label={t.previousWeek} onClick={() => setWeekStart((d) => new Date(d.getTime() - 7 * 86_400_000))}>
              <ChevronLeft className="size-3.5" aria-hidden="true" />
            </button>
            {formatDayLabel(weekStart)} → {formatDayLabel(weekEnd)}
            <button type="button" aria-label={t.nextWeek} onClick={() => setWeekStart((d) => new Date(d.getTime() + 7 * 86_400_000))}>
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {loadError && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{loadError}</p>
        )}

        <div className="mt-4 grid grid-cols-4 gap-2.5 sm:grid-cols-7">
          {weekDays.map((day) => {
            const key = toDateKey(day);
            const dayBroadcasts = byDay.get(key) ?? [];
            const hasMissed = dayBroadcasts.some((b) => b.status === "MISSED");
            const isSelected = key === activeDay;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDay(key)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors ${
                  isSelected
                    ? "border-blue-500 bg-blue-500/5"
                    : hasMissed
                      ? "border-orange-300 bg-orange-500/5"
                      : "border-border-light"
                }`}
              >
                <span className="text-[11px] font-medium text-dash-muted">{formatDayLabel(day)}</span>
                <span className={`text-lg font-bold ${hasMissed ? "text-orange-600" : "text-dash-heading"}`}>
                  {dayBroadcasts.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h2 className="text-base font-semibold text-dash-heading">
          {fill(t.detail, { date: f.date(activeDay, { weekday: "long", day: "numeric", month: "long" }) })}
        </h2>
        <div className="mt-4 overflow-x-auto">
          {loading ? (
            <SkeletonRows rows={4} label={t.loading} />
          ) : (
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">
                  <th className="pb-2 pr-3">{headers.time}</th>
                  <th className="pb-2 pr-3">{headers.duration}</th>
                  <th className="pb-2">{headers.status}</th>
                </tr>
              </thead>
              <tbody>
                {activeDayBroadcasts.map((broadcast) => (
                  <tr key={broadcast.id} className="border-t border-border-light">
                    <td className="py-3 pr-3 font-semibold text-dash-heading">{formatTime(broadcast.scheduledAt)}</td>
                    <td className="py-3 pr-3 text-dash-body">{fill(ti.units.seconds, { count: broadcast.duration })}</td>
                    <td className="py-3">
                      <DiffusionStatusPill status={broadcast.status} />
                    </td>
                  </tr>
                ))}
                {activeDayBroadcasts.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-dash-muted">
                      {t.empty}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
