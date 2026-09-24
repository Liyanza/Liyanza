"use client";

import type { BroadcastStatus } from "@/lib/api/types";
import { useT } from "@/i18n/client";

// Statuts réels `BroadcastStatus` (Prisma) + les statuts dérivés que
// `DiffusionsService.getRapportConformite` calcule côté serveur pour les
// diffusions encore PLANNED (PENDING = à venir, MISSED = échue sans constat)
// sans jamais les persister comme tels — voir rapport-conformite.dto.ts.
type DisplayStatus = BroadcastStatus | "PENDING";

const STATUS_CLASS: Record<DisplayStatus, string> = {
  BROADCASTED: "bg-green-accent-dark/10 text-green-accent-dark",
  PLANNED: "bg-blue-500/10 text-blue-500",
  PENDING: "bg-blue-500/10 text-blue-500",
  MISSED: "bg-orange-500/10 text-orange-500",
  CANCELLED: "bg-slate-100 text-slate-500",
};

export function DiffusionStatusPill({ status }: { status: DisplayStatus }) {
  const labels = useT("dashInsights").diffusionStatuses;
  const meta = { label: labels[status] ?? status, className: STATUS_CLASS[status] ?? "bg-slate-100 text-slate-500" };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.className}`}>
      {meta.label}
    </span>
  );
}
