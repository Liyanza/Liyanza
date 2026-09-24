import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { PricingHero } from "@/components/sections/tarifs/PricingHero";
import { PricingCards } from "@/components/sections/tarifs/PricingCards";
import { ComparisonTable } from "@/components/sections/tarifs/ComparisonTable";
import { PricingFAQ } from "@/components/sections/tarifs/PricingFAQ";
import { PricingFinalCTA } from "@/components/sections/tarifs/PricingFinalCTA";
import { faqPageJsonLd } from "@/lib/structured-data";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplashScreen } from "@/components/motion/SplashScreen";
import { getMessages, href } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const { meta } = await getMessages("pricing");
  return localizedMetadata({ path: "/tarifs", title: meta.title, description: meta.description });
}

export default async function TarifsPage() {
  const t = await getMessages("pricing");
  const jsonLd = faqPageJsonLd(t.faq.items, await href("/tarifs"));

  return (
    <>
      <SplashScreen />
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <PricingHero t={t.hero} />
          <PricingCards />
          <ComparisonTable />
          <PricingFAQ t={t.faq} />
          <PricingFinalCTA />
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
