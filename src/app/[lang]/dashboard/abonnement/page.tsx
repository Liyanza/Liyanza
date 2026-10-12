import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { BillingClient } from "@/components/dashboard/billing/BillingClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.billing };
}

/** `?paiement=retour` : retour de la page de paiement Chariow (BILLING_RETURN_URL). */
export default async function AbonnementPage({ searchParams }: { searchParams: Promise<{ paiement?: string }> }) {
  const { paiement } = await searchParams;
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"]}>
      <BillingClient returning={paiement === "retour"} />
    </RoleGate>
  );
}
