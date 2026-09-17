import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { setSessionCookies, setProfileCookie } from "@/lib/api/session";

interface LoginResponseBody {
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

export async function POST(request: Request) {
  const payload = (await request.json()) as { email: string; password: string };
  const result = await backendFetch<LoginResponseBody>("/auth/login", {
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
    // Les tokens ne quittent jamais le serveur : seule l'identité (non
    // sensible) est renvoyée au client.
    return NextResponse.json({ user }, { status: result.status });
  }

  return NextResponse.json(result.body, { status: result.status });
}
