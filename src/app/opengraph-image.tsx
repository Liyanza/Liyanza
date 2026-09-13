import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "KIYANZA — Pilotez vos campagnes. Laissez l'IA vous guider.";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Marketing piloté par l'IA",
    title: "Pilotez vos campagnes. Laissez l'IA vous guider.",
    subtitle: "Analysez, simulez et optimisez vos campagnes marketing en un seul endroit.",
  });
}
