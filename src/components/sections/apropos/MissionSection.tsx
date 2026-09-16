import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";

const commitments = [
  "Unifier vos canaux marketing dans un seul cockpit",
  "Rendre l'IA accessible sans expertise technique",
  "Transformer chaque insight en action mesurable",
];

const stats = [
  { label: "Campagnes actives", value: "12" },
  { label: "ROI moyen", value: "3.8×" },
  { label: "Budget optimisé", value: "94%" },
  { label: "Alertes IA", value: "3" },
];

const barHeights = [17, 26, 20, 34, 29, 41, 43];

export function MissionSection() {
  return (
    <section className="bg-green-accent-dark/[0.08] py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionEyebrow variant="pill" tone="orange">Notre mission</SectionEyebrow>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-black sm:text-5xl">
              Donner à chaque équipe une boussole, pas juste un tableau de
              bord
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-text">
              Chaque jour, des équipes marketing naviguent dans un océan de
              données sans visibilité claire. Elles jonglent entre plusieurs
              outils, compilent des rapports manuellement, et prennent des
              décisions budgétaires à l&apos;intuition.
            </p>
            <p className="mt-5 text-base leading-relaxed text-gray-text">
              Notre mission est de changer ça. KIYANZA centralise, analyse et
              traduit vos données en recommandations concrètes — pour que
              chaque décision soit guidée par la donnée, pas par le hasard.
            </p>
            <ul className="mt-8 space-y-3">
              {commitments.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#3f3f46]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[5px] border border-black/20 bg-white p-8 shadow-[0_2px_6px_0_rgba(255,102,0,0.25)]">
            <Image
              src="/kiyanza-logo-mark.svg"
              alt="Logo KIYANZA"
              width={85}
              height={56}
              className="h-10 w-auto"
            />
            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[5px] border border-black/[0.07] bg-white p-3"
                >
                  <p className="text-[10px] text-black/30">{stat.label}</p>
                  <p className="mt-2 text-xl font-black text-black">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-black/[0.06] bg-black/[0.03] p-3">
              <p className="text-[10px] text-black/30">Performance hebdomadaire</p>
              <div className="mt-3 flex h-16 items-end gap-1.5">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
