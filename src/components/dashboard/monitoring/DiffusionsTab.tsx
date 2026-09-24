"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DiffusionStatusPill } from "./DiffusionStatusPill";
import { apiGetSchedule, ApiError } from "@/lib/api/client";
import type { BroadcastRecord } from "@/lib/api/types";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

const PAGE_SIZE = 20;

export function DiffusionsTab({ campaignId }: { campaignId: string }) {
  const ti = useT("dashInsights");
  const t = ti.monitoring.diffusions;
  const headers = ti.monitoring.headers;
  const f = useFormat();
  const dateTime = (iso: string) => f.date(iso, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<BroadcastRecord[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    apiGetSchedule(campaignId, {
      page,
      limit: PAGE_SIZE,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
    }).then(
      (result) => {
        setItems(result.items);
        setTotalPages(result.totalPages);
        setLoadError(null);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : t.loadError);
        setLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- messages stables, rechargement sur l'identifiant seulement
  }, [campaignId, dateFrom, dateTo, page]);

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-dash-heading">{t.title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-dash-muted">
            {t.from}
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => {
                setPage(1);
                setDateFrom(event.target.value);
              }}
              className="rounded-full border border-border-light px-3 py-1.5 text-xs text-dash-heading outline-none"
            />
          </label>
          <label className="flex items-center gap-1.5 text-xs text-dash-muted">
            {t.to}
            <input
              type="date"
              value={dateTo}
              onChange={(event) => {
                setPage(1);
                setDateTo(event.target.value);
              }}
              className="rounded-full border border-border-light px-3 py-1.5 text-xs text-dash-heading outline-none"
            />
          </label>
        </div>
      </div>

      {loadError && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{loadError}</p>
      )}

      <div className="mt-4 overflow-x-auto">
        {loading ? (
          <SkeletonRows rows={4} label={t.loading} />
        ) : (
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">
                <th className="pb-2 pr-3">{headers.scheduled}</th>
                <th className="pb-2 pr-3">{headers.duration}</th>
                <th className="pb-2 pr-3">{headers.actual}</th>
                <th className="pb-2">{headers.status}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((broadcast) => (
                <tr key={broadcast.id} className="border-t border-border-light">
                  <td className="py-3 pr-3 font-semibold text-dash-heading">{dateTime(broadcast.scheduledAt)}</td>
                  <td className="py-3 pr-3 text-dash-body">{fill(ti.units.seconds, { count: broadcast.duration })}</td>
                  <td className="py-3 pr-3 text-dash-body">
                    {broadcast.actualBroadcastAt ? dateTime(broadcast.actualBroadcastAt) : "—"}
                  </td>
                  <td className="py-3">
                    <DiffusionStatusPill status={broadcast.status} />
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-dash-muted">
                    {t.empty}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3 text-xs font-medium text-dash-body">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label={t.previous}
            className="flex size-7 items-center justify-center rounded-full border border-border-light disabled:opacity-40"
          >
            <ChevronLeft className="size-3.5" aria-hidden="true" />
          </button>
          {fill(t.page, { page, total: totalPages })}
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label={t.next}
            className="flex size-7 items-center justify-center rounded-full border border-border-light disabled:opacity-40"
          >
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
