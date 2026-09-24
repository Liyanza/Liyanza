import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { ReinitialiserMotDePasseForm } from "@/components/sections/reinitialiser-mot-de-passe/ReinitialiserMotDePasseForm";
import { getMessages } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const t = await getMessages("auth");
  return {
    ...(await localizedMetadata({
      path: "/reinitialiser-mot-de-passe",
      title: t.meta.reset.title,
      description: t.brand.reset.paragraph,
    })),
    // Page de compte utilisateur : pas d'intérêt à l'indexer dans Google.
    robots: { index: false, follow: false },
  };
}

export default function ReinitialiserMotDePassePage() {
  return (
    <AuthShell backVariant="text" brand="reset">
      <Suspense>
        <ReinitialiserMotDePasseForm />
      </Suspense>
    </AuthShell>
  );
}
