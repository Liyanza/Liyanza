import { backendFetch, type BackendResult } from "./backend";
import { getAccessToken } from "./session";
import { performRefresh } from "./refresh";

/**
 * Relaie une requête vers une route protégée du backend en attachant le
 * token d'accès courant. Sur un 401 (token expiré ou absent), tente UNE
 * fois un refresh puis rejoue la requête d'origine — au-delà, l'échec est
 * retransmis tel quel à l'appelant (qui doit alors rediriger vers /connexion).
 */
export async function authenticatedBackendRequest<T = unknown>(
  path: string,
  init: { method?: string; body?: unknown } = {}
): Promise<BackendResult<T>> {
  let accessToken = await getAccessToken();

  if (!accessToken) {
    const refreshed = await performRefresh();
    if (!refreshed.ok) {
      return { status: 401, body: refreshed.body as T };
    }
    accessToken = refreshed.accessToken;
  }

  let result = await backendFetch<T>(path, {
    ...init,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (result.status === 401) {
    const refreshed = await performRefresh();
    if (!refreshed.ok) {
      return result;
    }
    result = await backendFetch<T>(path, {
      ...init,
      headers: { Authorization: `Bearer ${refreshed.accessToken}` },
    });
  }

  return result;
}
