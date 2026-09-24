import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/sections/connexion/LoginForm";
import { getMessages } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const t = await getMessages("auth");
  return {
    ...(await localizedMetadata({
      path: "/connexion",
      title: t.meta.login.title,
      description: t.brand.login.paragraph,
    })),
    // Page de compte utilisateur : pas d'intérêt à l'indexer dans Google.
    robots: { index: false, follow: true },
  };
}

export default function ConnexionPage() {
  return (
    <AuthShell backVariant="none" brand="login">
      <LoginForm />
    </AuthShell>
  );
}
