import type { Metadata } from "next";
import { EquipesClient } from "@/components/dashboard/equipes/EquipesClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export const metadata: Metadata = {
  title: "Équipes",
};

export default function EquipesPage() {
  return (
    <RoleGate allow={["ADMIN"]}>
      <EquipesClient />
    </RoleGate>
  );
}
