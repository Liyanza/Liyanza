import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { getMessages } from "@/i18n/server";

export async function ChallengesSection() {
  const t = (await getMessages("about")).challenges;
  const challenges = t.items.map((item, i) => ({ ...item, number: String(i + 1).padStart(2, "0") }));

  return (
    <section className="border-t border-[#e4e4e7] bg-[#fafafa] py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-gray-text">
            {t.text}
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {challenges.map((item) => (
            <div
              key={item.number}
              data-reveal-item
              className="flex gap-5 rounded-[5px] border border-[#e4e4e7] bg-white p-7"
            >
              <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full border border-green-accent-dark/20 bg-green-accent-dark/10">
                <span className="text-xs font-black tracking-wide text-green-accent-dark">
                  {item.number}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-text">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-[5px] bg-[#e7ebf2]/40 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-base font-extrabold text-orange-500">
              {t.bannerTitle}
            </p>
            <p className="mt-1 text-sm text-black/45">
              {t.bannerText}
            </p>
          </div>
          <Link
            href="/fonctionnalites"
            className="flex shrink-0 items-center gap-2 rounded-full bg-green-accent-dark px-6 py-3 text-sm font-bold text-white transition hover:brightness-105"
          >
            {t.bannerCta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
