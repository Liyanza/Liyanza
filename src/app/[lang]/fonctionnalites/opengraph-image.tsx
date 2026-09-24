import { ogImageMetadata, renderOgImage, type OgProps } from "@/lib/og-localized";

export const generateImageMetadata = (props: OgProps) => ogImageMetadata("features", props);

export default function Image(props: OgProps) {
  return renderOgImage("features", props);
}
