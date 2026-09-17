/**
 * Client bas niveau vers l'API Liyanza (NestJS). N'est importé que depuis des
 * Route Handlers (src/app/api/**) — jamais depuis un composant client — afin
 * que l'URL du backend et les tokens ne transitent jamais par le navigateur.
 */

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
