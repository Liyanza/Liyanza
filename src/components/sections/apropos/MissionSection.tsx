import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

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
    <section className="bg-white py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              Notre mission
            </span>
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
                  <Check className="size-4 shrink-0 text-orange-500" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#3f3f46]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border-light bg-white p-8 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.07)]">
            <Image
              src="/kiyanza-logo-mark.svg"
              alt="Logo KIYANZA"
              width={85}
              height={56}
              className="h-10 w-auto"
            />
            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border-light bg-slate-50 p-4"
                >
                  <p className="text-xs text-gray-text">{stat.label}</p>
                  <p className="mt-2 text-2xl font-black text-navy">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-border-light bg-slate-50 p-4">
              <p className="text-xs text-gray-text">Performance hebdomadaire</p>
              <div className="mt-3 flex h-16 items-end gap-2">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-blue-500"
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
