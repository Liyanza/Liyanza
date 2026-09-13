import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface Plan {
  tier: string;
  tierColor: string;
  tagline: string;
  price: string;
  priceNote?: string;
  cta: string;
  ctaVariant: "outline" | "solid";
  items: string[];
  featured?: boolean;
}

const plans: Plan[] = [
  {
    tier: "FREE",
    tierColor: "text-black",
    tagline: "Pour découvrir KIYANZA",
    price: "Gratuit",
    cta: "Commencer gratuitement",
    ctaVariant: "outline",
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
    tierColor: "text-blue-500",
    tagline: "Pour les équipes marketing",
    price: "XX XXX FCFA/mois",
    priceNote: "par mois",
    cta: "Commencer avec PRO",
    ctaVariant: "solid",
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
    tierColor: "text-black",
    tagline: "Pour les entreprises avancées",
    price: "XX XXX FCFA/mois",
    priceNote: "par mois",
    cta: "Choisir Business",
    ctaVariant: "outline",
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
    tierColor: "text-black",
    tagline: "Pour les besoins spécifiques",
    price: "Sur devis",
    cta: "Contacter l'équipe",
    ctaVariant: "outline",
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
      className={`relative flex h-full flex-col rounded-2xl bg-white p-6 ${
        plan.featured
          ? "border-2 border-green-accent shadow-[0_12px_24px_-8px_rgba(0,200,83,0.2)]"
          : "border border-border-light"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-4 py-1.5 text-[10px] font-black uppercase tracking-wide text-white">
          Recommandé
        </span>
      )}

      <p className={`text-xs font-black uppercase tracking-wide ${plan.tierColor}`}>
        {plan.tier}
      </p>
      <p className="mt-1.5 text-sm text-black">{plan.tagline}</p>
      <div className="mt-4">
        <p className="text-2xl font-black tracking-tight text-black">{plan.price}</p>
        {plan.priceNote && (
          <p className="mt-0.5 text-xs text-black">{plan.priceNote}</p>
        )}
      </div>

      <button
        type="button"
        className={`mt-6 w-full rounded-full py-3 text-sm font-bold transition ${
          plan.ctaVariant === "solid"
            ? "bg-green-600 text-white hover:bg-green-accent-dark"
            : "border-2 border-green-600 text-green-600 hover:bg-green-600/5"
        }`}
      >
        {plan.cta}
      </button>

      <div className="mt-6 flex-1 border-t border-border-light pt-6">
        <p className="text-[10px] font-bold uppercase tracking-wide text-black">
          Inclus
        </p>
        <ul className="mt-3 space-y-3">
          {plan.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                className={`mt-0.5 size-3.5 shrink-0 ${
                  plan.featured ? "text-green-accent" : "text-black"
                }`}
                aria-hidden="true"
              />
              <span className="text-sm text-black">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PricingCards() {
  return (
    <section className="bg-white pb-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.tier} plan={plan} />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-border-light pt-8">
          {[
            "Aucune carte pour FREE",
            "Changement de formule à tout moment",
            "Annulation sans engagement",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-black">
              <Check className="size-3.5 text-green-accent" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
