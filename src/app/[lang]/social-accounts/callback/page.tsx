import type { Metadata } from "next";
import { Suspense } from "react";
import { OAuthCallbackResult } from "@/components/social-accounts/OAuthCallbackResult";
import { MessagesProvider } from "@/i18n/client";
import { getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: (await getMessages("dashField")).oauth.metaTitle,
    robots: { index: false, follow: false },
  };
}

export default async function SocialAccountsCallbackPage() {
  const dashField = await getMessages("dashField");
  return (
    <MessagesProvider messages={{ dashField }}>
      <Suspense>
        <OAuthCallbackResult />
      </Suspense>
    </MessagesProvider>
  );
}
