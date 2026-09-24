import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "Conditions d'utilisation de KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Cadre légal",
    title: "Conditions d'utilisation",
    subtitle: "Les règles qui encadrent l'accès et l'utilisation de KIYANZA.",
  });
}
