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
import { faqPageJsonLd } from "@/lib/structured-data";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplashScreen } from "@/components/motion/SplashScreen";
import { getMessages, href } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const { meta } = await getMessages("about");
  return localizedMetadata({ path: "/a-propos", title: meta.title, description: meta.description });
}

export default async function AProposPage() {
  const t = await getMessages("about");
  const jsonLd = faqPageJsonLd(t.faq.items, await href("/a-propos"));

  return (
    <>
      <SplashScreen />
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <AboutHero />
          <MissionSection />
          <ChallengesSection />
          <ValuesSection />
          <TeamSection />
          <AboutFAQ t={t.faq} />
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
