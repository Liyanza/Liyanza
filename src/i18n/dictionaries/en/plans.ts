import type fr from "../fr/plans";

const plans: typeof fr = {
  recommended: "Recommended",
  included: "Included",
  items: [
    {
      tier: "FREE",
      tagline: "To discover KIYANZA",
      price: "Free",
      priceNote: "",
      cta: "Get started for free",
      featured: false,
      features: [
        "Campaign management",
        "Dashboard",
        "Performance tracking",
        "Basic reports",
        "Limited AI access",
      ],
    },
    {
      tier: "PRO",
      tagline: "For marketing teams",
      price: "XX,XXX FCFA/month",
      priceNote: "per month",
      cta: "Start with PRO",
      featured: true,
      features: [
        "Everything in Free",
        "AI scenarios",
        "Advanced AI recommendations",
        "Advanced monitoring",
        "Advanced reports",
        "Multiple campaigns",
        "Performance analysis",
      ],
    },
    {
      tier: "BUSINESS",
      tagline: "For growing companies",
      price: "XX,XXX FCFA/month",
      priceNote: "per month",
      cta: "Choose Business",
      featured: false,
      features: [
        "Everything in PRO",
        "Team collaboration",
        "Access management",
        "In-depth analysis",
        "Advanced reporting",
        "Advanced monitoring",
      ],
    },
    {
      tier: "ENTERPRISE",
      tagline: "For specific needs",
      price: "Custom quote",
      priceNote: "",
      cta: "Contact the team",
      featured: false,
      features: [
        "Tailored solution",
        "Dedicated support",
        "Advanced team management",
        "Personalised assistance",
        "Custom features",
      ],
    },
  ],
};

export default plans;
