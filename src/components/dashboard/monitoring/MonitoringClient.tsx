"use client";

import { useState } from "react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { MonitoringTabs } from "./MonitoringTabs";
import { OverviewTab } from "./OverviewTab";
import { DiffusionsTab } from "./DiffusionsTab";
import { PlanningTab } from "./PlanningTab";
import { RapportsTab } from "./RapportsTab";
import { ComingSoonTab } from "./ComingSoonTab";
import { monitoringTabs } from "@/data/monitoring";

export function MonitoringClient() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <TopBar title="Monitoring" searchPlaceholder="Rechercher une diffusions..." />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[1295px] flex-col gap-5 px-8 py-6">
          <MonitoringTabs active={activeTab} onChange={setActiveTab} />

          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "diffusions" && <DiffusionsTab />}
          {activeTab === "planning" && <PlanningTab />}
          {activeTab === "rapports" && <RapportsTab />}
          {["alertes", "analyses", "recommandation", "annulees"].includes(activeTab) && (
            <ComingSoonTab label={monitoringTabs.find((tab) => tab.id === activeTab)?.label ?? ""} />
          )}
        </div>
      </main>
    </>
  );
}
