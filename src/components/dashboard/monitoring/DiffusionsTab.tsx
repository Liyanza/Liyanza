import { ChevronDown, Filter, AlertTriangle } from "lucide-react";
import { DiffusionStatusPill } from "./DiffusionStatusPill";
import { recentDiffusions, latestProofs } from "@/data/monitoring";

const FILTERS = ["Date", "Radio", "Zone", "Statut", "Créneau"];

export function DiffusionsTab() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-border bg-white p-5">
        <h2 className="text-base font-semibold text-dash-heading">Diffusions récentes</h2>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-border-light px-3.5 py-1.5 text-xs font-medium text-dash-body"
            >
              {filter}
              <ChevronDown className="size-3" aria-hidden="true" />
            </button>
          ))}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-green-accent-dark/10 px-3.5 py-1.5 text-xs font-semibold text-green-accent-dark"
          >
            <Filter className="size-3" aria-hidden="true" />
            Plus de filtres
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">
                <th className="pb-2 pr-3">Heure</th>
                <th className="pb-2 pr-3">Radio</th>
                <th className="pb-2 pr-3">Zone</th>
                <th className="pb-2 pr-3">Spot</th>
                <th className="pb-2 pr-3">Durée</th>
                <th className="pb-2 pr-3">Statut</th>
                <th className="pb-2">Preuve</th>
              </tr>
            </thead>
            <tbody>
              {recentDiffusions.map((row) => (
                <tr
                  key={row.id}
                  className={`border-t border-border-light ${row.statut === "ANOMALIE" ? "bg-orange-500/5" : ""}`}
                >
                  <td className="py-3 pr-3 font-semibold text-dash-heading">{row.heure}</td>
                  <td className="py-3 pr-3 text-dash-body">{row.radio}</td>
                  <td className="py-3 pr-3 text-dash-body">{row.zone}</td>
                  <td className="py-3 pr-3 text-dash-body">{row.spot}</td>
                  <td className="py-3 pr-3 text-dash-body">{row.duree}</td>
                  <td className="py-3 pr-3">
                    <DiffusionStatusPill status={row.statut} />
                  </td>
                  <td className="py-3 text-xs font-semibold text-green-accent-dark">
                    {row.statut === "A_VENIR" ? "—" : row.statut === "ANOMALIE" ? "Voir détail" : "Voir preuve"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-orange-500/5 p-4 text-xs text-orange-600">
          <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
          <span>3 spots n&apos;ont pas été détectés sur la journée du 14 sept. Vérifiez avec Radio Balafon.</span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h2 className="text-sm font-semibold text-dash-heading">Dernières preuves de diffusion</h2>
        <div className="mt-4 flex flex-col gap-3">
          {latestProofs.map((proof) => (
            <div
              key={proof.id}
              className={`flex items-start justify-between gap-2 rounded-xl p-3 ${
                proof.status === "anomaly" ? "bg-orange-500/5" : "bg-dash-canvas"
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-dash-heading">{proof.radio}</p>
                <p className="text-[11px] text-dash-muted">{proof.date}</p>
              </div>
              <button type="button" className="shrink-0 text-xs font-semibold text-green-accent-dark">
                {proof.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
