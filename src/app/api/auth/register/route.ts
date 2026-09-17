import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import type { RegisterPayload } from "@/lib/api/types";

// Route publique : simple relais vers POST /auth/register, sans cookie à
// poser (l'inscription ne connecte pas automatiquement l'utilisateur côté
// backend — voir AuthContext.register() qui enchaîne un login côté client).
export async function POST(request: Request) {
  const payload = (await request.json()) as RegisterPayload;
  const result = await backendFetch("/auth/register", {
    method: "POST",
    body: payload,
  });
  return NextResponse.json(result.body, { status: result.status });
}
