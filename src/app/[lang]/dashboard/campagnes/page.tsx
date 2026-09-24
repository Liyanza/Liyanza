import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { CampagnesListClient } from "@/components/dashboard/campagnes/CampagnesListClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.campaigns };
}

export default function CampagnesPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <CampagnesListClient />
    </RoleGate>
  );
}
