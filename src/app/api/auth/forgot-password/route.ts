import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

// Route publique : simple relais vers POST /auth/forgot-password. Aucun
// cookie à poser — le backend ne révèle jamais si l'email correspond à un
// compte existant (toujours 201), voir AuthService.forgotPassword côté API.
export async function POST(request: Request) {
  const payload = (await request.json()) as { email: string };
  const result = await backendFetch("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
  return NextResponse.json(result.body, { status: result.status });
}
