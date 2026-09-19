import { AlertTriangle } from "lucide-react";
import { KpiCard, DeltaTag } from "@/components/dashboard/ui/KpiCard";
import { DiffusionStatusPill } from "./DiffusionStatusPill";
import {
  monitoringKpis,
  anomalyBannerCount,
  anomalyBannerSource,
  anomalyCards,
  recentDiffusions,
  latestProofs,
} from "@/data/monitoring";

export function OverviewTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {monitoringKpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            iconBg={kpi.iconBg}
            icon={<kpi.icon className={`size-4 ${kpi.iconColor}`} aria-hidden="true" />}
            footer={
              <>
                <DeltaTag tone={kpi.deltaTone}>
                  {kpi.deltaTone === "positive" ? "↑" : "↓"} {kpi.delta}
                </DeltaTag>
                <span className="text-[11px] text-dash-muted">{kpi.deltaSuffix}</span>
              </>
            }
          />
        ))}
      </div>

      <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15">
              <AlertTriangle className="size-4 text-orange-500" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-dash-heading">
                {anomalyBannerCount} anomalies de diffusion identifiées par le moteur de pige KIYANZA
              </p>
              <p className="mt-0.5 text-xs text-dash-muted">{anomalyBannerSource}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-dash-heading shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
            >
              Exporter l&apos;avis de litige
            </button>
            <button
              type="button"
              className="rounded-full bg-green-accent px-4 py-2 text-xs font-semibold text-white"
            >
              Contacter la régie Radio Balafon
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {anomalyCards.map((card) => (
            <div key={card.id} className="flex flex-col gap-2 rounded-xl bg-white p-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3px] text-orange-500">{card.tag}</span>
              <p className="text-sm font-bold text-dash-heading">{card.title}</p>
              <p className="text-xs leading-relaxed text-dash-muted">{card.description}</p>
              <button type="button" className="mt-1 text-left text-xs font-semibold text-green-accent-dark">
                {card.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="text-sm font-semibold text-dash-heading">Diffusions récentes</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
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
                  {proof.status === "anomaly" ? (
                    <span className="mt-1 inline-block rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-orange-500">
                      Anomalie détectée
                    </span>
                  ) : (
                    <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-green-accent-dark">
                      <span className="size-1.5 rounded-full bg-green-accent-dark" /> Diffusion confirmée
                    </span>
                  )}
                </div>
                <button type="button" className="shrink-0 text-xs font-semibold text-green-accent-dark">
                  {proof.actionLabel}
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="mt-3 flex items-center gap-1 text-xs font-semibold text-green-accent-dark">
            Voir toutes les preuves →
          </button>
        </div>
      </div>
    </div>
  );
}
