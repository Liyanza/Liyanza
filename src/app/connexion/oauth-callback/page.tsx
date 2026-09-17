import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { OAuthCallbackHandler } from "@/components/sections/connexion/OAuthCallbackHandler";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

export default function OAuthCallbackPage() {
  return (
    <AuthShell
      backVariant="none"
      brandHeading="Bon retour parmi nous !"
      brandParagraph="Accédez à votre cockpit marketing et reprenez le pilotage là où vous l'aviez laissé."
    >
      <Suspense>
        <OAuthCallbackHandler />
      </Suspense>
    </AuthShell>
  );
}
