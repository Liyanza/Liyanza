import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { RecommandationsClient } from "@/components/dashboard/recommandations/RecommandationsClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.recommendations };
}

export default function RecommandationsPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER"]}>
      <RecommandationsClient />
    </RoleGate>
  );
}
