import { ogImageMetadata, renderOgImage, type OgProps } from "@/lib/og-localized";

export const generateImageMetadata = (props: OgProps) => ogImageMetadata("about", props);

export default function Image(props: OgProps) {
  return renderOgImage("about", props);
}
