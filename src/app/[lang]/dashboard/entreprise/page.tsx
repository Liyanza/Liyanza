import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { SocialAccountsPanel } from "@/components/dashboard/entreprise/SocialAccountsPanel";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.company };
}

export default function EntreprisePage() {
  return <SocialAccountsPanel />;
}
