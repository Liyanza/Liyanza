import { NextResponse } from "next/server";
import { backendFetchRaw } from "@/lib/api/backend";
import { relayStream } from "@/lib/api/relay-stream";

/**
 * Assistant vitrine du site public, réponse en flux (Server-Sent Events).
 * L'IP réelle du visiteur est relayée au backend par backendFetchRaw (quotas
 * par visiteur) — voir /api/public/assistant pour la version non-flux.
 */
export const maxDuration = 60;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { message?: unknown; history?: unknown } | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }
  const upstream = await backendFetchRaw("/public/assistant/ask/stream", {
    method: "POST",
    body: { message: body.message, history: body.history ?? [] },
  });
  return relayStream(upstream);
}
