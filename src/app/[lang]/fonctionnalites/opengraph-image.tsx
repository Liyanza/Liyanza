import { buildOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "Fonctionnalités KIYANZA";

export default async function Image() {
  return buildOgImage({
    eyebrow: "Fonctionnalités",
    title: "Campagnes, scénarios IA et rapports en un seul endroit.",
    subtitle: "Création, monitoring, recommandations et rapports pilotés par l'IA.",
  });
}
