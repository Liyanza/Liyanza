import type { Metadata } from "next";
import { CampaignWizard } from "@/components/dashboard/wizard/CampaignWizard";

export const metadata: Metadata = {
  title: "Nouvelle campagne",
};

export default function NouvelleCampagnePage() {
  return <CampaignWizard />;
}
