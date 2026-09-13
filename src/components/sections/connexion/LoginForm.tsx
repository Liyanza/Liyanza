"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { Checkbox } from "@/components/auth/Checkbox";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { OrDivider } from "@/components/auth/OrDivider";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-3xl font-extrabold text-black">Connexion</h2>
        <p className="text-sm text-[#71717a]">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-semibold text-green-accent-dark">
            Créer un compte
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

          <FormField
            id="password"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            placeholder="Votre mot de passe"
            icon={<Lock className="size-4" aria-hidden="true" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
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

          <div className="flex items-center justify-between">
            <Checkbox checked={remember} onChange={setRemember}>
              Se souvenir de moi
            </Checkbox>
            <Link
              href="/mot-de-passe-oublie"
              className="text-xs font-semibold text-green-accent-dark"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-green-accent-dark py-3.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            Se connecter
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </form>
      </div>

      <p className="mt-8 border-t border-[#f4f4f5] pt-6 text-center text-xs leading-relaxed text-[#a1a1aa]">
        En vous connectant, vous acceptez nos Conditions d&apos;utilisation et
        notre Politique de confidentialité.
      </p>
    </div>
  );
}
