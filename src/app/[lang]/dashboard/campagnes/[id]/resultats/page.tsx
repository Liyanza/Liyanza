import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { DigitalResultsPage } from "@/components/dashboard/campagnes/resultats/DigitalResultsPage";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.results };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CampagneResultatsPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <DigitalResultsPage campaignId={id} />
    </RoleGate>
  );
}
