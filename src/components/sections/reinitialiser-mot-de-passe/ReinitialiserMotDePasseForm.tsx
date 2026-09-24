"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { resetPassword, ApiError } from "@/lib/api/client";
import { useT } from "@/i18n/client";

export function ReinitialiserMotDePasseForm() {
  const t = useT("auth");
  const params = useSearchParams();
  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="size-7 text-red-500" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-black">{t.reset.invalidTitle}</h2>
        <p className="mt-2 text-sm text-[#71717a]">
          {t.reset.invalidText}
        </p>
        <Link href="/mot-de-passe-oublie" className="mt-6 font-semibold text-green-600">
          {t.reset.newLink}
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-accent-dark">
          <CheckCircle2 className="size-7 text-white" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-black">{t.reset.doneTitle}</h2>
        <p className="mt-2 text-sm text-[#71717a]">
          {t.reset.doneText}
        </p>
        <Link
          href="/connexion"
          className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green-600 px-8 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
        >
          {t.common.login}
        </Link>
      </div>
    );
  }

  const confirmError =
    confirmPassword.length > 0 && confirmPassword !== newPassword
      ? t.common.mismatch
      : undefined;
  const canSubmit = newPassword.length >= 8 && confirmPassword === newPassword;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit || submitting) return;
    setFormError(null);
    setSubmitting(true);
    try {
      await resetPassword(token as string, newPassword);
      setDone(true);
    } catch (error) {
      setFormError(error instanceof ApiError ? error.message : t.common.genericError);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-black">{t.reset.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#71717a]">
        {t.reset.text}
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        {formError && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            {formError}
          </p>
        )}

        <FormField
          id="newPassword"
          label={t.reset.newPassword}
          type={showPassword ? "text" : "password"}
          placeholder={t.common.minChars}
          icon={<Lock className="size-4" aria-hidden="true" />}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? t.common.hidePassword : t.common.showPassword}
              className="text-[#a1a1aa] transition hover:text-[#3f3f46]"
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          }
        />

        <FormField
          id="confirmPassword"
          label={t.common.confirmPassword}
          type={showPassword ? "text" : "password"}
          placeholder={t.common.confirmPlaceholder}
          icon={<Lock className="size-4" aria-hidden="true" />}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          error={confirmError}
        />

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-green-600 py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-[#e4e4e7]"
        >
          {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : t.reset.submit}
        </button>
      </form>
    </div>
  );
}
