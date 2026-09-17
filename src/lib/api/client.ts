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

/**
 * TODO: brancher sur POST /auth/forgot-password une fois disponible côté
 * backend (absent à ce jour — voir src/modules/auth/auth.controller.ts dans
 * Liyanza-backend, qui n'expose que register/login/refresh/logout/me).
 * Stub unique et clairement isolé : le formulaire (ForgotPasswordForm) ne
 * changera pas quand cet appel sera remplacé par un vrai fetch.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- signature documente le futur param réel
export async function requestPasswordReset(_email: string): Promise<{ success: true }> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true };
}

/**
 * TODO: brancher sur POST /auth/google et /auth/facebook une fois qu'une
 * stratégie OAuth de CONNEXION (différente du flow de liaison Meta pour les
 * campagnes, voir startSocialOAuth ci-dessous) existera côté backend.
 * Stub unique et clairement isolé pour ne pas retoucher SocialButtons quand
 * le vrai endpoint sera disponible.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- signature documente le futur param réel
export async function loginWithProvider(_provider: "google" | "facebook"): Promise<never> {
  throw new ApiError(501, "Cette méthode de connexion arrive bientôt.");
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
