import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { getMessages } from "@/i18n/server";

export async function AboutFinalCTA() {
  const t = (await getMessages("common")).finalCta;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy via-[#0a2e1a] to-navy py-20">
      <div
        className="pointer-events-none absolute left-1/3 top-0 size-64 rounded-full bg-green-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 size-48 rounded-full bg-cyan-500/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-xl">
          <SectionEyebrow variant="line" className="text-orange-500">
            {t.eyebrow}
          </SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-[#6b8ab0]">
            {t.text}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="flex w-full flex-col items-start gap-4 lg:w-auto lg:items-center">
          <div className="flex w-full flex-wrap gap-3">
            <Button
              variant="cta"
              size="lg"
              href="/inscription"
              icon={<ArrowRight className="size-4" aria-hidden="true" />}
            >
              {t.primary}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/inscription"
              className="!border-green-accent !text-green-accent hover:!bg-green-accent/5"
              icon={<PlayCircle className="size-[18px]" aria-hidden="true" />}
              iconPosition="left"
            >
              {t.secondary}
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#6b8ab0]">
            {t.points.map((point) => (
              <span key={point} className="flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-green-accent" aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
