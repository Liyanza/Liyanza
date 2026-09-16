import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { PricingHero } from "@/components/sections/tarifs/PricingHero";
import { PricingCards } from "@/components/sections/tarifs/PricingCards";
import { ComparisonTable } from "@/components/sections/tarifs/ComparisonTable";
import { PricingFAQ } from "@/components/sections/tarifs/PricingFAQ";
import { PricingFinalCTA } from "@/components/sections/tarifs/PricingFinalCTA";
import { pricingFaqs } from "@/data/faqs";
import { faqPageJsonLd } from "@/lib/structured-data";

const title = "Tarifs";
const description =
  "Des tarifs simples pour des campagnes plus intelligentes. Comparez les formules FREE, PRO, BUSINESS et ENTERPRISE de KIYANZA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tarifs",
  },
  openGraph: {
    title,
    description,
    url: "/tarifs",
  },
  twitter: {
    title,
    description,
  },
};

export default function TarifsPage() {
  const jsonLd = faqPageJsonLd(pricingFaqs, "/tarifs");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PricingHero />
        <PricingCards />
        <ComparisonTable />
        <PricingFAQ />
        <PricingFinalCTA />
      </main>
      <Footer />
      <ChatbotWidget />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
