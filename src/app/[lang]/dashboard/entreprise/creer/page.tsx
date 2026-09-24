import type { Metadata } from "next";
import { CreateCompanyForm } from "@/components/dashboard/entreprise/CreateCompanyForm";

export const metadata: Metadata = {
  title: "Créer mon entreprise",
};

export default function CreerEntreprisePage() {
  return <CreateCompanyForm />;
}
