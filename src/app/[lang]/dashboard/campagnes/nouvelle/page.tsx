import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { CampaignWizard } from "@/components/dashboard/wizard/CampaignWizard";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.newCampaign };
}

export default function NouvelleCampagnePage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <CampaignWizard />
    </RoleGate>
  );
}
