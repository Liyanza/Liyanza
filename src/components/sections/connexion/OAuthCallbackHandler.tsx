"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import { AlertTriangle, Loader2 } from "lucide-react";
import { exchangeOAuthCode, ApiError } from "@/lib/api/client";
import { useT } from "@/i18n/client";


export function OAuthCallbackHandler() {
  const tAuth = useT("auth");
  const t = tAuth.oauth;
  const params = useSearchParams();
  const router = useRouter();
  const [exchangeError, setExchangeError] = useState<string | null>(null);

  const status = params.get("status");
  const code = params.get("code");

  // Dérivé directement des paramètres d'URL (pas un effet) : rien à
  // échanger dans ces cas, inutile de passer par un état.
  const staticError =
    status === "error"
      ? (t.errors[params.get("reason") ?? ""] ?? t.failed)
      : status !== "success" || !code
        ? t.invalidLink
        : null;

  useEffect(() => {
    if (staticError || !code) return;

    // Ce code d'échange est à usage unique côté serveur : cet effet ne doit
    // s'exécuter qu'une fois, jamais être relancé (d'où l'absence de `code`
    // dans les dépendances au-delà du montage initial — il ne change pas
    // pour un même chargement de page).
    exchangeOAuthCode(code).then(
      () => router.push("/dashboard"),
      (err: unknown) => {
        setExchangeError(err instanceof ApiError ? err.message : t.failed);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticError]);

  const error = staticError ?? exchangeError;

  if (error) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="size-7 text-red-500" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-black">{t.errorTitle}</h2>
        <p className="mt-2 text-sm text-[#71717a]">{error}</p>
        <Link href="/connexion" className="mt-6 font-semibold text-green-600">
          {tAuth.common.backToLogin}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Loader2 className="size-8 animate-spin text-green-accent-dark" aria-hidden="true" />
      <p className="mt-4 text-sm text-[#71717a]">{t.loading}</p>
    </div>
  );
}
