import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

// Route publique : la personne invitée n'est pas forcément connectée. Relais
// direct vers le backend, le lien à usage unique porte l'autorisation (même
// principe que /api/public/preuve-installation).
export async function POST(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await backendFetch(`/users/invitations/${encodeURIComponent(token)}/accept`, {
    method: "POST",
  });
  return NextResponse.json(result.body, { status: result.status });
}
