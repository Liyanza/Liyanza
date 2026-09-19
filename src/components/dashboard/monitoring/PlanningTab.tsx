"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Plus } from "lucide-react";
import { DiffusionStatusPill } from "./DiffusionStatusPill";
import { calendarWeek, planningDetail, upcomingDiffusions } from "@/data/monitoring";

const RANGE_LABEL = "10 sept. → 16 sept. 2026";
const VIEWS = ["Jour", "Semaine", "Mois"] as const;

const TONE_CLASS: Record<(typeof calendarWeek)[number]["tone"], string> = {
  ok: "border-border-light text-dash-heading",
  warning: "border-orange-300 bg-orange-500/5 text-orange-600",
  anomaly: "border-orange-300 bg-orange-500/5 text-orange-600",
};

const DOT_CLASS: Record<(typeof calendarWeek)[number]["tone"], string> = {
  ok: "bg-green-accent-dark",
  warning: "bg-orange-500",
  anomaly: "bg-orange-500",
};

export function PlanningTab() {
  const [view, setView] = useState<(typeof VIEWS)[number]>("Semaine");
  const [selectedDate, setSelectedDate] = useState(calendarWeek[3]?.date);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-dash-heading">Calendrier des diffusions</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full bg-dash-pill-bg p-1">
                {VIEWS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setView(option)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                      view === option ? "bg-green-accent text-white" : "text-dash-body"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border-light px-3 py-1.5 text-xs font-medium text-dash-body">
                <span>{RANGE_LABEL}</span>
                <ChevronLeft className="size-3.5" aria-hidden="true" />
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2.5 sm:grid-cols-7">
            {calendarWeek.map((day) => {
              const isSelected = day.date === selectedDate;
              return (
                <button
                  key={day.date}
                  type="button"
                  onClick={() => setSelectedDate(day.date)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors ${
                    isSelected ? "border-blue-500 bg-blue-500/5" : TONE_CLASS[day.tone]
                  }`}
                >
                  <span className="text-[11px] font-medium text-dash-muted">{day.label}</span>
                  <span className={`text-lg font-bold ${day.tone !== "ok" ? "text-orange-600" : "text-dash-heading"}`}>
                    {day.count}
                    <span className="text-xs font-medium text-dash-muted">/{day.total}</span>
                  </span>
                  <span className={`size-1.5 rounded-full ${DOT_CLASS[day.tone]}`} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-dash-heading">Détail des diffusions</h2>
            <button type="button" className="flex items-center gap-1 text-xs font-semibold text-green-accent-dark">
              <Plus className="size-3.5" aria-hidden="true" />
              Ajouter une diffusion
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">
                  <th className="pb-2 pr-3">Heure</th>
                  <th className="pb-2 pr-3">Radio</th>
                  <th className="pb-2 pr-3">Spot</th>
                  <th className="pb-2 pr-3">Durée</th>
                  <th className="pb-2 pr-3">Statut</th>
                  <th className="pb-2">Audience estimée</th>
                </tr>
              </thead>
              <tbody>
                {planningDetail.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-t border-border-light ${row.statut === "ANOMALIE" ? "bg-orange-500/5" : ""}`}
                  >
                    <td className="py-3 pr-3 font-semibold text-dash-heading">{row.heure}</td>
                    <td className="py-3 pr-3 text-dash-body">{row.radio}</td>
                    <td className="py-3 pr-3 text-dash-body">{row.spot}</td>
                    <td className="py-3 pr-3 text-dash-body">{row.duree}</td>
                    <td className="py-3 pr-3">
                      <DiffusionStatusPill status={row.statut} />
                    </td>
                    <td className="py-3 text-dash-body">{row.audience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button type="button" className="mt-4 flex w-full items-center justify-center gap-1 text-xs font-semibold text-green-accent-dark">
            Voir le planning complet →
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-dash-heading">Filtres</h2>
          <div className="mt-4 flex flex-col gap-4">
            {[
              { label: "Radio", value: "Radio Balafon" },
              { label: "Zone", value: "Toutes les zones" },
              { label: "Créneau", value: "Tous les créneaux" },
            ].map((field) => (
              <label key={field.label} className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-dash-body">{field.label}</span>
                <span className="flex items-center justify-between rounded-full bg-dash-input-bg px-4 py-2.5 text-sm font-medium text-dash-heading">
                  {field.value}
                  <ChevronRight className="size-3.5 rotate-90 text-dash-muted" aria-hidden="true" />
                </span>
              </label>
            ))}

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium text-dash-body">Statut</span>
              {[
                { label: "Diffusé", dot: "bg-green-accent-dark" },
                { label: "À venir", dot: "bg-blue-500" },
                { label: "Anomalie", dot: "bg-orange-500" },
              ].map((status) => (
                <label key={status.label} className="flex items-center gap-2 text-sm text-dash-body">
                  <input type="checkbox" defaultChecked className="size-3.5 accent-green-accent" />
                  <span className={`size-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </label>
              ))}
            </div>

            <button type="button" className="mt-1 rounded-full bg-green-accent px-4 py-2.5 text-sm font-semibold text-white">
              Appliquer les filtres
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="text-sm font-semibold text-dash-heading">Prochaines diffusions</h2>
          <div className="mt-4 flex flex-col gap-3">
            {upcomingDiffusions.map((item) => (
              <div key={item.id} className="flex items-start gap-2.5 rounded-xl bg-dash-canvas p-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                  <MapPin className="size-4 text-blue-500" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-dash-heading">{item.label}</p>
                  <p className="text-[11px] text-dash-muted">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
