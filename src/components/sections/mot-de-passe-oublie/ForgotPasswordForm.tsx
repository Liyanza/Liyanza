"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { requestPasswordReset } from "@/lib/api/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (sent) {
    return (
      <div>
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-accent-dark">
            <CheckCircle2 className="size-7 text-white" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-2xl font-extrabold text-black">Email envoyé !</h2>
          <p className="mt-2 text-sm text-[#71717a]">
            Un lien de réinitialisation a été envoyé à
          </p>
          <div className="mt-4 w-full rounded-md border border-[#e4e4e7] bg-[#fafafa] px-4 py-2.5">
            <p className="text-center text-sm font-semibold text-black">{email}</p>
          </div>
        </div>

        <div className="mt-6 border border-[#e4e4e7] bg-[#fafafa] p-5">
          <p className="text-xs font-bold tracking-wide text-[#71717a]">
            Nouveau mot de passe (aperçu)
          </p>
          <div className="mt-3">
            <label className="text-xs font-semibold text-[#3f3f46]">
              Nouveau mot de passe
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-md border border-[#e4e4e7] bg-white px-3 py-3 opacity-60">
              <Lock className="size-4 text-[#a1a1aa]" aria-hidden="true" />
              <span className="text-sm text-[#a1a1aa]">Minimum 8 caractères</span>
            </div>
          </div>
          <button
            type="button"
            disabled
            className="mt-4 w-full cursor-not-allowed rounded-full bg-[#e4e4e7] py-3 text-sm font-bold text-white"
          >
            Réinitialiser et se connecter
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 text-xs text-[#71717a]">
          <span className="flex items-center gap-2">
            <ShieldAlert className="size-3.5 shrink-0 text-orange-500" aria-hidden="true" />
            Vérifiez vos spams si vous ne trouvez pas l&apos;email.
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 shrink-0 text-green-accent-dark" aria-hidden="true" />
            Le lien expire dans 24 heures.
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 shrink-0 text-green-accent-dark" aria-hidden="true" />
            Ne partagez jamais ce lien avec quelqu&apos;un d&apos;autre.
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => setSent(false)}
            className="font-medium text-[#71717a] transition hover:text-black"
          >
            ← Renvoyer l&apos;email
          </button>
          <span className="text-[#e4e4e7]">|</span>
          <Link href="/connexion" className="font-semibold text-green-600">
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/connexion"
        className="flex items-center gap-1.5 text-sm font-medium text-[#71717a] transition hover:text-black"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        Retour à la connexion
      </Link>

      <h2 className="mt-8 text-3xl font-extrabold text-black">Mot de passe oublié ?</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#71717a]">
        Saisissez votre adresse email. Nous vous enverrons un lien pour
        réinitialiser votre mot de passe.
      </p>

      <form
        className="mt-8 flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!email || submitting) return;
          setSubmitting(true);
          // requestPasswordReset() est un stub : voir sa définition dans
          // src/lib/api/client.ts (POST /auth/forgot-password absent côté
          // backend à ce jour).
          await requestPasswordReset(email);
          setSubmitting(false);
          setSent(true);
        }}
      >
        <FormField
          id="email"
          label="Adresse email"
          type="email"
          placeholder="votre@email.com"
          icon={<Mail className="size-4" aria-hidden="true" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 flex items-center justify-center gap-2 rounded-full bg-green-600 py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Recevoir le lien de réinitialisation
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>

        <div className="mt-2 flex items-start gap-3 border border-[#e4e4e7] bg-[#fafafa] p-4">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-orange-500" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-[#71717a]">
            Pour des raisons de sécurité, nous ne confirmons pas si
            l&apos;adresse email est associée à un compte existant.
          </p>
        </div>
      </form>

      <p className="mt-8 border-t border-[#f4f4f5] pt-6 text-center text-sm text-[#71717a]">
        Vous vous souvenez de votre mot de passe ?{" "}
        <Link href="/connexion" className="font-semibold text-green-600">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
