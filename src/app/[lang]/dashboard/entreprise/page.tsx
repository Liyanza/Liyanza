import type { Metadata } from "next";
import { SocialAccountsPanel } from "@/components/dashboard/entreprise/SocialAccountsPanel";

export const metadata: Metadata = {
  title: "Mon entreprise",
};

export default function EntreprisePage() {
  return <SocialAccountsPanel />;
}
