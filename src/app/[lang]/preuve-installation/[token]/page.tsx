import type { Metadata } from "next";
import { ProofSubmissionClient } from "@/components/sections/preuve-installation/ProofSubmissionClient";

export const metadata: Metadata = {
  title: "Preuve d'installation",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function PreuveInstallationPage({ params }: PageProps) {
  const { token } = await params;
  return <ProofSubmissionClient token={token} />;
}
