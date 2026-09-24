import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { LiveMockup } from "@/components/motion/LiveMockup";
import { CountUp } from "@/components/motion/CountUp";
import { getMessages } from "@/i18n/server";

const barHeights = [17, 26, 20, 34, 29, 41, 43];

export async function MissionSection() {
  const t = (await getMessages("about")).mission;

  return (
    <section className="bg-green-accent-dark/[0.08] py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-black sm:text-5xl">
              {t.title}
            </h2>
            {t.paragraphs.map((paragraph, i) => (
              <p key={i} className={`${i === 0 ? "mt-6" : "mt-5"} text-base leading-relaxed text-gray-text`}>
                {paragraph}
              </p>
            ))}
            <ul className="mt-8 space-y-3">
              {t.commitments.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#3f3f46]">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <LiveMockup className="rounded-[5px] border border-black/20 bg-white p-8 shadow-[0_2px_6px_0_rgba(255,102,0,0.25)]">
            <Image
              src="/kiyanza-logo-mark.svg"
              alt={t.logoAlt}
              width={85}
              height={56}
              className="h-10 w-auto"
            />
            <div className="mt-6 grid grid-cols-2 gap-3">
              {t.stats.map((stat) => (
                <div
                  key={stat.label}
                  data-live="item"
                  className="rounded-[5px] border border-black/[0.07] bg-white p-3"
                >
                  <p className="text-[10px] text-black/30">{stat.label}</p>
                  <p className="mt-2 text-xl font-black text-black">
                    <CountUp value={stat.value} />
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-black/[0.06] bg-black/[0.03] p-3">
              <p className="text-[10px] text-black/30">{t.weekly}</p>
              <div className="mt-3 flex h-16 items-end gap-1.5">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    data-live="grow"
                    className="flex-1 bg-blue-500"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </LiveMockup>
        </div>
      </Container>
    </section>
  );
}
