"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { requestPasswordReset, ApiError } from "@/lib/api/client";
import { useT } from "@/i18n/client";

export function ForgotPasswordForm() {
  const t = useT("auth");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (sent) {
    return (
      <div>
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-accent-dark">
            <CheckCircle2 className="size-7 text-white" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-2xl font-extrabold text-black">{t.forgot.sentTitle}</h2>
          <p className="mt-2 text-sm text-[#71717a]">
            {t.forgot.sentText}
          </p>
          <div className="mt-4 w-full rounded-md border border-[#e4e4e7] bg-[#fafafa] px-4 py-2.5">
            <p className="text-center text-sm font-semibold text-black">{email}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 text-xs text-[#71717a]">
          <span className="flex items-center gap-2">
            <ShieldAlert className="size-3.5 shrink-0 text-orange-500" aria-hidden="true" />
            {t.forgot.tips[0]}
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 shrink-0 text-green-accent-dark" aria-hidden="true" />
            {t.forgot.tips[1]}
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 shrink-0 text-green-accent-dark" aria-hidden="true" />
            {t.forgot.tips[2]}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => setSent(false)}
            className="font-medium text-[#71717a] transition hover:text-black"
          >
            {t.forgot.resend}
          </button>
          <span className="text-[#e4e4e7]">|</span>
          <Link href="/connexion" className="font-semibold text-green-600">
            {t.common.backToLogin}
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
        {t.common.backToLogin}
      </Link>

      <h2 className="mt-8 text-3xl font-extrabold text-black">{t.forgot.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#71717a]">
        {t.forgot.text}
      </p>

      <form
        className="mt-8 flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!email || submitting) return;
          setFormError(null);
          setSubmitting(true);
          try {
            await requestPasswordReset(email);
            setSent(true);
          } catch (error) {
            setFormError(error instanceof ApiError ? error.message : t.common.genericError);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {formError && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            {formError}
          </p>
        )}

        <FormField
          id="email"
          label={t.common.email}
          type="email"
          placeholder={t.common.emailPlaceholder}
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
          {submitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              {t.forgot.submit}
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>

        <div className="mt-2 flex items-start gap-3 border border-[#e4e4e7] bg-[#fafafa] p-4">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-orange-500" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-[#71717a]">
            {t.forgot.privacyNote}
          </p>
        </div>
      </form>

      <p className="mt-8 border-t border-[#f4f4f5] pt-6 text-center text-sm text-[#71717a]">
        {t.forgot.remember}{" "}
        <Link href="/connexion" className="font-semibold text-green-600">
          {t.common.login}
        </Link>
      </p>
    </div>
  );
}
