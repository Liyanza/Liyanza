import { Navbar } from "@/components/sections/Navbar";
import { LandingHero } from "@/components/sections/accueil/LandingHero";
import { LandingFeaturesOverview } from "@/components/sections/accueil/LandingFeaturesOverview";
import { LandingFeatureDetail } from "@/components/sections/accueil/LandingFeatureDetail";
import { CampaignWizardMockup } from "@/components/sections/accueil/mockups/CampaignWizardMockup";
import { AIScenarioMockup } from "@/components/sections/accueil/mockups/AIScenarioMockup";
import { ChannelMonitoringMockup } from "@/components/sections/accueil/mockups/ChannelMonitoringMockup";
import { LandingPricing } from "@/components/sections/accueil/LandingPricing";
import { LandingFAQ } from "@/components/sections/accueil/LandingFAQ";
import { FeaturesFinalCTA } from "@/components/sections/fonctionnalites/FeaturesFinalCTA";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { faqPageJsonLd } from "@/lib/structured-data";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplashScreen } from "@/components/motion/SplashScreen";
import { getMessages, href } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const { meta } = await getMessages("home");
  return localizedMetadata({ path: "/", title: meta.title, description: meta.description, absoluteTitle: true });
}

export default async function Home() {
  const t = await getMessages("home");
  const jsonLd = faqPageJsonLd(t.faq.items, await href("/"));
  const { campaigns, ai, monitoring } = t.details;

  return (
    <>
      <SplashScreen />
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <LandingHero />
          <LandingFeaturesOverview />

          <LandingFeatureDetail
            bg="slate"
            heading={campaigns.heading}
            description={campaigns.description}
            items={campaigns.items}
            ctaText={campaigns.cta}
            ctaHref="/fonctionnalites#campagnes"
            mockup={<CampaignWizardMockup />}
          />

          <LandingFeatureDetail
            heading={ai.heading}
            description={ai.description}
            items={ai.items}
            ctaText={ai.cta}
            ctaHref="/fonctionnalites#scenarios-ia"
            mockup={<AIScenarioMockup />}
            reverse
          />

          <LandingFeatureDetail
            bg="zinc"
            heading={monitoring.heading}
            description={monitoring.description}
            items={monitoring.items}
            ctaText={monitoring.cta}
            ctaHref="/fonctionnalites#monitoring"
            mockup={<ChannelMonitoringMockup />}
          />

          <LandingPricing />
          <LandingFAQ {...t.faq} />
          <FeaturesFinalCTA />
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
