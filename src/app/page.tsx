import type { Metadata } from "next";
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
import { siteConfig } from "@/lib/site-config";
import { homeFaqs } from "@/data/faqs";
import { faqPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: siteConfig.defaultTitle },
  description: siteConfig.defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: "/",
  },
  twitter: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
};

export default function Home() {
  const jsonLd = faqPageJsonLd(homeFaqs, "/");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LandingHero />
        <LandingFeaturesOverview />

        <LandingFeatureDetail
          bg="slate"
          heading="Créez et pilotez vos campagnes en quelques minutes"
          description="Un workflow guidé pour définir vos objectifs, sélectionner vos canaux et allouer votre budget."
          items={[
            "Planification multi-canaux centralisée",
            "Suivi du budget en temps réel",
            "Alertes automatiques sur les performances",
            "Collaboration d'équipe intégrée",
          ]}
          ctaText="En savoir plus"
          ctaHref="/fonctionnalites#campagnes"
          mockup={<CampaignWizardMockup />}
        />

        <LandingFeatureDetail
          heading="L'IA comme copilote de vos décisions marketing"
          description="KIYANZA génère et compare des scénarios marketing pour vous. Comprenez l'impact de chaque décision avant de l'appliquer."
          items={[
            "Génération de scénarios IA en un clic",
            "Score de performance estimé par scénario",
            "Recommandations de réallocation budgétaire",
            "Aide à la décision — vous restez aux commandes",
          ]}
          ctaText="Explorer l'IA KIYANZA"
          ctaHref="/fonctionnalites#scenarios-ia"
          mockup={<AIScenarioMockup />}
          reverse
        />

        <LandingFeatureDetail
          bg="zinc"
          heading="Ne manquez plus aucun signal important"
          description="KIYANZA surveille vos campagnes en continu et vous alerte immédiatement quand quelque chose nécessite votre attention."
          items={[
            "Dashboard de monitoring en temps réel",
            "Alertes budget, performance et objectifs",
            "Comparaison des canaux par ROAS",
            "Historique et évolution des métriques",
          ]}
          ctaText="Voir le monitoring"
          ctaHref="/fonctionnalites#monitoring"
          mockup={<ChannelMonitoringMockup />}
        />

        <LandingPricing />
        <LandingFAQ />
        <FeaturesFinalCTA />
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
