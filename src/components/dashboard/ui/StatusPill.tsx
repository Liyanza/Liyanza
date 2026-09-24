"use client";

import type { CampaignStatus } from "@/lib/api/types";
import { useT } from "@/i18n/client";

const statusStyles: Record<CampaignStatus, string> = {
  DRAFT: "bg-slate-100 text-slate-500",
  PLANNED: "bg-blue-500/10 text-blue-500",
  IN_PROGRESS: "bg-[#ecfdf5] text-[#059669]",
  COMPLETED: "bg-slate-100 text-slate-600",
  CANCELLED: "bg-red-600/10 text-red-600",
};

export function StatusPill({ status }: { status: CampaignStatus }) {
  const label = useT("dash").statuses[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[status]}`}
    >
      {label}
    </span>
  );
}
