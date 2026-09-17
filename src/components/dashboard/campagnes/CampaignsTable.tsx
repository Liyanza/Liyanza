import { Eye, MoreHorizontal, SearchX } from "lucide-react";
import type { CampaignListRow } from "@/data/dashboard";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";
import { ProgressBar } from "@/components/dashboard/ui/ProgressBar";

export function CampaignsTable({ rows }: { rows: CampaignListRow[] }) {
  return (
    <div className="overflow-hidden rounded-[5px] border border-border bg-white">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ecfdf5]">
            <Eye className="size-3.5 text-green-accent-dark" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-black">Campagnes récentes</h2>
            <p className="text-[11px] text-gray-text">Suivez l&apos;évolution de vos campagnes et leurs performances.</p>
          </div>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
          <SearchX className="size-8 text-gray-text-light" aria-hidden="true" />
          <p className="text-sm font-semibold text-black">Aucune campagne ne correspond à ces filtres</p>
          <p className="text-xs text-gray-text">Essayez une autre recherche ou réinitialisez les filtres.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold text-gray-text">
                <th className="px-5 py-2.5">Campagne</th>
                <th className="px-5 py-2.5">Canal</th>
                <th className="px-5 py-2.5">Statut</th>
                <th className="px-5 py-2.5">Performance</th>
                <th className="px-5 py-2.5">Budget</th>
                <th className="px-5 py-2.5">Dépenses</th>
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
                        style={{ backgroundColor: row.avatarColor }}
                      >
                        {row.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-black">{row.name}</p>
                        <p className="truncate text-[10px] text-gray-text-light">{row.dateRange}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1.5 text-xs text-gray-700">
                      <span className="size-2 rounded-full" style={{ backgroundColor: row.channelColor }} aria-hidden="true" />
                      {row.channel}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="px-5 py-3 text-xs font-semibold text-green-accent-dark">{row.performance}</td>
                  <td className="px-5 py-3 text-xs text-gray-700">{row.budget}</td>
                  <td className="px-5 py-3">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-semibold text-[#141b2b]">{row.spend}</span>
                      <ProgressBar value={row.spendShare} barClassName="bg-blue-500" trackClassName="bg-blue-500/15" className="w-24" height="h-1" />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <button type="button" aria-label={`Actions pour ${row.name}`} className="text-lg font-bold text-gray-text hover:text-black">
                      <MoreHorizontal className="size-4" aria-hidden="true" />
                    </button>
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
