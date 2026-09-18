import { Eye, SearchX } from "lucide-react";
import type { CampagneRecord } from "@/lib/api/types";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";

const TYPE_LABELS: Record<CampagneRecord["type"], string> = {
  DIGITAL: "Digital",
  RADIO: "Radio",
  POSTER: "Affichage",
};

const TYPE_COLORS: Record<CampagneRecord["type"], string> = {
  DIGITAL: "#3b82f6",
  RADIO: "#f97316",
  POSTER: "#8b5cf6",
};

// Couleur d'avatar dérivée du nom : aucune donnée backend équivalente, mais
// stable (même campagne = même couleur à chaque rendu) grâce au hash de l'id.
const AVATAR_COLORS = ["#3b82f6", "#00a846", "#f97316", "#8b5cf6", "#e93c16"];

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

function colorFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function formatDateRange(startDate: string, endDate: string) {
  const fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  return `${fmt.format(new Date(startDate))} – ${fmt.format(new Date(endDate))}`;
}

function formatBudget(amount: number) {
  return `${Math.round(amount).toLocaleString("fr-FR")} FCFA`;
}

export function CampaignsTable({
  rows,
  title = "Campagnes récentes",
  description = "Suivez l'évolution de vos campagnes et leurs performances.",
  viewAllHref,
}: {
  rows: CampagneRecord[];
  title?: string;
  description?: string;
  viewAllHref?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[5px] border border-border bg-white">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ecfdf5]">
            <Eye className="size-3.5 text-green-accent-dark" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-black">{title}</h2>
            <p className="text-[11px] text-gray-text">{description}</p>
          </div>
        </div>
        {viewAllHref && (
          <a href={viewAllHref} className="text-xs font-semibold text-green-accent-dark">
            Voir toutes
          </a>
        )}
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
          <SearchX className="size-8 text-gray-text-light" aria-hidden="true" />
          <p className="text-sm font-semibold text-black">Aucune campagne ne correspond à ces filtres</p>
          <p className="text-xs text-gray-text">Essayez une autre recherche ou réinitialisez les filtres.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold text-gray-text">
                <th className="px-5 py-2.5">Campagne</th>
                <th className="px-5 py-2.5">Type</th>
                <th className="px-5 py-2.5">Statut</th>
                <th className="px-5 py-2.5">Budget prévu</th>
                <th className="px-5 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-border-light">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[9px] font-black text-white"
                        style={{ backgroundColor: colorFor(row.id) }}
                      >
                        {initialsOf(row.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-black">{row.name}</p>
                        <p className="truncate text-[10px] text-gray-text-light">
                          {formatDateRange(row.startDate, row.endDate)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1.5 text-xs text-gray-700">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: TYPE_COLORS[row.type] }}
                        aria-hidden="true"
                      />
                      {TYPE_LABELS[row.type]}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-700">{formatBudget(row.plannedBudget)}</td>
                  <td className="px-5 py-3">
                    {row.type === "DIGITAL" ? (
                      <a
                        href={`/dashboard/campagnes/${row.id}/resultats`}
                        className="text-xs font-semibold text-green-accent-dark hover:underline"
                      >
                        Voir
                      </a>
                    ) : (
                      <span className="text-xs text-gray-text-light">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
