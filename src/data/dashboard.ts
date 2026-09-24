export interface NavItem {
  href: string;
  /** Clé du libellé dans dash.nav (dictionnaire). */
  key: "home" | "campaigns" | "monitoring" | "terrain" | "recommendations" | "reports" | "teams" | "company" | "profile" | "notifications" | "help";
  icon: "home" | "campaigns" | "monitoring" | "terrain" | "ai" | "reports" | "teams" | "company" | "profile" | "notifications" | "help";
}

// "Monitoring" : réintroduit (maquette Figma "MARKETED-OSC-2026", frames
// Campagnes.CreationRadio à node-id 2372:505 et suivants) — branché sur le
// vrai pipeline Canaux/Diffusions (CanauxModule/DiffusionsModule) déjà
// construit pour Radio/Affichage : planning réel, rapport de conformité réel
// par campagne. Ce qui reste hors périmètre faute de backend : la détection
// automatique des diffusions (aucun moteur de pige/fingerprinting audio
// n'existe dans aucun repo — seul le webhook d'ingestion `internal/
// monitoring` existe côté serveur, sans fournisseur réel qui l'appelle) et
// une UI de saisie manuelle du constat (`PATCH /diffusions/:id/constat`
// n'est appelé par aucune page pour l'instant).
export const mainNavItems: NavItem[] = [
  { href: "/dashboard", key: "home", icon: "home" },
  { href: "/dashboard/campagnes", key: "campaigns", icon: "campaigns" },
  { href: "/dashboard/monitoring", key: "monitoring", icon: "monitoring" },
  { href: "/dashboard/terrain", key: "terrain", icon: "terrain" },
  { href: "/dashboard/recommandations", key: "recommendations", icon: "ai" },
  { href: "/dashboard/rapports", key: "reports", icon: "reports" },
  { href: "/dashboard/equipes", key: "teams", icon: "teams" },
];

export const settingsNavItems: NavItem[] = [
  { href: "/dashboard/entreprise", key: "company", icon: "company" },
  { href: "/dashboard/profil", key: "profile", icon: "profile" },
  { href: "/dashboard/notifications", key: "notifications", icon: "notifications" },
  { href: "/dashboard/aide", key: "help", icon: "help" },
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

/** Nombre d'étapes du flux Digital — libellés dans dashWizard.steps. */
export const WIZARD_STEP_COUNT = 7;

// Les libellés (titres, descriptions) de ces options vivent dans le
// dictionnaire dashWizard, indexés par id.
export interface CampaignTypeOption {
  id: "digital" | "radio" | "print";
  icon: "digital" | "radio" | "print";
  // "print" (Affichage) reste grisé : aucun flux dédié n'a été maquetté pour
  // ce type. "radio" a désormais son propre flux (StepRadioStation et
  // suivants, voir RadioCampaignWizard) — les étapes 2 à 6 du wizard
  // "digital" (objectif, audience, budget, canaux, simulation) restent
  // strictement Digital/Meta et ne s'appliquent pas au flux radio.
  supported: boolean;
}

export const campaignTypeOptions: CampaignTypeOption[] = [
  { id: "digital", icon: "digital", supported: true },
  { id: "radio", icon: "radio", supported: true },
  { id: "print", icon: "print", supported: false },
];

import type { DigitalObjective } from "@/lib/api/types";

export interface ObjectiveOption {
  // Valeur envoyée telle quelle à PUT /campagnes/:id/digital-details
  // (DigitalObjective côté backend) — jamais une transformation à faire au
  // moment de la soumission.
  id: DigitalObjective;
  icon: "awareness" | "sales" | "leads" | "conversions" | "traffic" | "engagement";
}

export const objectiveOptions: ObjectiveOption[] = [
  { id: "AWARENESS", icon: "awareness" },
  { id: "LEADS", icon: "leads" },
  { id: "CONVERSION", icon: "conversions" },
  { id: "SALES", icon: "sales" },
  { id: "TRAFFIC", icon: "traffic" },
  { id: "ENGAGEMENT", icon: "engagement" },
];

/**
 * Valeurs envoyées au backend (`targetInterests`), gardées en français quelle
 * que soit la langue pour que les données restent homogènes. Libellés
 * affichés : dashWizard.audience.interestLabels (même ordre).
 */
export const interestTags = [
  "Fintech & Mobile Money",
  "Entrepreneuriat",
  "Commerce & PME",
  "E-commerce",
  "Études supérieures",
  "Investissement immobilier",
];

export const budgetPresets = [250000, 500000, 1000000, 2500000];
