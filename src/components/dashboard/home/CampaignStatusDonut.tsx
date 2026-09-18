import { BudgetDonutChart } from "@/components/dashboard/campagnes/resultats/charts";
import type { CampaignStatus, DashboardSummary } from "@/lib/api/types";

// Palette catégorielle validée (5 statuts, contraste + daltonisme) :
// node scripts/validate_palette.js "#f59e0b,#3b82f6,#00c853,#8b5cf6,#ef4444"
// L'ordre ci-dessous (cycle de vie DRAFT → CANCELLED) EST l'ordre validé —
// les paires adjacentes ont été vérifiées dans cet ordre précis.
const STATUS_ORDER: CampaignStatus[] = ["DRAFT", "PLANNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

const STATUS_META: Record<CampaignStatus, { label: string; color: string }> = {
  DRAFT: { label: "Brouillon", color: "#f59e0b" },
  PLANNED: { label: "Planifiée", color: "#3b82f6" },
  IN_PROGRESS: { label: "En cours", color: "#00c853" },
  COMPLETED: { label: "Terminée", color: "#8b5cf6" },
  CANCELLED: { label: "Annulée", color: "#ef4444" },
};

/**
 * Remplace l'ancien SpendDonutChart (répartition Facebook/Instagram/WhatsApp
 * Ads — fictive et de toute façon impossible à agréger entreprise-wide
 * aujourd'hui, cette donnée n'existe que par campagne digitale simulée).
 * Réutilise `BudgetDonutChart` (déjà construit et validé pour la page
 * résultats) avec un jeu de couleurs différent, dédié aux statuts.
 */
export function CampaignStatusDonut({ summary }: { summary: DashboardSummary }) {
  const total = summary.totalCampaigns;

  const segments = STATUS_ORDER.map((status) => {
    const value = summary.campaignsByStatus[status] ?? 0;
    return {
      label: STATUS_META[status].label,
      value,
      percent: total > 0 ? Math.round((value / total) * 100) : 0,
      color: STATUS_META[status].color,
    };
  }).filter((segment) => segment.value > 0);

  return (
    <div className="flex h-full flex-col rounded-[5px] border border-border bg-white p-5">
      <h2 className="text-sm font-bold text-black">Répartition des campagnes</h2>
      <p className="mt-0.5 text-[11px] text-gray-text">Par statut, sur l&apos;ensemble de l&apos;entreprise.</p>

      <div className="mt-6 flex flex-1 items-center">
        {total === 0 ? (
          <p className="text-xs text-gray-text-light">Aucune campagne créée pour l&apos;instant.</p>
        ) : (
          <BudgetDonutChart segments={segments} totalLabel={String(total)} totalSubLabel="campagnes" />
        )}
      </div>
    </div>
  );
}
