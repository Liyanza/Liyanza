import { type NextRequest } from "next/server";
import { authenticatedBackendFileRequest } from "@/lib/api/proxy";

/**
 * Route dédiée (et non le proxy générique `/api/backend/[...path]`) : ce
 * dernier force `NextResponse.json(result.body)` sur tout, ce qui parserait
 * en JSON — et corromprait — le CSV/PDF binaire renvoyé par
 * `GET /rapports`. Next.js résout cette route statique avant le catch-all
 * pour le même chemin, donc aucun conflit.
 */
export async function GET(request: NextRequest) {
  const response = await authenticatedBackendFileRequest(`/rapports${request.nextUrl.search}`);

  const headers = new Headers();
  const contentType = response.headers.get("content-type");
  const contentDisposition = response.headers.get("content-disposition");
  if (contentType) headers.set("Content-Type", contentType);
  if (contentDisposition) headers.set("Content-Disposition", contentDisposition);

  return new Response(response.body, { status: response.status, headers });
}
