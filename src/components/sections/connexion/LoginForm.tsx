"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { Checkbox } from "@/components/auth/Checkbox";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { OrDivider } from "@/components/auth/OrDivider";
import { apiLogin, ApiError } from "@/lib/api/client";
import { useT } from "@/i18n/client";

export function LoginForm() {
  const t = useT("auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await apiLogin(email, password);
      router.push("/dashboard");
    } catch (error) {
      setFormError(error instanceof ApiError ? error.message : t.common.genericError);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-3xl font-extrabold text-black">{t.login.title}</h2>
        <p className="text-sm text-[#71717a]">
          {t.login.noAccount}{" "}
          <Link href="/inscription" className="font-semibold text-green-600">
            {t.login.createAccount}
          </Link>
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <SocialButtons />
        <OrDivider />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

          <FormField
            id="password"
            label={t.common.password}
            type={showPassword ? "text" : "password"}
            placeholder={t.login.passwordPlaceholder}
            icon={<Lock className="size-4" aria-hidden="true" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
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

          <div className="flex items-center justify-between">
            <Checkbox checked={remember} onChange={setRemember}>
              {t.login.remember}
            </Checkbox>
            <Link
              href="/mot-de-passe-oublie"
              className="text-xs font-semibold text-green-600"
            >
              {t.login.forgot}
            </Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-green-600 py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <>
                {t.common.login}
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6 border-t border-[#f4f4f5] pt-6">
        <p className="text-center text-xs leading-relaxed text-[#a1a1aa]">
          {t.login.legalStart}{" "}
          <Link href="/conditions-utilisation" className="font-semibold text-black underline">
            {t.common.terms}
          </Link>{" "}
          {t.login.legalAnd}{" "}
          <Link href="/politique-confidentialite" className="font-semibold text-black underline">
            {t.common.privacy}
          </Link>
          .
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-black"
        >
          <ArrowLeft className="size-3.5 text-green-accent" aria-hidden="true" />
          {t.shell.backHome}
        </Link>
      </div>
    </div>
  );
}
