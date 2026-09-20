export type Role = "ADMIN" | "MARKETING_MANAGER" | "COMMUNITY_MANAGER" | "PROVIDER";

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrateur",
  MARKETING_MANAGER: "Responsable Marketing",
  COMMUNITY_MANAGER: "Community Manager",
  PROVIDER: "Prestataire",
};

export type CampaignType = "DIGITAL" | "RADIO" | "POSTER";

export type CampaignStatus = "DRAFT" | "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type SocialPlatform = "FACEBOOK" | "INSTAGRAM";

export type DigitalObjective =
  | "AWARENESS"
  | "ENGAGEMENT"
  | "CONVERSION"
  | "LEADS"
  | "SALES"
  | "TRAFFIC";

export type BudgetAllocationType = "TOTAL" | "DAILY";

export type TargetGender = "ALL" | "MALE" | "FEMALE";

export type SocialAccountStatus = "ACTIVE" | "EXPIRED" | "REVOKED";

/** Identité authentifiée résolue par le backend (`GET /auth/me`). Fait autorité pour les décisions RBAC. */
export interface AuthenticatedIdentity {
  userId: string;
  email: string;
  role: Role;
  companyId: string | null;
}

/** Profil d'affichage uniquement (prénom/nom) — jamais utilisé pour une décision d'autorisation. */
export interface DisplayProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export type AuthUser = AuthenticatedIdentity & Partial<DisplayProfile>;

/** Forme du champ `user` renvoyé par POST /auth/login — distincte de /auth/me
 * (pas de companyId, mais prénom/nom disponibles). */
export interface LoginUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CreateCampagnePayload {
  name: string;
  startDate: string;
  endDate: string;
  plannedBudget: number;
  objective: string;
  type: CampaignType;
}

export interface CampagneRecord extends CreateCampagnePayload {
  id: string;
  status: CampaignStatus;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampagneListParams {
  page?: number;
  limit?: number;
  status?: CampaignStatus;
  type?: CampaignType;
}

export interface PaginatedCampagnes {
  items: CampagneRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Miroir de `DashboardResponseDto` (backend, module `statistiques`). */
export interface DashboardCampaignSummary {
  id: string;
  name: string;
  status: CampaignStatus;
  plannedBudget: number;
  actualBudget: number;
  broadcastCount: number;
  broadcastedCount: number;
  installationCount: number;
  installedCount: number;
}

export interface CompanyMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  companyId: string | null;
  createdAt: string;
  deactivatedAt: string | null;
}

export interface CreateSubAccountPayload {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
}

export type NotificationType = "INFO" | "WARNING" | "ERROR" | "SUCCESS";

export type NotificationReadStatus = "UNREAD" | "READ";

export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  sentAt: string;
  readStatus: NotificationReadStatus;
  recipientId: string;
}

export interface PaginatedNotifications {
  items: NotificationRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardSummary {
  companyId: string;
  totalCampaigns: number;
  campaignsByStatus: Partial<Record<CampaignStatus, number>>;
  totalPlannedBudget: number;
  totalActualBudget: number;
  budgetDeviation: number;
  complianceRate: number;
  installationRate: number;
  unreadNotifications: number;
  campaignsSummary: DashboardCampaignSummary[];
}

export interface SocialAccountRecord {
  id: string;
  platform: SocialPlatform;
  externalAccountId: string;
  externalAccountName: string | null;
  status: SocialAccountStatus;
  lastSyncedAt: string | null;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Campagnes digitales
// ---------------------------------------------------------------------------

export interface UpsertDigitalDetailsPayload {
  objective: DigitalObjective;
  ageMin: number;
  ageMax: number;
  targetGender: TargetGender;
  targetLocations: string[];
  targetInterests: string[];
  budgetAllocation: BudgetAllocationType;
}

export interface DigitalCampaignChannelSelection {
  platform: SocialPlatform;
  socialAccountId?: string;
}

export interface SelectDigitalChannelsPayload {
  channels: DigitalCampaignChannelSelection[];
}

export interface DigitalSimulationScenario {
  id: string;
  label: string;
  isRecommended: boolean;
  score: number;
  predictedReach: number;
  predictedClicks: number;
  predictedConversions: number;
  predictedRoas: number;
}

export interface DigitalSimulationChannelResult {
  platform: SocialPlatform;
  budgetAmount: number;
  budgetPercent: number;
  predictedReach: number;
  predictedClicks: number;
  predictedConversions: number;
  predictedRoas: number;
}

export interface DigitalSimulationWeekPoint {
  weekIndex: number;
  predictedReach: number;
  predictedClicks: number;
  predictedConversions: number;
  budgetSpent: number;
}

export interface DigitalSimulationRecord {
  id: string;
  campaignId: string;
  simulatedAt: string;
  predictedReach: number | null;
  predictedEngagementRate: number | null;
  predictedCtr: number | null;
  predictedRoas: number | null;
  narrativeSummary: string | null;
  warnings: string[];
  avgCpc: number | null;
  costPerAcquisition: number | null;
  conversionRate: number | null;
  scenarios: DigitalSimulationScenario[];
  channelBreakdown: DigitalSimulationChannelResult[];
  weeklySeries: DigitalSimulationWeekPoint[];
}

export interface CreateEntreprisePayload {
  name: string;
  businessSector: string;
  address: string;
}

export interface EntrepriseRecord extends CreateEntreprisePayload {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/** Miroir de `UsersService.getProfile` (GET /users/me) — plus riche que
 * `AuthUser` (téléphone, date d'inscription), utilisé uniquement pour la
 * page Profil. Aucun endpoint de mise à jour n'existe côté backend : cette
 * page est volontairement en lecture seule. */
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  companyId: string | null;
  createdAt: string;
  deactivatedAt: string | null;
}

/** Miroir du modèle Prisma `Recommendation` — `priority` est une chaîne
 * libre côté backend (`IAEngineInterface.generateRecommendations`), le mock
 * actuel produit "high"/"medium"/"low". */
export interface CampaignRecommendation {
  id: string;
  content: string;
  priority: string;
  generatedAt: string;
  campaignId: string;
}

// ---------------------------------------------------------------------------
// Canaux / Diffusions — pipeline historique Radio/Affichage (AdvertisingChannel
// /Broadcast), antérieur au flux Digital et réutilisé pour connecter le
// wizard Radio et Monitoring à de vraies données.
// ---------------------------------------------------------------------------

export type MediaType = "RADIO" | "POSTER" | "FLYER";

export type BroadcastStatus = "PLANNED" | "BROADCASTED" | "MISSED" | "CANCELLED";

export interface AssociateChannelsPayload {
  channels: { radio: boolean; poster: boolean; flyer: boolean }[];
}

export interface AdvertisingChannelRecord {
  id: string;
  radio: boolean;
  poster: boolean;
  flyer: boolean;
  campaignId: string;
}

export interface CreateScheduleBroadcastPayload {
  mediaType: MediaType;
  scheduledAt: string;
  duration: number;
  channelId: string;
}

export interface CreateSchedulePayload {
  broadcasts: CreateScheduleBroadcastPayload[];
}

export interface BroadcastRecord {
  id: string;
  mediaType: MediaType;
  scheduledAt: string;
  actualBroadcastAt: string | null;
  duration: number;
  status: BroadcastStatus;
  audioProof: string | null;
  campaignId: string;
  channelId: string;
  channel?: AdvertisingChannelRecord;
}

export interface ScheduleQueryParams {
  channelId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedBroadcasts {
  items: BroadcastRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Miroir de `RapportConformiteItemDto`/`RapportConformiteDto` (backend). */
export interface RapportConformiteItem {
  diffusionId: string;
  scheduledAt: string;
  actualBroadcastAt: string | null;
  status: string;
  ecartMinutes: number | null;
}

export interface RapportConformite {
  campagneId: string;
  campagneNom: string;
  diffusions: RapportConformiteItem[];
  totalDiffusions: number;
  diffusionsDiffusees: number;
  diffusionsManquees: number;
  diffusionsEnAttente: number;
  diffusionsAnnulees: number;
  tauxConformite: number | null;
}
