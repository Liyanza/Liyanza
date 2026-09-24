import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { TerrainClient } from "@/components/dashboard/terrain/TerrainClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.terrain };
}

export default function TerrainPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <TerrainClient />
    </RoleGate>
  );
}
