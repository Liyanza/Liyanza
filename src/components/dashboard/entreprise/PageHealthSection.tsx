"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  Minus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { ApiError, apiAnalyzePageHealth, apiGetPageHealth } from "@/lib/api/client";
import type { PageHealth, PageHealthAnalysis, PageHealthKpi, PostingSlot } from "@/lib/api/types";
import { useAuth } from "@/context/AuthContext";
import { SkeletonPanel } from "@/components/dashboard/ui/Skeleton";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

type Messages = ReturnType<typeof useT<"dashAccount">>["social"]["health"];
type Format = ReturnType<typeof useFormat>;

type LoadState =
  | { kind: "loading" }
  | { kind: "reconnect" }
  | { kind: "error"; message: string }
  | { kind: "ready"; health: PageHealth; fetchedAt: string; analysis: PageHealthAnalysis | null };

const SLOT_HOURS = 3;
const SLOTS_PER_DAY = 8;

const slotRange = (slot: number, t: Messages) =>
  fill(t.slotRange, { from: slot * SLOT_HOURS, to: (slot + 1) * SLOT_HOURS });

/**
 * Santé de la Page Facebook liée : 28 derniers jours comparés aux 28
 * précédents, meilleurs moments pour publier, publications les plus
 * engageantes et bilan IA avec 3 actions (backend :
 * GET /social-accounts/:id/health).
 */
export function PageHealthSection({ accountId, onReconnect }: { accountId: string; onReconnect?: () => void }) {
  const social = useT("dashAccount").social;
  const t = social.health;
  const f = useFormat();
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    (refresh = false) =>
      apiGetPageHealth(accountId, refresh).then(
        (data) => setState({ kind: "ready", ...data }),
        (error) =>
          setState(
            error instanceof ApiError && error.code === "PAGE_RECONNECT_REQUIRED"
              ? { kind: "reconnect" }
              : { kind: "error", message: error instanceof ApiError ? error.message : t.unavailable }
          )
      ),
    [accountId, t.unavailable]
  );

  useEffect(() => {
    void load();
  }, [load]);

  async function refresh() {
    setRefreshing(true);
    await load(true);
    setRefreshing(false);
  }

  return (
    <section aria-label={t.title} className="rounded-xl bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-dash-heading">
            {t.title}
            {state.kind === "ready" && <span className="font-medium text-dash-muted"> · {state.health.pageName}</span>}
          </h2>
          <p className="mt-0.5 text-xs text-dash-muted">{fill(t.period, { days: 28 })}</p>
        </div>
        {state.kind === "ready" && (
          <button
            type="button"
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-dash-body transition hover:bg-dash-canvas disabled:opacity-60"
          >
            <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
            {t.refresh}
          </button>
        )}
      </div>

      <div className="mt-5">
        {state.kind === "loading" && <SkeletonPanel lines={4} />}
        {state.kind === "reconnect" && (
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-slate-50 p-4 text-xs text-dash-body">
            <AlertTriangle className="size-4 shrink-0 text-orange-500" aria-hidden="true" />
            <span className="flex-1">{t.reconnect}</span>
            {onReconnect && (
              <button type="button" onClick={onReconnect} className="font-semibold text-[#1877f2] hover:underline">
                {social.connectFacebook}
              </button>
            )}
          </div>
        )}
        {state.kind === "error" && (
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-orange-500/5 p-4 text-xs text-orange-700">
            <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
            <span className="flex-1">{state.message}</span>
            <button type="button" onClick={() => load(true)} className="font-semibold underline">
              {t.retry}
            </button>
          </div>
        )}
        {state.kind === "ready" && (
          <div className="flex flex-col gap-6">
            <Kpis health={state.health} />
            {state.health.series.some((d) => d.views !== null) && <ViewsChart series={state.health.series} />}
            <AiReview
              accountId={accountId}
              analysis={state.analysis}
              onAnalysis={(analysis) => setState({ ...state, analysis })}
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <BestTimes bestTimes={state.health.bestTimes} />
              <TopPosts posts={state.health.topPosts} />
            </div>
            <p className="text-[10px] text-gray-text-light">
              {fill(t.updatedAt, { time: f.date(state.fetchedAt, { hour: "2-digit", minute: "2-digit" }) })}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Change({ kpi, t, f }: { kpi: PageHealthKpi; t: Messages; f: Format }) {
  if (kpi.change === null) return <span className="text-[11px] text-dash-muted">{t.noChange}</span>;
  const pct = Math.round(Math.abs(kpi.change) * 100);
  if (pct === 0)
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-dash-muted">
        <Minus className="size-3" aria-hidden="true" />
        {t.changeFlat}
      </span>
    );
  const up = kpi.change > 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${up ? "text-[#059669]" : "text-orange-600"}`}>
      <Icon className="size-3" aria-hidden="true" />
      {fill(up ? t.changeUp : t.changeDown, { value: f.number(pct) })}
    </span>
  );
}

function Kpis({ health }: { health: PageHealth }) {
  const t = useT("dashAccount").social.health;
  const f = useFormat();
  const value = (n: number | null) => (n === null ? "—" : f.number(Math.round(n)));

  return (
    <div className="flex flex-col gap-3">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <li className="rounded-lg border border-border-light p-3">
          <p className="text-[11px] text-dash-muted">{t.followers}</p>
          <p className="mt-1 text-xl font-bold text-dash-heading">{value(health.followers)}</p>
        </li>
        {health.kpis.map((kpi) => (
          <li key={kpi.key} className="flex flex-col gap-1 rounded-lg border border-border-light p-3">
            <p className="text-[11px] text-dash-muted">{t.kpis[kpi.key]}</p>
            <p className="text-xl font-bold text-dash-heading">{value(kpi.current)}</p>
            <Change kpi={kpi} t={t} f={f} />
          </li>
        ))}
      </ul>
      <p className="text-xs text-dash-body">
        {fill(t.rhythm, { posts: health.postsInPeriod, perWeek: f.number(health.postsPerWeek) })}
        {health.engagementRate !== null && (
          <span title={t.engagementHint}>
            {" · "}
            {fill(t.engagementRate, { rate: f.number(health.engagementRate, { maximumFractionDigits: 2 }) })}
          </span>
        )}
      </p>
    </div>
  );
}

/** Vues par jour (une seule série : pas de légende, une infobulle par barre). */
function ViewsChart({ series }: { series: PageHealth["series"] }) {
  const t = useT("dashAccount").social.health;
  const f = useFormat();
  const max = Math.max(...series.map((d) => d.views ?? 0), 1);
  const day = (date: string) => f.date(`${date}T12:00:00Z`, { day: "numeric", month: "short" });

  return (
    <div>
      <p className="text-xs font-semibold text-dash-heading">{t.trendTitle}</p>
      <div className="mt-3 flex h-24 items-end gap-0.5">
        {series.map((point) => {
          const label = fill(t.dayTitle, { date: day(point.date), value: f.number(point.views ?? 0) });
          return (
            <div key={point.date} className="group flex h-full min-w-0 max-w-10 flex-1 items-end" title={label} aria-label={label}>
              <div
                className="w-full rounded-t bg-green-accent transition-colors group-hover:bg-green-accent-dark"
                style={{ height: `${Math.max(2, ((point.views ?? 0) / max) * 100)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-dash-muted">
        <span>{day(series[0].date)}</span>
        <span>{day(series[series.length - 1].date)}</span>
      </div>
    </div>
  );
}

function BestTimes({ bestTimes }: { bestTimes: PageHealth["bestTimes"] }) {
  const t = useT("dashAccount").social.health;
  const f = useFormat();
  const max = Math.max(...bestTimes.slots.map((s) => s.avgInteractions), 1);
  const bySlot = new Map(bestTimes.slots.map((s) => [`${s.weekday}:${s.slot}`, s]));
  const isTop = (s: PostingSlot | undefined) =>
    Boolean(s && bestTimes.top.some((x) => x.weekday === s.weekday && x.slot === s.slot));

  return (
    <div>
      <p className="flex items-center gap-1.5 text-sm font-semibold text-dash-heading">
        <Clock className="size-4 text-green-accent-dark" aria-hidden="true" />
        {t.bestTimesTitle}
      </p>
      {!bestTimes.enough ? (
        <p className="mt-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-dash-body">{t.bestTimesNotEnough}</p>
      ) : (
        <>
          <p className="mt-1 text-[11px] text-dash-muted">{fill(t.bestTimesBasis, { count: bestTimes.sampleSize })}</p>
          <ol className="mt-3 flex flex-col gap-2">
            {bestTimes.top.map((slot, i) => (
              <li key={`${slot.weekday}:${slot.slot}`} className="flex items-center gap-3 rounded-lg border border-border-light p-2.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-accent-dark/10 text-[11px] font-bold text-green-accent-dark">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-dash-heading">
                    {t.weekdays[slot.weekday]} · {slotRange(slot.slot, t)}
                  </p>
                  <p className="text-[11px] text-dash-muted">
                    {fill(t.slotDetail, { interactions: f.number(slot.avgInteractions), posts: slot.posts })}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Carte de chaleur : une seule teinte, de clair à foncé (intensité). */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-separate border-spacing-0.5 text-[10px]" aria-label={t.heatmapLabel}>
              <thead>
                <tr>
                  <th scope="col" className="w-9" />
                  {Array.from({ length: SLOTS_PER_DAY }, (_, slot) => (
                    <th key={slot} scope="col" className="font-normal text-dash-muted">
                      {slot * SLOT_HOURS}h
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.weekdaysShort.map((dayShort, weekday) => (
                  <tr key={dayShort}>
                    <th scope="row" className="pr-1 text-left font-normal text-dash-muted">
                      {dayShort}
                    </th>
                    {Array.from({ length: SLOTS_PER_DAY }, (_, slot) => {
                      const cell = bySlot.get(`${weekday}:${slot}`);
                      const range = slotRange(slot, t);
                      const title = cell
                        ? fill(t.cellTitle, {
                            day: t.weekdays[weekday],
                            range,
                            value: f.number(cell.avgInteractions),
                            posts: cell.posts,
                          })
                        : fill(t.cellEmpty, { day: t.weekdays[weekday], range });
                      const intensity = cell ? 0.15 + 0.85 * (cell.avgInteractions / max) : 0;
                      return (
                        <td
                          key={slot}
                          title={title}
                          aria-label={title}
                          className={`h-5 rounded-sm ${cell ? "" : "bg-slate-100"} ${isTop(cell) ? "ring-2 ring-green-accent-dark ring-offset-1" : ""}`}
                          style={cell ? { backgroundColor: `rgba(25, 165, 70, ${intensity.toFixed(2)})` } : undefined}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-1.5 flex items-center justify-end gap-1.5 text-[10px] text-dash-muted">
              {t.less}
              <span className="h-2 w-16 rounded-sm bg-gradient-to-r from-[rgba(25,165,70,0.15)] to-[rgba(25,165,70,1)]" aria-hidden="true" />
              {t.more}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TopPosts({ posts }: { posts: PageHealth["topPosts"] }) {
  const t = useT("dashAccount").social.health;
  const f = useFormat();

  return (
    <div>
      <p className="text-sm font-semibold text-dash-heading">{t.topPostsTitle}</p>
      {posts.length === 0 ? (
        <p className="mt-2 rounded-lg bg-slate-50 p-3 text-xs text-dash-body">{t.noPosts}</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {posts.slice(0, 3).map((post) => (
            <li key={post.id} className="flex gap-3 rounded-lg border border-border-light p-2.5">
              {post.picture && (
                /* eslint-disable-next-line @next/next/no-img-element -- image hébergée par Facebook, non optimisable */
                <img src={post.picture} alt="" className="size-14 shrink-0 rounded-md object-cover" loading="lazy" />
              )}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs text-dash-heading">{post.message || t.noText}</p>
                <p className="mt-1 text-[11px] text-dash-muted">
                  {f.date(post.createdTime, { day: "numeric", month: "short" })} · {f.number(post.reactions)} {t.reactions} ·{" "}
                  {f.number(post.comments)} {t.comments} · {f.number(post.shares)} {t.shares}
                </p>
                {post.permalink && (
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1877f2] hover:underline"
                  >
                    {t.viewPost}
                    <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AiReview({
  accountId,
  analysis,
  onAnalysis,
}: {
  accountId: string;
  analysis: PageHealthAnalysis | null;
  onAnalysis: (analysis: PageHealthAnalysis) => void;
}) {
  const t = useT("dashAccount").social.health;
  const f = useFormat();
  const { user } = useAuth();
  const canGenerate = user?.role === "ADMIN" || user?.role === "MARKETING_MANAGER" || user?.role === "COMMUNITY_MANAGER";
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function generate() {
    setPending(true);
    setFailed(false);
    try {
      onAnalysis(await apiAnalyzePageHealth(accountId));
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  const button = canGenerate && (
    <button
      type="button"
      onClick={generate}
      disabled={pending}
      className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition disabled:cursor-wait disabled:opacity-70 ${
        analysis ? "text-dash-body hover:bg-dash-canvas" : "bg-[#1a3460] text-white hover:bg-[#142a4f]"
      }`}
    >
      {pending ? <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> : <Sparkles className="size-3.5" aria-hidden="true" />}
      {pending ? t.aiGenerating : analysis ? t.aiRegenerate : t.aiGenerate}
    </button>
  );

  return (
    <div className="rounded-xl border border-border p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-[#1a3460] text-white">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-dash-heading">{t.aiTitle}</p>
            <p className="mt-0.5 text-[11px] text-dash-muted">
              {analysis
                ? fill(t.aiGeneratedAt, { date: f.date(analysis.generatedAt, { day: "numeric", month: "long" }) })
                : t.aiIntro}
            </p>
          </div>
        </div>
        {button}
      </div>
      {failed && (
        <p role="alert" className="mt-3 text-xs font-medium text-red-600">
          {t.aiError}
        </p>
      )}

      {analysis && (
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-xs leading-relaxed text-dash-body">{analysis.analysis.summary}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <ReviewList title={t.strengths} items={analysis.analysis.strengths} tone="good" />
            <ReviewList title={t.watchouts} items={analysis.analysis.watchouts} tone="watch" />
          </div>
          {analysis.analysis.actions.length > 0 && (
            <div>
              <p className="text-xs font-bold text-dash-heading">{t.actions}</p>
              <ol className="mt-2 grid gap-2 md:grid-cols-3">
                {analysis.analysis.actions.map((action, i) => (
                  <li key={action.title} className="flex gap-3 rounded-lg border border-border p-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-dash-body">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-dash-heading">{action.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-dash-body">{action.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ReviewList({ title, items, tone }: { title: string; items: string[]; tone: "good" | "watch" }) {
  if (items.length === 0) return null;
  const good = tone === "good";
  const Icon = good ? CheckCircle2 : AlertTriangle;
  return (
    <div className={`rounded-lg p-4 ${good ? "bg-green-accent-dark/5" : "bg-orange-500/5"}`}>
      <p className={`text-xs font-bold ${good ? "text-green-accent-dark" : "text-orange-600"}`}>{title}</p>
      <ul className="mt-2 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-dash-body">
            <Icon className={`mt-0.5 size-3.5 shrink-0 ${good ? "text-green-accent-dark" : "text-orange-500"}`} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
