"use client";

import { useEffect, useState } from "react";
import { Building2, Calendar, Mail, Phone, ShieldCheck, User as UserIcon } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { apiGetProfile, requestPasswordReset, ApiError } from "@/lib/api/client";
import { ROLE_LABELS, type UserProfile } from "@/lib/api/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function ProfilClient() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [resetState, setResetState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    apiGetProfile().then(
      (result) => {
        setProfile(result);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : "Impossible de charger votre profil.");
        setLoading(false);
      }
    );
  }, []);

  function handlePasswordReset() {
    if (!profile) return;
    setResetState("sending");
    requestPasswordReset(profile.email).then(
      () => setResetState("sent"),
      () => setResetState("error")
    );
  }

  return (
    <>
      <TopBar title="Profil" />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[720px] flex-col gap-6 px-8 py-6">
          {loading ? (
            <p className="text-sm text-dash-muted">Chargement...</p>
          ) : loadError ? (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{loadError}</p>
          ) : profile ? (
            <>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-6">
                <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-green-accent-dark/10 text-xl font-bold text-green-accent-dark">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </span>
                <div>
                  <h1 className="text-lg font-bold text-dash-heading">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-500">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                    {ROLE_LABELS[profile.role]}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="text-sm font-semibold text-dash-heading">Informations du compte</h2>
                <dl className="mt-4 flex flex-col divide-y divide-border-light">
                  {[
                    { icon: Mail, label: "Email", value: profile.email },
                    { icon: Phone, label: "Téléphone", value: profile.phone || "—" },
                    { icon: UserIcon, label: "Rôle", value: ROLE_LABELS[profile.role] },
                    { icon: Building2, label: "Entreprise", value: profile.companyId ? "Rattaché" : "Aucune" },
                    { icon: Calendar, label: "Membre depuis", value: formatDate(profile.createdAt) },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                      <dt className="flex items-center gap-2 text-sm text-dash-muted">
                        <row.icon className="size-4" aria-hidden="true" />
                        {row.label}
                      </dt>
                      <dd className="text-sm font-semibold text-dash-heading">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="text-sm font-semibold text-dash-heading">Sécurité</h2>
                <p className="mt-1 text-xs text-dash-muted">
                  Aucune modification du profil n&apos;est disponible depuis l&apos;application pour le moment.
                  Pour changer de mot de passe, un lien de réinitialisation vous sera envoyé par email.
                </p>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={resetState === "sending" || resetState === "sent"}
                  className="mt-4 rounded-full bg-green-accent px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {resetState === "sending"
                    ? "Envoi..."
                    : resetState === "sent"
                      ? "Email envoyé"
                      : "Changer mon mot de passe"}
                </button>
                {resetState === "error" && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    L&apos;envoi a échoué, réessayez plus tard.
                  </p>
                )}
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
