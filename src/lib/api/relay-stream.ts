/**
 * Retransmet au navigateur une réponse en flux (Server-Sent Events) du
 * backend, sans la lire ni la mettre en tampon. Une réponse d'erreur
 * ordinaire (JSON : 401, 404, 429, 503…) est retransmise telle quelle, avec
 * son statut : le navigateur la traite comme n'importe quelle erreur d'API.
 */
export function relayStream(upstream: Response): Response {
  const contentType = upstream.headers.get("content-type") ?? "application/json";
  if (!upstream.ok || !contentType.includes("text/event-stream")) {
    return new Response(upstream.body, { status: upstream.status, headers: { "Content-Type": contentType } });
  }
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
