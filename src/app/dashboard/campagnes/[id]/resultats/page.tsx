import type { Metadata } from "next";
import { DigitalResultsPage } from "@/components/dashboard/campagnes/resultats/DigitalResultsPage";
import { RoleGate } from "@/components/dashboard/RoleGate";

export const metadata: Metadata = {
  title: "Résultats de simulation",
};

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
