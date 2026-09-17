export const currentUser = {
  initials: "AN",
  name: "Aristide Nna",
  role: "Marketing Manager",
};

export interface NavItem {
  href: string;
  label: string;
  icon:
    | "home"
    | "campaigns"
    | "monitoring"
    | "ai"
    | "reports"
    | "teams"
    | "company"
    | "profile"
    | "notifications"
    | "help";
}

export const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Accueil", icon: "home" },
  { href: "/dashboard/campagnes", label: "Campagnes", icon: "campaigns" },
  { href: "/dashboard/monitoring", label: "Monitoring", icon: "monitoring" },
  { href: "/dashboard/recommandations", label: "Recommandations IA", icon: "ai" },
  { href: "/dashboard/rapports", label: "Rapports", icon: "reports" },
  { href: "/dashboard/equipes", label: "Equipes", icon: "teams" },
];

export const settingsNavItems: NavItem[] = [
  { href: "/dashboard/entreprise", label: "Mon entreprise", icon: "company" },
  { href: "/dashboard/profil", label: "Profil", icon: "profile" },
  { href: "/dashboard/notifications", label: "Notifications", icon: "notifications" },
  { href: "/dashboard/aide", label: "Aide", icon: "help" },
];

// ---------------------------------------------------------------------------
// Dashboard home (Accueil)
// ---------------------------------------------------------------------------

export interface HomeKpi {
  label: string;
  value: string;
  delta: string;
  deltaTone: "positive" | "negative";
  helper: string;
  icon: "campaigns" | "spend" | "conversions" | "roi" | "audience";
}

export const homeKpis: HomeKpi[] = [
  {
    label: "Campagnes actives",
    value: "4",
    delta: "↑ +1",
    deltaTone: "positive",
    helper: "cette semaine",
    icon: "campaigns",
  },
  {
    label: "Dépenses",
    value: "1 240 000",
    delta: "↓ -8 %",
    deltaTone: "negative",
    helper: "vs période préc.",
    icon: "spend",
  },
  {
    label: "Conversions",
    value: "8 742",
    delta: "↑ +24 %",
    deltaTone: "positive",
    helper: "vs période préc.",
    icon: "conversions",
  },
  {
    label: "ROI",
    value: "3,2×",
    delta: "↑ +0,8x",
    deltaTone: "positive",
    helper: "vs période préc.",
    icon: "roi",
  },
  {
    label: "Audience atteinte",
    value: "1 248 530",
    delta: "↑ +32 %",
    deltaTone: "positive",
    helper: "vs période préc.",
    icon: "audience",
  },
];

export interface PerformancePoint {
  label: string;
  reach: number;
  clicks: number;
  conversions: number;
}

export const performanceSeries: PerformancePoint[] = [
  { label: "7 sept.", reach: 142000, clicks: 8200, conversions: 780 },
  { label: "8 sept.", reach: 158000, clicks: 8900, conversions: 840 },
  { label: "9 sept.", reach: 151000, clicks: 8600, conversions: 810 },
  { label: "10 sept.", reach: 176000, clicks: 10200, conversions: 990 },
  { label: "11 sept.", reach: 189000, clicks: 11100, conversions: 1080 },
  { label: "12 sept.", reach: 201000, clicks: 12400, conversions: 1190 },
  { label: "13 sept.", reach: 195000, clicks: 11800, conversions: 1150 },
  { label: "14 sept.", reach: 1248530 / 5.85, clicks: 78240 / 5.85, conversions: 8742 / 5.85 },
];

export const performanceTotals = {
  date: "14 sept. 2025",
  reach: "1 248 530",
  clicks: "78 240",
  conversions: "8 742",
};

export interface SpendSlice {
  label: string;
  amount: string;
  share: number;
  color: string;
}

export const spendBreakdown: SpendSlice[] = [
  { label: "Facebook Ads", amount: "60 000 FCFA", share: 60, color: "#296bd6" },
  { label: "Instagram Ads", amount: "20 000 FCFA", share: 20, color: "#00c853" },
  { label: "WhatsApp Ads", amount: "20 000 FCFA", share: 20, color: "#f97316" },
];

export const spendTotal = { amount: "100 000", currency: "FCFA" };

export type CampaignStatus = "En cours" | "Planifiée" | "Terminée" | "Brouillon" | "En pause" | "Annulée";

export interface CampaignRow {
  id: string;
  initials: string;
  avatarColor: string;
  name: string;
  dateRange: string;
  channel: string;
  channelColor: string;
  status: CampaignStatus;
  performance: string;
  budget: string;
  spend: string;
  spendShare: number;
}

export const recentCampaigns: CampaignRow[] = [
  {
    id: "lp",
    initials: "LP",
    avatarColor: "#3b82f6",
    name: "Lancement produit iZY",
    dateRange: "12 sept. 2025 – 26 sept. 2025",
    channel: "Radio",
    channelColor: "#3b82f6",
    status: "En cours",
    performance: "↑ +32%",
    budget: "300 000 XAF",
    spend: "240 000 FCFA",
    spendShare: 80,
  },
  {
    id: "pr",
    initials: "PR",
    avatarColor: "#f97316",
    name: "Promotion rentrée scolaire",
    dateRange: "5 sept. 2025 – 19 sept. 2025",
    channel: "Terrain",
    channelColor: "#f97316",
    status: "En cours",
    performance: "↑ +24%",
    budget: "250 000 XAF",
    spend: "180 000 FCFA",
    spendShare: 72,
  },
  {
    id: "ca",
    initials: "CA",
    avatarColor: "#f97316",
    name: "Campagne awareness",
    dateRange: "1 sept. 2025 – 15 sept. 2025",
    channel: "Réseaux sociaux",
    channelColor: "#f97316",
    status: "En cours",
    performance: "↑ +18%",
    budget: "200 000 XAF",
    spend: "180 000 FCFA",
    spendShare: 90,
  },
  {
    id: "os",
    initials: "OS",
    avatarColor: "#8b5cf6",
    name: "Offre spéciale été",
    dateRange: "20 août 2025 – 10 sept. 2025",
    channel: "Affichage",
    channelColor: "#8b5cf6",
    status: "Terminée",
    performance: "↑ +12%",
    budget: "150 000 XAF",
    spend: "100 000 FCFA",
    spendShare: 67,
  },
];

export interface Recommendation {
  id: string;
  title: string;
  description: string;
}

export const aiRecommendations: Recommendation[] = [
  {
    id: "radio-budget",
    title: "Augmentez le budget radio de 10 %",
    description:
      "La radio génère 2,4× plus de leads. Un investissement supplémentaire pourrait accélérer vos résultats.",
  },
  {
    id: "digital-audience",
    title: "Élargissez votre audience digitale",
    description:
      "Cibler les 25–34 ans sur Douala-Centre pourrait augmenter votre portée de manière significative.",
  },
];

// ---------------------------------------------------------------------------
// Campagnes (list)
// ---------------------------------------------------------------------------

export interface CampaignsKpi {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral";
  helper?: string;
  icon: "total" | "active" | "done" | "draft" | "suspended";
}

export const campaignsKpis: CampaignsKpi[] = [
  { label: "Campagnes totales", value: "8", delta: "↑ +1", deltaTone: "positive", helper: "cette semaine", icon: "total" },
  { label: "En cours", value: "4", delta: "↓ -8 %", deltaTone: "negative", helper: "vs période préc.", icon: "active" },
  { label: "Terminées", value: "3", delta: "↑ +1 +1 cette semaine", deltaTone: "positive", icon: "done" },
  { label: "Brouillons", value: "1", helper: "À finaliser", deltaTone: "neutral", icon: "draft" },
  { label: "Suspendu", value: "1", delta: "Erreur survenue", deltaTone: "negative", icon: "suspended" },
];

export type CampaignFilter = "Toutes" | "Actives" | "En pause" | "Terminées" | "Brouillons" | "Programmées" | "Annulées";

export const campaignFilters: { label: CampaignFilter; count: number }[] = [
  { label: "Toutes", count: 8 },
  { label: "Actives", count: 4 },
  { label: "En pause", count: 1 },
  { label: "Terminées", count: 1 },
  { label: "Brouillons", count: 1 },
  { label: "Programmées", count: 3 },
  { label: "Annulées", count: 0 },
];

export interface CampaignListRow extends CampaignRow {
  filterGroup: CampaignFilter;
}

export const allCampaigns: CampaignListRow[] = [
  { ...recentCampaigns[0], filterGroup: "Actives" },
  { ...recentCampaigns[1], filterGroup: "Actives" },
  { ...recentCampaigns[2], filterGroup: "Actives" },
  { ...recentCampaigns[3], filterGroup: "Terminées" },
  {
    id: "qr",
    initials: "OS",
    avatarColor: "#8b5cf6",
    name: "QR Code orange money",
    dateRange: "20 août 2025 – 10 sept. 2025",
    channel: "Affichage",
    channelColor: "#8b5cf6",
    status: "En cours",
    performance: "↑ +12%",
    budget: "1 500 000 XAF",
    spend: "900 000 FCFA",
    spendShare: 60,
    filterGroup: "Actives",
  },
  {
    id: "bp",
    initials: "BP",
    avatarColor: "#00a846",
    name: "Boost pré-lancement",
    dateRange: "1 oct. 2025 – 15 oct. 2025",
    channel: "Réseaux sociaux",
    channelColor: "#f97316",
    status: "Planifiée",
    performance: "—",
    budget: "180 000 XAF",
    spend: "0 FCFA",
    spendShare: 0,
    filterGroup: "Programmées",
  },
  {
    id: "nd",
    initials: "ND",
    avatarColor: "#94a3b8",
    name: "Nouveau design produit",
    dateRange: "Brouillon",
    channel: "—",
    channelColor: "#94a3b8",
    status: "Brouillon",
    performance: "—",
    budget: "—",
    spend: "—",
    spendShare: 0,
    filterGroup: "Brouillons",
  },
  {
    id: "fp",
    initials: "FP",
    avatarColor: "#e93c16",
    name: "Flash promo weekend",
    dateRange: "8 sept. 2025 – 10 sept. 2025",
    channel: "Radio",
    channelColor: "#3b82f6",
    status: "En pause",
    performance: "↓ -4%",
    budget: "80 000 XAF",
    spend: "60 000 FCFA",
    spendShare: 75,
    filterGroup: "En pause",
  },
];

// ---------------------------------------------------------------------------
// Assistant de création (wizard)
// ---------------------------------------------------------------------------

export const wizardSteps = [
  "Choix de la campagne",
  "Définition de la campagne",
  "Objectif principal",
  "Cibles",
  "Budget",
  "Canal",
  "Simulation",
] as const;

export interface CampaignTypeOption {
  id: string;
  title: string;
  description: string;
  icon: "digital" | "radio" | "print";
}

export const campaignTypeOptions: CampaignTypeOption[] = [
  {
    id: "digital",
    title: "Campagne Digitale",
    description: "Facebook, Instagram, Google Ads & Email",
    icon: "digital",
  },
  {
    id: "radio",
    title: "Campagne Radio",
    description: "Diffusion sur les radios locales et nationales",
    icon: "radio",
  },
  {
    id: "print",
    title: "Supports Publicitaires",
    description: "Affiches, bâches, roll-ups, street marketing",
    icon: "print",
  },
];

export interface ObjectiveOption {
  id: string;
  title: string;
  description: string;
  optimization: string;
  icon: "awareness" | "sales" | "leads" | "conversions" | "traffic" | "engagement";
}

export const objectiveOptions: ObjectiveOption[] = [
  {
    id: "awareness",
    title: "Notoriété",
    description: "Faire connaître votre marque et maximiser la mémorisation publicitaire sur l'ensemble de vos canaux.",
    optimization: "OPTIMISATION CPM",
    icon: "awareness",
  },
  {
    id: "leads",
    title: "Génération de leads",
    description: "Obtenir des contacts qualifiés et des intentions d'achat directes pour alimenter vos équipes commerciales.",
    optimization: "OPTIMISATION CPM",
    icon: "leads",
  },
  {
    id: "conversions",
    title: "Conversions",
    description: "Transformer davantage de prospects en utilisateurs actifs d'un service ou testeurs d'une application.",
    optimization: "OPTIMISATION CPA",
    icon: "conversions",
  },
  {
    id: "sales",
    title: "Ventes directes",
    description: "Accélérer les transactions directes et maximiser le chiffre d'affaires immédiat sur boutique ou catalogue.",
    optimization: "OPTIMISATION ROAS",
    icon: "sales",
  },
  {
    id: "traffic",
    title: "Trafic qualifié",
    description: "Augmenter massivement les visites sur votre site web, page produit ou application avec un rebond minimal.",
    optimization: "OPTIMISATION CPC",
    icon: "traffic",
  },
  {
    id: "engagement",
    title: "Engagement",
    description: "Créer des interactions fortes, des partages, des commentaires et un dialogue communautaire pérenne.",
    optimization: "OPTIMISATION CPE",
    icon: "engagement",
  },
];

export const interestTags = [
  "Fintech & Mobile Money",
  "Entrepreneuriat",
  "Commerce & PME",
  "E-commerce",
  "Études supérieures",
  "Investissement immobilier",
];

export const budgetPresets = [250000, 500000, 1000000, 2500000];

export interface ChannelOption {
  id: string;
  label: string;
  description: string;
  icon: "facebook" | "instagram" | "whatsapp" | "tiktok" | "youtube";
}

export const channelOptions: ChannelOption[] = [
  { id: "facebook", label: "Facebook", description: "Atteignez votre audience sur Facebook", icon: "facebook" },
  { id: "instagram", label: "Instagram", description: "Touchez votre communauté", icon: "instagram" },
  { id: "whatsapp", label: "WhatsApp", description: "Communiquez directement", icon: "whatsapp" },
  { id: "tiktok", label: "TikTok", description: "Captez une audience engagée", icon: "tiktok" },
  { id: "youtube", label: "YouTube", description: "Vidéo et visibilité maximale", icon: "youtube" },
];

export const simulationChecklist = [
  "Analyse de l'audience",
  "Performance par canal",
  "Optimisation du budget",
  "Recommandations IA",
];

export interface ScenarioResult {
  id: string;
  label: string;
  tag?: string;
  description: string;
  score: number;
  reach: string;
  clicks: string;
  conversions: string;
  roi: string;
}

export const scenarioResults: ScenarioResult[] = [
  {
    id: "a",
    label: "Scénario A",
    tag: "Recommandé",
    description: "Acquisition clients",
    score: 92,
    reach: "125K",
    clicks: "8,4K",
    conversions: "2,1K",
    roi: "3,2x",
  },
  {
    id: "b",
    label: "Scénario B",
    description: "Notoriété élargie",
    score: 78,
    reach: "98K",
    clicks: "6,1K",
    conversions: "1,6K",
    roi: "2,4x",
  },
  {
    id: "c",
    label: "Scénario C",
    description: "Budget optimisé",
    score: 65,
    reach: "72K",
    clicks: "4,2K",
    conversions: "1,1K",
    roi: "1,8x",
  },
];

export const scenarioInsight =
  "Le Scénario A offre le meilleur retour sur investissement avec le coût par acquisition le plus faible.";
