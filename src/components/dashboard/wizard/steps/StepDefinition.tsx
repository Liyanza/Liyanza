"use client";

import { Flag, Info, Package, Sparkles } from "lucide-react";

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
  return (
    <div className="max-w-[768px]">
      <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">
        Parlons de votre campagne.
      </h1>
      <p className="mt-1 text-sm leading-[22.75px] text-dash-body">
        Donnez une identité claire à votre campagne pour permettre à l&apos;IA d&apos;ajuster ses analyses et ses
        recommandations.
      </p>

      <div className="mt-6 flex flex-col gap-6 rounded-xl bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="campaign-name" className="text-sm font-semibold text-dash-heading">
              Nom de la campagne <span className="text-green-accent-dark">*</span>
            </label>
            <span className="text-[11px] font-medium text-dash-muted">Obligatoire</span>
          </div>
          <div className="relative mt-1">
            <Flag className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-green-accent-dark" aria-hidden="true" />
            <input
              id="campaign-name"
              type="text"
              maxLength={200}
              value={data.name}
              onChange={(event) => onChange({ ...data, name: event.target.value })}
              placeholder="Donnez un nom à votre campagne"
              className="w-full rounded-lg border-2 border-green-accent bg-dash-canvas py-3 pl-11 pr-4 text-sm text-black outline-none"
            />
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-dash-muted">
            <Info className="size-3 shrink-0" aria-hidden="true" />
            Choisissez un libellé explicite pour votre équipe et vos rapports de performance.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="campaign-product" className="text-sm font-semibold text-dash-heading">
              Que souhaitez-vous promouvoir ? <span className="text-green-accent-dark">*</span>
            </label>
            <span className="text-[11px] font-medium text-dash-muted">Produit ou service actif</span>
          </div>
          <div className="relative mt-1">
            <Package className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-green-accent-dark" aria-hidden="true" />
            <input
              id="campaign-product"
              type="text"
              value={data.product}
              onChange={(event) => onChange({ ...data, product: event.target.value })}
              placeholder="Entrez le nom du produit à promouvoir"
              className="w-full rounded-lg border-2 border-green-accent bg-dash-canvas py-3 pl-11 pr-4 text-sm text-black outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="campaign-description" className="text-sm font-semibold text-dash-heading">
              Description <span className="text-[13px] font-normal text-dash-muted">(optionnel)</span>
            </label>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-[#f0faff] px-3 py-1.5 text-xs font-semibold text-[#006398]"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              Générer une description avec l&apos;IA
            </button>
          </div>
          <textarea
            id="campaign-description"
            rows={3}
            maxLength={500}
            value={data.description}
            onChange={(event) => onChange({ ...data, description: event.target.value })}
            placeholder="Décrivez le contexte marketing de votre campagne..."
            className="mt-1 w-full resize-none rounded-lg border-2 border-green-accent bg-dash-canvas px-4 py-3 text-sm text-black outline-none"
          />
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-blue-500">Optimisé par KIYANZA AI</span>
            <span className="text-[11px] font-semibold text-dash-body">{data.description.length} / 500</span>
          </div>
        </div>
      </div>
    </div>
  );
}
