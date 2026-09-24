import type { Metadata } from "next";
import { CampaignWizard } from "@/components/dashboard/wizard/CampaignWizard";
import { RoleGate } from "@/components/dashboard/RoleGate";

export const metadata: Metadata = {
  title: "Nouvelle campagne",
};

export default function NouvelleCampagnePage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <CampaignWizard />
    </RoleGate>
  );
}
