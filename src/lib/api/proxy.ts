import { backendFetch, backendFetchRaw, type BackendResult } from "./backend";
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

/**
 * Même logique d'auth (attache le token, retente une fois après refresh sur
 * 401) que `authenticatedBackendRequest`, mais pour un fichier téléchargeable
 * (`GET /rapports`) : renvoie la `Response` brute (headers Content-Type /
 * Content-Disposition + corps binaire), jamais parsée en JSON.
 */
export async function authenticatedBackendFileRequest(path: string): Promise<Response> {
  return authenticatedBackendRawRequest(path);
}

/**
 * Généralisation de `authenticatedBackendFileRequest` à toute méthode : sert
 * aussi aux réponses en flux de l'assistant IA (Server-Sent Events), à
 * retransmettre au navigateur sans les lire. Le 401 → refresh → rejeu ne peut
 * se produire qu'avant le premier octet du flux, donc sans rien perdre.
 */
export async function authenticatedBackendRawRequest(
  path: string,
  init: { method?: string; body?: unknown } = {}
): Promise<Response> {
  let accessToken = await getAccessToken();

  if (!accessToken) {
    const refreshed = await performRefresh();
    if (!refreshed.ok) {
      return Response.json(refreshed.body, { status: 401 });
    }
    accessToken = refreshed.accessToken;
  }

  let response = await backendFetchRaw(path, {
    ...init,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 401) {
    const refreshed = await performRefresh();
    if (!refreshed.ok) {
      return response;
    }
    response = await backendFetchRaw(path, {
      ...init,
      headers: { Authorization: `Bearer ${refreshed.accessToken}` },
    });
  }

  return response;
}
