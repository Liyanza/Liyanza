import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/sections/inscription/SignupForm";

const title = "Créer un compte";
const description = "Rejoignez 500+ équipes marketing qui pilotent leurs campagnes avec l'IA KIYANZA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/inscription",
  },
  // Page de compte utilisateur : pas d'intérêt à l'indexer dans Google.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: "/inscription",
  },
  twitter: {
    title,
    description,
  },
};

export default function InscriptionPage() {
  return (
    <AuthShell
      backVariant="text"
      brandHeading="Lancez-vous. C'est gratuit !"
      brandParagraph="Rejoignez 500+ équipes marketing qui pilotent leurs campagnes avec l'IA KIYANZA."
    >
      <SignupForm />
    </AuthShell>
  );
}
