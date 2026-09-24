import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { LegalPageHeader } from "@/components/sections/legal/LegalPageHeader";
import { DataDeletionContent } from "@/components/sections/legal/DataDeletionContent";
import { PageTransition } from "@/components/motion/PageTransition";

const title = "Suppression des données";
const description =
  "Comment demander la suppression de vos données à caractère personnel sur KIYANZA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/suppression-des-donnees",
  },
  openGraph: {
    title,
    description,
    url: "/suppression-des-donnees",
  },
  twitter: {
    title,
    description,
  },
};

export default function SuppressionDesDonneesPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <LegalPageHeader
            eyebrow="Vos données"
            title="Suppression des données"
            intro="Comment demander la suppression de vos données à caractère personnel, y compris pour les comptes créés via Google ou Facebook."
            lastUpdated="18 septembre 2026"
          />
          <DataDeletionContent />
        </main>
      </PageTransition>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
