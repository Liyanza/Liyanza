import type fr from "../fr/home";

const home: typeof fr = {
  meta: {
    title: "KIYANZA — AI-powered smart marketing platform",
    description:
      "KIYANZA brings together the creation, monitoring and optimisation of your marketing campaigns, powered by AI.",
  },
  hero: {
    badge: "Discover the intelligence of KIYANZA",
    badgeNew: "NEW",
    titleStart: "Run your campaigns with",
    titleHighlight: "artificial intelligence",
    text: "KIYANZA brings together the creation, monitoring and optimisation of your marketing campaigns. Make better decisions, faster.",
    ctaPrimary: "Get started for free",
    ctaSecondary: "See the features",
    trust: ["No card required", "Cancel anytime", "AI included"],
    imageAlt:
      "A smiling marketing professional, laptop in hand, ready to run her campaigns with KIYANZA",
    stats: {
      conversions: "Conversions",
      budgetSplit: "Budget split",
      roi: "ROI",
      bestAudience: "Best audience",
      audienceValue: "Ages 25 – 45",
    },
  },
  overview: {
    eyebrow: "Features",
    titleStart: "Everything you need",
    titleEnd: "to run your campaigns.",
    text: "From planning to optimisation, KIYANZA covers the entire marketing cycle.",
    features: [
      {
        title: "Campaign management",
        description: "Plan, launch and manage all your campaigns from a single dashboard.",
      },
      {
        title: "AI scenarios & recommendations",
        description: "Compare AI-generated scenarios and get optimisation recommendations.",
      },
      {
        title: "Real-time monitoring",
        description:
          "Track your KPIs continuously. Get automatic alerts when a campaign needs your attention.",
      },
      {
        title: "Advanced reports",
        description:
          "Generate complete performance reports in seconds. Export and share them easily.",
      },
      {
        title: "ROAS optimisation",
        description:
          "Spot your most profitable channels and reallocate your budget automatically to maximise results.",
      },
      {
        title: "Secure data",
        description:
          "Your marketing data is encrypted and securely hosted. You stay fully in control.",
      },
    ],
  },
  details: {
    campaigns: {
      heading: "Create and run your campaigns in minutes",
      description:
        "A guided workflow to set your goals, choose your channels and allocate your budget.",
      items: [
        "Centralised multi-channel planning",
        "Real-time budget tracking",
        "Automatic performance alerts",
        "Built-in team collaboration",
      ],
      cta: "Learn more",
    },
    ai: {
      heading: "AI as the co-pilot of your marketing decisions",
      description:
        "KIYANZA generates and compares marketing scenarios for you. Understand the impact of every decision before you apply it.",
      items: [
        "One-click AI scenario generation",
        "Estimated performance score for each scenario",
        "Budget reallocation recommendations",
        "Decision support — you stay in control",
      ],
      cta: "Explore KIYANZA AI",
    },
    monitoring: {
      heading: "Never miss an important signal again",
      description:
        "KIYANZA monitors your campaigns around the clock and alerts you as soon as something needs your attention.",
      items: [
        "Real-time monitoring dashboard",
        "Budget, performance and goal alerts",
        "Channel comparison by ROAS",
        "Metric history and trends",
      ],
      cta: "See monitoring",
    },
  },
  mockups: {
    wizard: {
      title: "New campaign",
      subtitle: "End-of-year promo — Facebook & Instagram",
      steps: ["Set the goal", "Pick channels", "Set the budget", "Launch"],
      objective: "Goal",
      objectiveValue: "Increase conversions",
      budget: "Budget",
      budgetValue: "150,000 FCFA",
      duration: "Duration",
      durationValue: "14 days",
      add: "+ Add",
    },
    scenarios: {
      title: "AI scenario comparison",
      recommended: "AI PICK",
      roas: "Estimated ROAS",
      conversions: "Conversions",
      items: [
        { name: "Scenario A — Budget focus", roas: "4.2×", conversions: "1,450" },
        { name: "Scenario B — Max reach", roas: "3.6×", conversions: "2,100" },
        { name: "Scenario C — Balanced", roas: "3.9×", conversions: "1,780" },
      ],
    },
    monitoring: {
      title: "Real-time monitoring",
      ofGoal: "of goal",
      percent: "{value}%",
      activities: [
        { text: "Orange Money promo budget at 85%", time: "1 h ago" },
        { text: "Instagram conversion goal reached", time: "3 h ago" },
        { text: "New AI recommendation available", time: "4 h ago" },
      ],
    },
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple, transparent pricing",
    text: "Start for free. Grow as you need.",
    compare: "See all pricing and compare plans →",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    text: "Everything you need to know about KIYANZA. Can't find your answer?",
    cta: "Browse all resources",
    items: [
      {
        question: "Is KIYANZA suitable for small businesses?",
        answer:
          "Yes. KIYANZA adapts to the size of your team, from freelancers to large companies, with plans that grow with you.",
      },
      {
        question: "Does the AI make decisions for me?",
        answer:
          "No. KIYANZA is a decision-support tool. The AI analyses your data and makes recommendations — the final decision is always yours.",
      },
      {
        question: "Can I connect several channels?",
        answer:
          "Yes. You can centralise and manage Facebook, Instagram, WhatsApp and other channels from a single dashboard.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Your data is encrypted and securely hosted. KIYANZA never shares your data with third parties.",
      },
    ],
  },
};

export default home;
