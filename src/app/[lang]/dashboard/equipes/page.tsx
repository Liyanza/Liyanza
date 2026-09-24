import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { EquipesClient } from "@/components/dashboard/equipes/EquipesClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.teams };
}

export default function EquipesPage() {
  return (
    <RoleGate allow={["ADMIN"]}>
      <EquipesClient />
    </RoleGate>
  );
}
