import { Link } from "@/i18n/navigation";
import { CircleCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { getMessages } from "@/i18n/server";
import type { Messages } from "@/i18n/dictionaries";

/**
 * Formules et cartes de prix, partagées par l'accueil et /tarifs pour que
 * l'utilisateur retrouve exactement la même présentation d'une page à l'autre.
 * Modèle de référence : la section tarifs de l'accueil.
 */

type Plan = Messages["plans"]["items"][number];

function PlanCard({ plan, labels }: { plan: Plan; labels: { recommended: string; included: string } }) {
  return (
    <div
      data-reveal-item
      className={`relative flex h-full flex-col ${
        plan.featured
          ? "border border-green-accent-dark bg-green-accent-dark/10 shadow-[0_2px_4px_0_rgba(0,0,0,0.12)]"
          : "border border-green-accent/10 bg-white"
      }`}
    >
      {plan.featured && (
        <p className="absolute left-1/2 top-[-16px] -translate-x-1/2 bg-blue-500 px-4 py-1.5 text-[10px] font-black uppercase leading-[15px] text-white">
          {labels.recommended}
        </p>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="border-b border-black/[0.08] pb-6">
          <p
            className={`text-[10px] font-black uppercase tracking-[0.1em] ${
              plan.featured ? "text-blue-500" : "text-black/40"
            }`}
          >
            {plan.tier}
          </p>
          <p className="mt-1 text-sm text-black/40">{plan.tagline}</p>
          <div className="mt-5">
            <p
              className={`font-bold tracking-[-0.02em] text-black ${
                plan.priceNote ? "text-xl leading-5" : "text-2xl leading-6"
              }`}
            >
              {plan.price}
            </p>
            {plan.priceNote && (
              <p className="mt-1 text-[10px] leading-[15px] text-black/30">{plan.priceNote}</p>
            )}
          </div>
        </div>

        <Link
          href={plan.contact ? "mailto:contact@kiyanza.com" : "/inscription"}
          className={`mt-6 block w-full rounded-full py-3 text-center text-sm font-bold transition ${
            plan.featured
              ? "bg-green-600 text-white hover:bg-green-accent-dark"
              : "border border-green-600 text-green-600 hover:bg-green-600/5"
          }`}
        >
          {plan.cta}
        </Link>

        <div className="mt-6 flex-1">
          <p
            className={`text-[9px] font-bold uppercase tracking-[0.1em] ${
              plan.featured ? "text-black/40" : "text-black/25"
            }`}
          >
            {labels.included}
          </p>
          <ul className="mt-4 space-y-4">
            {plan.features.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
                <span className="text-sm leading-5 text-black/60">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function PricingPlanGrid({ className = "" }: { className?: string }) {
  const t = await getMessages("plans");

  return (
    <Reveal stagger className={`grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {t.items.map((plan) => (
        <PlanCard key={plan.tier} plan={plan} labels={t} />
      ))}
    </Reveal>
  );
}
