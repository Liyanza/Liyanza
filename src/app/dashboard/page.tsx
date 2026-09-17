import type { Metadata } from "next";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { WelcomeBanner } from "@/components/dashboard/home/WelcomeBanner";
import { HomeKpiRow } from "@/components/dashboard/home/HomeKpiRow";
import { PerformanceChart } from "@/components/dashboard/home/PerformanceChart";
import { SpendDonutChart } from "@/components/dashboard/home/SpendDonutChart";
import { RecentCampaignsTable } from "@/components/dashboard/home/RecentCampaignsTable";
import { AiRecommendations } from "@/components/dashboard/home/AiRecommendations";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function DashboardHomePage() {
  return (
    <>
      <TopBar
        title="Accueil"
        searchPlaceholder="Rechercher une campagne, un rapport..."
        showPeriodFilter
      />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="flex flex-col gap-6 px-8 py-6">
          <WelcomeBanner />
          <HomeKpiRow />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
            <PerformanceChart />
            <SpendDonutChart />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
            <RecentCampaignsTable />
            <AiRecommendations />
          </div>
        </div>
      </main>
    </>
  );
}
