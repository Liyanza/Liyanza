"use client";

import type { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ROLE_LABELS, type Role } from "@/lib/api/types";
import { SkeletonKpis, SkeletonPanel } from "@/components/dashboard/ui/Skeleton";

/**
 * Masque une section du dashboard aux rôles non autorisés. L'autorisation
 * réelle reste toujours appliquée par le backend (403) sur chaque appel —
 * ce composant n'est qu'une couche d'UX qui évite d'afficher des actions
 * vouées à échouer.
 */
export function RoleGate({ allow, children }: { allow: Role[]; children: ReactNode }) {
  const { user, status } = useAuth();

  if (status === "loading") {
    return (
      <div className="flex flex-1 flex-col gap-6 px-8 py-6">
        <SkeletonKpis label="Chargement…" />
        <SkeletonPanel lines={4} />
      </div>
    );
  }

  if (!user || !allow.includes(user.role)) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-12 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
          <ShieldAlert className="size-6" aria-hidden="true" />
        </span>
        <p className="text-base font-semibold text-dash-heading">Accès réservé</p>
        <p className="max-w-sm text-sm text-dash-muted">
          Cette section est réservée aux rôles {allow.map((role) => ROLE_LABELS[role]).join(", ")}.
          Contactez un administrateur de votre entreprise si vous pensez qu&apos;il s&apos;agit
          d&apos;une erreur.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
