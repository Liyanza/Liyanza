import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

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
      data-reveal-item
      className={`relative flex h-full flex-col bg-white p-6 ${
        plan.featured
          ? "border-2 border-green-accent-dark shadow-[0_2px_12px_0_rgba(255,102,0,0.25)]"
          : "border border-green-accent/10"
      }`}
    >
      {plan.featured && (
        <span className="absolute inset-x-0 -top-4 flex h-8 items-center justify-center bg-blue-500 text-[10px] font-black uppercase tracking-wide text-white">
          Recommandé
        </span>
      )}

      <div className="border-b border-black/[0.08] pb-6">
        <p className={`text-xs font-black uppercase tracking-wide ${plan.tierColor}`}>
          {plan.tier}
        </p>
        <p className="mt-1.5 text-sm text-black/40">{plan.tagline}</p>
        <div className="mt-5">
          <p
            className={`font-black tracking-tight text-black ${
              plan.priceNote ? "text-xl" : "text-2xl"
            }`}
          >
            {plan.price}
          </p>
          {plan.priceNote && (
            <p className="mt-0.5 text-xs text-black/30">{plan.priceNote}</p>
          )}
        </div>
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

      <div className="mt-6 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-wide text-black/25">
          Inclus
        </p>
        <ul className="mt-3 space-y-3">
          {plan.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                className={`mt-0.5 size-3.5 shrink-0 ${
                  plan.featured ? "text-green-accent" : "text-black/30"
                }`}
                aria-hidden="true"
              />
              <span className="text-sm text-black/60">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PricingCards() {
  return (
    <section className="bg-green-600/10 pb-20">
      <Container>
        <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.tier} plan={plan} />
          ))}
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-black/[0.08] pt-8">
          {[
            "Aucune carte pour FREE",
            "Changement de formule à tout moment",
            "Annulation sans engagement",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-black/35">
              <Check className="size-3.5 text-green-accent" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
