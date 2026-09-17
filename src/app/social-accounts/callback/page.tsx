import type { Metadata } from "next";
import { Suspense } from "react";
import { OAuthCallbackResult } from "@/components/social-accounts/OAuthCallbackResult";

export const metadata: Metadata = {
  title: "Connexion du compte",
  robots: { index: false, follow: false },
};

export default function SocialAccountsCallbackPage() {
  return (
    <Suspense>
      <OAuthCallbackResult />
    </Suspense>
  );
}
