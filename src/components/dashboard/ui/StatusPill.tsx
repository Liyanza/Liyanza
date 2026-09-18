import type { CampaignStatus } from "@/lib/api/types";

const statusMeta: Record<CampaignStatus, { label: string; className: string }> = {
  DRAFT: { label: "Brouillon", className: "bg-slate-100 text-slate-500" },
  PLANNED: { label: "Planifiée", className: "bg-blue-500/10 text-blue-500" },
  IN_PROGRESS: { label: "En cours", className: "bg-[#ecfdf5] text-[#059669]" },
  COMPLETED: { label: "Terminée", className: "bg-slate-100 text-slate-600" },
  CANCELLED: { label: "Annulée", className: "bg-red-600/10 text-red-600" },
};

export function StatusPill({ status }: { status: CampaignStatus }) {
  const meta = statusMeta[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}
