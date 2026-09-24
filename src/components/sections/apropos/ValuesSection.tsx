import { Eye, Target, Users, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { getMessages } from "@/i18n/server";

/** Icônes des valeurs, dans l'ordre de about.values.items. */
const valueIcons = [Eye, Zap, Target, Users];

export async function ValuesSection() {
  const t = (await getMessages("about")).values;
  const values = t.items.map((item, i) => ({ ...item, icon: valueIcons[i] }));

  return (
    <section className="border-t border-[#e4e4e7] bg-white py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            {t.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} data-reveal-item className="rounded-[5px] border border-[#e4e4e7] p-7">
              <div className="flex size-10 items-center justify-center rounded-full border border-green-accent-dark/20 bg-green-accent/10">
                <value.icon className="size-5 text-green-accent-dark" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-base font-bold text-black">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-text">
                {value.description}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
