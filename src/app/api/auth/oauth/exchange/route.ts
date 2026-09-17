import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { setSessionCookies, setProfileCookie } from "@/lib/api/session";

interface ExchangeResponseBody {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

// Appelée par la page /connexion/oauth-callback juste après la redirection
// Google/Facebook : échange le code d'échange à usage unique (reçu dans
// l'URL) contre la vraie paire de tokens, puis pose les cookies httpOnly —
// exactement le même traitement que /api/auth/login, seule la source du
// token diffère (OAuth vs mot de passe).
export async function POST(request: Request) {
  const payload = (await request.json()) as { code: string };
  const result = await backendFetch<ExchangeResponseBody>("/auth/oauth/exchange", {
    method: "POST",
    body: payload,
  });

  if (result.status >= 200 && result.status < 300) {
    const { accessToken, refreshToken, user } = result.body;
    await setSessionCookies(accessToken, refreshToken);
    await setProfileCookie({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    return NextResponse.json({ user }, { status: result.status });
  }

  return NextResponse.json(result.body, { status: result.status });
}
