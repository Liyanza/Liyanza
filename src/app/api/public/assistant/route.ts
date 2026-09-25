import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

/**
 * Assistant vitrine du site public (visiteurs anonymes) → backend
 * `POST /public/assistant/ask`. Version sans flux, conservée en repli de
 * /api/public/assistant/stream. L'IP réelle du visiteur (quotas par
 * visiteur côté backend) est relayée par backendFetch, comme pour toutes les
 * routes.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { message?: unknown; history?: unknown } | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }

  const result = await backendFetch("/public/assistant/ask", {
    method: "POST",
    body: { message: body.message, history: body.history ?? [] },
  });
  return NextResponse.json(result.body, { status: result.status });
}
