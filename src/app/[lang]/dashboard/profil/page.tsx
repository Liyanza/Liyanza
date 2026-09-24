import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { ProfilClient } from "@/components/dashboard/profil/ProfilClient";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.profile };
}

export default function ProfilPage() {
  return <ProfilClient />;
}
