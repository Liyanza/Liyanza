"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { apiLogout, apiMe } from "@/lib/api/client";
import type { AuthUser } from "@/lib/api/types";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Scopé au layout du dashboard (pas au layout racine) : les pages publiques
 * (connexion/inscription) n'ont pas besoin de connaître l'utilisateur
 * courant, elles appellent directement apiLogin/apiRegister et redirigent.
 */
const CREATE_COMPANY_PATH = "/dashboard/entreprise/creer";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const router = useRouter();
  const pathname = usePathname();

  const load = useCallback(() => {
    return apiMe().then(
      (me) => {
        setUser(me);
        setStatus("authenticated");
      },
      () => {
        setUser(null);
        setStatus("unauthenticated");
      }
    );
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    // Le garde-fou de src/proxy.ts n'inspecte que la présence d'un cookie ;
    // si les deux tokens sont en réalité invalides/expirés, /auth/me le
    // révèle ici et on renvoie proprement vers la connexion.
    if (status === "unauthenticated") {
      router.push("/connexion");
      return;
    }
    // Un compte fraîchement inscrit n'appartient à aucune entreprise
    // (`AuthService.register()`) : toutes les fonctionnalités du dashboard
    // sont scopées à une entreprise (campagnes, comptes sociaux, etc.), donc
    // on force ce détour tant qu'il n'en a pas créé/rejoint une.
    if (status === "authenticated" && user) {
      if (!user.companyId && pathname !== CREATE_COMPANY_PATH) {
        router.push(CREATE_COMPANY_PATH);
      } else if (user.companyId && pathname === CREATE_COMPANY_PATH) {
        router.push("/dashboard");
      }
    }
  }, [status, user, pathname, router]);

  const logout = useCallback(async () => {
    await apiLogout().catch(() => null);
    setUser(null);
    setStatus("unauthenticated");
    router.push("/connexion");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, status, logout, refresh: load }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
