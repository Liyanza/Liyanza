"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Megaphone, TrendingUp } from "lucide-react";
import { KpiCard } from "@/components/dashboard/ui/KpiCard";
import { DiffusionStatusPill } from "./DiffusionStatusPill";
import { apiGetRapportConformite, ApiError } from "@/lib/api/client";
import type { RapportConformite } from "@/lib/api/types";
import { SkeletonKpis } from "@/components/dashboard/ui/Skeleton";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function OverviewTab({ campaignId }: { campaignId: string }) {
  const [report, setReport] = useState<RapportConformite | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    apiGetRapportConformite(campaignId).then(
      (result) => {
        setReport(result);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : "Impossible de charger le rapport de conformité.");
        setLoading(false);
      }
    );
  }, [campaignId]);

  if (loading) return <SkeletonKpis label="Chargement de la vue d'ensemble…" />;
  if (loadError) return <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{loadError}</p>;
  if (!report) return null;

  const missed = report.diffusions.filter((d) => d.status === "MISSED");
  // Le backend ne conserve aucun instantané historique pour ce rapport —
  // pas de tendance "vs période précédente" affichable honnêtement, même
  // décision que CampaignKpiRow (dashboard Accueil).
  const kpis = [
    { label: "Spots prévus", value: String(report.totalDiffusions), icon: Megaphone, iconBg: "bg-green-accent-dark/10", iconColor: "text-green-accent-dark" },
    { label: "Spots diffusés", value: String(report.diffusionsDiffusees), icon: CheckCircle2, iconBg: "bg-green-accent-dark/10", iconColor: "text-green-accent-dark" },
    { label: "Spots manqués", value: String(report.diffusionsManquees), icon: AlertTriangle, iconBg: "bg-orange-500/10", iconColor: "text-orange-500" },
    { label: "En attente", value: String(report.diffusionsEnAttente), icon: Clock, iconBg: "bg-blue-500/10", iconColor: "text-blue-500" },
    {
      label: "Taux de conformité",
      value: report.tauxConformite !== null ? `${Math.round(report.tauxConformite * 100)}%` : "—",
      icon: TrendingUp,
      iconBg: "bg-green-accent-dark/10",
      iconColor: "text-green-accent-dark",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            iconBg={kpi.iconBg}
            icon={<kpi.icon className={`size-4 ${kpi.iconColor}`} aria-hidden="true" />}
          />
        ))}
      </div>

      {missed.length > 0 && (
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15">
              <AlertTriangle className="size-4 text-orange-500" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-dash-heading">
                {missed.length} diffusion{missed.length > 1 ? "s" : ""} manquée{missed.length > 1 ? "s" : ""}
              </p>
              <p className="mt-0.5 text-xs text-dash-muted">
                Aucun constat n&apos;a été enregistré après l&apos;heure prévue pour ces diffusions.
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            {missed.slice(0, 5).map((item) => (
              <div key={item.diffusionId} className="rounded-lg bg-white px-3.5 py-2 text-xs text-dash-body">
                Diffusion prévue le {formatDateTime(item.scheduledAt)}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-white p-5">
        <h2 className="text-sm font-semibold text-dash-heading">Diffusions</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">
                <th className="pb-2 pr-3">Prévue</th>
                <th className="pb-2 pr-3">Constatée</th>
                <th className="pb-2 pr-3">Écart</th>
                <th className="pb-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {report.diffusions.map((item) => (
                <tr key={item.diffusionId} className="border-t border-border-light">
                  <td className="py-3 pr-3 font-semibold text-dash-heading">{formatDateTime(item.scheduledAt)}</td>
                  <td className="py-3 pr-3 text-dash-body">
                    {item.actualBroadcastAt ? formatDateTime(item.actualBroadcastAt) : "—"}
                  </td>
                  <td className="py-3 pr-3 text-dash-body">
                    {item.ecartMinutes !== null ? `${item.ecartMinutes} min` : "—"}
                  </td>
                  <td className="py-3">
                    <DiffusionStatusPill status={item.status as "PLANNED" | "BROADCASTED" | "MISSED" | "CANCELLED" | "PENDING"} />
                  </td>
                </tr>
              ))}
              {report.diffusions.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-dash-muted">
                    Aucune diffusion planifiée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
