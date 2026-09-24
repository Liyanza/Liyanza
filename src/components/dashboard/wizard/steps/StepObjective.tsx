"use client";

import { CheckCircle2, Heart, Megaphone, Plus, ShoppingCart, Target, TrendingUp, UserPlus } from "lucide-react";
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
};

export function StepObjective({
  value,
  onChange,
}: {
  value: DigitalObjective | null;
  onChange: (id: DigitalObjective) => void;
}) {
  const t = useT("dashWizard").objective;
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

      <button
        type="button"
        className="mt-8 flex items-center gap-2 rounded-full border-2 border-green-accent px-4 py-2.5 text-xs font-semibold text-green-accent"
      >
        <Plus className="size-4" aria-hidden="true" />
        {t.add}
      </button>
    </div>
  );
}
