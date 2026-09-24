import { CircleCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Formules et cartes de prix, partagées par l'accueil et /tarifs pour que
 * l'utilisateur retrouve exactement la même présentation d'une page à l'autre.
 * Modèle de référence : la section tarifs de l'accueil.
 */

interface Plan {
  tier: string;
  tagline: string;
  price: string;
  priceNote?: string;
  cta: string;
  featured?: boolean;
  items: string[];
}

const plans: Plan[] = [
  {
    tier: "FREE",
    tagline: "Pour découvrir KIYANZA",
    price: "Gratuit",
    cta: "Commencer gratuitement",
    items: [
      "Gestion de campagnes",
      "Dashboard",
      "Suivi des performances",
      "Rapports de base",
      "Accès limité à l'IA",
    ],
  },
  {
    tier: "PRO",
    tagline: "Pour les équipes marketing",
    price: "XX XXX FCFA/mois",
    priceNote: "par mois",
    cta: "Commencer avec PRO",
    featured: true,
    items: [
      "Tout Free inclus",
      "Scénarios IA",
      "Recommandations IA avancées",
      "Monitoring avancé",
      "Rapports avancés",
      "Multi-campagnes",
      "Analyse des performances",
    ],
  },
  {
    tier: "BUSINESS",
    tagline: "Pour les entreprises avancées",
    price: "XX XXX FCFA/mois",
    priceNote: "par mois",
    cta: "Choisir Business",
    items: [
      "Tout PRO inclus",
      "Collaboration d'équipe",
      "Gestion des accès",
      "Analyse approfondie",
      "Reporting avancé",
      "Monitoring avancé",
    ],
  },
  {
    tier: "ENTERPRISE",
    tagline: "Pour les besoins spécifiques",
    price: "Sur devis",
    cta: "Contacter l'équipe",
    items: [
      "Solution personnalisée",
      "Accompagnement dédié",
      "Gestion avancée des équipes",
      "Support personnalisé",
      "Fonctionnalités sur mesure",
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
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
          Recommandé
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

        <button
          type="button"
          className={`mt-6 w-full rounded-full py-3 text-sm font-bold transition ${
            plan.featured
              ? "bg-green-600 text-white hover:bg-green-accent-dark"
              : "border border-green-600 text-green-600 hover:bg-green-600/5"
          }`}
        >
          {plan.cta}
        </button>

        <div className="mt-6 flex-1">
          <p
            className={`text-[9px] font-bold uppercase tracking-[0.1em] ${
              plan.featured ? "text-black/40" : "text-black/25"
            }`}
          >
            Inclus
          </p>
          <ul className="mt-4 space-y-4">
            {plan.items.map((item) => (
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

export function PricingPlanGrid({ className = "" }: { className?: string }) {
  return (
    <Reveal stagger className={`grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {plans.map((plan) => (
        <PlanCard key={plan.tier} plan={plan} />
      ))}
    </Reveal>
  );
}
