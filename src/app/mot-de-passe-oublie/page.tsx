import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { StatTrio } from "@/components/auth/StatTrio";
import { DashboardMockCard } from "@/components/auth/DashboardMockCard";
import { ForgotPasswordForm } from "@/components/sections/mot-de-passe-oublie/ForgotPasswordForm";

const title = "Mot de passe oublié";
const description = "Nous allons vous envoyer un lien pour réinitialiser votre mot de passe en toute sécurité.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/mot-de-passe-oublie",
  },
  // Page de compte utilisateur : pas d'intérêt à l'indexer dans Google.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: "/mot-de-passe-oublie",
  },
  twitter: {
    title,
    description,
  },
};

export default function MotDePasseOubliePage() {
  return (
    <AuthShell
      backVariant="text"
      brandHeading="Pas de panique."
      brandParagraph="Nous allons vous envoyer un lien pour réinitialiser votre mot de passe en toute sécurité."
      brandExtra={
        <div className="flex flex-col gap-8">
          <StatTrio
            stats={[
              { value: "< 2 min", label: "délai de réception" },
              { value: "24h", label: "validité du lien" },
              { value: "100%", label: "sécurisé" },
            ]}
          />
          <DashboardMockCard />
        </div>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
