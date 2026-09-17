"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";

const PLATFORM_LABEL: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
};

/**
 * Page atterrie par le popup OAuth Meta après redirection backend (voir
 * social-accounts.service.ts#buildResultUrl : ?status=success|error&platform=
 * ...&reason=...). Volontairement HORS du segment /dashboard pour ne pas
 * hériter du Sidebar/TopBar — ce n'est qu'un écran de résultat transitoire
 * dans une petite fenêtre popup, qui se referme d'elle-même.
 */
export function OAuthCallbackResult() {
  const params = useSearchParams();
  const status = params.get("status");
  const platform = params.get("platform");
  const reason = params.get("reason");
  const success = status === "success";
  const platformLabel = platform ? (PLATFORM_LABEL[platform.toLowerCase()] ?? platform) : "Meta";

  useEffect(() => {
    const timer = setTimeout(() => window.close(), 2500);
    return () => clearTimeout(timer);
  }, []);

  const errorMessage =
    reason === "denied"
      ? "Vous avez annulé l'autorisation côté Meta."
      : "Une erreur est survenue pendant la connexion. Réessayez depuis la page Mon entreprise.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-dash-canvas p-8 text-center">
      {success ? (
        <CheckCircle2 className="size-10 text-green-accent-dark" aria-hidden="true" />
      ) : (
        <XCircle className="size-10 text-red-500" aria-hidden="true" />
      )}
      <p className="text-lg font-bold text-dash-heading">
        {success ? "Compte connecté !" : "Connexion impossible"}
      </p>
      <p className="max-w-sm text-sm text-dash-muted">
        {success
          ? `Votre compte ${platformLabel} est maintenant lié à votre entreprise.`
          : errorMessage}
      </p>
      <p className="text-xs text-dash-muted">Cette fenêtre va se fermer automatiquement…</p>
    </div>
  );
}
