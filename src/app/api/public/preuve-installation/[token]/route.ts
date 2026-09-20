import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

// Route publique : le prestataire qui soumet une preuve n'a aucun compte
// Liyanza, donc aucune session/cookie — impossible de passer par le proxy
// authentifié générique (/api/backend/[...path]). Même principe que
// /api/auth/forgot-password : relais direct vers le backend, le token du
// lien porte lui-même l'autorisation (JWT signé + jti à usage unique).
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await backendFetch(`/prestations/lien-preuve/${token}`);
  return NextResponse.json(result.body, { status: result.status });
}

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const payload = (await request.json()) as {
    photo: string;
    latitude: number;
    longitude: number;
    takenAt: string;
  };
  const result = await backendFetch(`/prestations/lien-preuve/${token}`, {
    method: "POST",
    body: payload,
  });
  return NextResponse.json(result.body, { status: result.status });
}
