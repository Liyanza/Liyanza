import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { ResourcesHero } from "@/components/sections/ressources/ResourcesHero";
import { ResourceCategories } from "@/components/sections/ressources/ResourceCategories";
import { GuidesSection } from "@/components/sections/ressources/GuidesSection";
import { FeaturedGuide } from "@/components/sections/ressources/FeaturedGuide";
import { ArticlesSection } from "@/components/sections/ressources/ArticlesSection";
import { VideosSection } from "@/components/sections/ressources/VideosSection";
import { ResourcesFAQ } from "@/components/sections/ressources/ResourcesFAQ";
import { NewsletterSection } from "@/components/sections/ressources/NewsletterSection";
import { ResourcesFinalCTA } from "@/components/sections/ressources/ResourcesFinalCTA";
import { faqPageJsonLd } from "@/lib/structured-data";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplashScreen } from "@/components/motion/SplashScreen";
import { MessagesProvider } from "@/i18n/client";
import { getMessages, href } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  const { meta } = await getMessages("resources");
  return localizedMetadata({ path: "/ressources", title: meta.title, description: meta.description });
}

export default async function RessourcesPage() {
  const t = await getMessages("resources");
  const jsonLd = faqPageJsonLd(t.faq.items, await href("/ressources"));

  return (
    // La recherche, les filtres, la FAQ et la newsletter (composants client) lisent ce dictionnaire.
    <MessagesProvider messages={{ resources: t }}>
      <SplashScreen />
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <ResourcesHero />
          <ResourceCategories />
          <GuidesSection />
          <FeaturedGuide />
          <ArticlesSection />
          <VideosSection />
          <ResourcesFAQ />
          <NewsletterSection />
          <ResourcesFinalCTA />
        </main>
      </PageTransition>
      <Footer />
      <ChatbotWidget />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </MessagesProvider>
  );
}
