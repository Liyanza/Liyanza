import type fr from "../fr/features";

const features: typeof fr = {
  meta: {
    title: "Features",
    description:
      "Explore every KIYANZA feature: campaign creation, AI scenarios, centralised management, real-time monitoring, recommendations and reports.",
  },
  hero: {
    eyebrow: "Features",
    titleLines: ["Everything to run", "your marketing"],
    titleHighlight: "campaigns",
    text: "From planning to analysis, KIYANZA helps you make better decisions and optimise your performance.",
    ctaPrimary: "Get started for free",
    ctaSecondary: "See how it works",
    imageAlt:
      "A smiling marketing professional, laptop in hand, ready to run her campaigns with KIYANZA",
  },
  tabs: {
    label: "Feature sections",
    items: ["Campaigns", "AI scenarios", "Campaign management", "Monitoring", "AI recommendations", "Reports"],
  },
  sections: {
    campaigns: {
      eyebrow: "Campaign creation",
      heading: ["Create your campaigns", "with precision"],
      description:
        "Set your goals, budget, audience and channels before you launch your campaign.",
      items: [
        "Marketing goal setting",
        "Budget management by channel",
        "Audience targeting",
        "Distribution channel selection",
        "Campaign planning and scheduling",
      ],
      cta: "Explore planning",
    },
    scenarios: {
      eyebrow: "AI scenarios",
      heading: ["Test your strategies", "before you invest"],
      description:
        "Simulate different marketing scenarios with artificial intelligence to choose the best strategy.",
      items: [
        "Real-time multi-scenario simulation",
        "Potential analysis for each scenario",
        "Automatic best-scenario recommendation",
        "Budget vs. estimated performance comparison",
        "Automatic adjustments by channel",
      ],
      cta: "Explore AI scenarios",
    },
    monitoring: {
      eyebrow: "Monitoring",
      heading: ["Track your campaigns", "in real time"],
      description: "Visualise your performance and instantly spot problems or opportunities.",
      items: [
        "Real-time dashboard",
        "Automatic threshold notifications",
        "Simultaneous multi-campaign tracking",
        "Standardised ROAS, CPC and CPA metrics",
        "History and period comparison",
      ],
      cta: "Discover monitoring",
    },
    recommendations: {
      eyebrow: "AI recommendations",
      heading: ["Turn your data", "into decisions"],
      description:
        "KIYANZA analyses your performance and suggests concrete recommendations to improve your results.",
      items: [
        "Automatic performance analysis",
        "One-click actionable recommendations",
        "Impact estimate before you apply",
        "Action prioritisation and scheduling",
      ],
      cta: "Discover recommendations",
      tip: "💡 KIYANZA AI generates 3 to 5 recommendations a week on average, tailored to your industry and goals.",
    },
    reports: {
      eyebrow: "Reports",
      heading: ["Understand your results", "in seconds"],
      description:
        "Turn your campaign data into clear, actionable reports that are ready to share.",
      items: [
        "Visual summary of key metrics",
        "PDF export and direct sharing",
        "Custom reports for each campaign",
        "Multi-period comparison",
        "Google Sheets and Excel integration",
      ],
      cta: "See a sample report",
    },
  },
  table: {
    eyebrow: "03 · Campaign management",
    title: "Centralise all your campaigns",
    text: "Find all your campaigns in one place and track their status, budget and performance.",
    search: "Search for a campaign…",
    actions: ["Advanced filter", "Export CSV", "Full monitoring", "Compare periods"],
    columns: ["Campaign", "Status", "Channels", "Budget", "ROI", "Actions"],
    campaignLabel: "Campaign",
    status: { running: "Running", planned: "Scheduled", done: "Completed" },
    rows: [
      { name: "Orange Money promo", budget: "500,000 FCFA" },
      { name: "Special sale", budget: "75,000 FCFA" },
      { name: "Product launch", budget: "70,000 FCFA" },
      { name: "Customer loyalty", budget: "50,000 FCFA" },
    ],
    footer: "4 campaigns · Updated 2 min ago",
    seeAll: "See all campaigns →",
  },
  mockups: {
    form: {
      title: "New campaign",
      objective: "Goal",
      objectiveValue: "Conversions",
      budget: "Budget",
      budgetValue: "500,000 FCFA",
      perCampaign: "/ campaign",
      audience: "Target audience",
      audienceValue: "Ages 25 – 45 · Cameroon",
      channels: "Distribution channels",
      period: "Period",
      periodValue: "15 Jan – 28 Jan 2025",
      periodDays: "14 days",
      continue: "Continue",
    },
    scenarios: {
      title: "AI scenario simulation",
      budget: "Budget: 500,000 FCFA",
      estimatedRoi: "Estimated ROI",
      recommended: "AI pick",
      seeAll: "See all scenarios",
      items: [
        { name: "Scenario A", budget: "200,000 FCFA" },
        { name: "Scenario B", budget: "350,000 FCFA" },
        { name: "Scenario C", budget: "275,000 FCFA" },
      ],
    },
    monitoring: {
      title: "Real-time monitoring",
      live: "Live · 12–18 May 2025",
      range: "Last 7 days",
      stats: [
        { label: "Impressions", value: "124,400" },
        { label: "Clicks", value: "9,240" },
        { label: "Conversions", value: "1,384" },
        { label: "Spend", value: "89,000F" },
        { label: "ROAS", value: "5.8x" },
      ],
      alertsTitle: "Automatic alerts",
      alerts: [
        { text: "CPC above threshold on Facebook", time: "2h ago" },
        { text: "Conversion rate up: +4.2%", time: "4h ago" },
      ],
    },
    recommendation: {
      title: "AI recommendation",
      meta: "High priority · 87% confidence",
      badge: "New",
      headline:
        "Reallocate 20% of your Facebook Ads budget to WhatsApp to improve your overall performance.",
      detail:
        "Based on your last 30 days of data, WhatsApp delivers 2x more conversions at the same cost.",
      stats: [
        { value: "-18.5%", label: "Estimated CPC" },
        { value: "87%", label: "Success probability" },
        { value: "3–5d", label: "Time to results" },
      ],
      apply: "✓ Apply this recommendation",
      details: "See the analysis details →",
    },
    report: {
      title: "Campaign report",
      subtitle: "Orange Money promo · May 2025",
      stats: [
        { label: "Impressions", value: "124,400" },
        { label: "Conversions", value: "1,384" },
        { label: "Conv. rate", value: "4.5%" },
        { label: "Budget spent", value: "85,000F" },
        { label: "ROAS", value: "5.8x" },
        { label: "CPA", value: "85 FCFA" },
      ],
      export: "Export PDF",
      share: "Share →",
    },
  },
  process: {
    eyebrow: "How does it work?",
    titleLines: ["One journey to run", "your campaigns"],
    text: "A simple, integrated flow, from setup to the final report.",
    steps: ["Create", "Simulate", "Launch", "Monitor", "Optimise", "Export"],
  },
};

export default features;
