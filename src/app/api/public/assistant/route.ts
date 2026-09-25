import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

/**
 * Assistant vitrine du site public (visiteurs anonymes) → backend
 * `POST /public/assistant/ask`.
 *
 * Le backend limite les questions par visiteur (IP). Relayée d'ici, chaque
 * requête lui arriverait avec l'IP de ce serveur, commune à tous les
 * visiteurs : on lui transmet donc l'IP réelle du visiteur (posée par la
 * plateforme d'hébergement, non falsifiable par le navigateur), avec le
 * secret partagé WEB_PROXY_SECRET qui seul la rend crédible côté backend.
 * Le secret n'est lu que côté serveur (jamais préfixé NEXT_PUBLIC_).
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { message?: unknown; history?: unknown } | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }

  const headers: Record<string, string> = {};
  const visitorIp =
    request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const secret = process.env.WEB_PROXY_SECRET;
  if (visitorIp && secret) {
    headers["X-Visitor-IP"] = visitorIp;
    headers["X-Web-Proxy-Secret"] = secret;
  }

  const result = await backendFetch("/public/assistant/ask", {
    method: "POST",
    body: { message: body.message, history: body.history ?? [] },
    headers,
  });
  return NextResponse.json(result.body, { status: result.status });
}
