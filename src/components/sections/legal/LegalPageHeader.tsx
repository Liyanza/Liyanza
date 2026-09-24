import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { getMessages } from "@/i18n/server";
import { fill } from "@/i18n/format";

export async function LegalPageHeader({
  eyebrow,
  title,
  intro,
  lastUpdated,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
}) {
  const t = await getMessages("legal");

  return (
    <section className="bg-green-accent-dark/[0.08] py-20">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow variant="pill" tone="orange">
            {eyebrow}
          </SectionEyebrow>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-black sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-text">
            {intro}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-black/40">
            {fill(t.lastUpdated, { date: lastUpdated })}
          </p>
        </div>
      </Container>
    </section>
  );
}
