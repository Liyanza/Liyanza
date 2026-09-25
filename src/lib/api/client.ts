"use client";

import { localizePath, parsePath } from "@/i18n/paths";
import type {
  AdvertisingChannelRecord,
  AiConversationDetail,
  AiConversationRecord,
  AiConversationSummary,
  AiMessageFeedback,
  AiMessageRecord,
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
  PublicChatHistoryMessage,
  ProofLinkResponse,
  RapportConformite,
  RegisterPayload,
  Role,
  SendChatMessageResult,
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
// Réponses en flux (Server-Sent Events) de l'assistant IA
// ---------------------------------------------------------------------------

/**
 * Lit une réponse SSE : appelle `onDelta` pour chaque morceau de texte et
 * renvoie l'événement final `done`. Un événement `error` (réponse coupée
 * par le serveur) ou un flux qui s'arrête sans `done` lève une ApiError.
 */
async function readEventStream<TDone>(response: Response, onDelta: (text: string) => void): Promise<TDone> {
  const reader = response.body?.getReader();
  if (!reader) throw new ApiError(502, networkMessages().generic);
  const decoder = new TextDecoder();
  let buffer = "";

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let end: number;
    while ((end = buffer.indexOf("\n\n")) !== -1) {
      const data = buffer
        .slice(0, end)
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim())
        .join("");
      buffer = buffer.slice(end + 2);
      if (!data) continue;
      const event = JSON.parse(data) as { type: string; text?: string };
      if (event.type === "delta" && event.text) onDelta(event.text);
      else if (event.type === "done") return event as TDone;
      else if (event.type === "error") throw new ApiError(502, networkMessages().generic);
    }
  }
  throw new ApiError(502, networkMessages().generic);
}

/** POST en flux : les erreurs HTTP (avant le flux) deviennent des ApiError, comme request(). */
async function streamRequest<TDone>(url: string, body: unknown, onDelta: (text: string) => void): Promise<TDone> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, networkMessages().offline);
  }
  if (!response.ok) {
    const errorBody: unknown = await response.json().catch(() => null);
    if (response.status === 429) throw new ApiError(429, networkMessages().tooMany);
    throw new ApiError(response.status, extractMessage(errorBody, networkMessages().generic));
  }
  return readEventStream<TDone>(response, onDelta);
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
// Assistant IA — Copilot du dashboard (utilisateurs connectés)
// ---------------------------------------------------------------------------

export function apiListConversations() {
  return authenticatedRequest<AiConversationSummary[]>("/api/backend/conversations");
}

export function apiGetConversation(conversationId: string) {
  return authenticatedRequest<AiConversationDetail>(`/api/backend/conversations/${conversationId}`);
}

export function apiCreateConversation(topic: string) {
  return authenticatedRequest<AiConversationRecord>("/api/backend/conversations", {
    method: "POST",
    body: JSON.stringify({ topic }),
  });
}

export function apiRenameConversation(conversationId: string, topic: string) {
  return authenticatedRequest<AiConversationSummary>(`/api/backend/conversations/${conversationId}`, {
    method: "PATCH",
    body: JSON.stringify({ topic }),
  });
}

export function apiDeleteConversation(conversationId: string) {
  return authenticatedRequest<null>(`/api/backend/conversations/${conversationId}`, { method: "DELETE" });
}

/** `campaignId` : campagne affichée à l'écran, ajoutée au contexte de l'IA. */
export function apiSendChatMessage(conversationId: string, content: string, campaignId?: string) {
  return authenticatedRequest<SendChatMessageResult>(
    `/api/backend/conversations/${conversationId}/messages`,
    { method: "POST", body: JSON.stringify({ content, ...(campaignId && { campaignId }) }) }
  );
}

/**
 * Comme apiSendChatMessage, mais la réponse de l'IA arrive au fil de sa
 * génération (`onDelta`) ; renvoie les deux messages enregistrés à la fin.
 * Un 401 renvoie vers /connexion, comme authenticatedRequest.
 */
export async function apiStreamChatMessage(
  conversationId: string,
  content: string,
  campaignId: string | undefined,
  onDelta: (text: string) => void
): Promise<SendChatMessageResult> {
  try {
    return await streamRequest<SendChatMessageResult>(
      `/api/backend/conversations/${conversationId}/messages/stream`,
      { content, ...(campaignId && { campaignId }) },
      onDelta
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      const { locale } = parsePath(window.location.pathname);
      window.location.assign(localizePath("/connexion", locale));
    }
    throw error;
  }
}

/** Remplace la dernière réponse de l'IA par une nouvelle. */
export function apiRegenerateLastAnswer(conversationId: string, campaignId?: string) {
  return authenticatedRequest<AiMessageRecord>(`/api/backend/conversations/${conversationId}/regenerate`, {
    method: "POST",
    body: JSON.stringify(campaignId ? { campaignId } : {}),
  });
}

export function apiSetMessageFeedback(conversationId: string, messageId: string, value: AiMessageFeedback | null) {
  return authenticatedRequest<{ id: string; feedback: AiMessageFeedback | null }>(
    `/api/backend/conversations/${conversationId}/messages/${messageId}/feedback`,
    { method: "PATCH", body: JSON.stringify({ value }) }
  );
}

// ---------------------------------------------------------------------------
// Assistant vitrine du site public (visiteurs anonymes)
//
// `request` et non `authenticatedRequest` : aucun compte ici, et un 429
// (quota du visiteur atteint) ne doit jamais renvoyer vers /connexion.
// ---------------------------------------------------------------------------

/** Assistant vitrine, réponse au fil de sa génération (`onDelta`). */
export async function apiPublicAskStream(
  message: string,
  history: PublicChatHistoryMessage[],
  onDelta: (text: string) => void
): Promise<void> {
  await streamRequest<{ type: "done" }>("/api/public/assistant/stream", { message, history }, onDelta);
}

export function apiPublicAsk(message: string, history: PublicChatHistoryMessage[]) {
  return request<{ answer: string }>("/api/public/assistant", {
    method: "POST",
    body: JSON.stringify({ message, history }),
  });
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
