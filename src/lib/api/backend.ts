/**
 * Client bas niveau vers l'API Liyanza (NestJS). N'est importé que depuis des
 * Route Handlers (src/app/api/**) — jamais depuis un composant client — afin
 * que l'URL du backend et les tokens ne transitent jamais par le navigateur.
 */

import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL n'est pas défini. Voir .env.example (URL de l'API backend Liyanza)."
  );
}

export interface BackendResult<T = unknown> {
  status: number;
  body: T;
}

/**
 * IP réelle du visiteur, relayée au backend avec le secret partagé
 * WEB_PROXY_SECRET. Relayées d'ici, toutes les requêtes arrivent au backend
 * depuis ce serveur : sans cela, ses limites par IP (tentatives de
 * connexion, requêtes par minute, quotas de l'assistant vitrine) seraient
 * partagées par tous les visiteurs du site. L'IP vient de la plateforme
 * d'hébergement (x-real-ip / x-forwarded-for), pas du navigateur.
 */
async function visitorIpHeaders(): Promise<Record<string, string>> {
  const secret = process.env.WEB_PROXY_SECRET;
  if (!secret) return {};
  try {
    const incoming = await headers();
    const ip = incoming.get("x-real-ip") ?? incoming.get("x-forwarded-for")?.split(",")[0]?.trim();
    return ip ? { "X-Visitor-IP": ip, "X-Web-Proxy-Secret": secret } : {};
  } catch {
    // Appel hors d'une requête (build, script) : pas de visiteur à relayer.
    return {};
  }
}

/**
 * Appelle le backend et renvoie systématiquement `{status, body}`, sans
 * jamais lever d'exception sur un statut HTTP d'erreur (400/401/403/429...) :
 * ces réponses sont légitimes et doivent être retransmises telles quelles à
 * l'appelant (Route Handler) pour être répercutées au client.
 */
export async function backendFetch<T = unknown>(
  path: string,
  init: { method?: string; body?: unknown; headers?: Record<string, string> } = {}
): Promise<BackendResult<T>> {
  const response = await fetch(`${API_URL}${path}`, {
    method: init.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(await visitorIpHeaders()),
      ...init.headers,
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  const text = await response.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { message: text };
    }
  }

  return { status: response.status, body: body as T };
}

/**
 * Variante brute de `backendFetch`, pour les réponses à ne pas parser :
 * fichiers (export CSV/PDF de `GET /rapports`, qu'un `JSON.parse`
 * corromprait) et flux (réponses de l'assistant IA en Server-Sent Events).
 * Renvoie la `Response` telle quelle (headers + corps en flux), à
 * retransmettre sans la lire.
 */
export async function backendFetchRaw(
  path: string,
  init: { method?: string; body?: unknown; headers?: Record<string, string> } = {}
): Promise<Response> {
  return fetch(`${API_URL}${path}`, {
    method: init.method ?? "GET",
    headers: {
      ...(init.body !== undefined && { "Content-Type": "application/json" }),
      ...(await visitorIpHeaders()),
      ...init.headers,
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
}
