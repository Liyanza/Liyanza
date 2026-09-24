import type fr from "../fr/pricing";

const pricing: typeof fr = {
  meta: {
    title: "Pricing",
    description:
      "Simple pricing for smarter campaigns. Compare KIYANZA's FREE, PRO, BUSINESS and ENTERPRISE plans.",
  },
  hero: {
    eyebrow: "Pricing",
    titleStart: "Simple pricing for",
    titleHighlight: "smarter campaigns",
    text: "Choose the plan that fits your needs and scale your use of KIYANZA as your business grows.",
    monthly: "Monthly",
    annual: "Yearly",
    annualHint: "Save with yearly billing",
  },
  cardsFooter: ["No card needed for FREE", "Switch plans anytime", "Cancel with no commitment"],
  comparison: {
    eyebrow: "Comparison",
    title: "Compare features",
    text: "A complete overview of what each plan includes.",
    featureColumn: "Feature",
    recommended: "Recommended",
    limited: "Limited",
    included: "Included",
    notIncluded: "Not included",
    features: [
      "Campaign management",
      "Dashboard",
      "Performance tracking",
      "Reports",
      "AI scenarios",
      "AI recommendations",
      "Advanced monitoring",
      "Multiple campaigns",
      "Team collaboration",
      "Access management",
      "In-depth analysis",
      "Priority support",
      "Full customisation",
      "Dedicated support",
    ],
    buttons: ["Get started", "Choose PRO", "Business", "Contact us"],
  },
  faq: {
    eyebrow: "Pricing FAQ",
    title: "Frequently asked questions",
    text: "Can't find your answer? Our team is here to help.",
    cta: "Browse all resources",
    items: [
      {
        question: "Can I start for free?",
        answer: "Yes. The FREE plan lets you try KIYANZA with no commitment and no credit card.",
      },
      {
        question: "Can I change plans at any time?",
        answer: "Yes. You can upgrade or downgrade your plan at any time from your account.",
      },
      {
        question: "What is the difference between monthly and yearly billing?",
        answer:
          "Yearly billing gives you a discount compared with paying monthly, with the same access to every feature.",
      },
      {
        question: "Are AI features available on every plan?",
        answer:
          "Limited access to AI recommendations is included in the FREE plan. AI scenarios and advanced recommendations are available from the PRO plan upwards.",
      },
      {
        question: "How does the ENTERPRISE plan work?",
        answer:
          "The ENTERPRISE plan is quote-based and adapts to your organisation's specific needs, with dedicated support.",
      },
      {
        question: "Can I cancel my subscription?",
        answer: "Yes. You can cancel your subscription at any time, with no commitment and no hidden fees.",
      },
    ],
  },
};

export default pricing;
