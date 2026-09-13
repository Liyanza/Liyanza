import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AboutHero } from "@/components/sections/apropos/AboutHero";
import { MissionSection } from "@/components/sections/apropos/MissionSection";
import { ChallengesSection } from "@/components/sections/apropos/ChallengesSection";
import { ValuesSection } from "@/components/sections/apropos/ValuesSection";
import { TimelineSection } from "@/components/sections/apropos/TimelineSection";
import { TeamSection } from "@/components/sections/apropos/TeamSection";
import { AboutFAQ } from "@/components/sections/apropos/AboutFAQ";
import { AboutFinalCTA } from "@/components/sections/apropos/AboutFinalCTA";

export const metadata: Metadata = {
  title: "À propos — KIYANZA",
  description:
    "Nous rendons le marketing lisible par tous. Découvrez la mission, les valeurs, l'histoire et l'équipe derrière KIYANZA.",
};

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <MissionSection />
        <ChallengesSection />
        <ValuesSection />
        <TimelineSection />
        <TeamSection />
        <AboutFAQ />
        <AboutFinalCTA />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
