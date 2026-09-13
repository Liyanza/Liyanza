import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "Connexion — KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Connexion",
    title: "Bon retour parmi nous.",
    subtitle: "Reprenez le pilotage de vos campagnes là où vous l'aviez laissé.",
  });
}
