"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Bell, CheckCircle2, Info, XCircle } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { Pagination } from "@/components/dashboard/campagnes/Pagination";
import { apiListNotifications, apiMarkNotificationRead, ApiError } from "@/lib/api/client";
import type { NotificationReadStatus, NotificationRecord } from "@/lib/api/types";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";

const PAGE_SIZE = 10;

// Statuts réservés (job de la couleur = état, jamais l'identité d'une
// "série") — icône + libellé toujours présents, jamais la couleur seule.
const TYPE_META: Record<NotificationRecord["type"], { icon: typeof Info; className: string }> = {
  INFO: { icon: Info, className: "bg-blue-500/10 text-blue-500" },
  WARNING: { icon: AlertTriangle, className: "bg-amber-500/10 text-amber-500" },
  ERROR: { icon: XCircle, className: "bg-red-600/10 text-red-600" },
  SUCCESS: { icon: CheckCircle2, className: "bg-green-accent-dark/10 text-green-accent-dark" },
};

const FILTERS: { label: string; value: NotificationReadStatus | "ALL" }[] = [
  { label: "Toutes", value: "ALL" },
  { label: "Non lues", value: "UNREAD" },
  { label: "Lues", value: "READ" },
];

function formatSentAt(value: string) {
  const date = new Date(value);
  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diffMinutes < 1) return "À l'instant";
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Il y a ${diffHours} h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `Il y a ${diffDays} j`;
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export function NotificationsClient() {
  const [filter, setFilter] = useState<NotificationReadStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<NotificationRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    return apiListNotifications({ readStatus: filter, page, limit: PAGE_SIZE }).then(
      (result) => {
        setItems(result.items);
        setTotal(result.total);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : "Impossible de charger les notifications.");
        setLoading(false);
      }
    );
  }, [filter, page]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  function handleFilterChange(value: NotificationReadStatus | "ALL") {
    setFilter(value);
    setPage(1);
    setLoading(true);
    setLoadError(null);
  }

  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    setLoading(true);
    setLoadError(null);
  }

  function handleMarkRead(id: string) {
    setMarkingId(id);
    apiMarkNotificationRead(id).then(
      (updated) => {
        setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
        setMarkingId(null);
      },
      () => {
        setMarkingId(null);
      }
    );
  }

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <TopBar title="Notifications" />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="flex flex-col gap-6 px-8 py-6">
          <div className="flex w-fit flex-wrap items-center gap-1 rounded-full border border-border bg-white p-1">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => handleFilterChange(item.value)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  filter === item.value
                    ? "bg-green-accent-dark text-white shadow-sm"
                    : "text-gray-text hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {loadError && <p className="text-sm text-red-600">{loadError}</p>}

          <div className="overflow-hidden rounded-[5px] border border-border bg-white">
            {loading ? (
              <SkeletonRows rows={5} label="Chargement des notifications…" />
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
                <Bell className="size-8 text-gray-text-light" aria-hidden="true" />
                <p className="text-sm font-semibold text-black">Aucune notification</p>
              </div>
            ) : (
              items.map((item) => {
                const meta = TYPE_META[item.type];
                const Icon = meta.icon;
                const isUnread = item.readStatus === "UNREAD";
                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 border-t border-border-light px-5 py-4 first:border-t-0 ${
                      isUnread ? "bg-green-accent-dark/[0.03]" : ""
                    }`}
                  >
                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${meta.className}`}>
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-black">{item.title}</p>
                        {isUnread && (
                          <span className="size-1.5 shrink-0 rounded-full bg-green-accent-dark" aria-hidden="true" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-gray-text">{item.message}</p>
                      <p className="mt-1.5 text-[10px] text-gray-text-light">{formatSentAt(item.sentAt)}</p>
                    </div>
                    {isUnread && (
                      <button
                        type="button"
                        disabled={markingId === item.id}
                        onClick={() => handleMarkRead(item.id)}
                        className="shrink-0 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold text-dash-body hover:bg-slate-50 disabled:opacity-50"
                      >
                        {markingId === item.id ? "..." : "Marquer comme lue"}
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <Pagination page={page} pageCount={pageCount} total={total} pageSize={PAGE_SIZE} onChange={handlePageChange} />
        </div>
      </main>
    </>
  );
}
