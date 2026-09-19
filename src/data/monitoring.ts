// Module Monitoring (maquette Figma "MARKETED-OSC-2026", frames
// Campagnes.CreationRadio/CreationRadioDiffusions à node-id 2372:505,
// 2372:1309, 2372:1809, 2372:2592) — DONNÉES DE DÉMONSTRATION.
//
// Ce tableau de bord dépend d'un "moteur de pige" (reconnaissance audio des
// diffusions radio réellement passées à l'antenne, preuves spectrales) qui
// n'existe dans aucun des deux repos du projet : `internal/monitoring`
// (Liyanza-backend) n'est qu'un webhook M2M vide de tout traitement, et
// aucun service de pige/fingerprinting n'a jamais été construit. Tant que ce
// moteur n'existe pas, cet écran ne peut pas être branché sur des données
// réelles — cohérent avec la consigne d'utiliser des données de démo pour ce
// qui n'a pas d'équivalent backend.
import type { LucideIcon } from "lucide-react";
import { Megaphone, TrendingUp, CheckCircle2, Users } from "lucide-react";

export type DiffusionStatus = "DIFFUSE" | "A_VENIR" | "ANOMALIE";

export const diffusionStatusMeta: Record<DiffusionStatus, { label: string; className: string }> = {
  DIFFUSE: { label: "Diffusé", className: "bg-green-accent-dark/10 text-green-accent-dark" },
  A_VENIR: { label: "À venir", className: "bg-blue-500/10 text-blue-500" },
  ANOMALIE: { label: "Anomalie", className: "bg-orange-500/10 text-orange-500" },
};

export interface MonitoringKpi {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  delta: string;
  deltaTone: "positive" | "negative";
  deltaSuffix: string;
}

export const monitoringKpis: MonitoringKpi[] = [
  { label: "Spots prévue", value: "20", icon: Megaphone, iconBg: "bg-green-accent-dark/10", iconColor: "text-green-accent-dark", delta: "+1", deltaTone: "positive", deltaSuffix: "cette semaine" },
  { label: "Spots diffusé", value: "7", icon: Megaphone, iconBg: "bg-orange-500/10", iconColor: "text-orange-500", delta: "-8 %", deltaTone: "negative", deltaSuffix: "vs période préc." },
  { label: "Indices de conformité", value: "82,2%", icon: TrendingUp, iconBg: "bg-green-accent-dark/10", iconColor: "text-green-accent-dark", delta: "+24 %", deltaTone: "positive", deltaSuffix: "vs période préc." },
  { label: "Taux de diffusion", value: "72%", icon: CheckCircle2, iconBg: "bg-green-accent-dark/10", iconColor: "text-green-accent-dark", delta: "+0,8x", deltaTone: "positive", deltaSuffix: "vs période préc." },
  { label: "Audience estimée", value: "1200k", icon: Users, iconBg: "bg-green-accent-dark/10", iconColor: "text-green-accent-dark", delta: "+32 %", deltaTone: "positive", deltaSuffix: "vs période préc." },
];

export interface AnomalyCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  actionLabel: string;
}

export const anomalyBannerCount = 8;
export const anomalyBannerSource = "Preuves spectrales enregistrées certifié sur le flux 90.3 FM.";

export const anomalyCards: AnomalyCard[] = [
  { id: "non-diffusion", tag: "NON-DIFFUSION AVÉRÉE · 12 & 14 Sept", title: "3 spots prévus non détectés", description: "Émetteur muet ou décrochage pub manqué sur les créneaux de 14h45.", actionLabel: "Demander compensation régie →" },
  { id: "glissement", tag: "GLISSEMENT DE TRANCHE · 11, 13, 14 Sept", title: "Décalage horaire > 15 min", description: "3 spots passés hors de la tranche négociée (ex: 21h15 au lieu du Prime 19h30).", actionLabel: "Voir les écarts d'horaire →" },
  { id: "alteration", tag: "ALTÉRATION AUDIO · 14 Sept. 10h15", title: "Coupure audio partielle", description: "2 spots tronqués (22s au lieu du format contractuel de 30s) sur l'antenne locale.", actionLabel: "Écouter l'enregistrement audio →" },
];

export interface DiffusionRow {
  id: string;
  heure: string;
  radio: string;
  zone: string;
  spot: string;
  duree: string;
  statut: DiffusionStatus;
  audienceEstimee?: string;
}

export const recentDiffusions: DiffusionRow[] = [
  { id: "d1", heure: "08:15", radio: "Radio Balafon", zone: "Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "DIFFUSE" },
  { id: "d2", heure: "10:30", radio: "Radio Balafon", zone: "Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "DIFFUSE" },
  { id: "d3", heure: "14:45", radio: "Radio Balafon", zone: "Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "ANOMALIE" },
  { id: "d4", heure: "17:30", radio: "Radio Balafon", zone: "Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "A_VENIR" },
  { id: "d5", heure: "19:15", radio: "Radio Balafon", zone: "Yaoundé", spot: "Spot Promo 30s", duree: "30 sec", statut: "DIFFUSE" },
];

export interface ProofItem {
  id: string;
  radio: string;
  date: string;
  status: "confirmed" | "anomaly";
  actionLabel: string;
}

export const latestProofs: ProofItem[] = [
  { id: "p1", radio: "Radio Balafon", date: "15 sept. 2026 14:47", status: "confirmed", actionLabel: "Voir la preuve" },
  { id: "p2", radio: "Radio Balafon", date: "15 sept. 2026 10:32", status: "confirmed", actionLabel: "Voir la preuve" },
  { id: "p3", radio: "Radio Balafon", date: "14 sept. 2026 16:12", status: "anomaly", actionLabel: "Voir détail" },
];

export interface CalendarDay {
  date: string;
  label: string;
  total: number;
  count: number;
  tone: "ok" | "warning" | "anomaly";
}

export const calendarWeek: CalendarDay[] = [
  { date: "2026-09-10", label: "Mar. 10 sept.", total: 12, count: 12, tone: "ok" },
  { date: "2026-09-10b", label: "Mar. 10 sept.", total: 12, count: 12, tone: "ok" },
  { date: "2026-09-11", label: "Jeu. 11 sept.", total: 12, count: 10, tone: "ok" },
  { date: "2026-09-12", label: "Ven. 12 sept.", total: 12, count: 8, tone: "anomaly" },
  { date: "2026-09-13", label: "Sam. 13 sept.", total: 12, count: 11, tone: "ok" },
  { date: "2026-09-14", label: "Dim. 14 sept.", total: 12, count: 8, tone: "anomaly" },
  { date: "2026-09-15", label: "Lun. 15 sept.", total: 12, count: 9, tone: "ok" },
  { date: "2026-09-16", label: "Mar. 16 sept.", total: 12, count: 8, tone: "anomaly" },
];

export interface PlanningRow {
  id: string;
  heure: string;
  radio: string;
  spot: string;
  duree: string;
  statut: DiffusionStatus;
  audience: string;
}

export const planningDetail: PlanningRow[] = [
  { id: "pl1", heure: "08:00", radio: "Radio Balafon - Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "DIFFUSE", audience: "15K" },
  { id: "pl2", heure: "08:30", radio: "Radio Balafon - Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "A_VENIR", audience: "18K" },
  { id: "pl3", heure: "09:00", radio: "Radio Balafon - Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "ANOMALIE", audience: "—" },
  { id: "pl4", heure: "09:30", radio: "Radio Balafon - Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "DIFFUSE", audience: "16K" },
  { id: "pl5", heure: "10:00", radio: "Radio Balafon - Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "DIFFUSE", audience: "14K" },
  { id: "pl6", heure: "10:30", radio: "Radio Balafon - Douala", spot: "Spot Promo 30s", duree: "30 sec", statut: "ANOMALIE", audience: "17K" },
];

export const upcomingDiffusions = [
  { id: "u1", label: "15 sept. 2026 – 14:00", location: "Radio Balafon - Douala" },
  { id: "u2", label: "16 sept. 2026 – 09:30", location: "Radio Balafon - Douala" },
];

export interface CampaignReport {
  campaignName: string;
  objective: string;
  radio: string;
  zone: string;
  period: string;
  reachEstimate: string;
  conversionsEstimate: string;
  roiEstimate: string;
  costPerConversion: string;
  audience: string;
  channels: string;
  content: string;
  diffusionsRatio: string;
  generatedAt: string;
}

export const campaignReport: CampaignReport = {
  campaignName: "Campagne Promo Orange Money",
  objective: "Notoriété",
  radio: "Radio Balafon",
  zone: "Douala",
  period: "10 sept. → 30 sept. 2026",
  reachEstimate: "320 000",
  conversionsEstimate: "6 800",
  roiEstimate: "3,1x",
  costPerConversion: "125 FCFA",
  audience: "25–45 ans • Douala",
  channels: "Radio (1)",
  content: "Spot audio (30s)",
  diffusionsRatio: "87 / 120 (72,5%)",
  generatedAt: "16 sept. 2026 – 10:45",
};

export interface ReportRecommendation {
  id: string;
  tone: "positive" | "warning";
  title: string;
  highlight: string;
  href?: string;
}

export const reportRecommendations: ReportRecommendation[] = [
  { id: "r1", tone: "positive", title: "Augmentez la diffusion sur le créneau 14h00–16h00.", highlight: "+20% de portée estimée" },
  { id: "r2", tone: "warning", title: "Vérifiez les 3 spots non détectés.", highlight: "Contacter Radio Balafon" },
  { id: "r3", tone: "positive", title: "Envisagez d'élargir la couverture à Yaoundé.", highlight: "+15% d'audience potentielle" },
];

export interface MonitoringTabDef {
  id: string;
  label: string;
  count?: number;
}

export const monitoringTabs: MonitoringTabDef[] = [
  { id: "overview", label: "Vue d'ensemble" },
  { id: "diffusions", label: "Diffusions", count: 4 },
  { id: "planning", label: "Planning", count: 1 },
  { id: "alertes", label: "Alertes", count: 1 },
  { id: "analyses", label: "Analyses", count: 1 },
  { id: "rapports", label: "Rapports", count: 2 },
  { id: "recommandation", label: "Recommandation", count: 3 },
  { id: "annulees", label: "Annulées", count: 0 },
];
