import { Grip, MoreHorizontal } from "lucide-react";
import { recentCampaigns } from "@/data/dashboard";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";

export function RecentCampaignsTable() {
  return (
    <div className="flex h-full flex-col rounded-[5px] border border-border bg-white">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ecfdf5]">
            <Grip className="size-3.5 text-green-accent-dark" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-black">Campagnes récentes</h2>
            <p className="text-[11px] text-gray-text">Suivez l&apos;évolution de vos campagnes et leurs performances.</p>
          </div>
        </div>
        <a href="/dashboard/campagnes" className="text-xs font-semibold text-green-accent-dark">
          Voir toutes
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="text-[11px] font-semibold text-gray-text">
              <th className="px-5 py-2.5">Campagne</th>
              <th className="px-5 py-2.5">Canal</th>
              <th className="px-5 py-2.5">Statut</th>
              <th className="px-5 py-2.5">Performance</th>
              <th className="px-5 py-2.5">Budget</th>
              <th className="px-5 py-2.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentCampaigns.map((row) => (
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
                  <button type="button" aria-label={`Actions pour ${row.name}`} className="text-gray-text hover:text-black">
                    <MoreHorizontal className="size-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
