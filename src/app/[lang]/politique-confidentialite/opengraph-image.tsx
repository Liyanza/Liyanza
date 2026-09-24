import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "Politique de confidentialité de KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Vos données",
    title: "Politique de confidentialité",
    subtitle: "Comment nous collectons, utilisons et protégeons vos données.",
  });
}
