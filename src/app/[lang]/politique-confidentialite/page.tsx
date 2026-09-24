import { PageTransition } from "@/components/motion/PageTransition";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { LegalPageHeader } from "@/components/sections/legal/LegalPageHeader";
import { LegalTableOfContents } from "@/components/sections/legal/LegalTableOfContents";
import { PrivacyPolicyContent, privacyPolicySections } from "@/components/sections/legal/PrivacyPolicyContent";
import { PrivacyPolicyContentEn, privacyPolicySectionsEn } from "@/components/sections/legal/PrivacyPolicyContent.en";
import { getLocale, getMessages } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const { meta } = (await getMessages("legal")).privacy;
  return localizedMetadata({ path: "/politique-confidentialite", title: meta.title, description: meta.description });
}

export default async function PolitiqueConfidentialitePage() {
  const t = (await getMessages("legal")).privacy;
  // Le document lui-même existe en une version par langue.
  const en = (await getLocale()) === "en";
  const Content = en ? PrivacyPolicyContentEn : PrivacyPolicyContent;
  const sections = en ? privacyPolicySectionsEn : privacyPolicySections;

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <LegalPageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} lastUpdated={t.date} />
          <LegalTableOfContents items={sections} />
          <Content />
        </main>
      </PageTransition>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
