import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

const ALLOWED_PROVIDERS = ["google", "facebook"];

interface HandlerContext {
  params: Promise<{ provider: string }>;
}

// Démarre le flow de connexion : relais public vers GET /auth/:provider, qui
// renvoie {authorizationUrl} (pas une redirection HTTP — c'est au client de
// naviguer vers cette URL, comme pour le flow de liaison Meta déjà en place).
export async function GET(_request: Request, ctx: HandlerContext) {
  const { provider } = await ctx.params;
  if (!ALLOWED_PROVIDERS.includes(provider)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const result = await backendFetch(`/auth/${provider}`);
  return NextResponse.json(result.body, { status: result.status });
}
