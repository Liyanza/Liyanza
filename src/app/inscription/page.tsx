import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { StatTrio } from "@/components/auth/StatTrio";
import { DashboardMockCard } from "@/components/auth/DashboardMockCard";
import { SignupForm } from "@/components/sections/inscription/SignupForm";

export const metadata: Metadata = {
  title: "Créer un compte — KIYANZA",
  description: "Rejoignez 500+ équipes marketing qui pilotent leurs campagnes avec l'IA KIYANZA.",
};

export default function InscriptionPage() {
  return (
    <AuthShell
      backVariant="text"
      brandHeading="Lancez-vous. C'est gratuit."
      brandParagraph="Rejoignez 500+ équipes marketing qui pilotent leurs campagnes avec l'IA KIYANZA."
      brandExtra={
        <div className="flex flex-col gap-8">
          <StatTrio
            stats={[
              { value: "2 min", label: "pour démarrer" },
              { value: "0 FCFA", label: "pour commencer" },
              { value: "98%", label: "satisfaction" },
            ]}
          />
          <DashboardMockCard />
        </div>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
