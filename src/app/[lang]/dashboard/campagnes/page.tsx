import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { CampagnesListClient } from "@/components/dashboard/campagnes/CampagnesListClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.campaigns };
}

export default async function CampagnesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  // ?q= : recherche lancée depuis la barre du haut. La clé remonte la liste
  // quand une nouvelle recherche arrive alors qu'on est déjà sur la page.
  const { q = "" } = await searchParams;
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <CampagnesListClient key={q} initialSearch={q} />
    </RoleGate>
  );
}
