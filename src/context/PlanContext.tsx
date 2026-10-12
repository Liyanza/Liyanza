"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiGetSubscription } from "@/lib/api/client";
import type { BillingSubscription } from "@/lib/api/types";

interface PlanContextValue {
  /** null tant que l'abonnement n'est pas chargé (ou sans entreprise). */
  subscription: BillingSubscription | null;
  refresh: () => Promise<BillingSubscription | null>;
}

const PlanContext = createContext<PlanContextValue | null>(null);

/**
 * Offre en cours de l'entreprise, chargée une fois pour tout le dashboard.
 * Elle ne sert qu'à l'affichage (badge, onglets verrouillés, invitations à
 * passer à l'offre supérieure) : les limites réelles sont appliquées par le
 * backend, qui répond 403 PLAN_LIMIT.
 */
export function PlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const companyId = user?.companyId ?? null;
  const [subscription, setSubscription] = useState<BillingSubscription | null>(null);

  const refresh = useCallback(() => {
    return apiGetSubscription().then(
      (result) => {
        setSubscription(result);
        return result;
      },
      () => null
    );
  }, []);

  useEffect(() => {
    if (companyId) void refresh();
  }, [companyId, refresh]);

  return (
    <PlanContext.Provider value={{ subscription: companyId ? subscription : null, refresh }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within PlanProvider");
  return context;
}
