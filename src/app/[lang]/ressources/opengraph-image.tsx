import { ogImageMetadata, renderOgImage, type OgProps } from "@/lib/og-localized";

export const generateImageMetadata = (props: OgProps) => ogImageMetadata("resources", props);

export default function Image(props: OgProps) {
  return renderOgImage("resources", props);
}
