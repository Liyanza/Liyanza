import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { getAccessToken, getRefreshToken, clearSessionCookies } from "@/lib/api/session";

export async function POST() {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  if (accessToken) {
    // Best-effort : même si l'appel backend échoue (token déjà expiré,
    // réseau...), on efface systématiquement les cookies locaux ci-dessous —
    // l'utilisateur doit toujours pouvoir se déconnecter côté frontend.
    await backendFetch("/auth/logout", {
      method: "POST",
      body: refreshToken ? { refreshToken } : {},
      headers: { Authorization: `Bearer ${accessToken}` },
    }).catch(() => null);
  }

  await clearSessionCookies();
  return NextResponse.json({ success: true });
}
