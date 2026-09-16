import type { Metadata } from "next";
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

const title = "Fonctionnalités";
const description =
  "Découvrez toutes les fonctionnalités de KIYANZA : création de campagnes, scénarios IA, gestion centralisée, monitoring temps réel, recommandations et rapports.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/fonctionnalites",
  },
  openGraph: {
    title,
    description,
    url: "/fonctionnalites",
  },
  twitter: {
    title,
    description,
  },
};

const accents = {
  green: { check: "bg-green-600" },
  orange: { check: "bg-orange-500" },
  blue: { check: "bg-blue-500" },
  violet: { check: "bg-violet-500" },
};

export default function FonctionnalitesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <FeaturesHero />
        <TabNav />

        <FeatureDetailSection
          id="campagnes"
          bg="white"
          eyebrowNumber="01"
          eyebrowLabel="Création de campagne"
          heading={["Créez vos campagnes", "avec précision"]}
          description="Définissez vos objectifs, votre budget, votre audience et vos canaux avant de lancer votre campagne."
          items={[
            "Définition des objectifs marketing",
            "Gestion du budget par canal",
            "Ciblage de l'audience",
            "Sélection des canaux de diffusion",
            "Planification et calendrier de campagne",
          ]}
          ctaText="Explorer la planification"
          accent={accents.green}
          mockup={<CampaignFormMockup />}
        />

        <FeatureDetailSection
          id="scenarios-ia"
          bg="green-tint"
          eyebrowNumber="02"
          eyebrowLabel="Scénarios IA"
          heading={["Testez vos stratégies", "avant d'investir"]}
          description="Simulez différents scénarios marketing grâce à l'intelligence artificielle pour choisir la meilleure stratégie."
          items={[
            "Simulation multi-scénarios en temps réel",
            "Analyse du potentiel de chaque scénario",
            "Recommandation automatique du meilleur scénario",
            "Comparaison budget / performances estimées",
            "Ajustements automatiques par canal",
          ]}
          ctaText="Explorer les scénarios IA"
          accent={accents.orange}
          mockup={<ScenariosMockup />}
          reverse
        />

        <CampaignsTableSection />

        <FeatureDetailSection
          id="monitoring"
          bg="blue-tint"
          eyebrowNumber="04"
          eyebrowLabel="Monitoring"
          heading={["Suivez vos campagnes", "en temps réel"]}
          description="Visualisez vos performances et détectez instantanément les problèmes ou opportunités."
          items={[
            "Tableau de bord en temps réel",
            "Notifications automatiques sur seuils",
            "Suivi multi-campagnes simultané",
            "Indicateurs ROAS, CPC, CPA normalisés",
            "Historique et comparaison de périodes",
          ]}
          ctaText="Découvrir le monitoring"
          accent={accents.blue}
          mockup={<MonitoringMockup />}
        />

        <FeatureDetailSection
          id="recommandations-ia"
          bg="white"
          eyebrowNumber="05"
          eyebrowLabel="Recommandations IA"
          heading={["Transformez vos données", "en décisions"]}
          description="KIYANZA analyse vos performances et vous propose des recommandations concrètes pour améliorer vos résultats."
          items={[
            "Analyse automatique des performances",
            "Recommandations actionnables en 1 clic",
            "Estimation d'impact avant application",
            "Priorisation et calendrier des actions",
          ]}
          ctaText="Découvrir les recommandations"
          accent={accents.orange}
          mockup={<RecommendationMockup />}
          extra={
            <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
              <p className="text-xs leading-relaxed text-[#4a5565]">
                💡 L&apos;IA KIYANZA génère en moyenne 3 à 5 recommandations par
                semaine, adaptées à votre secteur et vos objectifs.
              </p>
            </div>
          }
        />

        <FeatureDetailSection
          id="rapports"
          bg="slate"
          eyebrowNumber="06"
          eyebrowLabel="Rapports"
          heading={["Comprenez vos résultats", "en quelques secondes"]}
          description="Transformez les données de vos campagnes en rapports clairs et exploitables, prêts à partager."
          items={[
            "Synthèse visuelle des indicateurs clés",
            "Export PDF et partage direct",
            "Rapports personnalisés par campagne",
            "Comparaison multi-période",
            "Intégration avec Google Sheets et Excel",
          ]}
          ctaText="Voir un exemple de rapport"
          accent={accents.violet}
          mockup={<ReportMockup />}
          reverse
        />

        <ProcessSteps />
        <FeaturesFinalCTA />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
