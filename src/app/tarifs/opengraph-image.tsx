import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "Tarifs KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Tarifs",
    title: "Des tarifs simples pour des campagnes plus intelligentes.",
    subtitle: "FREE, PRO, BUSINESS et ENTERPRISE — comparez les formules.",
  });
}
