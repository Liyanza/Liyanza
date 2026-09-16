import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";

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
      className={`flex h-full flex-col overflow-hidden rounded-[5px] bg-white ${
        plan.featured
          ? "border-2 border-green-accent-dark shadow-[0_12px_24px_-8px_rgba(0,168,70,0.25)]"
          : "border border-zinc-200"
      }`}
    >
      {plan.featured && (
        <p className="bg-green-600 py-1.5 text-center text-[10px] font-black uppercase tracking-wide text-white">
          Recommandé
        </p>
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-black uppercase tracking-wide text-zinc-400">
          {plan.tier}
        </p>
        <p className="mt-1 text-sm text-zinc-500">{plan.tagline}</p>
        <div className="mt-4">
          <p className="text-2xl font-black tracking-tight text-zinc-950">{plan.price}</p>
          {plan.priceNote && (
            <p className="mt-0.5 text-xs text-zinc-400">{plan.priceNote}</p>
          )}
        </div>

        <button
          type="button"
          className={`mt-6 w-full rounded-full py-3 text-sm font-bold transition ${
            plan.featured
              ? "bg-green-600 text-white hover:bg-green-accent-dark"
              : "border-2 border-green-600 text-green-600 hover:bg-green-600/5"
          }`}
        >
          {plan.cta}
        </button>

        <div className="mt-6 flex-1 border-t border-zinc-100 pt-6">
          <p className="text-[9px] font-bold uppercase tracking-wide text-zinc-400">
            Inclus
          </p>
          <ul className="mt-3 space-y-3">
            {plan.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check
                  className={`mt-0.5 size-3.5 shrink-0 ${
                    plan.featured ? "text-green-accent" : "text-zinc-400"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-sm text-zinc-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function LandingPricing() {
  return (
    <section id="tarifs" className="scroll-pt-20 border-y border-zinc-200 bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill" tone="orange">
            Tarifs
          </SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black leading-tight text-zinc-950 sm:text-4xl lg:text-5xl">
            Des tarifs simples et transparents
          </h2>
          <p className="mt-4 text-lg text-gray-text">
            Commencez gratuitement. Évoluez selon vos besoins.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.tier} plan={plan} />
          ))}
        </div>

        <p className="mt-10 text-center">
          <a
            href="/tarifs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-accent-dark hover:underline"
          >
            Voir tous les tarifs et comparer les formules
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </p>
      </Container>
    </section>
  );
}
