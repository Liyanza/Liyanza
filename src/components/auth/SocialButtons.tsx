"use client";

import { useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { loginWithProvider, ApiError } from "@/lib/api/client";
import { useT } from "@/i18n/client";

export function SocialButtons() {
  const t = useT("auth");
  const [pending, setPending] = useState<"google" | "facebook" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick(provider: "google" | "facebook") {
    setError(null);
    setPending(provider);
    try {
      // Navigation plein écran vers le fournisseur — ne se résout qu'en cas
      // d'échec (la redirection réussie quitte la page avant le retour).
      await loginWithProvider(provider);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t.social.startError);
      setPending(null);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleClick("google")}
          disabled={pending !== null}
          className="flex items-center justify-center gap-2.5 rounded-full border border-[#e4e4e7] bg-white py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending === "google" ? (
            <Loader2 className="size-[18px] animate-spin" aria-hidden="true" />
          ) : (
            <FcGoogle className="size-[18px]" aria-hidden="true" />
          )}
          Google
        </button>
        <button
          type="button"
          onClick={() => handleClick("facebook")}
          disabled={pending !== null}
          className="flex items-center justify-center gap-2.5 rounded-full border border-[#e4e4e7] bg-white py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending === "facebook" ? (
            <Loader2 className="size-[18px] animate-spin" aria-hidden="true" />
          ) : (
            <FaFacebook className="size-[18px] text-[#1877f2]" aria-hidden="true" />
          )}
          Facebook
        </button>
      </div>
      {error && <p className="mt-2 text-center text-xs text-red-500">{error}</p>}
    </div>
  );
}
