import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { ReinitialiserMotDePasseForm } from "@/components/sections/reinitialiser-mot-de-passe/ReinitialiserMotDePasseForm";

const title = "Nouveau mot de passe";
const description = "Choisissez un nouveau mot de passe pour votre compte KIYANZA.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

export default function ReinitialiserMotDePassePage() {
  return (
    <AuthShell
      backVariant="text"
      brandHeading="Presque terminé !"
      brandParagraph={description}
    >
      <Suspense>
        <ReinitialiserMotDePasseForm />
      </Suspense>
    </AuthShell>
  );
}
