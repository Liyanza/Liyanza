import { backendFetch } from "./backend";
import { getRefreshToken, setSessionCookies, clearSessionCookies } from "./session";

interface RefreshOutcome {
  ok: boolean;
  accessToken?: string;
  status: number;
  body: unknown;
}

interface RefreshResponseBody {
  accessToken: string;
  refreshToken: string;
}

/**
 * Échange le refresh token (cookie httpOnly) contre une nouvelle paire de
 * tokens et rotate les cookies. Le refresh token backend est à usage unique :
 * on ne doit donc jamais appeler cette fonction deux fois en parallèle pour
 * la même requête entrante (voir authenticatedBackendRequest : un seul essai).
 */
export async function performRefresh(): Promise<RefreshOutcome> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return { ok: false, status: 401, body: { message: "Aucune session active." } };
  }

  const result = await backendFetch<RefreshResponseBody>("/auth/refresh", {
    method: "POST",
    body: { refreshToken },
  });

  if (result.status >= 200 && result.status < 300) {
    await setSessionCookies(result.body.accessToken, result.body.refreshToken);
    return { ok: true, accessToken: result.body.accessToken, status: result.status, body: result.body };
  }

  await clearSessionCookies();
  return { ok: false, status: result.status, body: result.body };
}
