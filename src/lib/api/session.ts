import { cookies } from "next/headers";
import type { DisplayProfile } from "./types";
import { ACCESS_COOKIE, REFRESH_COOKIE, PROFILE_COOKIE } from "./cookie-names";

/**
 * Stratégie de stockage des tokens : cookies httpOnly posés par nos propres
 * Route Handlers (pattern "backend-for-frontend"), jamais localStorage.
 *
 * Le backend Liyanza ne pose aucun cookie lui-même (il renvoie les tokens
 * dans le corps JSON) : c'est donc le serveur Next.js qui joue ce rôle. Les
 * composants client n'ont jamais accès aux tokens bruts — ils appellent nos
 * routes /api/auth/* et /api/backend/*, qui lisent le cookie httpOnly côté
 * serveur et attachent l'en-tête Authorization avant de relayer au backend.
 * Un XSS côté client ne peut donc pas exfiltrer les tokens (contrairement à
 * un stockage localStorage), ce qui est le principal vecteur à couvrir ici
 * puisque le backend n'offre pas d'alternative (pas de session cookie natif).
 */

// Alignés sur les valeurs par défaut du backend (jwt.config.ts :
// accessExpiration=15m, refreshExpiration=7d). Si la config backend change,
// le cookie expirera simplement un peu trop tôt/tard côté navigateur, sans
// impact de sécurité : le backend revalide de toute façon chaque token.
const ACCESS_MAX_AGE = 15 * 60;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60;

const isProduction = process.env.NODE_ENV === "production";

const baseCookieOptions = {
  path: "/",
  sameSite: "lax" as const,
  secure: isProduction,
};

export async function setSessionCookies(accessToken: string, refreshToken: string) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, accessToken, {
    ...baseCookieOptions,
    httpOnly: true,
    maxAge: ACCESS_MAX_AGE,
  });
  store.set(REFRESH_COOKIE, refreshToken, {
    ...baseCookieOptions,
    httpOnly: true,
    maxAge: REFRESH_MAX_AGE,
  });
}

export async function setProfileCookie(profile: DisplayProfile) {
  const store = await cookies();
  store.set(PROFILE_COOKIE, JSON.stringify(profile), {
    ...baseCookieOptions,
    httpOnly: false,
    maxAge: REFRESH_MAX_AGE,
  });
}

export async function clearSessionCookies() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
  store.delete(PROFILE_COOKIE);
}

export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value;
}

export async function getProfileCookie(): Promise<DisplayProfile | null> {
  const store = await cookies();
  const raw = store.get(PROFILE_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DisplayProfile;
  } catch {
    return null;
  }
}
