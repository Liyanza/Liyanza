import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { LegalPageHeader } from "@/components/sections/legal/LegalPageHeader";
import { LegalTableOfContents } from "@/components/sections/legal/LegalTableOfContents";
import {
  TermsOfServiceContent,
  termsOfServiceSections,
} from "@/components/sections/legal/TermsOfServiceContent";

const title = "Conditions d'utilisation";
const description =
  "Les conditions qui régissent l'accès et l'utilisation de la plateforme KIYANZA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/conditions-utilisation",
  },
  openGraph: {
    title,
    description,
    url: "/conditions-utilisation",
  },
  twitter: {
    title,
    description,
  },
};

export default function ConditionsUtilisationPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <LegalPageHeader
            eyebrow="Cadre légal"
            title="Conditions d'utilisation"
            intro="Les règles qui encadrent l'accès et l'utilisation de KIYANZA, pour vous comme pour nous."
            lastUpdated="17 septembre 2026"
          />
          <LegalTableOfContents items={termsOfServiceSections} />
          <TermsOfServiceContent />
        </main>
      </PageTransition>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
