import type { Metadata } from "next";
import { ProofSubmissionClient } from "@/components/sections/preuve-installation/ProofSubmissionClient";
import { MessagesProvider } from "@/i18n/client";
import { getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: (await getMessages("dashField")).proof.metaTitle,
    robots: { index: false, follow: false },
  };
}

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function PreuveInstallationPage({ params }: PageProps) {
  const { token } = await params;
  const dashField = await getMessages("dashField");
  return (
    <MessagesProvider messages={{ dashField }}>
      <ProofSubmissionClient token={token} />
    </MessagesProvider>
  );
}
