import { NextResponse, type NextRequest } from "next/server";
import { authenticatedBackendRequest } from "@/lib/api/proxy";

/**
 * Proxy authentifié générique vers le backend, utilisé par tous les écrans
 * protégés (campagnes, comptes sociaux). Centralise ici, une seule fois,
 * l'attache du Bearer token et la logique "401 → refresh → rejoue une fois"
 * au lieu de la dupliquer dans une route par endpoint.
 *
 * Restreint volontairement aux préfixes ci-dessous : ce proxy ne doit jamais
 * devenir un tunnel ouvert vers n'importe quelle route backend (ex: /auth/*,
 * qui a son propre traitement dédié sous /api/auth/*).
 */
const ALLOWED_PREFIXES = ["campagnes", "social-accounts"];

// GET /social-accounts/oauth/callback est appelé DIRECTEMENT par Meta,
// jamais par ce frontend — on ne le relaie donc jamais ici, par sécurité
// (ce serait une route publique inutile côté proxy, sans utilité pour l'UI).
function isBlocked(path: string[]) {
  return path[0] === "social-accounts" && path[1] === "oauth" && path[2] === "callback";
}

async function handle(request: NextRequest, path: string[], method: string) {
  if (!ALLOWED_PREFIXES.includes(path[0]) || isBlocked(path)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const backendPath = `/${path.join("/")}${request.nextUrl.search}`;
  const hasBody = method === "POST" || method === "PATCH" || method === "PUT";
  const body = hasBody ? await request.json().catch(() => undefined) : undefined;

  const result = await authenticatedBackendRequest(backendPath, { method, body });
  return NextResponse.json(result.body, { status: result.status });
}

interface HandlerContext {
  params: Promise<{ path: string[] }>;
}

export async function GET(request: NextRequest, ctx: HandlerContext) {
  const { path } = await ctx.params;
  return handle(request, path, "GET");
}

export async function POST(request: NextRequest, ctx: HandlerContext) {
  const { path } = await ctx.params;
  return handle(request, path, "POST");
}

export async function PATCH(request: NextRequest, ctx: HandlerContext) {
  const { path } = await ctx.params;
  return handle(request, path, "PATCH");
}

export async function DELETE(request: NextRequest, ctx: HandlerContext) {
  const { path } = await ctx.params;
  return handle(request, path, "DELETE");
}
