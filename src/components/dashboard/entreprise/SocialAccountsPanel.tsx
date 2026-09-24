"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Loader2, RefreshCw, ShieldAlert, Trash2, Unplug } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { useAuth } from "@/context/AuthContext";
import {
  apiListSocialAccounts,
  apiRevokeSocialAccount,
  apiStartSocialOAuth,
  ApiError,
  apiSyncSocialAccount,
} from "@/lib/api/client";
import type { SocialAccountRecord, SocialPlatform } from "@/lib/api/types";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import type { Messages } from "@/i18n/dictionaries";

const PLATFORM_LABEL: Record<SocialPlatform, string> = {
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
};

const STATUS_STYLE: Record<SocialAccountRecord["status"], string> = {
  ACTIVE: "bg-[#ecfdf5] text-[#059669]",
  EXPIRED: "bg-orange-500/10 text-orange-500",
  REVOKED: "bg-slate-100 text-slate-500",
};


function formatLastSync(value: string | null, ts: Messages["dashAccount"]["social"]) {
  if (!value) return ts.neverSynced;
  const days = Math.floor((Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return ts.syncedToday;
  if (days === 1) return ts.syncedYesterday;
  return fill(ts.syncedDaysAgo, { days });
}

// GET /social-accounts renvoie {items, total, page, limit, totalPages}
// (SocialAccountsService.findAll) — jamais un tableau brut en pratique, mais
// on reste défensif au cas où la forme paginée soit désactivée un jour.
function normalizeList(result: SocialAccountRecord[] | { items: SocialAccountRecord[] }): SocialAccountRecord[] {
  return Array.isArray(result) ? result : result.items;
}

export function SocialAccountsPanel() {
  const t = useT("dashAccount");
  const ts = t.social;
  const dash = useT("dash");
  const { user } = useAuth();
  const canManage = user?.role === "ADMIN" || user?.role === "MARKETING_MANAGER";

  const [accounts, setAccounts] = useState<SocialAccountRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [connectingPlatform, setConnectingPlatform] = useState<SocialPlatform | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const popupPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAccounts = useCallback(() => {
    return apiListSocialAccounts().then(
      (result) => {
        setAccounts(normalizeList(result));
        setLoading(false);
      },
      (error) => {
        setLoadError(error instanceof ApiError ? error.message : ts.loadError);
        setLoading(false);
      }
    );
  }, [ts]);

  const loadAccounts = useCallback(() => {
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

  async function handleConnect(platform: SocialPlatform) {
    setActionError(null);
    setConnectingPlatform(platform);
    try {
      const { authorizationUrl } = await apiStartSocialOAuth(platform);
      const popup = window.open(authorizationUrl, "_blank", "width=600,height=720");
      if (!popup) {
        setActionError(ts.popupBlocked);
        setConnectingPlatform(null);
        return;
      }
      // Le backend redirige le popup vers /social-accounts/callback (valeur
      // attendue de SOCIAL_OAUTH_MOBILE_REDIRECT_URL côté Render) à la fin du
      // flow OAuth Meta : on rafraîchit la liste dès que cette fenêtre se
      // ferme, comme demandé.
      popupPollRef.current = setInterval(() => {
        if (popup.closed) {
          if (popupPollRef.current) clearInterval(popupPollRef.current);
          setConnectingPlatform(null);
          loadAccounts();
        }
      }, 700);
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : ts.connectError);
      setConnectingPlatform(null);
    }
  }

  async function handleRevoke(id: string) {
    setActionError(null);
    setActionId(id);
    try {
      await apiRevokeSocialAccount(id);
      await loadAccounts();
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : ts.revokeError);
    } finally {
      setActionId(null);
    }
  }

  async function handleSync(id: string) {
    setActionError(null);
    setActionId(id);
    try {
      await apiSyncSocialAccount(id);
      await loadAccounts();
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : ts.syncError);
    } finally {
      setActionId(null);
    }
  }

  return (
    <>
      <TopBar title={dash.titles.company} searchPlaceholder={t.search} />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[900px] flex-col gap-6 px-8 py-8">
          <div>
            <h1 className="text-2xl font-bold text-dash-heading">{ts.title}</h1>
            <p className="mt-1 text-sm text-dash-body">
              {ts.intro}
            </p>
          </div>

          {canManage && (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleConnect("FACEBOOK")}
                disabled={connectingPlatform !== null}
                className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-dash-heading transition hover:bg-dash-canvas disabled:cursor-not-allowed disabled:opacity-60"
              >
                {connectingPlatform === "FACEBOOK" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <FaFacebook className="size-4 text-[#1877f2]" aria-hidden="true" />
                )}
                {ts.connectFacebook}
              </button>
              <button
                type="button"
                onClick={() => handleConnect("INSTAGRAM")}
                disabled={connectingPlatform !== null}
                className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-dash-heading transition hover:bg-dash-canvas disabled:cursor-not-allowed disabled:opacity-60"
              >
                {connectingPlatform === "INSTAGRAM" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <FaInstagram className="size-4 text-[#e1306c]" aria-hidden="true" />
                )}
                {ts.connectInstagram}
              </button>
            </div>
          )}

          {actionError && (
            <p role="alert" className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
              {actionError}
            </p>
          )}

          <div className="rounded-xl bg-white p-2 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            {loading ? (
              <SkeletonRows rows={3} label={ts.loading} />
            ) : loadError ? (
              <div className="flex flex-col items-center gap-2 p-8 text-center">
                <ShieldAlert className="size-6 text-orange-500" aria-hidden="true" />
                <p className="text-sm text-dash-body">{loadError}</p>
                <button
                  type="button"
                  onClick={loadAccounts}
                  className="mt-1 text-xs font-semibold text-green-600"
                >
                  {dash.common.retry}
                </button>
              </div>
            ) : accounts.length === 0 ? (
              <div className="flex flex-col items-center gap-1 p-10 text-center">
                <p className="text-sm font-semibold text-dash-heading">{ts.empty}</p>
                <p className="text-xs text-dash-muted">
                  {canManage ? ts.emptyManager : ts.emptyReader}
                </p>
              </div>
            ) : (
              <ul className="flex flex-col divide-y divide-border-light">
                {accounts.map((account) => {
                  const Icon = account.platform === "FACEBOOK" ? FaFacebook : FaInstagram;
                  const iconColor = account.platform === "FACEBOOK" ? "text-[#1877f2]" : "text-[#e1306c]";
                  const busy = actionId === account.id;
                  return (
                    <li key={account.id} className="flex items-center gap-4 p-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-dash-canvas">
                        <Icon className={`size-4 ${iconColor}`} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-dash-heading">
                          {account.externalAccountName || `${PLATFORM_LABEL[account.platform]} · ${account.externalAccountId}`}
                        </p>
                        <p className="text-xs text-dash-muted">{formatLastSync(account.lastSyncedAt, ts)}</p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[account.status]}`}
                      >
                        {ts.statuses[account.status]}
                      </span>
                      {canManage && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            aria-label={ts.resync}
                            disabled={busy}
                            onClick={() => handleSync(account.id)}
                            className="flex size-8 items-center justify-center rounded-full text-dash-muted transition hover:bg-dash-canvas hover:text-dash-heading disabled:opacity-50"
                          >
                            {busy ? (
                              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                            ) : (
                              <RefreshCw className="size-3.5" aria-hidden="true" />
                            )}
                          </button>
                          <button
                            type="button"
                            aria-label={ts.disconnect}
                            disabled={busy}
                            onClick={() => handleRevoke(account.id)}
                            className="flex size-8 items-center justify-center rounded-full text-dash-muted transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                          >
                            <Trash2 className="size-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {!canManage && (
            <p className="flex items-center gap-2 text-xs text-dash-muted">
              <Unplug className="size-3.5 shrink-0" aria-hidden="true" />
              {ts.readOnly}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
