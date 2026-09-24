"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Link } from "@/i18n/navigation";
import { apiAcceptInvitation, ApiError } from "@/lib/api/client";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

type State =
  | { kind: "loading" }
  | { kind: "accepted"; company: string }
  | { kind: "invalid" }
  | { kind: "other-company" };

/**
 * Ouverte depuis l'email d'invitation : l'acceptation part toute seule (un
 * clic sur le lien suffit, comme demandé). Elle passe par un POST côté
 * navigateur, jamais par le simple chargement de l'adresse : les antivirus
 * de messagerie qui « visitent » les liens ne consomment donc pas
 * l'invitation à la place de la personne.
 */
export function InvitationAccept({ token }: { token: string | null }) {
  const t = useT("invitation");
  const [state, setState] = useState<State>(token ? { kind: "loading" } : { kind: "invalid" });
  const started = useRef(false);

  useEffect(() => {
    if (!token || started.current) return;
    started.current = true;
    apiAcceptInvitation(token).then(
      (result) => setState({ kind: "accepted", company: result.companyName }),
      (error: unknown) =>
        setState(error instanceof ApiError && error.status === 409 ? { kind: "other-company" } : { kind: "invalid" })
    );
  }, [token]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-dash-canvas px-4 py-10">
      <Logo className="h-8" />
      <div className="mt-8 w-full max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        {state.kind === "loading" && (
          <div className="flex flex-col items-center gap-3 py-6 text-sm text-dash-muted">
            <Loader2 className="size-6 animate-spin" aria-hidden="true" />
            {t.loading}
          </div>
        )}

        {state.kind === "accepted" && (
          <div className="flex flex-col items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-green-accent-dark/10">
              <CheckCircle2 className="size-6 text-green-accent-dark" aria-hidden="true" />
            </span>
            <h1 className="text-lg font-bold text-dash-heading">{t.successTitle}</h1>
            <p className="text-sm text-dash-muted">{fill(t.successText, { company: state.company })}</p>
            <Link
              href="/dashboard"
              className="mt-3 rounded-full bg-green-accent px-6 py-3 text-sm font-semibold text-white"
            >
              {t.dashboard}
            </Link>
          </div>
        )}

        {(state.kind === "invalid" || state.kind === "other-company") && (
          <div className="flex flex-col items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="size-6 text-red-600" aria-hidden="true" />
            </span>
            <h1 className="text-lg font-bold text-dash-heading">
              {state.kind === "invalid" ? t.invalidTitle : t.otherCompanyTitle}
            </h1>
            <p className="text-sm text-dash-muted">
              {state.kind === "invalid" ? t.invalidText : t.otherCompanyText}
            </p>
            <Link href="/" className="mt-3 text-sm font-semibold text-green-600">
              {t.home}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
