"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { KpiCard } from "@/components/dashboard/ui/KpiCard";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";
import { apiGetDashboard, ApiError } from "@/lib/api/client";
import type { DashboardSummary } from "@/lib/api/types";
import { SkeletonKpis } from "@/components/dashboard/ui/Skeleton";

function formatBudget(amount: number) {
  return `${Math.round(amount).toLocaleString("fr-FR")} FCFA`;
}

function formatPercent(ratio: number) {
  return `${Math.round(ratio * 100)}%`;
}

/**
 * Le modèle `Statistic` (GET /campagnes/:id/statistiques) n'est alimenté par
 * aucun producteur dans tout le backend — toujours vide. Cette page n'en
 * consomme donc volontairement pas : seul GET /dashboard (déjà utilisé sur
 * l'accueil) contient de vraies données, dont complianceRate/installationRate
 * et campaignsSummary, laissés de côté là-bas pour ne pas fabriquer un faux
 * 0% sur des entreprises 100% digitales.
 */
export function RapportsClient() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchSummary = useCallback(() => {
    return apiGetDashboard().then(
      (result) => {
        setSummary(result);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : "Impossible de charger les rapports.");
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    void fetchSummary();
  }, [fetchSummary]);

  return (
    <>
      <TopBar title="Rapports" />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="flex flex-col gap-6 px-8 py-6">
          {loading && (
            <SkeletonKpis count={3} className="grid grid-cols-1 gap-3 sm:grid-cols-3" label="Chargement des rapports…" />
          )}
          {loadError && <p className="text-sm text-red-600">{loadError}</p>}

          {summary && (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <KpiCard
                  label="Écart budgétaire"
                  value={formatBudget(summary.budgetDeviation)}
                  iconBg="bg-green-accent-dark/10"
                  icon={<FileText className="size-4 text-green-accent-dark" aria-hidden="true" />}
                  footer={<span className="text-[11px] text-gray-text-light">Budget prévu − budget réel, cumulé</span>}
                />
                <KpiCard
                  label="Taux de conformité"
                  value={formatPercent(summary.complianceRate)}
                  iconBg="bg-blue-500/10"
                  icon={<FileText className="size-4 text-blue-500" aria-hidden="true" />}
                  footer={
                    <span className="text-[11px] text-gray-text-light">
                      Diffusions réalisées / planifiées (Radio, Affichage)
                    </span>
                  }
                />
                <KpiCard
                  label="Taux d'installation"
                  value={formatPercent(summary.installationRate)}
                  iconBg="bg-blue-500/10"
                  icon={<FileText className="size-4 text-blue-500" aria-hidden="true" />}
                  footer={
                    <span className="text-[11px] text-gray-text-light">Installations terrain confirmées / prévues</span>
                  }
                />
              </div>

              <div className="rounded-[5px] border border-border bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-black">Exporter un rapport</h2>
                    <p className="mt-0.5 text-[11px] text-gray-text">
                      Toutes les campagnes de l&apos;entreprise, budgets et conformité inclus.
                    </p>
                  </div>
                  {/*
                    <Link> ferait une navigation SPA côté client vers cette
                    route — or ce n'est pas une page mais un fichier binaire
                    (CSV/PDF) à télécharger : un <a> natif est le comportement
                    correct ici, pas une omission.
                  */}
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                      href="/api/backend/rapports?format=csv"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-green-accent-dark px-5 py-2 text-sm font-semibold text-green-accent-dark transition hover:bg-green-accent-dark/5"
                    >
                      <Download className="size-4" aria-hidden="true" />
                      CSV
                    </a>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                      href="/api/backend/rapports?format=pdf"
                      className="inline-flex items-center gap-2 rounded-full bg-green-accent-dark px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-green-accent-dark/20 transition hover:bg-green-600"
                    >
                      <Download className="size-4" aria-hidden="true" />
                      PDF
                    </a>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[5px] border border-border bg-white">
                <div className="border-b border-border px-5 py-4">
                  <h2 className="text-sm font-bold text-black">Détail par campagne</h2>
                  <p className="text-[11px] text-gray-text">Diffusions et installations terrain, campagne par campagne.</p>
                </div>
                {summary.campaignsSummary.length === 0 ? (
                  <p className="px-5 py-10 text-center text-sm text-gray-text">Aucune campagne pour l&apos;instant.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left">
                      <thead>
                        <tr className="bg-slate-50 text-[11px] font-semibold text-gray-text">
                          <th className="px-5 py-2.5">Campagne</th>
                          <th className="px-5 py-2.5">Statut</th>
                          <th className="px-5 py-2.5">Budget prévu</th>
                          <th className="px-5 py-2.5">Budget réel</th>
                          <th className="px-5 py-2.5">Diffusions</th>
                          <th className="px-5 py-2.5">Installations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summary.campaignsSummary.map((row) => (
                          <tr key={row.id} className="border-t border-border-light">
                            <td className="px-5 py-3 text-xs font-semibold text-black">{row.name}</td>
                            <td className="px-5 py-3">
                              <StatusPill status={row.status} />
                            </td>
                            <td className="px-5 py-3 text-xs text-gray-700">{formatBudget(row.plannedBudget)}</td>
                            <td className="px-5 py-3 text-xs text-gray-700">{formatBudget(row.actualBudget)}</td>
                            <td className="px-5 py-3 text-xs text-gray-700">
                              {row.broadcastCount > 0 ? `${row.broadcastedCount}/${row.broadcastCount}` : "—"}
                            </td>
                            <td className="px-5 py-3 text-xs text-gray-700">
                              {row.installationCount > 0 ? `${row.installedCount}/${row.installationCount}` : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
