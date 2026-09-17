import { NextResponse } from "next/server";
import { performRefresh } from "@/lib/api/refresh";

// Exposée pour un rafraîchissement explicite déclenché par le client (rare :
// la plupart des routes protégées rafraîchissent déjà de façon transparente
// via authenticatedBackendRequest). Utile pour /api/auth/me au chargement à froid.
export async function POST() {
  const outcome = await performRefresh();
  if (!outcome.ok) {
    return NextResponse.json(outcome.body, { status: outcome.status });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
