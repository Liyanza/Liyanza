import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { LegalPageHeader } from "@/components/sections/legal/LegalPageHeader";
import { LegalTableOfContents } from "@/components/sections/legal/LegalTableOfContents";
import {
  PrivacyPolicyContent,
  privacyPolicySections,
} from "@/components/sections/legal/PrivacyPolicyContent";

const title = "Politique de confidentialité";
const description =
  "Comment KIYANZA collecte, utilise et protège vos données à caractère personnel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/politique-confidentialite",
  },
  openGraph: {
    title,
    description,
    url: "/politique-confidentialite",
  },
  twitter: {
    title,
    description,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <LegalPageHeader
            eyebrow="Vos données"
            title="Politique de confidentialité"
            intro="Comment nous collectons, utilisons et protégeons vos données à caractère personnel sur KIYANZA."
            lastUpdated="17 septembre 2026"
          />
          <LegalTableOfContents items={privacyPolicySections} />
          <PrivacyPolicyContent />
        </main>
      </PageTransition>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
