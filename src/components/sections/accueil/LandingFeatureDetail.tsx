import { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const bgClasses = {
  white: "bg-white",
  zinc: "bg-zinc-50",
  slate: "bg-slate-50",
};

export function LandingFeatureDetail({
  bg = "white",
  heading,
  description,
  items,
  ctaText,
  ctaHref,
  mockup,
  reverse = false,
}: {
  bg?: "white" | "zinc" | "slate";
  heading: string;
  description: string;
  items: string[];
  ctaText: string;
  ctaHref: string;
  mockup: ReactNode;
  reverse?: boolean;
}) {
  const textColumn = (
    <div>
      <h2 className="text-3xl font-extrabold leading-tight text-zinc-950 sm:text-4xl">
        {heading}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-gray-text">{description}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-accent-dark/10">
              <Check className="size-3 text-green-accent-dark" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-zinc-950">{item}</span>
          </li>
        ))}
      </ul>
      <Button
        variant="solid"
        size="md"
        href={ctaHref}
        className="mt-8"
        icon={<ArrowRight className="size-4" aria-hidden="true" />}
      >
        {ctaText}
      </Button>
    </div>
  );

  const mockupColumn = <div className="flex justify-center">{mockup}</div>;

  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${bgClasses[bg]}`}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {reverse ? (
            <>
              <div className="order-2 lg:order-1">{mockupColumn}</div>
              <div className="order-1 lg:order-2">{textColumn}</div>
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
