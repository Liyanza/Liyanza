import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { FeaturesHero } from "@/components/sections/fonctionnalites/FeaturesHero";
import { TabNav } from "@/components/sections/fonctionnalites/TabNav";
import { FeatureDetailSection } from "@/components/sections/fonctionnalites/FeatureDetailSection";
import { CampaignFormMockup } from "@/components/sections/fonctionnalites/CampaignFormMockup";
import { ScenariosMockup } from "@/components/sections/fonctionnalites/ScenariosMockup";
import { CampaignsTableSection } from "@/components/sections/fonctionnalites/CampaignsTableSection";
import { MonitoringMockup } from "@/components/sections/fonctionnalites/MonitoringMockup";
import { RecommendationMockup } from "@/components/sections/fonctionnalites/RecommendationMockup";
import { ReportMockup } from "@/components/sections/fonctionnalites/ReportMockup";
import { ProcessSteps } from "@/components/sections/fonctionnalites/ProcessSteps";
import { FeaturesFinalCTA } from "@/components/sections/fonctionnalites/FeaturesFinalCTA";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplashScreen } from "@/components/motion/SplashScreen";
import { getMessages } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const { meta } = await getMessages("features");
  return localizedMetadata({ path: "/fonctionnalites", title: meta.title, description: meta.description });
}

export default async function FonctionnalitesPage() {
  const t = await getMessages("features");
  const s = t.sections;

  return (
    <>
      <SplashScreen />
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <FeaturesHero />
          <TabNav label={t.tabs.label} items={t.tabs.items} />

          <FeatureDetailSection
            id="campagnes"
            bg="white"
            eyebrowNumber="01"
            eyebrowLabel={s.campaigns.eyebrow}
            heading={s.campaigns.heading}
            description={s.campaigns.description}
            items={s.campaigns.items}
            ctaText={s.campaigns.cta}
            mockup={<CampaignFormMockup />}
          />

          <FeatureDetailSection
            id="scenarios-ia"
            bg="blue-tint"
            eyebrowNumber="02"
            eyebrowLabel={s.scenarios.eyebrow}
            heading={s.scenarios.heading}
            description={s.scenarios.description}
            items={s.scenarios.items}
            ctaText={s.scenarios.cta}
            mockup={<ScenariosMockup />}
            reverse
          />

          <CampaignsTableSection />

          <FeatureDetailSection
            id="monitoring"
            bg="green-tint"
            eyebrowNumber="04"
            eyebrowLabel={s.monitoring.eyebrow}
            heading={s.monitoring.heading}
            description={s.monitoring.description}
            items={s.monitoring.items}
            ctaText={s.monitoring.cta}
            mockup={<MonitoringMockup />}
          />

          <FeatureDetailSection
            id="recommandations-ia"
            bg="white"
            eyebrowNumber="05"
            eyebrowLabel={s.recommendations.eyebrow}
            heading={s.recommendations.heading}
            description={s.recommendations.description}
            items={s.recommendations.items}
            ctaText={s.recommendations.cta}
            mockup={<RecommendationMockup />}
            extra={
              <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
                <p className="text-xs leading-relaxed text-[#4a5565]">{s.recommendations.tip}</p>
              </div>
            }
          />

          <FeatureDetailSection
            id="rapports"
            bg="slate"
            eyebrowNumber="06"
            eyebrowLabel={s.reports.eyebrow}
            heading={s.reports.heading}
            description={s.reports.description}
            items={s.reports.items}
            ctaText={s.reports.cta}
            mockup={<ReportMockup />}
            reverse
          />

          <ProcessSteps />
          <FeaturesFinalCTA />
        </main>
      </PageTransition>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
