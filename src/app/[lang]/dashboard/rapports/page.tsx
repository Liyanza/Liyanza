import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { RapportsClient } from "@/components/dashboard/rapports/RapportsClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.reports };
}

export default function RapportsPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER"]}>
      <RapportsClient />
    </RoleGate>
  );
}
