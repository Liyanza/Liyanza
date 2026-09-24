"use client";

import { localizePath, parsePath } from "@/i18n/paths";
import type {
  AdvertisingChannelRecord,
  AssociateChannelsPayload,
  AuthUser,
  BroadcastRecord,
  CampagneListParams,
  CampagneRecord,
  CampaignRecommendation,
  CampaignStatus,
  CompanyMember,
  CreateCampagnePayload,
  CreateEntreprisePayload,
  CreatePrestationPayload,
  CreateSchedulePayload,
  AcceptInvitationResult,
  CreateSubAccountPayload,
  CreateSubAccountResult,
  ReviewProofPayload,
  DashboardSummary,
  DigitalSimulationRecord,
  EntrepriseRecord,
  InstallationRecord,
  LoginUser,
  NotificationReadStatus,
  NotificationRecord,
  PaginatedBroadcasts,
  PaginatedCampagnes,
  PaginatedNotifications,
  ProofLinkConsultation,
  ProofLinkResponse,
  RapportConformite,
  RegisterPayload,
  Role,
  ScheduleQueryParams,
  SelectDigitalChannelsPayload,
  SocialAccountRecord,
  SocialPlatform,
  SubmitProofViaLinkPayload,
  SubmitProofViaLinkResult,
  UpsertDigitalDetailsPayload,
  UserProfile,
} from "./types";

/** Erreur normalisée à partir d'une réponse d'erreur NestJS (`{message, statusCode}`). */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface NestErrorBody {
  message?: string | string[];
  error?: string;
}

function extractMessage(body: unknown, fallback: string): string {
  const nestBody = body as NestErrorBody | null;
  if (nestBody?.message) {
    return Array.isArray(nestBody.message) ? nestBody.message.join(" ") : nestBody.message;
  }
  return fallback;
}

// Messages d'erreur produits côté navigateur (les messages métier viennent
// du backend, en français). La langue est lue sur <html lang>, posée par la
// mise en page racine : ce module n'a pas accès au contexte React.
const NETWORK_MESSAGES = {
  fr: {
    offline: "Impossible de contacter le serveur. Vérifiez votre connexion.",
    tooMany: "Trop de tentatives. Réessayez dans une minute.",
    generic: "Une erreur est survenue.",
  },
  en: {
    offline: "Unable to reach the server. Check your connection.",
    tooMany: "Too many attempts. Try again in a minute.",
    generic: "Something went wrong.",
  },
};

function networkMessages() {
  const lang = typeof document !== "undefined" ? document.documentElement.lang : "fr";
  return lang.startsWith("en") ? NETWORK_MESSAGES.en : NETWORK_MESSAGES.fr;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError(0, networkMessages().offline);
  }

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    if (response.status === 429) {
      throw new ApiError(429, networkMessages().tooMany);
    }
    throw new ApiError(response.status, extractMessage(body, networkMessages().generic));
  }

  return body as T;
}

/**
 * Variante de request() pour les routes protégées (/api/backend/*). Le
 * rafraîchissement automatique se produit déjà côté serveur, de façon
 * transparente, à chaque appel (voir src/lib/api/proxy.ts) : un 401 qui
 * arrive jusqu'ici signifie donc que CE second essai a lui aussi échoué —
 * la session est réellement terminée, on déconnecte et renvoie vers /connexion.
 */
async function authenticatedRequest<T>(url: string, init?: RequestInit): Promise<T> {
  try {
    return await request<T>(url, init);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      // Rechargement complet volontaire (pas de useRouter ici : ce module
      // n'est pas un composant) — une session vraiment expirée doit repartir
      // d'un état propre plutôt qu'une navigation client qui garderait du
      // state React obsolète en mémoire.
      // Page de connexion dans la langue de la page courante.
      const { locale } = parsePath(window.location.pathname);
      window.location.assign(localizePath("/connexion", locale));
    }
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export function apiRegister(payload: RegisterPayload) {
  return request<{ id: string; email: string }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function apiLogin(email: string, password: string) {
  return request<{ user: LoginUser }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function apiLogout() {
  return request<{ success: boolean }>("/api/auth/logout", { method: "POST" });
}

export function apiMe() {
  return request<AuthUser>("/api/auth/me");
}

export function requestPasswordReset(email: string) {
  return request<{ success: true }>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token: string, newPassword: string) {
  return request<{ success: true }>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
  });
}

/**
 * Démarre la connexion Google/Facebook : récupère l'URL d'autorisation
 * auprès du backend puis navigue le NAVIGATEUR entier vers celle-ci (pas un
 * fetch — la connexion doit remplacer la page courante, contrairement au
 * flow de liaison Meta qui s'ouvre dans un popup depuis une page déjà
 * authentifiée). Le retour se fait sur /connexion/oauth-callback, voir
 * OAUTH_LOGIN_REDIRECT_URL côté backend.
 */
export async function loginWithProvider(provider: "google" | "facebook"): Promise<void> {
  const { authorizationUrl } = await request<{ authorizationUrl: string }>(
    `/api/auth/oauth/${provider}`
  );
  window.location.assign(authorizationUrl);
}

/** Appelée par /connexion/oauth-callback avec le code reçu dans l'URL. */
export function exchangeOAuthCode(code: string) {
  return request<{ user: LoginUser }>("/api/auth/oauth/exchange", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

// ---------------------------------------------------------------------------
// Campagnes
// ---------------------------------------------------------------------------

export function apiCreateCampagne(payload: CreateCampagnePayload) {
  return authenticatedRequest<CampagneRecord>("/api/backend/campagnes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function apiGetCampagne(id: string) {
  return authenticatedRequest<CampagneRecord>(`/api/backend/campagnes/${id}`);
}

// Transition de statut (DRAFT->PLANNED->IN_PROGRESS->COMPLETED/CANCELLED) —
// jamais appelé par les assistants de création (Digital ou Radio), qui
// laissent toujours la campagne en DRAFT : voir le commentaire de
// CampagnesController côté backend. Réservé à ADMIN/MARKETING_MANAGER.
export function apiLancerCampagne(campaignId: string, status: CampaignStatus) {
  return authenticatedRequest<CampagneRecord>(`/api/backend/campagnes/${campaignId}/lancer`, {
    method: "POST",
    body: JSON.stringify({ status }),
  });
}

export function apiListCampagnes(params: CampagneListParams = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.status) query.set("status", params.status);
  if (params.type) query.set("type", params.type);
  const qs = query.toString();
  return authenticatedRequest<PaginatedCampagnes>(
    `/api/backend/campagnes${qs ? `?${qs}` : ""}`
  );
}

export function apiUpsertDigitalDetails(
  campaignId: string,
  payload: UpsertDigitalDetailsPayload
) {
  return authenticatedRequest(`/api/backend/campagnes/${campaignId}/digital-details`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function apiSelectDigitalChannels(
  campaignId: string,
  payload: SelectDigitalChannelsPayload
) {
  return authenticatedRequest(
    `/api/backend/campagnes/${campaignId}/digital-details/channels`,
    { method: "PUT", body: JSON.stringify(payload) }
  );
}

export function apiCreateDigitalSimulation(campaignId: string) {
  return authenticatedRequest<DigitalSimulationRecord>(
    `/api/backend/campagnes/${campaignId}/simulations-digitales`,
    { method: "POST" }
  );
}

export function apiGetDigitalSimulations(campaignId: string) {
  return authenticatedRequest<
    DigitalSimulationRecord[] | { items: DigitalSimulationRecord[] }
  >(`/api/backend/campagnes/${campaignId}/simulations-digitales`);
}

// ---------------------------------------------------------------------------
// Canaux / Diffusions (pipeline Radio/Affichage — CanauxModule/DiffusionsModule)
// ---------------------------------------------------------------------------

export function apiAssociateChannels(campaignId: string, payload: AssociateChannelsPayload) {
  return authenticatedRequest<AdvertisingChannelRecord[]>(
    `/api/backend/campagnes/${campaignId}/canaux`,
    { method: "POST", body: JSON.stringify(payload) }
  );
}

export function apiCreateSchedule(campaignId: string, payload: CreateSchedulePayload) {
  return authenticatedRequest<BroadcastRecord[]>(
    `/api/backend/campagnes/${campaignId}/planning`,
    { method: "POST", body: JSON.stringify(payload) }
  );
}

// Une date "nue" (YYYY-MM-DD, ce que produisent les <input type="date"> et
// les bornes de semaine) est interprétée par `new Date(...)` côté backend
// comme minuit UTC — un `dateTo` nu exclurait donc toute diffusion du
// dernier jour survenue après 00h00. Complétée à la fin de journée avant
// envoi, uniquement quand aucune heure n'est déjà présente.
function endOfDayIfDateOnly(value: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T23:59:59.999` : value;
}

export function apiGetSchedule(campaignId: string, params: ScheduleQueryParams = {}) {
  const query = new URLSearchParams();
  if (params.channelId) query.set("channelId", params.channelId);
  if (params.dateFrom) query.set("dateFrom", params.dateFrom);
  if (params.dateTo) query.set("dateTo", endOfDayIfDateOnly(params.dateTo));
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  const qs = query.toString();
  return authenticatedRequest<PaginatedBroadcasts>(
    `/api/backend/campagnes/${campaignId}/planning${qs ? `?${qs}` : ""}`
  );
}

export function apiGetRapportConformite(campaignId: string) {
  return authenticatedRequest<RapportConformite>(
    `/api/backend/campagnes/${campaignId}/rapport-conformite`
  );
}

// ---------------------------------------------------------------------------
// Terrain (Affichage) — PrestationsModule
// ---------------------------------------------------------------------------

export function apiCreatePrestation(campaignId: string, payload: CreatePrestationPayload) {
  return authenticatedRequest<InstallationRecord>(
    `/api/backend/campagnes/${campaignId}/prestations`,
    { method: "POST", body: JSON.stringify(payload) }
  );
}

export function apiGenerateProofLink(installationId: string) {
  return authenticatedRequest<ProofLinkResponse>(
    `/api/backend/prestations/${installationId}/lien-preuve`,
    { method: "POST" }
  );
}

/** L'entreprise valide ou refuse la preuve reçue pour une installation. */
export function apiReviewProof(installationId: string, payload: ReviewProofPayload) {
  return authenticatedRequest<unknown>(`/api/backend/prestations/${installationId}/preuve/validation`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/** Page publique /invitation : accepte l'invitation d'un compte existant. */
export function apiAcceptInvitation(token: string) {
  return request<AcceptInvitationResult>(`/api/public/invitations/${encodeURIComponent(token)}`, {
    method: "POST",
  });
}

export function apiListInstallations() {
  return authenticatedRequest<InstallationRecord[]>("/api/backend/prestations");
}

// Routes publiques (aucun compte, aucune session) — le prestataire ouvre son
// lien de preuve sans jamais s'authentifier. Ne passent jamais par
// authenticatedRequest ni par le proxy générique /api/backend/[...path].
export function apiConsultProofLink(token: string) {
  return request<ProofLinkConsultation>(`/api/public/preuve-installation/${token}`);
}

export function apiSubmitProofViaLink(token: string, payload: SubmitProofViaLinkPayload) {
  return request<SubmitProofViaLinkResult>(
    `/api/public/preuve-installation/${token}`,
    { method: "POST", body: JSON.stringify(payload) }
  );
}

// ---------------------------------------------------------------------------
// Dashboard (agrégat entreprise)
// ---------------------------------------------------------------------------

export function apiGetDashboard() {
  return authenticatedRequest<DashboardSummary>("/api/backend/dashboard");
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export function apiListNotifications(
  params: { readStatus?: NotificationReadStatus | "ALL"; page?: number; limit?: number } = {}
) {
  const query = new URLSearchParams();
  if (params.readStatus) query.set("readStatus", params.readStatus);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  const qs = query.toString();
  return authenticatedRequest<PaginatedNotifications>(
    `/api/backend/notifications${qs ? `?${qs}` : ""}`
  );
}

export function apiMarkNotificationRead(id: string) {
  return authenticatedRequest<NotificationRecord>(`/api/backend/notifications/${id}/lue`, {
    method: "PATCH",
  });
}

// ---------------------------------------------------------------------------
// Équipes (membres de l'entreprise)
// ---------------------------------------------------------------------------

export function apiListUsers() {
  return authenticatedRequest<CompanyMember[]>("/api/backend/users");
}

export function apiCreateSubAccount(payload: CreateSubAccountPayload) {
  return authenticatedRequest<CreateSubAccountResult>("/api/backend/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function apiUpdateUserRole(id: string, role: Role) {
  return authenticatedRequest<CompanyMember>(`/api/backend/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

export function apiDeactivateUser(id: string) {
  return authenticatedRequest<null>(`/api/backend/users/${id}/deactivate`, {
    method: "PATCH",
  });
}

export function apiGetProfile() {
  return authenticatedRequest<UserProfile>("/api/backend/users/me");
}

// ---------------------------------------------------------------------------
// Recommandations IA (par campagne — pas d'endpoint global côté backend)
// ---------------------------------------------------------------------------

export function apiListRecommendations(campaignId: string) {
  return authenticatedRequest<CampaignRecommendation[]>(
    `/api/backend/campagnes/${campaignId}/recommandations`
  );
}

export function apiGenerateRecommendations(campaignId: string) {
  return authenticatedRequest<CampaignRecommendation[]>(
    `/api/backend/campagnes/${campaignId}/recommandations/generer`,
    { method: "POST" }
  );
}

// ---------------------------------------------------------------------------
// Comptes sociaux (liaison Meta)
// ---------------------------------------------------------------------------

export function apiListSocialAccounts() {
  // GET /social-accounts renvoie {items, total, page, limit, totalPages}
  // (SocialAccountsService.findAll) — jamais {data: [...]}.
  return authenticatedRequest<SocialAccountRecord[] | { items: SocialAccountRecord[] }>(
    "/api/backend/social-accounts"
  );
}

export function apiStartSocialOAuth(platform: SocialPlatform) {
  const path = platform === "FACEBOOK" ? "facebook" : "instagram";
  return authenticatedRequest<{ authorizationUrl: string }>(
    `/api/backend/social-accounts/oauth/${path}/start`,
    { method: "POST" }
  );
}

export function apiRevokeSocialAccount(id: string) {
  return authenticatedRequest<{ success: boolean }>(`/api/backend/social-accounts/${id}`, {
    method: "DELETE",
  });
}

export function apiSyncSocialAccount(id: string) {
  return authenticatedRequest<{ success: boolean }>(`/api/backend/social-accounts/${id}/sync`, {
    method: "POST",
  });
}

// ---------------------------------------------------------------------------
// Entreprise
// ---------------------------------------------------------------------------

export function apiCreateEntreprise(payload: CreateEntreprisePayload) {
  return authenticatedRequest<EntrepriseRecord>("/api/backend/entreprises", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
