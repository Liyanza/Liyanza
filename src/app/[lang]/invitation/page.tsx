import type { Metadata } from "next";
import { InvitationAccept } from "@/components/sections/invitation/InvitationAccept";
import { MessagesProvider } from "@/i18n/client";
import { getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: (await getMessages("invitation")).metaTitle,
    robots: { index: false, follow: false },
  };
}

interface PageProps {
  searchParams: Promise<{ token?: string | string[] }>;
}

export default async function InvitationPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  const invitation = await getMessages("invitation");
  return (
    <MessagesProvider messages={{ invitation }}>
      <InvitationAccept token={typeof token === "string" ? token : null} />
    </MessagesProvider>
  );
}
