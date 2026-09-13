import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/sections/connexion/LoginForm";

export const metadata: Metadata = {
  title: "Connexion — KIYANZA",
  description: "Accédez à votre cockpit marketing et reprenez le pilotage là où vous l'aviez laissé.",
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
