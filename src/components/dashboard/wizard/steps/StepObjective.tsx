"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Heart,
  Megaphone,
  MessageCircle,
  Pencil,
  Plus,
  ShoppingCart,
  Target,
  Trash2,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { objectiveOptions, type ObjectiveOption } from "@/data/dashboard";
import type { DigitalObjective } from "@/lib/api/types";
import { useT } from "@/i18n/client";

const icons: Record<ObjectiveOption["icon"], typeof Megaphone> = {
  awareness: Megaphone,
  sales: ShoppingCart,
  leads: UserPlus,
  conversions: Target,
  traffic: TrendingUp,
  engagement: Heart,
  messages: MessageCircle,
};

export function StepObjective({
  value,
  onChange,
  customObjective,
  onCustomObjectiveChange,
}: {
  value: DigitalObjective | null;
  onChange: (id: DigitalObjective) => void;
  /** Objectif formulé librement (« Ajouter un objectif »). */
  customObjective: string;
  onCustomObjectiveChange: (value: string) => void;
}) {
  const t = useT("dashWizard").objective;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(customObjective);

  function saveCustom() {
    onCustomObjectiveChange(draft.trim().slice(0, 200));
    setEditing(false);
  }
  return (
    <div>
      <div className="max-w-[768px]">
        <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">
          {t.title}
        </h1>
        <p className="mt-1 text-base leading-[26px] text-dash-body">
          {t.subtitle}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {objectiveOptions.map((option) => {
          const Icon = icons[option.icon];
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={selected}
              className={`flex flex-col items-start justify-between rounded-[5px] p-6 text-left shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition-colors ${
                selected ? "border-[3px] border-green-accent-dark bg-green-accent-dark/[0.07]" : "border border-transparent bg-white"
              }`}
            >
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <span
                    className={`flex size-12 items-center justify-center rounded-lg ${
                      selected ? "bg-green-accent-dark/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" : "bg-green-accent-dark/[0.08]"
                    }`}
                  >
                    <Icon className="size-5 text-green-accent-dark" aria-hidden="true" />
                  </span>
                  {selected && (
                    <span className="flex size-6 items-center justify-center rounded-full bg-green-accent-dark shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                      <CheckCircle2 className="size-3.5 text-white" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-[15px] font-semibold text-dash-heading">{t.options[option.id].title}</h2>
                <p className="mt-1 text-[13px] leading-[18px] text-dash-body">{t.options[option.id].description}</p>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.55px] text-dash-muted">
                {t.options[option.id].optimization}
              </p>
            </button>
          );
        })}
      </div>

      {editing ? (
        <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-xl border-2 border-green-accent bg-white p-5">
          <label htmlFor="custom-objective" className="text-sm font-semibold text-dash-heading">
            {t.customLabel}
          </label>
          <input
            id="custom-objective"
            type="text"
            autoFocus
            maxLength={200}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                saveCustom();
              }
              if (event.key === "Escape") setEditing(false);
            }}
            placeholder={t.customPlaceholder}
            className="rounded-lg border border-border px-4 py-2.5 text-sm text-dash-heading outline-none focus:border-green-accent-dark"
          />
          <p className="text-xs leading-relaxed text-dash-muted">{t.customHint}</p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setDraft(customObjective);
                setEditing(false);
              }}
              className="rounded-full px-4 py-2 text-xs font-semibold text-dash-body hover:bg-dash-canvas"
            >
              {t.customCancel}
            </button>
            <button
              type="button"
              onClick={saveCustom}
              disabled={!draft.trim()}
              className="rounded-full bg-green-accent px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              {t.customSave}
            </button>
          </div>
        </div>
      ) : customObjective ? (
        <div className="mt-8 flex max-w-2xl items-start gap-3 rounded-xl border border-green-accent-dark/30 bg-green-accent-dark/[0.05] p-4">
          <Target className="mt-0.5 size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-green-accent-dark">{t.customTitle}</p>
            <p className="mt-0.5 text-sm text-dash-heading">{customObjective}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setDraft(customObjective);
              setEditing(true);
            }}
            aria-label={t.customEdit}
            className="rounded-full p-1.5 text-dash-muted hover:bg-white hover:text-dash-heading"
          >
            <Pencil className="size-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              onCustomObjectiveChange("");
              setDraft("");
            }}
            aria-label={t.customRemove}
            className="rounded-full p-1.5 text-dash-muted hover:bg-white hover:text-red-600"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="mt-8 flex items-center gap-2 rounded-full border-2 border-green-accent px-4 py-2.5 text-xs font-semibold text-green-accent transition hover:bg-green-accent/10"
        >
          <Plus className="size-4" aria-hidden="true" />
          {t.add}
        </button>
      )}
    </div>
  );
}
