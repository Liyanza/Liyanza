"use client";

import { useEffect } from "react";
import { Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { isPlanLimitError, type ApiError } from "@/lib/api/client";
import { usePlan } from "@/context/PlanContext";

type LimitFeature = "campaigns" | "members" | "copilot" | "aiAdvanced";

interface PlanLimitDetails {
  feature?: LimitFeature;
  requiredPlan?: "PRO" | "BUSINESS";
  limit?: number | null;
}

/** Détails du 403 PLAN_LIMIT, conservés par ApiError dans `details`. */
function detailsOf(error: ApiError): PlanLimitDetails {
  return (error.details ?? {}) as PlanLimitDetails;
}

/** Texte localisé d'un 403 PLAN_LIMIT (le message du backend n'est pas affiché). */
export function usePlanLimitMessage() {
  const t = useT("dashAccount").billing.limit;
  return (error: ApiError) => {
    const { feature, limit } = detailsOf(error);
    const template = feature && feature in t ? t[feature] : t.generic;
    return fill(template, { limit: limit ?? "" });
  };
}

/**
 * Encadré affiché quand le backend refuse une action pour cause d'offre
 * (403 PLAN_LIMIT) : explique la limite et mène à la page Abonnement.
 * Rend `null` pour toute autre erreur, que l'appelant affiche comme avant.
 */
export function PlanLimitNotice({ error, className = "" }: { error: unknown; className?: string }) {
  const t = useT("dashAccount").billing.limit;
  const message = usePlanLimitMessage();
  if (!isPlanLimitError(error)) return null;
  const plan = detailsOf(error).requiredPlan ?? "PRO";

  return (
    <div
      role="alert"
      className={`flex flex-wrap items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-50 px-4 py-3 ${className}`}
    >
      <Lock className="size-4 shrink-0 text-amber-600" aria-hidden="true" />
      <p className="min-w-0 flex-1 text-sm font-medium text-amber-800">{message(error)}</p>
      <Link
        href="/dashboard/abonnement"
        className="rounded-full bg-green-accent-dark px-4 py-1.5 text-xs font-semibold text-white"
      >
        {fill(t.upgrade, { plan })}
      </Link>
    </div>
  );
}

/**
 * Avertit dès l'ouverture de l'assistant de campagne que l'offre gratuite a
 * atteint sa limite de campagnes en cours, plutôt qu'au dernier clic.
 */
export function CampaignQuotaNotice({ className = "" }: { className?: string }) {
  const { subscription, refresh } = usePlan();
  const t = useT("dashAccount").billing.limit;
  // Le compte de campagnes a pu changer depuis le chargement du dashboard.
  useEffect(() => {
    void refresh();
  }, [refresh]);
  const max = subscription?.limits.maxActiveCampaigns ?? null;
  if (!subscription || max === null || subscription.usage.activeCampaigns < max) return null;

  return (
    <div
      role="status"
      className={`flex flex-wrap items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-50 px-4 py-3 ${className}`}
    >
      <Lock className="size-4 shrink-0 text-amber-600" aria-hidden="true" />
      <p className="min-w-0 flex-1 text-sm font-medium text-amber-800">{fill(t.campaigns, { limit: max })}</p>
      <Link
        href="/dashboard/abonnement"
        className="rounded-full bg-green-accent-dark px-4 py-1.5 text-xs font-semibold text-white"
      >
        {fill(t.upgrade, { plan: "PRO" })}
      </Link>
    </div>
  );
}

/** Onglet réservé aux offres payantes : remplace son contenu sur l'offre gratuite. */
export function LockedFeature() {
  const t = useT("dashAccount").billing.locked;
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-10 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-amber-50">
        <Lock className="size-5 text-amber-600" aria-hidden="true" />
      </span>
      <p className="text-sm font-semibold text-dash-heading">{t.title}</p>
      <p className="max-w-md text-xs text-dash-muted">{t.text}</p>
      <Link
        href="/dashboard/abonnement"
        className="mt-1 rounded-full bg-green-accent-dark px-5 py-2 text-xs font-semibold text-white"
      >
        {t.cta}
      </Link>
    </div>
  );
}
