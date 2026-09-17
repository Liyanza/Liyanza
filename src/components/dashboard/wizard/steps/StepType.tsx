import { ChevronRight, Info, Radio, Smartphone, Presentation } from "lucide-react";
import { campaignTypeOptions, type CampaignTypeOption } from "@/data/dashboard";

const icons: Record<CampaignTypeOption["icon"], typeof Smartphone> = {
  digital: Smartphone,
  radio: Radio,
  print: Presentation,
};

export function StepType({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mx-auto flex max-w-[926px] flex-col items-center py-5">
      <h1 className="w-full max-w-[685px] text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">
        Quel type de campagne souhaitez-vous créer ?
      </h1>

      <div className="mt-5 flex w-full flex-col gap-3">
        {campaignTypeOptions.map((option) => {
          const Icon = icons[option.icon];
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={selected}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-5 text-left transition-colors ${
                selected ? "border-blue-500 bg-white" : "border-transparent bg-white shadow-[0_3px_6px_rgba(0,0,0,0.07)] hover:border-border"
              }`}
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-accent-dark/10">
                <Icon className="size-5 text-green-accent-dark" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold text-gray-900">{option.title}</span>
                <span className="mt-0.5 block text-[12.5px] text-gray-text">{option.description}</span>
              </span>
              {selected ? (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-blue-500">
                  <span className="size-2 rounded-full bg-blue-500" />
                </span>
              ) : (
                <ChevronRight className="size-3.5 shrink-0 text-gray-text-light" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex w-full items-start gap-3 rounded-2xl border border-blue-500 px-4 py-3.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <Info className="size-3.5 text-blue-500" aria-hidden="true" />
        </span>
        <p className="text-xs leading-[19.5px] text-gray-text">
          Combinez plusieurs types de campagnes pour maximiser votre impact. Une campagne radio + supports
          publicitaires crée une présence forte.
        </p>
      </div>
    </div>
  );
}
