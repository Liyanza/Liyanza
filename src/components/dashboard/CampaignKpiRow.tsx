import { CheckCircle2, FileEdit, Megaphone, Wallet } from "lucide-react";
import type { DashboardSummary } from "@/lib/api/types";
import { KpiCard } from "@/components/dashboard/ui/KpiCard";

function formatBudget(amount: number) {
  return `${Math.round(amount).toLocaleString("fr-FR")} FCFA`;
}

/**
 * Remplace les anciens HomeKpiRow/CampagnesKpiRow (données 100% fictives,
 * "Conversions"/"ROI"/"Audience atteinte" n'ayant aucun équivalent calculé
 * par le backend). Ces 5 chiffres sont tous dérivés de `GET /dashboard`
 * (DashboardResponseDto) — aucune tendance "vs période précédente" n'est
 * affichée : le backend ne conserve pas de snapshot historique pour la
 * calculer honnêtement.
 */
export function CampaignKpiRow({ summary }: { summary: DashboardSummary }) {
  const byStatus = summary.campaignsByStatus;

  const items = [
    {
      label: "Campagnes totales",
      value: String(summary.totalCampaigns),
      icon: Megaphone,
      iconBg: "bg-green-accent-dark/10",
      iconColor: "text-green-accent-dark",
    },
    {
      label: "En cours",
      value: String(byStatus.IN_PROGRESS ?? 0),
      icon: CheckCircle2,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      label: "Terminées",
      value: String(byStatus.COMPLETED ?? 0),
      icon: CheckCircle2,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-500",
    },
    {
      label: "Brouillons",
      value: String(byStatus.DRAFT ?? 0),
      icon: FileEdit,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
    {
      label: "Budget prévu total",
      value: formatBudget(summary.totalPlannedBudget),
      icon: Wallet,
      iconBg: "bg-green-accent-dark/10",
      iconColor: "text-green-accent-dark",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <KpiCard
          key={item.label}
          label={item.label}
          value={item.value}
          iconBg={item.iconBg}
          icon={<item.icon className={`size-4 ${item.iconColor}`} aria-hidden="true" />}
        />
      ))}
    </div>
  );
}
