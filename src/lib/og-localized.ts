import { defaultLocale, isLocale } from "@/i18n/config";
import { loadMessages, type Messages } from "@/i18n/dictionaries";
import { buildOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

/**
 * Images de partage traduites. Dans un fichier opengraph-image.tsx :
 *
 *   export const generateImageMetadata = (props: OgProps) => ogImageMetadata("pricing", props);
 *   export default function Image(props: OgProps) { return renderOgImage("pricing", props); }
 */

export type OgKey = keyof Messages["og"];
export type OgProps = { params: Promise<{ lang: string }> };

async function textsFor(key: OgKey, params: OgProps["params"]) {
  const { lang } = await params;
  const og = await loadMessages(isLocale(lang) ? lang : defaultLocale, "og");
  return og[key];
}

export async function ogImageMetadata(key: OgKey, { params }: OgProps) {
  const t = await textsFor(key, params);
  return [{ id: "og", alt: t.alt, size: OG_IMAGE_SIZE, contentType: OG_IMAGE_CONTENT_TYPE }];
}

export async function renderOgImage(key: OgKey, { params }: OgProps) {
  const { eyebrow, title, subtitle } = await textsFor(key, params);
  return buildOgImage({ eyebrow, title, subtitle });
}
