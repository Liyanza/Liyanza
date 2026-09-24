import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { splashBootScript } from "@/config/splash";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.defaultDescription,
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
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
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

const motionFlagScript =
  "try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.dataset.motion='on'}catch(e){}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html
      lang="fr"
      className={`${poppins.variable} h-full scroll-pt-20 antialiased motion-safe:scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Before first paint: lets CSS pre-hide hero intros only when they will animate. */}
        <script dangerouslySetInnerHTML={{ __html: motionFlagScript }} />
        {splashBootScript && <script dangerouslySetInnerHTML={{ __html: splashBootScript }} />}
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
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
