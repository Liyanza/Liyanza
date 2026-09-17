import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/api/cookie-names";

/**
 * Garde-fou grossier sur /dashboard/** : redirige vers /connexion si aucune
 * session n'est présente. Il ne valide PAS la signature/l'expiration du
 * token (impossible sans le secret JWT, qui ne doit jamais quitter le
 * backend) — son seul rôle est d'éviter d'afficher la coquille du dashboard
 * à un visiteur non connecté. L'autorisation réelle (identité, rôle,
 * expiration) est vérifiée à chaque appel par /api/auth/me et par le
 * backend lui-même sur chaque route proxyée — voir src/lib/api/proxy.ts.
 *
 * Nommé `proxy.ts` (et non `middleware.ts`, déprécié depuis Next.js 16 —
 * voir node_modules/next/dist/docs/.../proxy.md).
 */
export function proxy(request: NextRequest) {
  const hasSession =
    request.cookies.has(ACCESS_COOKIE) || request.cookies.has(REFRESH_COOKIE);

  if (!hasSession) {
    const loginUrl = new URL("/connexion", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
