import type { CampaignStatus } from "@/data/dashboard";

const statusStyles: Record<CampaignStatus, string> = {
  "En cours": "bg-[#ecfdf5] text-[#059669]",
  "Planifiée": "bg-blue-500/10 text-blue-500",
  "Terminée": "bg-slate-100 text-slate-500",
  "Brouillon": "bg-slate-100 text-slate-500",
  "En pause": "bg-orange-500/10 text-orange-500",
  "Annulée": "bg-red-600/10 text-red-600",
};

export function StatusPill({ status }: { status: CampaignStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
