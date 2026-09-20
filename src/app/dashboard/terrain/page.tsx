import type { Metadata } from "next";
import { TerrainClient } from "@/components/dashboard/terrain/TerrainClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export const metadata: Metadata = {
  title: "Terrain",
};

export default function TerrainPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <TerrainClient />
    </RoleGate>
  );
}
