import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/sections/connexion/LoginForm";

const title = "Connexion";
const description = "Accédez à votre cockpit marketing et reprenez le pilotage là où vous l'aviez laissé.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/connexion",
  },
  // Page de compte utilisateur : pas d'intérêt à l'indexer dans Google.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: "/connexion",
  },
  twitter: {
    title,
    description,
  },
};

export default function ConnexionPage() {
  return (
    <AuthShell
      backVariant="icon"
      brandHeading="Bon retour parmi nous"
      brandParagraph="Accédez à votre cockpit marketing et reprenez le pilotage là où vous l'aviez laissé."
    >
      <LoginForm />
    </AuthShell>
  );
}
