"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, Clock, CreditCard, Loader2, Sparkles } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { SkeletonPanel } from "@/components/dashboard/ui/Skeleton";
import { ProgressBar } from "@/components/dashboard/ui/ProgressBar";
import { useAuth } from "@/context/AuthContext";
import { usePlan } from "@/context/PlanContext";
import { apiStartCheckout, ApiError } from "@/lib/api/client";
import type { BillingPeriod, BillingSubscription, PaidPlanTier } from "@/lib/api/types";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

const PAID_PLANS: PaidPlanTier[] = ["PRO", "BUSINESS"];
const TIER_RANK = { FREE: 0, PRO: 1, BUSINESS: 2 } as const;
/** Pays proposés au paiement Mobile Money (Chariow les déduit aussi de l'IP). */
const COUNTRIES = ["CM", "CI", "SN", "GA", "CG", "CD", "TD", "CF", "BJ", "TG", "BF", "ML", "NE", "GN", "FR"];
const DAY = 24 * 3600 * 1000;
const RETURN_POLL_MS = 4000;
const RETURN_TIMEOUT_MS = 90_000;

type ReturnState = "pending" | "success" | "timeout";

/** Nouvel achat arrivé depuis l'ouverture de la page (ou juste avant le retour de Chariow). */
function hasRecentPurchase(subscription: BillingSubscription, since: number) {
  return subscription.history.some((p) => p.status === "ACTIVE" && new Date(p.createdAt).getTime() >= since);
}

function UsageRow({ label, used, max, unlimited }: { label: string; used: number; max: number | null; unlimited: string }) {
  const full = max !== null && used >= max;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-dash-body">{label}</span>
        <span className={`font-semibold ${full ? "text-amber-600" : "text-dash-heading"}`}>
          {used} / {max === null ? unlimited : max}
        </span>
      </div>
      <ProgressBar
        className="mt-1.5"
        value={max === null ? 0 : (used / Math.max(max, 1)) * 100}
        barClassName={full ? "bg-amber-500" : "bg-green-accent-dark"}
      />
    </div>
  );
}

export function BillingClient({ returning }: { returning: boolean }) {
  const t = useT("dashAccount").billing;
  const dash = useT("dash");
  const f = useFormat();
  const { user } = useAuth();
  const { subscription, refresh } = usePlan();
  const isAdmin = user?.role === "ADMIN";
  // Instant d'ouverture : sert aux jours d'essai restants et à reconnaître
  // l'achat qui vient d'être payé au retour de Chariow.
  const [openedAt] = useState(() => Date.now());
  const [loadFailed, setLoadFailed] = useState(false);
  const [period, setPeriod] = useState<BillingPeriod>("MONTHLY");
  const [selected, setSelected] = useState<PaidPlanTier | null>(null);
  const [returnState, setReturnState] = useState<ReturnState | null>(returning ? "pending" : null);

  // Chargement propre à la page : le contexte peut dater de plusieurs minutes.
  useEffect(() => {
    refresh().then((result) => {
      if (!result) setLoadFailed(true);
    });
  }, [refresh]);

  // Retour de Chariow : l'offre n'est accordée qu'à la réception du Pulse de
  // vente, quelques secondes après le paiement. On interroge jusqu'à le voir.
  useEffect(() => {
    if (returnState !== "pending") return;
    // Achat payé jusqu'à 15 minutes avant le retour (temps passé sur la page de paiement).
    const since = openedAt - 15 * 60 * 1000;
    const timer = setInterval(() => {
      refresh().then((result) => {
        if (result && hasRecentPurchase(result, since)) setReturnState("success");
        else if (Date.now() - openedAt > RETURN_TIMEOUT_MS) setReturnState("timeout");
      });
    }, RETURN_POLL_MS);
    return () => clearInterval(timer);
  }, [returnState, openedAt, refresh]);

  const formatDate = (iso: string) => f.date(iso, { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <TopBar title={dash.titles.billing} />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-4 py-6 sm:px-8">
          {returnState && <ReturnBanner state={returnState} plan={subscription?.plan ?? "PRO"} />}

          {!subscription ? (
            loadFailed ? (
              <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{t.loadError}</p>
            ) : (
              <SkeletonPanel lines={4} label={t.loading} />
            )
          ) : (
            <>
              <section className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
                <div className="rounded-2xl border border-border bg-white p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">{t.current}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="text-3xl font-bold text-dash-heading">{subscription.plan}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        subscription.source === "FREE"
                          ? "bg-slate-100 text-dash-muted"
                          : subscription.source === "TRIAL"
                            ? "bg-blue-500/10 text-blue-600"
                            : "bg-green-accent-dark/10 text-green-700"
                      }`}
                    >
                      {t.sources[subscription.source]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-dash-body">
                    {subscription.source === "PAID" && subscription.expiresAt
                      ? fill(t.paidUntil, { date: formatDate(subscription.expiresAt) })
                      : subscription.source === "TRIAL" && subscription.trialEndsAt
                        ? fill(t.trialUntil, {
                            days: Math.max(1, Math.ceil((new Date(subscription.trialEndsAt).getTime() - openedAt) / DAY)),
                            date: formatDate(subscription.trialEndsAt),
                          })
                        : t.freeText}
                  </p>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">{t.usageTitle}</p>
                  <UsageRow
                    label={t.usage.campaigns}
                    used={subscription.usage.activeCampaigns}
                    max={subscription.limits.maxActiveCampaigns}
                    unlimited={t.unlimited}
                  />
                  <UsageRow
                    label={t.usage.members}
                    used={subscription.usage.members}
                    max={subscription.limits.maxMembers}
                    unlimited={t.unlimited}
                  />
                  <UsageRow
                    label={t.usage.copilot}
                    used={subscription.usage.copilotMessagesToday}
                    max={subscription.limits.copilotDailyMessages}
                    unlimited={t.unlimited}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-dash-heading">{t.plansTitle}</h2>
                  <div className="flex rounded-full bg-slate-100 p-1" role="group" aria-label={t.plansTitle}>
                    {(["MONTHLY", "YEARLY"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={period === value}
                        onClick={() => setPeriod(value)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                          period === value ? "bg-white text-dash-heading shadow-sm" : "text-dash-muted"
                        }`}
                      >
                        {value === "MONTHLY" ? t.monthly : t.yearly}
                        {value === "YEARLY" && (
                          <span className="ml-1.5 text-[10px] font-bold text-green-700">{t.yearlyHint}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {PAID_PLANS.map((plan) => {
                    const isCurrent = subscription.source === "PAID" && subscription.plan === plan;
                    const isLower = subscription.source === "PAID" && TIER_RANK[plan] < TIER_RANK[subscription.plan];
                    return (
                      <div
                        key={plan}
                        className={`flex flex-col rounded-2xl border p-5 ${
                          selected === plan ? "border-green-accent-dark ring-2 ring-green-accent-dark/20" : "border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-lg font-bold text-dash-heading">{plan}</span>
                          {isCurrent && (
                            <span className="rounded-full bg-green-accent-dark/10 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                              {t.currentPlan}
                            </span>
                          )}
                        </div>
                        <p className="mt-2">
                          <span className="text-2xl font-bold text-dash-heading">{t.prices[plan][period]}</span>{" "}
                          <span className="text-xs text-dash-muted">{period === "MONTHLY" ? t.perMonth : t.perYear}</span>
                        </p>
                        <ul className="mt-4 flex flex-1 flex-col gap-2">
                          {t.features[plan].map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm text-dash-body">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          disabled={!isAdmin || !subscription.billingEnabled || isLower}
                          onClick={() => setSelected(plan)}
                          className="mt-5 rounded-full bg-green-accent-dark px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                        >
                          {isCurrent ? t.extend : fill(t.choose, { plan })}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {!subscription.billingEnabled ? (
                  <p className="mt-4 text-xs text-dash-muted">{t.unavailable}</p>
                ) : !isAdmin ? (
                  <p className="mt-4 text-xs text-dash-muted">{t.adminOnly}</p>
                ) : (
                  selected && (
                    <CheckoutForm
                      key={`${selected}-${period}`}
                      plan={selected}
                      period={period}
                      onCancel={() => setSelected(null)}
                      onCompleted={() => {
                        setSelected(null);
                        setReturnState("pending");
                      }}
                    />
                  )
                )}
              </section>

              <History subscription={subscription} />
            </>
          )}
        </div>
      </main>
    </>
  );
}

function ReturnBanner({ state, plan }: { state: ReturnState; plan: string }) {
  const t = useT("dashAccount").billing;
  const styles = {
    pending: "border-blue-500/20 bg-blue-50 text-blue-700",
    success: "border-green-600/20 bg-green-50 text-green-700",
    timeout: "border-amber-500/30 bg-amber-50 text-amber-800",
  }[state];
  const Icon = state === "pending" ? Loader2 : state === "success" ? Sparkles : Clock;
  return (
    <div role="status" className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${styles}`}>
      <Icon className={`size-4 shrink-0 ${state === "pending" ? "animate-spin" : ""}`} aria-hidden="true" />
      {state === "pending" ? t.returnPending : state === "success" ? fill(t.returnSuccess, { plan }) : t.returnTimeout}
    </div>
  );
}

function CheckoutForm({
  plan,
  period,
  onCancel,
  onCompleted,
}: {
  plan: PaidPlanTier;
  period: BillingPeriod;
  onCancel: () => void;
  /** Vente conclue sans page de paiement : l'offre arrive par le Pulse, comme au retour de Chariow. */
  onCompleted: () => void;
}) {
  const t = useT("dashAccount").billing;
  const f = useFormat();
  const [country, setCountry] = useState("CM");
  const [phone, setPhone] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const amount = t.prices[plan][period];
  const countryNames = useMemo(() => new Intl.DisplayNames([f.locale], { type: "region" }), [f.locale]);
  const digits = phone.replace(/\D/g, "");
  const valid = digits.length >= 6 && digits.length <= 15;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!valid) {
      setError(t.phoneInvalid);
      return;
    }
    setSubmitting(true);
    setError(null);
    const code = discountCode.trim();
    apiStartCheckout({
      plan,
      period,
      phone: { number: digits, countryCode: country },
      ...(code && { discountCode: code }),
    }).then(
      (result) => {
        if (result.checkoutUrl) window.location.assign(result.checkoutUrl);
        else onCompleted();
      },
      (err: unknown) => {
        if (err instanceof ApiError && err.code === "DISCOUNT_INVALID") setError(t.discountInvalid);
        else setError(err instanceof ApiError && err.status !== 502 && err.status !== 503 ? err.message : t.checkoutError);
        setSubmitting(false);
      }
    );
  }

  return (
    <form onSubmit={submit} className="mt-5 rounded-2xl border border-border-light bg-slate-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-dash-heading">
          <CreditCard className="size-4" aria-hidden="true" />
          {t.payTitle}
        </h3>
        <span className="text-sm font-semibold text-dash-body">
          {fill(t.paySummary, { plan, period: t.periods[period], amount })}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[180px_1fr]">
        <label className="flex flex-col gap-1 text-xs font-semibold text-dash-muted">
          {t.country}
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-dash-heading outline-none focus:border-green-accent-dark"
          >
            {COUNTRIES.map((code) => (
              <option key={code} value={code}>
                {countryNames.of(code) ?? code}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-dash-muted">
          {t.phone}
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="6XXXXXXXX"
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-dash-heading outline-none focus:border-green-accent-dark"
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-dash-muted">{t.phoneHint}</p>
      <label className="mt-3 flex max-w-xs flex-col gap-1 text-xs font-semibold text-dash-muted">
        {t.discountCode}
        <input
          type="text"
          value={discountCode}
          onChange={(event) => setDiscountCode(event.target.value)}
          maxLength={100}
         
          spellCheck={false}
          placeholder={t.discountPlaceholder}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-dash-heading outline-none focus:border-green-accent-dark"
        />
      </label>
      <p className="mt-1 text-xs text-dash-muted">{t.discountHint}</p>
      <p className="mt-1 text-xs text-dash-muted">{t.stacking}</p>
      {error && <p className="mt-3 text-xs font-medium text-red-600">{error}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 rounded-full bg-green-accent-dark px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {submitting ? t.redirecting : fill(t.pay, { amount })}
        </button>
        <button type="button" onClick={onCancel} className="px-3 py-2.5 text-sm font-semibold text-dash-muted">
          {t.cancel}
        </button>
      </div>
    </form>
  );
}

function History({ subscription }: { subscription: BillingSubscription }) {
  const t = useT("dashAccount").billing;
  const f = useFormat();
  const short = (iso: string) => f.date(iso, { day: "numeric", month: "short", year: "numeric" });

  return (
    <section className="rounded-2xl border border-border bg-white p-6">
      <h2 className="text-base font-semibold text-dash-heading">{t.historyTitle}</h2>
      {subscription.history.length === 0 ? (
        <p className="mt-3 text-sm text-dash-muted">{t.historyEmpty}</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-[0.3px] text-dash-muted">
                <th className="py-2 pr-4 font-semibold">{t.historyHeaders.date}</th>
                <th className="py-2 pr-4 font-semibold">{t.historyHeaders.plan}</th>
                <th className="py-2 pr-4 font-semibold">{t.historyHeaders.validity}</th>
                <th className="py-2 pr-4 font-semibold">{t.historyHeaders.amount}</th>
                <th className="py-2 font-semibold">{t.historyHeaders.status}</th>
              </tr>
            </thead>
            <tbody>
              {subscription.history.map((purchase) => (
                <tr key={purchase.id} className="border-b border-border-light last:border-0">
                  <td className="py-2.5 pr-4 text-dash-body">{short(purchase.createdAt)}</td>
                  <td className="py-2.5 pr-4 font-semibold text-dash-heading">
                    {purchase.plan} · {t.periods[purchase.period]}
                  </td>
                  <td className="py-2.5 pr-4 text-dash-body">
                    {fill(t.validity, { start: short(purchase.startsAt), end: short(purchase.expiresAt) })}
                  </td>
                  <td className="py-2.5 pr-4 text-dash-body">{purchase.amount ?? "—"}</td>
                  <td className="py-2.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        purchase.status === "ACTIVE" ? "bg-green-accent-dark/10 text-green-700" : "bg-red-50 text-red-600"
                      }`}
                    >
                      {t.statuses[purchase.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
