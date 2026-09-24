import type { Metadata } from "next";
import { RapportsClient } from "@/components/dashboard/rapports/RapportsClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export const metadata: Metadata = {
  title: "Rapports",
};

export default function RapportsPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER"]}>
      <RapportsClient />
    </RoleGate>
  );
}
