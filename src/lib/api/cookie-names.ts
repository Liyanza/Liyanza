// Partagé entre src/lib/api/session.ts (Route Handlers) et src/proxy.ts
// (garde de route), qui tournent dans des contextes distincts et ne peuvent
// pas partager un module avec état — seuls ces noms de cookies sont communs.
export const ACCESS_COOKIE = "kiyanza_at";
export const REFRESH_COOKIE = "kiyanza_rt";
export const PROFILE_COOKIE = "kiyanza_profile";
