import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { CreateCompanyForm } from "@/components/dashboard/entreprise/CreateCompanyForm";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.createCompany };
}

export default function CreerEntreprisePage() {
  return <CreateCompanyForm />;
}
