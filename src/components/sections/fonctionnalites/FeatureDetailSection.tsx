import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { CheckItem } from "@/components/ui/CheckItem";

interface Accent {
  check: string;
  ctaBorder: string;
  ctaText: string;
}

export function FeatureDetailSection({
  id,
  bg = "white",
  eyebrowNumber,
  eyebrowLabel,
  heading,
  description,
  items,
  ctaText,
  accent,
  mockup,
  reverse = false,
  extra,
}: {
  id: string;
  bg?: "white" | "slate";
  eyebrowNumber: string;
  eyebrowLabel: string;
  heading: string[];
  description: string;
  items: string[];
  ctaText: string;
  accent: Accent;
  mockup: ReactNode;
  reverse?: boolean;
  extra?: ReactNode;
}) {
  const textColumn = (
    <div>
      <SectionEyebrow variant="pill">
        {eyebrowNumber} · {eyebrowLabel}
      </SectionEyebrow>
      <h2 className="mt-5 text-4xl font-extrabold leading-tight text-black">
        {heading.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-gray-text">{description}</p>
      <ul className="mt-6">
        {items.map((item) => (
          <CheckItem key={item} text={item} accentClass={accent.check} />
        ))}
      </ul>
      {extra}
      <a
        href="#"
        className={`mt-8 inline-flex items-center gap-1.5 rounded-full border-2 px-6 py-2.5 text-sm font-semibold transition hover:opacity-80 ${accent.ctaBorder} ${accent.ctaText}`}
      >
        {ctaText}
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </a>
    </div>
  );

  const mockupColumn = <div className="flex justify-center">{mockup}</div>;

  return (
    <section
      id={id}
      className={`scroll-mt-40 py-20 ${bg === "slate" ? "bg-slate-50" : "bg-white"}`}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {reverse ? (
            <>
              {mockupColumn}
              {textColumn}
            </>
          ) : (
            <>
              {textColumn}
              {mockupColumn}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
