import type { Metadata } from "next";
import { ProfilClient } from "@/components/dashboard/profil/ProfilClient";

export const metadata: Metadata = {
  title: "Profil",
};

export default function ProfilPage() {
  return <ProfilClient />;
}
