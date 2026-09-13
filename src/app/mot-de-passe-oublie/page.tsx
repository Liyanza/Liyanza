import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { StatTrio } from "@/components/auth/StatTrio";
import { DashboardMockCard } from "@/components/auth/DashboardMockCard";
import { ForgotPasswordForm } from "@/components/sections/mot-de-passe-oublie/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Mot de passe oublié — KIYANZA",
  description: "Nous allons vous envoyer un lien pour réinitialiser votre mot de passe en toute sécurité.",
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
