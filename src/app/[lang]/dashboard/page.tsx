import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { DashboardHomeClient } from "@/components/dashboard/home/DashboardHomeClient";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.home };
}

export default function DashboardHomePage() {
  return <DashboardHomeClient />;
}
