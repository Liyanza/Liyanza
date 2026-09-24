import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "Mot de passe oublié — KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Mot de passe oublié",
    title: "Pas de panique.",
    subtitle: "Nous vous envoyons un lien de réinitialisation en toute sécurité.",
  });
}
