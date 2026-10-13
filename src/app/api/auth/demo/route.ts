import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { setSessionCookies, setProfileCookie } from "@/lib/api/session";

interface DemoLoginResponseBody {
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

/**
 * « Voir la démo » : ouvre une session sur l'entreprise de démonstration du
 * backend (lecture seule, données fictives remises à jour chaque nuit), avec
 * les mêmes cookies qu'une connexion classique.
 */
export async function POST() {
  const result = await backendFetch<DemoLoginResponseBody>("/auth/demo", { method: "POST", body: {} });

  if (result.status >= 200 && result.status < 300) {
    const { accessToken, refreshToken, user } = result.body;
    await setSessionCookies(accessToken, refreshToken);
    await setProfileCookie({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    return NextResponse.json({ user }, { status: result.status });
  }

  return NextResponse.json(result.body, { status: result.status });
}
