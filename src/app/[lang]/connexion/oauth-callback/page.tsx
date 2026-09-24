import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { OAuthCallbackHandler } from "@/components/sections/connexion/OAuthCallbackHandler";
import { getMessages } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const t = await getMessages("auth");
  return {
    ...(await localizedMetadata({
      path: "/connexion/oauth-callback",
      title: t.meta.login.title,
      description: t.brand.login.paragraph,
    })),
    // Page de compte utilisateur : pas d'intérêt à l'indexer dans Google.
    robots: { index: false, follow: false },
  };
}

export default function OAuthCallbackPage() {
  return (
    <AuthShell backVariant="none" brand="login">
      <Suspense>
        <OAuthCallbackHandler />
      </Suspense>
    </AuthShell>
  );
}
