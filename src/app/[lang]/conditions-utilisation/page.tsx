import { PageTransition } from "@/components/motion/PageTransition";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { LegalPageHeader } from "@/components/sections/legal/LegalPageHeader";
import { LegalTableOfContents } from "@/components/sections/legal/LegalTableOfContents";
import { TermsOfServiceContent, termsOfServiceSections } from "@/components/sections/legal/TermsOfServiceContent";
import { TermsOfServiceContentEn, termsOfServiceSectionsEn } from "@/components/sections/legal/TermsOfServiceContent.en";
import { getLocale, getMessages } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const { meta } = (await getMessages("legal")).terms;
  return localizedMetadata({ path: "/conditions-utilisation", title: meta.title, description: meta.description });
}

export default async function ConditionsUtilisationPage() {
  const t = (await getMessages("legal")).terms;
  // Le document lui-même existe en une version par langue.
  const en = (await getLocale()) === "en";
  const Content = en ? TermsOfServiceContentEn : TermsOfServiceContent;
  const sections = en ? termsOfServiceSectionsEn : termsOfServiceSections;

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
