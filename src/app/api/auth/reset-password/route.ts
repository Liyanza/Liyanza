import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

// Route publique : l'appelant n'a par définition pas de session (il vient de
// cliquer un lien reçu par email). Aucun cookie à poser ici — l'utilisateur
// doit ensuite se reconnecter normalement avec son nouveau mot de passe.
export async function POST(request: Request) {
  const payload = (await request.json()) as { token: string; newPassword: string };
  const result = await backendFetch("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
  return NextResponse.json(result.body, { status: result.status });
}
