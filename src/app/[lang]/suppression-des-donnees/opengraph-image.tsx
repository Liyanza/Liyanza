import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "Suppression des données sur KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Vos données",
    title: "Suppression des données",
    subtitle: "Comment demander la suppression de vos données personnelles.",
  });
}
