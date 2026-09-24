import type { Metadata } from "next";
import { RecommandationsClient } from "@/components/dashboard/recommandations/RecommandationsClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export const metadata: Metadata = {
  title: "Recommandations IA",
};

export default function RecommandationsPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER"]}>
      <RecommandationsClient />
    </RoleGate>
  );
}
