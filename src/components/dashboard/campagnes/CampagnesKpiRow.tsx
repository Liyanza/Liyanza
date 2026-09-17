import { Ban, CheckCircle2, DollarSign, FileEdit, Megaphone } from "lucide-react";
import { campaignsKpis, type CampaignsKpi } from "@/data/dashboard";
import { KpiCard, DeltaTag } from "@/components/dashboard/ui/KpiCard";

const icons: Record<CampaignsKpi["icon"], typeof Megaphone> = {
  total: Megaphone,
  active: DollarSign,
  done: CheckCircle2,
  draft: FileEdit,
  suspended: Ban,
};

export function CampagnesKpiRow() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {campaignsKpis.map((kpi) => {
        const Icon = icons[kpi.icon];
        const isSuspended = kpi.icon === "suspended";

        return (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            iconBg={isSuspended ? "bg-[#e93c16]/10" : "bg-green-accent-dark/10"}
            icon={<Icon className={`size-4 ${isSuspended ? "text-[#e93c16]" : "text-green-accent-dark"}`} aria-hidden="true" />}
            footer={
              <>
                {kpi.delta && <DeltaTag tone={kpi.deltaTone}>{kpi.delta}</DeltaTag>}
                {kpi.helper && !kpi.delta && (
                  <DeltaTag tone={kpi.deltaTone}>{kpi.helper}</DeltaTag>
                )}
                {kpi.helper && kpi.delta && <span className="text-[11px] text-gray-text-light">{kpi.helper}</span>}
              </>
            }
          />
        );
      })}
    </div>
  );
}
