import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AboutHero } from "@/components/sections/apropos/AboutHero";
import { MissionSection } from "@/components/sections/apropos/MissionSection";
import { ChallengesSection } from "@/components/sections/apropos/ChallengesSection";
import { ValuesSection } from "@/components/sections/apropos/ValuesSection";
import { TeamSection } from "@/components/sections/apropos/TeamSection";
import { AboutFAQ } from "@/components/sections/apropos/AboutFAQ";
import { AboutFinalCTA } from "@/components/sections/apropos/AboutFinalCTA";
import { aboutFaqs } from "@/data/faqs";
import { faqPageJsonLd } from "@/lib/structured-data";
import { PageTransition } from "@/components/motion/PageTransition";

const title = "À propos";
const description =
  "Nous rendons le marketing lisible par tous. Découvrez la mission, les valeurs, l'histoire et l'équipe derrière KIYANZA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/a-propos",
  },
  openGraph: {
    title,
    description,
    url: "/a-propos",
  },
  twitter: {
    title,
    description,
  },
};

export default function AProposPage() {
  const jsonLd = faqPageJsonLd(aboutFaqs, "/a-propos");

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <AboutHero />
          <MissionSection />
          <ChallengesSection />
          <ValuesSection />
          <TeamSection />
          <AboutFAQ />
          <AboutFinalCTA />
        </main>
      </PageTransition>
      <Footer />
      <ChatbotWidget />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
