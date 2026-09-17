import { CircleCheck, DollarSign, Megaphone, TrendingUp, Users } from "lucide-react";
import { homeKpis, type HomeKpi } from "@/data/dashboard";
import { KpiCard, DeltaTag } from "@/components/dashboard/ui/KpiCard";

const icons: Record<HomeKpi["icon"], typeof Megaphone> = {
  campaigns: Megaphone,
  spend: DollarSign,
  conversions: TrendingUp,
  roi: CircleCheck,
  audience: Users,
};

export function HomeKpiRow() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {homeKpis.map((kpi) => {
        const Icon = icons[kpi.icon];
        return (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            iconBg="bg-green-accent-dark/10"
            icon={<Icon className="size-4 text-green-accent-dark" aria-hidden="true" />}
            footer={
              <>
                <DeltaTag tone={kpi.deltaTone}>{kpi.delta}</DeltaTag>
                <span className="text-[11px] text-gray-text-light">{kpi.helper}</span>
              </>
            }
          />
        );
      })}
    </div>
  );
}
