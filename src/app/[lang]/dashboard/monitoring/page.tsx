import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { MonitoringClient } from "@/components/dashboard/monitoring/MonitoringClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.monitoring };
}

export default function MonitoringPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <MonitoringClient />
    </RoleGate>
  );
}
