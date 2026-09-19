export interface NavItem {
  href: string;
  label: string;
  icon: "home" | "campaigns" | "monitoring" | "ai" | "reports" | "teams" | "company" | "profile" | "notifications" | "help";
}

// "Monitoring" : réintroduit (maquette Figma "MARKETED-OSC-2026", frames
// Campagnes.CreationRadio à node-id 2372:505 et suivants) — écran de pige
// radio (diffusions détectées, anomalies, planning, rapports). Le moteur de
// pige réel n'existe dans aucun repo (voir src/data/monitoring.ts) : cette
// page tourne entièrement sur des données de démonstration en attendant ce
// moteur, même esprit que le reste du flux Radio (StepRadioStation, etc.).
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
// NOTE : les mocks "Dashboard home (Accueil)" et "Campagnes (list)" ont été
// retirés — ces deux pages consomment désormais GET /dashboard et
// GET /campagnes en direct (voir DashboardHomeClient, CampagnesListClient,
// CampaignKpiRow, CampaignsTable, StatusPill). Le KPI "Conversions"/"ROI"/
// "Audience atteinte" et le filtre "En pause" n'avaient d'ailleurs aucun
// équivalent réel côté backend.
// ---------------------------------------------------------------------------

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
  // "print" (Affichage) reste grisé : aucun flux dédié n'a été maquetté pour
  // ce type. "radio" a désormais son propre flux (StepRadioStation et
  // suivants, voir RadioCampaignWizard) — les étapes 2 à 6 du wizard
  // "digital" (objectif, audience, budget, canaux, simulation) restent
  // strictement Digital/Meta et ne s'appliquent pas au flux radio.
  supported: boolean;
}

export const campaignTypeOptions: CampaignTypeOption[] = [
  {
    id: "digital",
    title: "Campagne Digitale",
    description: "Facebook, Instagram, Google Ads & Email",
    icon: "digital",
    supported: true,
  },
  {
    id: "radio",
    title: "Campagne Radio",
    description: "Diffusion sur les radios locales et nationales",
    icon: "radio",
    supported: true,
  },
  {
    id: "print",
    title: "Supports Publicitaires",
    description: "Affiches, bâches, roll-ups, street marketing",
    icon: "print",
    supported: false,
  },
];

import type { DigitalObjective } from "@/lib/api/types";

export interface ObjectiveOption {
  // Valeur envoyée telle quelle à PUT /campagnes/:id/digital-details
  // (DigitalObjective côté backend) — jamais une transformation à faire au
  // moment de la soumission.
  id: DigitalObjective;
  title: string;
  description: string;
  optimization: string;
  icon: "awareness" | "sales" | "leads" | "conversions" | "traffic" | "engagement";
}

export const objectiveOptions: ObjectiveOption[] = [
  {
    id: "AWARENESS",
    title: "Notoriété",
    description: "Faire connaître votre marque et maximiser la mémorisation publicitaire sur l'ensemble de vos canaux.",
    optimization: "OPTIMISATION CPM",
    icon: "awareness",
  },
  {
    id: "LEADS",
    title: "Génération de leads",
    description: "Obtenir des contacts qualifiés et des intentions d'achat directes pour alimenter vos équipes commerciales.",
    optimization: "OPTIMISATION CPM",
    icon: "leads",
  },
  {
    id: "CONVERSION",
    title: "Conversions",
    description: "Transformer davantage de prospects en utilisateurs actifs d'un service ou testeurs d'une application.",
    optimization: "OPTIMISATION CPA",
    icon: "conversions",
  },
  {
    id: "SALES",
    title: "Ventes directes",
    description: "Accélérer les transactions directes et maximiser le chiffre d'affaires immédiat sur boutique ou catalogue.",
    optimization: "OPTIMISATION ROAS",
    icon: "sales",
  },
  {
    id: "TRAFFIC",
    title: "Trafic qualifié",
    description: "Augmenter massivement les visites sur votre site web, page produit ou application avec un rebond minimal.",
    optimization: "OPTIMISATION CPC",
    icon: "traffic",
  },
  {
    id: "ENGAGEMENT",
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
