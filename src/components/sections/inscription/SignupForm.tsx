"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Circle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { Checkbox } from "@/components/auth/Checkbox";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { OrDivider } from "@/components/auth/OrDivider";

type Strength = "" | "Faible" | "Moyen" | "Fort" | "Très fort";

const strengthStyles: Record<Exclude<Strength, "">, string> = {
  Faible: "text-red-500",
  Moyen: "text-orange-500",
  Fort: "text-blue-500",
  "Très fort": "text-green-accent-dark",
};

function getStrength(password: string): Strength {
  if (!password) return "";
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const count = [hasLength, hasUpper, hasNumber].filter(Boolean).length;

  if (count <= 1) return "Faible";
  if (count === 2) return "Moyen";
  return password.length >= 12 ? "Très fort" : "Fort";
}

export function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const strength = useMemo(() => getStrength(password), [password]);

  const confirmError =
    confirmPassword.length > 0 && confirmPassword !== password
      ? "Les mots de passe ne correspondent pas"
      : undefined;

  const canSubmit =
    firstName &&
    lastName &&
    email &&
    password &&
    confirmPassword === password &&
    acceptTerms;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-3xl font-extrabold text-black">Créer un compte</h2>
        <p className="text-sm text-[#71717a]">
          Déjà inscrit ?{" "}
          <Link href="/connexion" className="font-semibold text-green-600">
            Se connecter
          </Link>
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <SocialButtons />
        <OrDivider />

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="firstName"
              label="Prénom"
              placeholder="Prénom"
              icon={<User className="size-4" aria-hidden="true" />}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
            />
            <FormField
              id="lastName"
              label="Nom"
              placeholder="Nom de famille"
              icon={<User className="size-4" aria-hidden="true" />}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
          </div>

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

          <div>
            <FormField
              id="password"
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 caractères"
              icon={<Lock className="size-4" aria-hidden="true" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
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
                    {strength}
                  </span>
                )}
                {[
                  { met: hasLength, label: "8+ caractères" },
                  { met: hasUpper, label: "Majuscule" },
                  { met: hasNumber, label: "Chiffre" },
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
            label="Confirmer le mot de passe"
            type={showConfirm ? "text" : "password"}
            placeholder="Répétez le mot de passe"
            icon={<Lock className="size-4" aria-hidden="true" />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            error={confirmError}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Masquer le mot de passe" : "Afficher le mot de passe"}
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
            J&apos;accepte les Conditions d&apos;utilisation et la Politique
            de confidentialité de KIYANZA.
          </Checkbox>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-green-600 py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-[#e4e4e7] disabled:text-white"
          >
            Créer mon compte gratuitement
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#71717a]">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-green-accent-dark" aria-hidden="true" />
              Gratuit sans carte
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-green-accent-dark" aria-hidden="true" />
              Annulez à tout moment
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
