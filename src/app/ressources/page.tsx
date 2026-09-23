import type { Metadata } from "next";
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
import { resourcesFaqs } from "@/data/faqs";
import { faqPageJsonLd } from "@/lib/structured-data";
import { PageTransition } from "@/components/motion/PageTransition";

const title = "Ressources";
const description =
  "Guides, tutoriels, vidéos et FAQ — tout ce qu'il faut pour piloter vos campagnes comme un expert avec KIYANZA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/ressources",
  },
  openGraph: {
    title,
    description,
    url: "/ressources",
  },
  twitter: {
    title,
    description,
  },
};

export default function RessourcesPage() {
  const jsonLd = faqPageJsonLd(resourcesFaqs, "/ressources");

  return (
    <>
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
    </>
  );
}
