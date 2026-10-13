"use client";

import { useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiLogout } from "@/lib/api/client";
import { useRouter } from "@/i18n/navigation";
import { useT } from "@/i18n/client";

/**
 * Bandeau des sessions de démonstration : rappelle que les données sont
 * fictives et en lecture seule, et mène à l'inscription (après avoir fermé
 * la session de démo, sinon /inscription renverrait au tableau de bord).
 */
export function DemoBanner() {
  const { user } = useAuth();
  const t = useT("dash").demo;
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  if (!user?.demo) return null;

  function signUp() {
    setLeaving(true);
    // Pas logout() du contexte : il renverrait vers /connexion.
    apiLogout()
      .catch(() => null)
      .then(() => router.push("/inscription"));
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-[#1a3460] px-4 py-2 text-center text-xs font-medium text-white">
      <span className="flex items-center gap-2">
        <Eye className="size-3.5 shrink-0" aria-hidden="true" />
        {t.banner}
      </span>
      <button
        type="button"
        onClick={signUp}
        disabled={leaving}
        className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-[#1a3460] disabled:opacity-70"
      >
        {leaving && <Loader2 className="size-3 animate-spin" aria-hidden="true" />}
        {t.cta}
      </button>
    </div>
  );
}
