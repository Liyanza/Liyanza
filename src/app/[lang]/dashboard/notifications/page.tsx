import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { NotificationsClient } from "@/components/dashboard/notifications/NotificationsClient";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.notifications };
}

export default function NotificationsPage() {
  return <NotificationsClient />;
}
