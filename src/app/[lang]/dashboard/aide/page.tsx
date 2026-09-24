import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { AideClient } from "@/components/dashboard/aide/AideClient";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.help };
}

export default function AidePage() {
  return <AideClient />;
}
