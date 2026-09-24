import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { splashBootScript } from "@/config/splash";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import { loadMessages } from "@/i18n/dictionaries";
import { MessagesProvider } from "@/i18n/client";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/**
 * Les deux langues sont générées au build. Pas de `dynamicParams = false` :
 * sur ce segment racine il empêchait la résolution des routes /api. Une
 * langue inconnue donne quand même une 404 (isLocale → notFound ci-dessous).
 */
export function generateStaticParams() {
  return locales.map((l) => ({ lang: l }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  const { meta } = await loadMessages(locale, "common");
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: meta.defaultTitle,
      template: siteConfig.titleTemplate,
    },
    description: meta.description,
    keywords: [...siteConfig.keywords],
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: meta.defaultTitle,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: meta.defaultTitle,
      description: meta.description,
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: ["/icon.svg"],
    },
    manifest: "/manifest.webmanifest",
    verification: {
      ...(siteConfig.verification.google ? { google: siteConfig.verification.google } : {}),
      ...(siteConfig.verification.bing ? { other: { "msvalidate.01": siteConfig.verification.bing } } : {}),
    },
    category: "technology",
  };
}

const motionFlagScript =
  "try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.dataset.motion='on'}catch(e){}";

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  const common = await loadMessages(locale, "common");
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${poppins.variable} h-full scroll-pt-20 antialiased motion-safe:scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Before first paint: lets CSS pre-hide hero intros only when they will animate. */}
        <script dangerouslySetInnerHTML={{ __html: motionFlagScript }} />
        {splashBootScript && <script dangerouslySetInnerHTML={{ __html: splashBootScript }} />}
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <MessagesProvider locale={locale} messages={{ common }}>
          {children}
        </MessagesProvider>
        {jsonLd.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </body>
    </html>
  );
}
