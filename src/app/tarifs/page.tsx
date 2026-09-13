import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { PricingHero } from "@/components/sections/tarifs/PricingHero";
import { PricingCards } from "@/components/sections/tarifs/PricingCards";
import { ComparisonTable } from "@/components/sections/tarifs/ComparisonTable";
import { PricingQuiz } from "@/components/sections/tarifs/PricingQuiz";
import { PricingFAQ } from "@/components/sections/tarifs/PricingFAQ";
import { PricingFinalCTA } from "@/components/sections/tarifs/PricingFinalCTA";

export const metadata: Metadata = {
  title: "Tarifs — KIYANZA",
  description:
    "Des tarifs simples pour des campagnes plus intelligentes. Comparez les formules FREE, PRO, BUSINESS et ENTERPRISE de KIYANZA.",
};

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PricingHero />
        <PricingCards />
        <ComparisonTable />
        <PricingQuiz />
        <PricingFAQ />
        <PricingFinalCTA />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
