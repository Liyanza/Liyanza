import { PageTransition } from "@/components/motion/PageTransition";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { LegalPageHeader } from "@/components/sections/legal/LegalPageHeader";
import { DataDeletionContent } from "@/components/sections/legal/DataDeletionContent";
import { DataDeletionContentEn } from "@/components/sections/legal/DataDeletionContent.en";
import { getLocale, getMessages } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const { meta } = (await getMessages("legal")).deletion;
  return localizedMetadata({ path: "/suppression-des-donnees", title: meta.title, description: meta.description });
}

export default async function SuppressionDesDonneesPage() {
  const t = (await getMessages("legal")).deletion;
  // Le document lui-même existe en une version par langue.
  const en = (await getLocale()) === "en";
  const Content = en ? DataDeletionContentEn : DataDeletionContent;

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <LegalPageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} lastUpdated={t.date} />
          <Content />
        </main>
      </PageTransition>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
