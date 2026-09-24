import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/sections/inscription/SignupForm";
import { getMessages } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const t = await getMessages("auth");
  return {
    ...(await localizedMetadata({
      path: "/inscription",
      title: t.meta.signup.title,
      description: t.brand.signup.paragraph,
    })),
    // Page de compte utilisateur : pas d'intérêt à l'indexer dans Google.
    robots: { index: false, follow: true },
  };
}

export default function InscriptionPage() {
  return (
    <AuthShell backVariant="text" brand="signup">
      <SignupForm />
    </AuthShell>
  );
}
