"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiListSocialAccounts, apiStartSocialOAuth, ApiError } from "@/lib/api/client";
import type { SocialAccountRecord, SocialPlatform } from "@/lib/api/types";

/**
 * Plateformes Meta proposées dans l'interface. Instagram est masqué tant que
 * sa liaison n'est pas opérationnelle de bout en bout (compte pro relié à la
 * Page, permissions Meta) : le backend le gère toujours, seul l'affichage
 * est coupé.
 */
export const ENABLED_SOCIAL_PLATFORMS: readonly SocialPlatform[] = ["FACEBOOK"];

// GET /social-accounts renvoie {items, total, page, limit, totalPages}
// (SocialAccountsService.findAll) — jamais un tableau brut en pratique, mais
// on reste défensif au cas où la forme paginée soit désactivée un jour.
function normalizeList(result: SocialAccountRecord[] | { items: SocialAccountRecord[] }): SocialAccountRecord[] {
  return Array.isArray(result) ? result : result.items;
}

export type LinkState = "linked" | "expired" | "missing";

/** État de liaison d'une plateforme : le compte ACTIF le plus récent l'emporte. */
export function linkStateFor(accounts: SocialAccountRecord[], platform: SocialPlatform): {
  state: LinkState;
  account?: SocialAccountRecord;
} {
  const own = accounts.filter((a) => a.platform === platform);
  const active = own.find((a) => a.status === "ACTIVE");
  if (active) return { state: "linked", account: active };
  const expired = own.find((a) => a.status === "EXPIRED");
  if (expired) return { state: "expired", account: expired };
  return { state: "missing" };
}

interface Messages {
  loadError: string;
  popupBlocked: string;
  connectError: string;
}

/**
 * Comptes sociaux de l'entreprise + liaison Meta dans une fenêtre popup
 * (Mon entreprise, assistant de création de campagne). Le backend redirige
 * la popup vers /social-accounts/callback, qui se referme d'elle-même : la
 * liste est rechargée dès que la fenêtre est fermée.
 */
export function useSocialAccounts({ loadError: loadErrorMessage, popupBlocked, connectError: connectErrorMessage }: Messages) {
  const [accounts, setAccounts] = useState<SocialAccountRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [connectingPlatform, setConnectingPlatform] = useState<SocialPlatform | null>(null);
  const [connectError, setConnectError] = useState<string | null>(null);
  const popupPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAccounts = useCallback(() => {
    return apiListSocialAccounts().then(
      (result) => {
        setAccounts(normalizeList(result));
        setLoadError(null);
        setLoading(false);
      },
      (error) => {
        setLoadError(error instanceof ApiError ? error.message : loadErrorMessage);
        setLoading(false);
      }
    );
  }, [loadErrorMessage]);

  const reload = useCallback(() => {
    setLoading(true);
    setLoadError(null);
    return fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    void fetchAccounts();
    return () => {
      if (popupPollRef.current) clearInterval(popupPollRef.current);
    };
  }, [fetchAccounts]);

  /** `onClosed` : appelé quand la fenêtre Meta se ferme (ex. recharger une page). */
  const connect = useCallback(
    async (platform: SocialPlatform, onClosed?: () => void) => {
      setConnectError(null);
      setConnectingPlatform(platform);
      try {
        const { authorizationUrl } = await apiStartSocialOAuth(platform);
        const popup = window.open(authorizationUrl, "_blank", "width=600,height=720");
        if (!popup) {
          setConnectError(popupBlocked);
          setConnectingPlatform(null);
          return;
        }
        if (popupPollRef.current) clearInterval(popupPollRef.current);
        popupPollRef.current = setInterval(() => {
          if (popup.closed) {
            if (popupPollRef.current) clearInterval(popupPollRef.current);
            setConnectingPlatform(null);
            // Sans squelette : la liste reste affichée pendant le rechargement.
            void fetchAccounts();
            onClosed?.();
          }
        }, 700);
      } catch (error) {
        setConnectError(error instanceof ApiError ? error.message : connectErrorMessage);
        setConnectingPlatform(null);
      }
    },
    [fetchAccounts, popupBlocked, connectErrorMessage]
  );

  return { accounts, loading, loadError, reload, connect, connectingPlatform, connectError, setConnectError };
}
