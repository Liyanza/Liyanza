import type { Metadata } from "next";
import { DashboardHomeClient } from "@/components/dashboard/home/DashboardHomeClient";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function DashboardHomePage() {
  return <DashboardHomeClient />;
}
