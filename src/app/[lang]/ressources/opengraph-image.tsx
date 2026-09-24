import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "Ressources KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Ressources",
    title: "Guides, tutoriels et vidéos pour piloter comme un expert.",
    subtitle: "Tout ce qu'il faut pour tirer le meilleur de KIYANZA.",
  });
}
