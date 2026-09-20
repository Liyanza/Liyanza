import type { BroadcastStatus } from "@/lib/api/types";

// Statuts réels `BroadcastStatus` (Prisma) + les statuts dérivés que
// `DiffusionsService.getRapportConformite` calcule côté serveur pour les
// diffusions encore PLANNED (PENDING = à venir, MISSED = échue sans constat)
// sans jamais les persister comme tels — voir rapport-conformite.dto.ts.
type DisplayStatus = BroadcastStatus | "PENDING";

const STATUS_META: Record<DisplayStatus, { label: string; className: string }> = {
  BROADCASTED: { label: "Diffusé", className: "bg-green-accent-dark/10 text-green-accent-dark" },
  PLANNED: { label: "Planifié", className: "bg-blue-500/10 text-blue-500" },
  PENDING: { label: "À venir", className: "bg-blue-500/10 text-blue-500" },
  MISSED: { label: "Manqué", className: "bg-orange-500/10 text-orange-500" },
  CANCELLED: { label: "Annulé", className: "bg-slate-100 text-slate-500" },
};

export function DiffusionStatusPill({ status }: { status: DisplayStatus }) {
  const meta = STATUS_META[status] ?? { label: status, className: "bg-slate-100 text-slate-500" };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.className}`}>
      {meta.label}
    </span>
  );
}
