import { CircleCheck } from "lucide-react";
import { wizardSteps } from "@/data/dashboard";
import { ProgressBar } from "@/components/dashboard/ui/ProgressBar";

export function WizardStepper({ stepIndex }: { stepIndex: number }) {
  const total = wizardSteps.length;
  const progress = Math.round(((stepIndex + 1) / total) * 100);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.275px] text-orange-500">
          Étape {String(stepIndex + 1).padStart(2, "0")} / {total}
        </span>
        <span className="text-sm font-medium text-dash-body">{wizardSteps[stepIndex]}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-dash-body shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
          <CircleCheck className="size-3.5 text-green-accent-dark" aria-hidden="true" />
          Brouillon sauvegardé
        </span>
        <div className="w-48">
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-dash-body">
            <span>Progression</span>
            <span className="font-semibold text-blue-500">{progress}%</span>
          </div>
          <ProgressBar value={progress} barClassName="bg-blue-500" trackClassName="bg-dash-track" height="h-1.5" />
        </div>
      </div>
    </div>
  );
}
