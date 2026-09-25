export type Role = "ADMIN" | "MARKETING_MANAGER" | "COMMUNITY_MANAGER" | "PROVIDER";

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

/**
 * Réponse de POST /users : nouveau compte créé (mot de passe temporaire
 * envoyé), ou compte existant invité (lien d'acceptation envoyé).
 */
export type CreateSubAccountResult =
  | (CompanyMember & { status: "CREATED" })
  | { status: "INVITED"; email: string; firstName: string; lastName: string };

export interface ReviewProofPayload {
  decision: "VALIDATED" | "REJECTED";
  comment?: string;
}

export interface AcceptInvitationResult {
  success: true;
  companyName: string;
  email: string;
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
  /** Analyse de l'assistant IA — null si le service IA n'a pas répondu (le narrativeSummary du moteur reste affiché). */
  aiAnalysis: DigitalSimulationAnalysis | null;
}

// ---------------------------------------------------------------------------
// Santé de la Page Facebook (GET /social-accounts/:id/health)
// ---------------------------------------------------------------------------

export interface PageHealthKpi {
  key: "views" | "engagement" | "newFollowers";
  current: number | null;
  previous: number | null;
  /** Variation relative (0,12 = +12 %). */
  change: number | null;
}

export interface PageHealthPost {
  id: string;
  message: string;
  createdTime: string;
  permalink: string | null;
  picture: string | null;
  reactions: number;
  comments: number;
  shares: number;
  interactions: number;
}

export interface PostingSlot {
  /** 0 = lundi … 6 = dimanche. */
  weekday: number;
  /** Tranche de 3 h, heure du Cameroun : 0 = 0h-3h … 7 = 21h-24h. */
  slot: number;
  posts: number;
  avgInteractions: number;
}

export interface PageHealth {
  pageName: string;
  followers: number | null;
  periodDays: number;
  kpis: PageHealthKpi[];
  series: { date: string; views: number | null; engagement: number | null }[];
  postsInPeriod: number;
  postsPerWeek: number;
  avgInteractionsPerPost: number | null;
  engagementRate: number | null;
  topPosts: PageHealthPost[];
  bestTimes: { sampleSize: number; enough: boolean; top: PostingSlot[]; slots: PostingSlot[] };
}

export interface PageHealthAnalysis {
  analysis: {
    summary: string;
    strengths: string[];
    watchouts: string[];
    actions: Array<{ title: string; detail: string }>;
  };
  generatedAt: string;
}

export interface PageHealthResponse {
  health: PageHealth;
  fetchedAt: string;
  analysis: PageHealthAnalysis | null;
}

/** Campagne Facebook Ads (Meta) qu'on peut relier à une campagne Kiyanza. */
export interface MetaAdCampaign {
  id: string;
  name: string;
  status: string;
  objective: string | null;
  startTime: string | null;
  stopTime: string | null;
  adAccountId: string;
  adAccountName: string;
  currency: string;
}

export type ActualMetricKey = "reach" | "clicks" | "conversions" | "ctr" | "cpc" | "cpa" | "roas";
export type ActualMetricStatus = "ahead" | "on_track" | "behind" | "unknown";

export interface ActualMetricComparison {
  key: ActualMetricKey;
  kind: "volume" | "rate" | "cost";
  predicted: number | null;
  /** Volume attendu à ce stade (prévision × avancement) ; = predicted pour un taux ou un coût. */
  expected: number | null;
  actual: number | null;
  performance: number | null;
  status: ActualMetricStatus;
}

export interface ActualPerformanceComparison {
  currency: string;
  spendXaf: number | null;
  spend: number;
  plannedBudget: number;
  spendProgress: number | null;
  timeProgress: number;
  progress: number;
  tooEarly: boolean;
  conversionAction: string | null;
  metrics: ActualMetricComparison[];
  daily: { date: string; spend: number; reach: number; impressions: number; clicks: number; conversions: number }[];
}

export type ActualPerformanceResponse =
  | { linked: false }
  | {
      linked: true;
      link: { metaCampaignId: string; metaCampaignName: string | null; metaAdAccountId: string | null; linkedAt: string | null };
      simulation: { id: string; simulatedAt: string } | null;
      fetchedAt: string;
      comparison: ActualPerformanceComparison;
    };

export interface DigitalSimulationAnalysis {
  summary: string;
  strengths: string[];
  risks: string[];
  recommendations: Array<{ title: string; detail: string }>;
  scenarioChoice: string;
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
// Assistant IA — Copilot du dashboard (/conversations…) et assistant vitrine
// du site public (/public/assistant/ask)
// ---------------------------------------------------------------------------

export interface AiConversationRecord {
  id: string;
  startedAt: string;
  lastMessageAt: string;
  topic: string;
  companyId: string | null;
  createdById: string | null;
}

/** Ligne de l'historique du Copilot (GET /conversations). */
export type AiConversationSummary = Pick<AiConversationRecord, "id" | "topic" | "startedAt" | "lastMessageAt">;

export type AiMessageFeedback = "UP" | "DOWN";

export interface AiMessageRecord {
  id: string;
  content: string;
  sender: "USER" | "AI";
  sentAt: string;
  conversationId: string;
  feedback: AiMessageFeedback | null;
}

/** GET /conversations/:id — messages dans l'ordre chronologique (200 derniers). */
export interface AiConversationDetail extends AiConversationRecord {
  messages: AiMessageRecord[];
}

/** Message d'historique renvoyé à l'assistant vitrine (4 au plus). */
export interface PublicChatHistoryMessage {
  sender: "USER" | "AI";
  content: string;
}

export interface SendChatMessageResult {
  userMessage: AiMessageRecord;
  iaMessage: AiMessageRecord;
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

// ---------------------------------------------------------------------------
// Terrain (Affichage) — PrestationsModule : installations, preuve
// géolocalisée sans compte, carte de suivi.
// ---------------------------------------------------------------------------

export interface CreatePrestationPayload {
  location: string;
  providerId: string;
  plannedLatitude: number;
  plannedLongitude: number;
  plannedInstallationDate: string;
}

export interface InstallationRecord {
  id: string;
  location: string;
  campaignId: string;
  campaignName: string;
  status: string;
  plannedLatitude: number;
  plannedLongitude: number;
  plannedInstallationDate: string;
  proof: {
    photo: string;
    latitude: number;
    longitude: number;
    takenAt: string;
    /** PENDING (à valider), VALIDATED ou REJECTED. */
    validationStatus: string;
    validationComment: string | null;
  } | null;
  distanceMeters: number | null;
  locationMatch: boolean | null;
}

export interface ProofLinkResponse {
  link: string;
  token: string;
  expiresAt: string;
}

export interface ProofLinkConsultation {
  location: string;
  campaignName: string;
  plannedInstallationDate: string;
  alreadySubmitted: boolean;
}

export interface SubmitProofViaLinkPayload {
  photo: string;
  latitude: number;
  longitude: number;
  takenAt: string;
}

export interface SubmitProofViaLinkResult {
  proofId: string;
  distanceMeters: number;
  locationMatch: boolean;
}
