"use client";

import { useCallback, useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Link2,
  Loader2,
  Minus,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  ApiError,
  apiGetActualPerformance,
  apiLinkMetaCampaign,
  apiListMetaCampaigns,
  apiUnlinkMetaCampaign,
} from "@/lib/api/client";
import type {
  ActualMetricComparison,
  ActualMetricStatus,
  ActualPerformanceComparison,
  ActualPerformanceResponse,
  CampaignAlert,
  MetaAdCampaign,
} from "@/lib/api/types";
import { useAuth } from "@/context/AuthContext";
import { useSocialAccounts } from "@/components/social-accounts/useSocialAccounts";
import { SkeletonPanel } from "@/components/dashboard/ui/Skeleton";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

type Messages = ReturnType<typeof useT<"dashCampaigns">>["results"]["actual"];
type Format = ReturnType<typeof useFormat>;

type LoadState =
  | { kind: "loading" }
  | { kind: "reconnect"; expired: boolean }
  | { kind: "error"; message: string }
  | { kind: "ready"; data: ActualPerformanceResponse };

const STATUS_STYLE: Record<ActualMetricStatus, { className: string; Icon: typeof TrendingUp }> = {
  ahead: { className: "bg-[#ecfdf5] text-[#059669]", Icon: TrendingUp },
  on_track: { className: "bg-blue-50 text-blue-700", Icon: CheckCircle2 },
  behind: { className: "bg-orange-500/10 text-orange-600", Icon: TrendingDown },
  unknown: { className: "bg-slate-100 text-slate-500", Icon: Minus },
};

function toLoadState(error: unknown, fallback: string): LoadState {
  if (error instanceof ApiError && error.code === "META_ADS_NOT_CONNECTED") return { kind: "reconnect", expired: false };
  if (error instanceof ApiError && error.code === "META_ADS_TOKEN_EXPIRED") return { kind: "reconnect", expired: true };
  return { kind: "error", message: error instanceof ApiError ? error.message : fallback };
}

/**
 * « Prévu vs réel » : la campagne Facebook Ads reliée à cette campagne, ses
 * résultats réels et leur écart avec la simulation (backend :
 * GET /campagnes/:id/performance-reelle).
 */
export function ActualPerformanceSection({ campaignId }: { campaignId: string }) {
  const t = useT("dashCampaigns").results.actual;
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [refreshing, setRefreshing] = useState(false);
  const [picking, setPicking] = useState(false);

  const load = useCallback(
    (refresh = false) =>
      apiGetActualPerformance(campaignId, refresh).then(
        (data) => setState({ kind: "ready", data }),
        (error) => setState(toLoadState(error, t.unavailable))
      ),
    [campaignId, t.unavailable]
  );

  useEffect(() => {
    void load();
  }, [load]);

  async function refresh() {
    setRefreshing(true);
    await load(true);
    setRefreshing(false);
  }

  async function unlink() {
    await apiUnlinkMetaCampaign(campaignId).catch(() => undefined);
    setPicking(false);
    await load();
  }

  const data = state.kind === "ready" ? state.data : null;

  return (
    <section
      aria-label={t.title}
      className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1877f2]/10">
            <FaFacebook className="size-4 text-[#1877f2]" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-dash-heading">{t.title}</h2>
            <p className="mt-0.5 text-xs text-dash-muted">
              {data?.linked ? (data.link.metaCampaignName ?? data.link.metaCampaignId) : t.subtitle}
            </p>
          </div>
        </div>
        {data?.linked && !picking && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={refresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-dash-body transition hover:bg-dash-canvas disabled:opacity-60"
            >
              <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
              {t.refresh}
            </button>
            <button
              type="button"
              onClick={() => setPicking(true)}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-dash-body transition hover:bg-dash-canvas"
            >
              {t.change}
            </button>
          </div>
        )}
      </div>

      <div className="mt-5">
        {state.kind === "loading" && <SkeletonPanel lines={3} />}
        {state.kind === "reconnect" && <Reconnect expired={state.expired} onReconnected={() => load(true)} />}
        {state.kind === "error" && (
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-orange-500/5 p-4 text-xs text-orange-700">
            <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
            <span className="flex-1">{state.message}</span>
            <button type="button" onClick={() => load(true)} className="font-semibold underline">
              {t.retry}
            </button>
          </div>
        )}
        {data && (!data.linked || picking) && (
          <CampaignPicker
            campaignId={campaignId}
            onLinked={(result) => {
              setPicking(false);
              setState({ kind: "ready", data: result });
            }}
            onCancel={data.linked ? () => setPicking(false) : undefined}
            onUnlink={data.linked ? unlink : undefined}
            onAccessError={(error) => setState(toLoadState(error, t.unavailable))}
          />
        )}
        {data?.linked && !picking && (
          <div className="flex flex-col gap-5">
            {data.alerts && data.alerts.length > 0 && <Alerts alerts={data.alerts} />}
            <Comparison comparison={data.comparison} fetchedAt={data.fetchedAt} />
          </div>
        )}
      </div>
    </section>
  );
}

/** Alertes ouvertes : ce qui dérive, les chiffres, et quoi faire. */
function Alerts({ alerts }: { alerts: CampaignAlert[] }) {
  const t = useT("dashCampaigns").results.actual;
  const f = useFormat();
  // Les coûts par clic sont toujours convertis en FCFA par le backend.
  const value = (key: string, n: number) =>
    key.endsWith("Cpc") ? f.money(n) : f.number(n, { maximumFractionDigits: 2 });

  return (
    <div>
      <h3 className="text-sm font-semibold text-dash-heading">{t.alertsTitle}</h3>
      <ul className="mt-2 flex flex-col gap-2">
        {alerts.map((alert) => {
          const text = t.alerts[alert.type];
          const critical = alert.severity === "CRITICAL";
          const Icon = critical ? AlertOctagon : AlertTriangle;
          const values = Object.fromEntries(Object.entries(alert.data).map(([k, n]) => [k, value(k, n)]));
          return (
            <li
              key={alert.id}
              className={`rounded-lg border p-4 ${critical ? "border-red-200 bg-red-50/60" : "border-orange-200 bg-orange-500/5"}`}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={`mt-0.5 size-4 shrink-0 ${critical ? "text-red-600" : "text-orange-500"}`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-dash-heading">
                    {text.title}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        critical ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {t.severity[alert.severity]}
                    </span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-dash-body">{fill(text.message, values)}</p>
                  <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-dash-heading">
                    <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-green-accent-dark" aria-hidden="true" />
                    <span>
                      <span className="font-semibold">{t.recommended} </span>
                      {text.action}
                    </span>
                  </p>
                  <p className="mt-1.5 text-[10px] text-dash-muted">
                    {fill(t.alertSince, { date: f.date(alert.createdAt, { day: "numeric", month: "long" }) })}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Reconnect({ expired, onReconnected }: { expired: boolean; onReconnected: () => void }) {
  const t = useT("dashCampaigns").results.actual;
  const account = useT("dashAccount").social;
  const { user } = useAuth();
  const canConnect = user?.role === "ADMIN" || user?.role === "MARKETING_MANAGER";
  const { connect, connectingPlatform, connectError } = useSocialAccounts(account);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 p-4">
      <div className="min-w-0 flex-1">
        <p className="text-xs leading-relaxed text-dash-body">{expired ? t.expired : t.notConnected}</p>
        {!canConnect && <p className="mt-1 text-xs font-medium text-dash-muted">{t.askManager}</p>}
        {connectError && (
          <p role="alert" className="mt-1 text-xs font-medium text-red-600">
            {connectError}
          </p>
        )}
      </div>
      {canConnect && (
        <button
          type="button"
          onClick={() => void connect("FACEBOOK", onReconnected)}
          disabled={connectingPlatform !== null}
          className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-dash-heading transition hover:bg-dash-canvas disabled:opacity-60"
        >
          {connectingPlatform ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <FaFacebook className="size-3.5 text-[#1877f2]" aria-hidden="true" />
          )}
          {connectingPlatform ? t.reconnecting : t.reconnect}
        </button>
      )}
    </div>
  );
}

function CampaignPicker({
  campaignId,
  onLinked,
  onCancel,
  onUnlink,
  onAccessError,
}: {
  campaignId: string;
  onLinked: (result: ActualPerformanceResponse) => void;
  onCancel?: () => void;
  onUnlink?: () => void;
  onAccessError: (error: unknown) => void;
}) {
  const t = useT("dashCampaigns").results.actual;
  const [open, setOpen] = useState(Boolean(onCancel));
  const [campaigns, setCampaigns] = useState<MetaAdCampaign[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || campaigns) return;
    apiListMetaCampaigns(campaignId).then(setCampaigns, onAccessError);
  }, [open, campaigns, campaignId, onAccessError]);

  async function link() {
    if (!selected) return;
    setLinking(true);
    setError(null);
    try {
      onLinked(await apiLinkMetaCampaign(campaignId, selected));
    } catch (e) {
      if (e instanceof ApiError && e.code) onAccessError(e);
      else setError(e instanceof ApiError ? e.message : t.unavailable);
    } finally {
      setLinking(false);
    }
  }

  if (!open) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 p-4">
        <p className="min-w-0 flex-1 text-xs leading-relaxed text-dash-body">{t.linkIntro}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex shrink-0 items-center gap-2 rounded-full bg-[#1a3460] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#142a4f]"
        >
          <Link2 className="size-3.5" aria-hidden="true" />
          {t.chooseCampaign}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {!campaigns ? (
        <p className="flex items-center gap-2 text-xs text-dash-muted">
          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          {t.loadingCampaigns}
        </p>
      ) : campaigns.length === 0 ? (
        <p className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-dash-body">{t.noMetaCampaigns}</p>
      ) : (
        <fieldset className="flex max-h-72 flex-col divide-y divide-border-light overflow-y-auto rounded-lg border border-border">
          <legend className="sr-only">{t.chooseCampaign}</legend>
          {campaigns.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-dash-canvas">
              <input
                type="radio"
                name="meta-campaign"
                value={c.id}
                checked={selected === c.id}
                onChange={() => setSelected(c.id)}
                className="size-4 accent-[#1a3460]"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-dash-heading">{c.name}</span>
                <span className="block truncate text-[11px] text-dash-muted">
                  {c.adAccountName} · {fill(t.statusLabel, { status: c.status })}
                </span>
              </span>
            </label>
          ))}
        </fieldset>
      )}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-end gap-2">
        {onUnlink && (
          <button type="button" onClick={onUnlink} className="mr-auto text-xs font-semibold text-red-600 hover:underline">
            {t.unlink}
          </button>
        )}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 py-2 text-xs font-semibold text-dash-body hover:bg-dash-canvas"
          >
            {t.cancel}
          </button>
        )}
        {campaigns && campaigns.length > 0 && (
          <button
            type="button"
            onClick={link}
            disabled={!selected || linking}
            className="flex items-center gap-2 rounded-full bg-[#1a3460] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#142a4f] disabled:opacity-50"
          >
            {linking && <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />}
            {linking ? t.linking : t.link}
          </button>
        )}
      </div>
    </div>
  );
}

function formatMetric(metric: ActualMetricComparison, value: number | null, f: Format) {
  if (value === null) return "—";
  switch (metric.key) {
    case "ctr":
      return `${f.number(value, { maximumFractionDigits: 2 })} %`;
    case "roas":
      return `${f.number(value, { maximumFractionDigits: 2 })}x`;
    case "cpc":
    case "cpa":
      return f.money(Math.round(value));
    default:
      return f.number(Math.round(value));
  }
}

function conversionLabel(action: string | null, t: Messages) {
  if (!action) return null;
  if (action.includes("purchase")) return t.conversionTypes.purchase;
  if (action.includes("lead")) return t.conversionTypes.lead;
  if (action.includes("messaging")) return t.conversionTypes.messaging;
  return action;
}

function Comparison({ comparison, fetchedAt }: { comparison: ActualPerformanceComparison; fetchedAt: string }) {
  const t = useT("dashCampaigns").results.actual;
  const f = useFormat();
  const spentLabel =
    comparison.spendXaf !== null
      ? f.money(comparison.spendXaf)
      : `${f.number(comparison.spend, { maximumFractionDigits: 2 })} ${comparison.currency}`;
  const noDelivery = comparison.spend === 0 && comparison.daily.length === 0;
  const conversionType = conversionLabel(comparison.conversionAction, t);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <Progress
          label={t.budgetSpent}
          value={comparison.spendProgress}
          detail={fill(t.spentOf, { spent: spentLabel, planned: f.money(comparison.plannedBudget) })}
        />
        <Progress label={t.timeElapsed} value={comparison.timeProgress} />
      </div>

      {(noDelivery || comparison.tooEarly || comparison.spendXaf === null) && (
        <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-xs text-dash-body">
          {noDelivery
            ? t.noDelivery
            : comparison.spendXaf === null
              ? fill(t.currencyNote, { currency: comparison.currency })
              : t.tooEarly}
        </p>
      )}

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {comparison.metrics.map((metric) => {
          const { className, Icon } = STATUS_STYLE[metric.status];
          const reference =
            metric.expected === null
              ? t.noPrediction
              : fill(metric.kind === "volume" ? t.expectedToDate : t.predicted, {
                  value: formatMetric(metric, metric.expected, f),
                });
          return (
            <li key={metric.key} className="flex flex-col gap-1.5 rounded-lg border border-border-light p-3">
              <p className="text-[11px] text-dash-muted">{t.metrics[metric.key]}</p>
              <p className="text-lg font-bold text-dash-heading">{formatMetric(metric, metric.actual, f)}</p>
              <p className="text-[11px] text-dash-body">{reference}</p>
              <span
                className={`mt-auto inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${className}`}
              >
                <Icon className="size-3" aria-hidden="true" />
                {t.status[metric.status]}
              </span>
            </li>
          );
        })}
      </ul>

      {comparison.daily.length > 1 && <DailySpendChart daily={comparison.daily} currency={comparison.currency} />}

      <p className="text-[10px] text-gray-text-light">
        {conversionType && `${fill(t.conversionsCounted, { action: conversionType })} · `}
        {fill(t.updatedAt, { time: f.date(fetchedAt, { hour: "2-digit", minute: "2-digit" }) })}
      </p>
    </div>
  );
}

function Progress({ label, value, detail }: { label: string; value: number | null; detail?: string }) {
  const f = useFormat();
  const percent = value === null ? null : Math.round(value * 100);
  return (
    <div className="rounded-lg border border-border-light p-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[11px] text-dash-muted">{label}</p>
        <p className="text-sm font-bold text-dash-heading">{percent === null ? "—" : `${f.number(percent)} %`}</p>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent ?? undefined}
      >
        <div className="h-full rounded-full bg-[#1a3460]" style={{ width: `${percent ?? 0}%` }} />
      </div>
      {detail && <p className="mt-1.5 text-[11px] text-dash-body">{detail}</p>}
    </div>
  );
}

/** Dépense quotidienne (une seule série : pas de légende, une infobulle par barre). */
function DailySpendChart({ daily, currency }: { daily: ActualPerformanceComparison["daily"]; currency: string }) {
  const t = useT("dashCampaigns").results.actual;
  const f = useFormat();
  const max = Math.max(...daily.map((d) => d.spend), 1);
  const amount = (value: number) =>
    currency === "XAF" ? f.money(Math.round(value)) : `${f.number(value, { maximumFractionDigits: 2 })} ${currency}`;

  return (
    <div>
      <p className="text-xs font-semibold text-dash-heading">{t.dailyTitle}</p>
      <div className="mt-3 flex h-24 items-end gap-0.5">
        {daily.map((day) => {
          const label = fill(t.dayTitle, {
            date: f.date(day.date, { day: "numeric", month: "short" }),
            amount: amount(day.spend),
          });
          return (
            <div key={day.date} className="group flex h-full min-w-0 max-w-10 flex-1 items-end" title={label} aria-label={label}>
              <div
                className="w-full rounded-t bg-blue-500 transition-colors group-hover:bg-blue-700"
                style={{ height: `${Math.max(2, (day.spend / max) * 100)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-dash-muted">
        <span>{f.date(daily[0].date, { day: "numeric", month: "short" })}</span>
        <span>{f.date(daily[daily.length - 1].date, { day: "numeric", month: "short" })}</span>
      </div>
    </div>
  );
}
