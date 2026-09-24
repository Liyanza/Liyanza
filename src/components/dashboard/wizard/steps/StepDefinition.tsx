"use client";

import { Flag, Info, Package, Sparkles } from "lucide-react";
import { useT } from "@/i18n/client";

export interface DefinitionData {
  name: string;
  product: string;
  description: string;
}

export function StepDefinition({
  data,
  onChange,
}: {
  data: DefinitionData;
  onChange: (data: DefinitionData) => void;
}) {
  const t = useT("dashWizard").definition;
  return (
    <div className="max-w-[768px]">
      <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">
        {t.title}
      </h1>
      <p className="mt-1 text-sm leading-[22.75px] text-dash-body">
        {t.subtitle}
      </p>

      <div className="mt-6 flex flex-col gap-6 rounded-xl bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="campaign-name" className="text-sm font-semibold text-dash-heading">
              {t.name} <span className="text-green-accent-dark">*</span>
            </label>
            <span className="text-[11px] font-medium text-dash-muted">{t.required}</span>
          </div>
          <div className="relative mt-1">
            <Flag className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-green-accent-dark" aria-hidden="true" />
            <input
              id="campaign-name"
              type="text"
              maxLength={200}
              value={data.name}
              onChange={(event) => onChange({ ...data, name: event.target.value })}
              placeholder={t.namePlaceholder}
              className="w-full rounded-lg border-2 border-green-accent bg-dash-canvas py-3 pl-11 pr-4 text-sm text-black outline-none"
            />
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-dash-muted">
            <Info className="size-3 shrink-0" aria-hidden="true" />
            {t.nameHint}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="campaign-product" className="text-sm font-semibold text-dash-heading">
              {t.product} <span className="text-green-accent-dark">*</span>
            </label>
            <span className="text-[11px] font-medium text-dash-muted">{t.productHint}</span>
          </div>
          <div className="relative mt-1">
            <Package className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-green-accent-dark" aria-hidden="true" />
            <input
              id="campaign-product"
              type="text"
              value={data.product}
              onChange={(event) => onChange({ ...data, product: event.target.value })}
              placeholder={t.productPlaceholder}
              className="w-full rounded-lg border-2 border-green-accent bg-dash-canvas py-3 pl-11 pr-4 text-sm text-black outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="campaign-description" className="text-sm font-semibold text-dash-heading">
              {t.description} <span className="text-[13px] font-normal text-dash-muted">{t.optional}</span>
            </label>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-[#f0faff] px-3 py-1.5 text-xs font-semibold text-[#006398]"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              {t.generate}
            </button>
          </div>
          <textarea
            id="campaign-description"
            rows={3}
            maxLength={500}
            value={data.description}
            onChange={(event) => onChange({ ...data, description: event.target.value })}
            placeholder={t.descriptionPlaceholder}
            className="mt-1 w-full resize-none rounded-lg border-2 border-green-accent bg-dash-canvas px-4 py-3 text-sm text-black outline-none"
          />
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-blue-500">{t.poweredBy}</span>
            <span className="text-[11px] font-semibold text-dash-body">{data.description.length} / 500</span>
          </div>
        </div>
      </div>
    </div>
  );
}
