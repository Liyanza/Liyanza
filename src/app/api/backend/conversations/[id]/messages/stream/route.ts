import { type NextRequest } from "next/server";
import { authenticatedBackendRawRequest } from "@/lib/api/proxy";
import { relayStream } from "@/lib/api/relay-stream";

/**
 * Copilot : réponse de l'IA en flux (Server-Sent Events). Route dédiée —
 * prioritaire sur le proxy générique /api/backend/[...path], qui lit et
 * parse toute la réponse en JSON avant de la renvoyer.
 */
export const maxDuration = 60;

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await request.json().catch(() => undefined);
  const upstream = await authenticatedBackendRawRequest(
    `/conversations/${encodeURIComponent(id)}/messages/stream`,
    { method: "POST", body }
  );
  return relayStream(upstream);
}
