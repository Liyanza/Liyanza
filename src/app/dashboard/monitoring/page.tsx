import type { Metadata } from "next";
import { MonitoringClient } from "@/components/dashboard/monitoring/MonitoringClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export const metadata: Metadata = {
  title: "Monitoring",
};

export default function MonitoringPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <MonitoringClient />
    </RoleGate>
  );
}
