"use client";

import { Calendar, Zap } from "lucide-react";
import { budgetPresets } from "@/data/dashboard";
import type { BudgetAllocationType } from "@/lib/api/types";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

export interface BudgetData {
  // Valeur envoyée telle quelle comme `budgetAllocation` à
  // PUT /campagnes/:id/digital-details.
  budgetType: BudgetAllocationType;
  amount: number;
  startDate: string;
  endDate: string;
}

export const MIN_BUDGET = 10_000;
const MAX_BUDGET = 10_000_000;
const QUICK_DURATIONS = [7, 14, 30];

/** Date locale AAAA-MM-JJ (évite le décalage UTC de toISOString). */
export function localIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return localIsoDate(date);
}

function durationInDays(start: string, end: string) {
  const startDate = new Date(`${start}T12:00:00`);
  const endDate = new Date(`${end}T12:00:00`);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return null;
  const diff = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : null;
}

/** Problème bloquant de l'étape Budget (null si tout est valide) — utilisé aussi par l'assistant. */
export function budgetIssue(data: BudgetData): "minAmount" | "startInPast" | "endBeforeStart" | "missing" | null {
  if (!data.startDate || !data.endDate) return "missing";
  if (data.amount < MIN_BUDGET) return "minAmount";
  if (data.startDate < localIsoDate(new Date())) return "startInPast";
  if (durationInDays(data.startDate, data.endDate) === null) return "endBeforeStart";
  return null;
}

// Curseur logarithmique : aussi précis à 50 000 qu'à 5 000 000 FCFA.
const LOG_MIN = Math.log(MIN_BUDGET);
const LOG_MAX = Math.log(MAX_BUDGET);
const toSlider = (amount: number) =>
  Math.round(((Math.log(Math.min(MAX_BUDGET, Math.max(MIN_BUDGET, amount))) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 1000);
function fromSlider(position: number) {
  const raw = Math.exp(LOG_MIN + (position / 1000) * (LOG_MAX - LOG_MIN));
  // Montants ronds : au millier sous 100 000, à 5 000 ensuite, à 50 000 au-delà d'un million.
  const step = raw < 100_000 ? 1_000 : raw < 1_000_000 ? 5_000 : 50_000;
  return Math.round(raw / step) * step;
}

export function StepBudget({
  data,
  onChange,
}: {
  data: BudgetData;
  onChange: (data: BudgetData) => void;
}) {
  const t = useT("dashWizard").budget;
  const f = useFormat();
  const today = localIsoDate(new Date());
  const duration = durationInDays(data.startDate, data.endDate);
  const issue = budgetIssue(data);

  const estimate =
    duration === null || data.amount < MIN_BUDGET
      ? null
      : data.budgetType === "TOTAL"
        ? fill(t.perDay, { amount: f.money(Math.round(data.amount / duration)) })
        : fill(t.totalOver, { amount: f.money(data.amount * duration), days: duration });

  function setStart(startDate: string) {
    // Garde la même durée quand on décale le début.
    const keep = duration ?? 14;
    onChange({ ...data, startDate, endDate: startDate ? addDays(startDate, keep) : data.endDate });
  }

  return (
    <div>
      <div className="max-w-[768px]">
        <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading sm:text-[32px]">
          {t.title}
        </h1>
        <p className="mt-1 text-base leading-[26px] text-dash-body">{t.subtitle}</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-green-accent/10 text-sm font-semibold text-green-accent-dark">
              1
            </span>
            <h2 className="text-lg font-semibold text-dash-heading">{t.typeAndAmount}</h2>
          </div>
          <div className="flex items-start rounded-full bg-dash-pill-bg p-1">
            {(["TOTAL", "DAILY"] as const).map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={data.budgetType === type}
                onClick={() => onChange({ ...data, budgetType: type })}
                className={`rounded-full px-6 py-1.5 text-xs font-semibold transition-colors ${
                  data.budgetType === type ? "bg-green-accent text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]" : "text-dash-muted"
                }`}
              >
                {type === "TOTAL" ? t.total : t.daily}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl bg-dash-input-bg p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-dash-muted">{data.budgetType === "TOTAL" ? t.amount : t.daily}</span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-orange-500">
              <Zap className="size-2.5" aria-hidden="true" />
              {t.adaptive}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            {/* Montant lisible (espaces des milliers) ; seuls les chiffres sont gardés. */}
            <input
              type="text"
              inputMode="numeric"
              aria-label={t.amountLabel}
              value={data.amount ? f.number(data.amount) : ""}
              onChange={(event) => onChange({ ...data, amount: Number(event.target.value.replace(/\D/g, "")) || 0 })}
              className="w-full max-w-[320px] bg-transparent text-[32px] font-bold tracking-[-1px] text-dash-heading outline-none sm:text-[40px]"
            />
            <span className="text-xl font-bold text-black sm:text-[22px]">FCFA</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000}
            value={toSlider(data.amount)}
            onChange={(event) => onChange({ ...data, amount: fromSlider(Number(event.target.value)) })}
            aria-label={t.sliderLabel}
            aria-valuetext={f.money(data.amount)}
            className="w-full accent-blue-500"
          />
          <p className={`text-xs ${issue === "minAmount" ? "font-medium text-orange-600" : "text-dash-body"}`}>
            {issue === "minAmount" ? fill(t.minAmount, { amount: f.money(MIN_BUDGET) }) : estimate}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.55px] text-dash-muted">{t.presets}</span>
          {budgetPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              aria-pressed={data.amount === preset}
              onClick={() => onChange({ ...data, amount: preset })}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                data.amount === preset ? "bg-blue-500 text-white" : "bg-dash-pill-bg text-dash-body hover:bg-slate-200"
              }`}
            >
              {f.money(preset)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-green-accent/10 text-sm font-semibold text-green-accent">
              2
            </span>
            <h2 className="text-lg font-semibold text-dash-heading">{t.period}</h2>
          </div>
          {duration !== null && (
            <span className="flex items-center gap-1.5 rounded-full bg-green-accent/10 px-3 py-1 text-[11px] font-semibold text-green-accent-dark">
              <Calendar className="size-3.5" aria-hidden="true" />
              {fill(t.duration, { days: duration })}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.55px] text-dash-muted">{t.quickDurations}</span>
          {QUICK_DURATIONS.map((days) => (
            <button
              key={days}
              type="button"
              aria-pressed={duration === days}
              onClick={() => onChange({ ...data, endDate: addDays(data.startDate || today, days) })}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                duration === days ? "bg-blue-500 text-white" : "bg-dash-pill-bg text-dash-body hover:bg-slate-200"
              }`}
            >
              {fill(t.days, { days })}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <label className="flex flex-1 flex-col gap-1.5">
            <span className="text-[11px] font-medium text-dash-body">{t.startDate}</span>
            <span className="flex items-center gap-2 rounded-full bg-dash-input-bg px-4 py-2.5">
              <Calendar className="size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
              <input
                type="date"
                min={today}
                value={data.startDate}
                onChange={(event) => setStart(event.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-dash-heading outline-none"
              />
            </span>
          </label>
          <label className="flex flex-1 flex-col gap-1.5">
            <span className="text-[11px] font-medium text-dash-body">{t.endDate}</span>
            <span className="flex items-center gap-2 rounded-full bg-dash-input-bg px-4 py-2.5">
              <Calendar className="size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
              <input
                type="date"
                min={data.startDate ? addDays(data.startDate, 1) : today}
                value={data.endDate}
                onChange={(event) => onChange({ ...data, endDate: event.target.value })}
                className="w-full bg-transparent text-sm font-semibold text-dash-heading outline-none"
              />
            </span>
          </label>
        </div>
        {(issue === "startInPast" || issue === "endBeforeStart") && (
          <p role="alert" className="text-xs font-medium text-orange-600">
            {issue === "startInPast" ? t.startInPast : t.endBeforeStart}
          </p>
        )}
      </div>
    </div>
  );
}
