import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "À propos de KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "À propos",
    title: "Nous rendons le marketing lisible par tous.",
    subtitle: "Mission, valeurs, histoire et équipe derrière KIYANZA.",
  });
}
