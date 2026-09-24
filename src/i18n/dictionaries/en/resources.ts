import type fr from "../fr/resources";

const resources: typeof fr = {
  meta: {
    title: "Resources",
    description:
      "Guides, tutorials, videos and FAQs — everything you need to run your campaigns like an expert with KIYANZA.",
  },
  hero: {
    eyebrow: "Resource centre",
    titleStart: "How can we",
    titleHighlight: "help you?",
    text: "Guides, tutorials, videos and FAQs — everything you need to run your campaigns like an expert.",
  },
  search: {
    formLabel: "Search the resources",
    placeholder: "Search for a guide, tutorial, question...",
    inputLabel: "Search for a guide, a tutorial or a question",
    clear: "Clear search",
    submit: "Search",
    resultsOne: "1 result for “{query}”",
    resultsMany: "{count} results for “{query}”",
    noResults: "No results for “{query}”",
    hint: "Try another keyword, for example “campaign”, “budget” or “reports”.",
    popularLabel: "Popular:",
    popular: ["Create a campaign", "AI scenarios", "Monitoring", "Reports", "Budget"],
    kinds: {
      guide: "Guide",
      tutorial: "Tutorial",
      article: "Article",
      video: "Video",
      featured: "Featured guide",
      faq: "FAQ",
    },
  },
  categories: {
    eyebrow: "Quick access",
    title: "Find what you need",
    items: [
      { title: "Help centre", description: "Get quick answers to the most frequently asked questions.", cta: "Browse" },
      { title: "Documentation", description: "Explore every KIYANZA feature in detail.", cta: "Read the docs" },
      { title: "Guides & tutorials", description: "Learn to run your campaigns better, step by step.", cta: "See the guides" },
      { title: "Videos", description: "Watch demos and tutorials in just a few minutes.", cta: "Watch" },
    ],
  },
  guides: {
    eyebrow: "Guides & tutorials",
    title: "Learn to run your campaigns better",
    seeAll: "See all guides",
    filters: { all: "All", guide: "Guide", tutorial: "Tutorial", video: "Video", faq: "FAQ" },
    levels: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
    read: "Read",
    empty: "No content available for this filter yet.",
    items: [
      {
        type: "guide",
        level: "beginner",
        title: "How to create your first campaign with KIYANZA",
        description: "Learn step by step how to set your goals, budget and channels.",
        readingTime: "8 min read",
      },
      {
        type: "tutorial",
        level: "intermediate",
        title: "Using AI scenarios to optimise your campaigns",
        description: "Compare different scenarios and let the AI recommend the best strategy.",
        readingTime: "5 min read",
      },
      {
        type: "guide",
        level: "intermediate",
        title: "Reading a campaign's performance",
        description: "Learn to read your KPIs, charts and monitoring alerts.",
        readingTime: "6 min read",
      },
      {
        type: "guide",
        level: "advanced",
        title: "Optimising your marketing budget",
        description: "Concrete strategies to split your budget effectively across several channels.",
        readingTime: "7 min read",
      },
      {
        type: "tutorial",
        level: "beginner",
        title: "Exporting and sharing your reports",
        description: "Generate PDFs, schedule automatic sends and share with your team.",
        readingTime: "4 min read",
      },
      {
        type: "guide",
        level: "advanced",
        title: "Multi-channel strategy with KIYANZA",
        description: "Run Facebook, Instagram, WhatsApp and Google Ads from a single dashboard.",
        readingTime: "9 min read",
      },
    ],
  },
  featuredGuide: {
    label: "Guide",
    complete: "COMPLETE",
    duration: "45 min",
    category: "Strategy",
    eyebrow: "Featured guide",
    title: "The complete guide to running marketing campaigns",
    description:
      "From strategy to performance analysis, this complete guide walks you through every step to get the most out of KIYANZA and your marketing investment.",
    tags: ["Strategy", "Budgets", "KPIs", "AI", "Multi-channel"],
    download: "Download the guide",
    readOnline: "Read online",
  },
  articles: {
    eyebrow: "Blog",
    title: "Latest articles & tips",
    seeAll: "See all articles",
    featuredBadge: "Featured",
    read: "Read",
    featured: {
      tag: "Strategy",
      title: "5 mistakes to avoid in your Facebook Ads campaigns in Africa",
      date: "3 Sept 2026",
      readingTime: "6 min read",
    },
    items: [
      { tag: "AI & marketing", title: "How AI is transforming marketing campaign management", date: "28 Aug 2026", readingTime: "8 min" },
      { tag: "Case study", title: "How a Cameroonian SME doubled its ROI in 3 months", date: "20 Aug 2026", readingTime: "5 min" },
      { tag: "Strategy", title: "Marketing budget: the key metrics to track every week", date: "15 Aug 2026", readingTime: "7 min" },
    ],
  },
  videos: {
    eyebrow: "Videos",
    title: "Learn by watching",
    seeAll: "See all videos",
    play: "Play the video {title}",
    items: [
      { title: "KIYANZA overview", views: "1.2k views", duration: "5:12" },
      { title: "Create your first campaign", views: "986 views", duration: "8:30" },
      { title: "Dashboard & KPIs: a quick tour", views: "754 views", duration: "6:45" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    text: "Can't find your answer? Our team is here to help.",
    cta: "Contact support",
    items: [
      {
        question: "How do I access reports?",
        answer:
          "Go to the Reports tab of your dashboard to generate, export and share your campaign reports in a few clicks.",
      },
      {
        question: "How do I change the budget of an active campaign?",
        answer:
          "Open the campaign from your campaign list, then adjust the budget directly from its settings panel — the change takes effect immediately.",
      },
      {
        question: "Can I connect several ad accounts?",
        answer:
          "Yes. KIYANZA lets you connect several accounts (Facebook, Instagram, WhatsApp, Google Ads) and manage them from a single unified dashboard.",
      },
      {
        question: "How does the AI assistant work?",
        answer:
          "The AI assistant analyses your campaigns and goals to generate scenarios and concrete recommendations, which you remain free to apply or adjust.",
      },
      {
        question: "Is KIYANZA available on mobile?",
        answer:
          "The interface is responsive, so you can use it on a phone or tablet; a dedicated app is planned for a later stage.",
      },
      {
        question: "How do I contact support?",
        answer:
          "Our team can be reached through the “Contact support” button or directly from the chat built into the platform.",
      },
    ],
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Stay up to date with the latest resources",
    text: "Get new guides, articles and tips straight to your inbox every week.",
    placeholder: "Your email address",
    submit: "Subscribe",
    note: "Unsubscribe anytime · No spam",
    social: "Loved by 500+ marketers",
  },
};

export default resources;
