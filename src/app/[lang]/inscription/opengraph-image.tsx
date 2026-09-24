import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "Créer un compte — KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Inscription",
    title: "Lancez-vous. C'est gratuit.",
    subtitle: "Rejoignez 500+ équipes marketing qui pilotent leurs campagnes avec l'IA KIYANZA.",
  });
}
