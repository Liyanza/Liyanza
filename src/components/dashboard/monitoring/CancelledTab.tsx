"use client";

import { Ban } from "lucide-react";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { useConformityReport } from "./useConformityReport";

/**
 * Diffusions annulées (campagne annulée ou passage retiré) : exclues du
 * taux de conformité, listées ici pour la facturation et le suivi.
 */
export function CancelledTab({ campaignId }: { campaignId: string }) {
  const t = useT("dashInsights").monitoring.cancelled;
  const f = useFormat();
  const { report, error, loading } = useConformityReport(campaignId, t.loadError);

  if (loading) return <SkeletonRows rows={3} label={t.loading} />;
  if (error || !report) return <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{error}</p>;

  const cancelled = report.diffusions.filter((d) => d.status === "CANCELLED");
  if (cancelled.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-10 text-center">
        <Ban className="size-7 text-dash-muted" aria-hidden="true" />
        <p className="text-sm text-dash-muted">{t.empty}</p>
      </div>
    );
  }
  return (
    <section className="rounded-2xl border border-border bg-white p-5">
      <h2 className="text-sm font-semibold text-dash-heading">{fill(t.title, { count: cancelled.length })}</h2>
      <p className="mt-1 text-xs text-dash-muted">{t.text}</p>
      <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-xs text-dash-body sm:grid-cols-2 lg:grid-cols-3">
        {cancelled.map((item) => (
          <li key={item.diffusionId} className="flex items-center gap-2">
            <Ban className="size-3.5 shrink-0 text-dash-muted" aria-hidden="true" />
            {f.date(item.scheduledAt, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
          </li>
        ))}
      </ul>
    </section>
  );
}
