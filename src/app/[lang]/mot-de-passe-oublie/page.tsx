import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/sections/mot-de-passe-oublie/ForgotPasswordForm";
import { getMessages } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const t = await getMessages("auth");
  return {
    ...(await localizedMetadata({
      path: "/mot-de-passe-oublie",
      title: t.meta.forgot.title,
      description: t.brand.forgot.paragraph,
    })),
    // Page de compte utilisateur : pas d'intérêt à l'indexer dans Google.
    robots: { index: false, follow: true },
  };
}

export default function MotDePasseOubliePage() {
  return (
    <AuthShell backVariant="text" brand="forgot">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
