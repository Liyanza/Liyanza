import { absoluteUrl, siteConfig } from "./site-config";

export type FaqEntry = { question: string; answer: string };

/** Schema.org Organization — identité de l'entreprise pour Google. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/kiyanza-logo-mark.svg"),
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
  };
}

/** Schema.org WebSite — permet à Google de comprendre la structure du site. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.defaultDescription,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "fr-FR",
  };
}

/** Schema.org FAQPage — peut générer des rich snippets "questions fréquentes". */
export function faqPageJsonLd(faqs: FaqEntry[], pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": absoluteUrl(`${pagePath}#faq`),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Schema.org BreadcrumbList — utile pour les pages profondes. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
