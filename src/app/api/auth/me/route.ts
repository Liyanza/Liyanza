import { NextResponse } from "next/server";
import { authenticatedBackendRequest } from "@/lib/api/proxy";
import { getProfileCookie } from "@/lib/api/session";
import type { AuthenticatedIdentity } from "@/lib/api/types";

// Source de vérité pour AuthContext au montage du dashboard : rôle et
// companyId proviennent toujours de /auth/me (backend), jamais d'un cookie
// client. Le prénom/nom (absents de /auth/me) sont enrichis depuis le cookie
// d'affichage posé au login, uniquement à titre cosmétique.
export async function GET() {
  const result = await authenticatedBackendRequest<AuthenticatedIdentity>("/auth/me");

  if (result.status < 200 || result.status >= 300) {
    return NextResponse.json(result.body, { status: result.status });
  }

  const profile = await getProfileCookie();
  return NextResponse.json({
    ...result.body,
    firstName: profile?.firstName,
    lastName: profile?.lastName,
  });
}
