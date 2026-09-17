"use client";

import { useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { loginWithProvider } from "@/lib/api/client";

/**
 * La connexion sociale (login) n'existe pas côté backend : le module auth
 * n'expose que register/login/refresh/logout/me (voir loginWithProvider,
 * clairement marqué TODO). Le flow OAuth Meta existant sert uniquement à
 * lier un compte Facebook/Instagram à une campagne, pas à s'authentifier.
 * Les boutons restent visibles (cohérence de la maquette) mais informent
 * clairement au clic plutôt que d'échouer silencieusement.
 */
export function SocialButtons() {
  const [notice, setNotice] = useState<string | null>(null);

  async function handleClick(provider: "google" | "facebook") {
    try {
      await loginWithProvider(provider);
    } catch {
      setNotice("La connexion via ce fournisseur arrive bientôt.");
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleClick("google")}
          className="flex items-center justify-center gap-2.5 rounded-full border border-[#e4e4e7] bg-white py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa]"
        >
          <FcGoogle className="size-[18px]" aria-hidden="true" />
          Google
        </button>
        <button
          type="button"
          onClick={() => handleClick("facebook")}
          className="flex items-center justify-center gap-2.5 rounded-full border border-[#e4e4e7] bg-white py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa]"
        >
          <FaFacebook className="size-[18px] text-[#1877f2]" aria-hidden="true" />
          Facebook
        </button>
      </div>
      {notice && <p className="mt-2 text-center text-xs text-[#a1a1aa]">{notice}</p>}
    </div>
  );
}
