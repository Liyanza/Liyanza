"use client";

import { useMemo, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { ArrowRight, Check, Circle, Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { Checkbox } from "@/components/auth/Checkbox";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { OrDivider } from "@/components/auth/OrDivider";
import { apiLogin, apiRegister, ApiError } from "@/lib/api/client";
import { useT } from "@/i18n/client";

type Strength = "" | "weak" | "medium" | "strong" | "veryStrong";

const strengthStyles: Record<Exclude<Strength, "">, string> = {
  weak: "text-red-500",
  medium: "text-orange-500",
  strong: "text-blue-500",
  veryStrong: "text-green-accent-dark",
};

function getStrength(password: string): Strength {
  if (!password) return "";
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const count = [hasLength, hasUpper, hasNumber].filter(Boolean).length;

  if (count <= 1) return "weak";
  if (count === 2) return "medium";
  return password.length >= 12 ? "veryStrong" : "strong";
}

export function SignupForm() {
  const t = useT("auth");
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const strength = useMemo(() => getStrength(password), [password]);

  const confirmError =
    confirmPassword.length > 0 && confirmPassword !== password
      ? t.common.mismatch
      : undefined;

  const canSubmit =
    firstName &&
    lastName &&
    email &&
    phone &&
    password.length >= 8 &&
    confirmPassword === password &&
    acceptTerms;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    setFormError(null);
    setSubmitting(true);
    try {
      await apiRegister({ email, password, firstName, lastName, phone });
      // Le backend ne connecte pas automatiquement après l'inscription
      // (POST /auth/register ne renvoie pas de tokens) : on enchaîne un
      // login avec les identifiants qui viennent d'être créés pour éviter
      // à l'utilisateur de les ressaisir immédiatement.
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
        <h2 className="text-3xl font-extrabold text-black">{t.signup.title}</h2>
        <p className="text-sm text-[#71717a]">
          {t.signup.already}{" "}
          <Link href="/connexion" className="font-semibold text-green-600">
            {t.common.login}
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="firstName"
              label={t.signup.firstName}
              placeholder={t.signup.firstName}
              icon={<User className="size-4" aria-hidden="true" />}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
            />
            <FormField
              id="lastName"
              label={t.signup.lastName}
              placeholder={t.signup.lastNamePlaceholder}
              icon={<User className="size-4" aria-hidden="true" />}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
          </div>

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
            id="phone"
            label={t.signup.phone}
            type="tel"
            placeholder="+225 07 00 00 00 00"
            icon={<Phone className="size-4" aria-hidden="true" />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />

          <div>
            <FormField
              id="password"
              label={t.common.password}
              type={showPassword ? "text" : "password"}
              placeholder={t.common.minChars}
              icon={<Lock className="size-4" aria-hidden="true" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            {password.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {strength && (
                  <span className={`text-xs font-semibold ${strengthStyles[strength]}`}>
                    {t.signup.strength[strength]}
                  </span>
                )}
                {[
                  { met: hasLength, label: t.signup.rules.length },
                  { met: hasUpper, label: t.signup.rules.upper },
                  { met: hasNumber, label: t.signup.rules.number },
                ].map((c) => (
                  <span
                    key={c.label}
                    className={`flex items-center gap-1 text-xs ${
                      c.met ? "text-green-accent-dark" : "text-[#a1a1aa]"
                    }`}
                  >
                    {c.met ? (
                      <Check className="size-3" aria-hidden="true" />
                    ) : (
                      <Circle className="size-3" aria-hidden="true" />
                    )}
                    {c.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <FormField
            id="confirmPassword"
            label={t.common.confirmPassword}
            type={showConfirm ? "text" : "password"}
            placeholder={t.common.confirmPlaceholder}
            icon={<Lock className="size-4" aria-hidden="true" />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            error={confirmError}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? t.common.hidePassword : t.common.showPassword}
                className="text-[#a1a1aa] transition hover:text-[#3f3f46]"
              >
                {showConfirm ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            }
          />

          <Checkbox checked={acceptTerms} onChange={setAcceptTerms}>
            {t.signup.acceptStart}{" "}
            <Link href="/conditions-utilisation" className="font-semibold text-black underline">
              {t.common.terms}
            </Link>{" "}
            {t.signup.acceptAnd}{" "}
            <Link href="/politique-confidentialite" className="font-semibold text-black underline">
              {t.common.privacy}
            </Link>
            {t.signup.acceptEnd === "." ? "." : ` ${t.signup.acceptEnd}`}
          </Checkbox>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-green-600 py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-[#e4e4e7] disabled:text-white"
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <>
                {t.signup.submit}
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#71717a]">
            {t.signup.perks.map((perk) => (
              <span key={perk} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-green-accent-dark" aria-hidden="true" />
                {perk}
              </span>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
