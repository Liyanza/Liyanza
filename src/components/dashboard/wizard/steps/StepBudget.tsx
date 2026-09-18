"use client";

import { Calendar, Zap } from "lucide-react";
import { budgetPresets } from "@/data/dashboard";

import type { BudgetAllocationType } from "@/lib/api/types";

export interface BudgetData {
  // Valeur envoyée telle quelle comme `budgetAllocation` à
  // PUT /campagnes/:id/digital-details.
  budgetType: BudgetAllocationType;
  amount: number;
  startDate: string;
  endDate: string;
}

function formatFcfa(amount: number) {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

function durationInDays(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return null;
  const diff = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : null;
}

export function StepBudget({
  data,
  onChange,
}: {
  data: BudgetData;
  onChange: (data: BudgetData) => void;
}) {
  const duration = durationInDays(data.startDate, data.endDate);

  return (
    <div>
      <div className="max-w-[768px]">
        <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading sm:text-[32px]">
          Combien souhaitez-vous investir et sur quelle période ?
        </h1>
        <p className="mt-1 text-base leading-[26px] text-dash-body">
          Définissez le budget que vous souhaitez allouer à cette campagne et sur quelle période.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-green-accent/10 text-sm font-semibold text-green-accent-dark">
              1
            </span>
            <h2 className="text-lg font-semibold text-dash-heading">Type de budget et Montant</h2>
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
                Budget {type === "TOTAL" ? "total" : "quotidien"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 rounded-xl bg-dash-input-bg p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-dash-muted">Montant global alloué</span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-orange-500">
              <Zap className="size-2.5" aria-hidden="true" />
              Cadence adaptative activée
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <input
              type="number"
              min={0}
              step={10000}
              value={data.amount}
              onChange={(event) => onChange({ ...data, amount: Number(event.target.value) || 0 })}
              className="w-48 bg-transparent text-[32px] font-bold tracking-[-1px] text-dash-heading outline-none sm:text-[40px]"
            />
            <span className="text-xl font-bold text-black sm:text-[22px]">FCFA</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.55px] text-dash-muted">Préréglages :</span>
          {budgetPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange({ ...data, amount: preset })}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                data.amount === preset ? "bg-blue-500 text-white" : "bg-dash-pill-bg text-dash-body"
              }`}
            >
              {formatFcfa(preset)}
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
            <h2 className="text-lg font-semibold text-dash-heading">Période de diffusion</h2>
          </div>
          {duration !== null && (
            <span className="flex items-center gap-1.5 rounded-full bg-green-accent/10 px-3 py-1 text-[11px] font-semibold text-green-accent-dark">
              <Calendar className="size-3.5" aria-hidden="true" />
              Durée totale : {duration} jours
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          {(
            [
              { key: "startDate" as const, label: "Date de début" },
              { key: "endDate" as const, label: "Date de fin" },
            ]
          ).map((field) => (
            <label key={field.key} className="flex flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-medium text-dash-body">{field.label}</span>
              <span className="flex items-center gap-2 rounded-full bg-dash-input-bg px-4 py-2.5">
                <Calendar className="size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
                <input
                  type="date"
                  value={data[field.key]}
                  onChange={(event) => onChange({ ...data, [field.key]: event.target.value })}
                  className="w-full bg-transparent text-sm font-semibold text-dash-heading outline-none"
                />
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
