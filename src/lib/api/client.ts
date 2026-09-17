"use client";

import type {
  AuthUser,
  CampagneRecord,
  CreateCampagnePayload,
  LoginUser,
  RegisterPayload,
  SocialAccountRecord,
  SocialPlatform,
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

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError(0, "Impossible de contacter le serveur. Vérifiez votre connexion.");
  }

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    if (response.status === 429) {
      throw new ApiError(429, "Trop de tentatives. Réessayez dans une minute.");
    }
    throw new ApiError(response.status, extractMessage(body, "Une erreur est survenue."));
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
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/connexion");
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

// ---------------------------------------------------------------------------
// Comptes sociaux (liaison Meta)
// ---------------------------------------------------------------------------

export function apiListSocialAccounts() {
  return authenticatedRequest<SocialAccountRecord[] | { data: SocialAccountRecord[] }>(
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
