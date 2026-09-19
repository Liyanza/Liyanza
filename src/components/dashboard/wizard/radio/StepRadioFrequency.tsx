"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Plus, X } from "lucide-react";
import { radioDayOptions, radioFrequencyPresets, type RadioDayId } from "@/data/radioStations";

export interface RadioFrequencyData {
  perDay: number;
  timeSlots: string[];
  days: RadioDayId[];
  startDate: string;
  endDate: string;
}

const DEFAULT_SLOT_OPTIONS = ["07h00 - 09h00", "12h00 - 14h00", "17h00 - 19h00", "09h00 - 12h00", "19h00 - 21h00"];

export function StepRadioFrequency({
  value,
  onChange,
}: {
  value: RadioFrequencyData;
  onChange: (data: RadioFrequencyData) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  function toggleDay(day: RadioDayId) {
    onChange({
      ...value,
      days: value.days.includes(day) ? value.days.filter((d) => d !== day) : [...value.days, day],
    });
  }

  function removeSlot(slot: string) {
    onChange({ ...value, timeSlots: value.timeSlots.filter((s) => s !== slot) });
  }

  function addSlot(slot: string) {
    if (!value.timeSlots.includes(slot)) {
      onChange({ ...value, timeSlots: [...value.timeSlots, slot] });
    }
    setPickerOpen(false);
  }

  const availableSlots = DEFAULT_SLOT_OPTIONS.filter((slot) => !value.timeSlots.includes(slot));

  return (
    <div className="mx-auto max-w-[1215px] py-2">
      <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">
        Frequence de diffusion
      </h1>

      <label className="mt-6 flex flex-col gap-1.5">
        <span className="relative">
          <select
            value={value.perDay}
            onChange={(event) => onChange({ ...value, perDay: Number(event.target.value) })}
            className="w-full max-w-[520px] appearance-none rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-dash-heading outline-none"
          >
            {radioFrequencyPresets.map((n) => (
              <option key={n} value={n}>
                {n} diffusion{n > 1 ? "s" : ""} par jour
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-dash-muted" aria-hidden="true" />
        </span>
      </label>

      <div className="mt-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">Créneaux horaires</span>
        <div className="relative mt-2 flex flex-wrap items-center gap-2">
          {value.timeSlots.map((slot) => (
            <span key={slot} className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white">
              {slot}
              <button type="button" onClick={() => removeSlot(slot)} aria-label={`Retirer ${slot}`}>
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => setPickerOpen((open) => !open)}
            className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-4 py-2 text-xs font-semibold text-dash-body"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            Ajouter un créneau
          </button>
          {pickerOpen && (
            <div className="absolute left-0 top-full z-10 mt-2 flex w-56 flex-col gap-1 rounded-xl border border-border bg-white p-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              {availableSlots.length === 0 ? (
                <span className="px-2 py-1.5 text-xs text-dash-muted">Tous les créneaux sont ajoutés.</span>
              ) : (
                availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => addSlot(slot)}
                    className="rounded-lg px-2 py-1.5 text-left text-xs font-medium text-dash-body hover:bg-dash-canvas"
                  >
                    {slot}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">Jours de diffusion</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {radioDayOptions.map((day) => {
            const selected = value.days.includes(day.id);
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => toggleDay(day.id)}
                aria-pressed={selected}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  selected ? "bg-blue-500 text-white" : "bg-dash-pill-bg text-dash-body"
                }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">Période de diffusion</span>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          {(
            [
              { key: "startDate" as const, label: "Du" },
              { key: "endDate" as const, label: "Au" },
            ]
          ).map((field) => (
            <label key={field.key} className="flex flex-1 items-center gap-2 rounded-xl border border-border px-4 py-3">
              <Calendar className="size-4 shrink-0 text-dash-muted" aria-hidden="true" />
              <span className="text-sm font-medium text-dash-muted">{field.label}</span>
              <input
                type="date"
                value={value[field.key]}
                onChange={(event) => onChange({ ...value, [field.key]: event.target.value })}
                className="w-full bg-transparent text-sm font-semibold text-dash-heading outline-none"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
