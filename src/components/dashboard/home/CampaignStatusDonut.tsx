"use client";

import { BudgetDonutChart } from "@/components/dashboard/campagnes/resultats/charts";
import type { CampaignStatus, DashboardSummary } from "@/lib/api/types";
import { useT } from "@/i18n/client";

// Palette catégorielle validée (5 statuts, contraste + daltonisme) :
// node scripts/validate_palette.js "#f59e0b,#3b82f6,#00c853,#8b5cf6,#ef4444"
// L'ordre ci-dessous (cycle de vie DRAFT → CANCELLED) EST l'ordre validé —
// les paires adjacentes ont été vérifiées dans cet ordre précis.
const STATUS_ORDER: CampaignStatus[] = ["DRAFT", "PLANNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

const STATUS_COLORS: Record<CampaignStatus, string> = {
  DRAFT: "#f59e0b",
  PLANNED: "#3b82f6",
  IN_PROGRESS: "#00c853",
  COMPLETED: "#8b5cf6",
  CANCELLED: "#ef4444",
};

/**
 * Remplace l'ancien SpendDonutChart (répartition Facebook/Instagram/WhatsApp
 * Ads — fictive et de toute façon impossible à agréger entreprise-wide
 * aujourd'hui, cette donnée n'existe que par campagne digitale simulée).
 * Réutilise `BudgetDonutChart` (déjà construit et validé pour la page
 * résultats) avec un jeu de couleurs différent, dédié aux statuts.
 */
export function CampaignStatusDonut({ summary }: { summary: DashboardSummary }) {
  const dash = useT("dash");
  const t = dash.home.donut;
  const total = summary.totalCampaigns;

  const segments = STATUS_ORDER.map((status) => {
    const value = summary.campaignsByStatus[status] ?? 0;
    return {
      label: dash.statuses[status],
      value,
      percent: total > 0 ? Math.round((value / total) * 100) : 0,
      color: STATUS_COLORS[status],
    };
  }).filter((segment) => segment.value > 0);

  return (
    <div className="flex h-full flex-col rounded-[5px] border border-border bg-white p-5">
      <h2 className="text-sm font-bold text-black">{t.title}</h2>
      <p className="mt-0.5 text-[11px] text-gray-text">{t.subtitle}</p>

      <div className="mt-6 flex flex-1 items-center">
        {total === 0 ? (
          <p className="text-xs text-gray-text-light">{t.empty}</p>
        ) : (
          <BudgetDonutChart segments={segments} totalLabel={String(total)} totalSubLabel={t.unit} />
        )}
      </div>
    </div>
  );
}
