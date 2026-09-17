"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { WizardStepper } from "./WizardStepper";
import { WizardFooterNav } from "./WizardFooterNav";
import { StepType } from "./steps/StepType";
import { StepDefinition, type DefinitionData } from "./steps/StepDefinition";
import { StepObjective } from "./steps/StepObjective";
import { StepAudience, type AudienceData } from "./steps/StepAudience";
import { StepBudget, type BudgetData } from "./steps/StepBudget";
import { StepChannels } from "./steps/StepChannels";
import { StepSimulation } from "./steps/StepSimulation";
import { wizardSteps } from "@/data/dashboard";

interface WizardState {
  type: string | null;
  definition: DefinitionData;
  objective: string | null;
  audience: AudienceData;
  budget: BudgetData;
  channels: string[];
}

const initialState: WizardState = {
  type: null,
  definition: { name: "", product: "", description: "" },
  objective: null,
  audience: { ageMin: 25, ageMax: 45, gender: "all", interests: ["Fintech & Mobile Money", "Entrepreneuriat", "Commerce & PME"] },
  budget: { budgetType: "total", amount: 500000, startDate: "2025-10-15", endDate: "2025-10-29" },
  channels: [],
};

const LAST_STEP = wizardSteps.length - 1;

export function CampaignWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<WizardState>(initialState);

  const canContinue = useMemo(() => {
    switch (stepIndex) {
      case 0:
        return Boolean(state.type);
      case 1:
        return state.definition.name.trim().length > 0 && state.definition.product.trim().length > 0;
      case 2:
        return Boolean(state.objective);
      case 4:
        return state.budget.amount > 0 && Boolean(state.budget.startDate) && Boolean(state.budget.endDate);
      case 5:
        return state.channels.length > 0;
      default:
        return true;
    }
  }, [stepIndex, state]);

  function goNext() {
    setStepIndex((index) => Math.min(LAST_STEP, index + 1));
  }

  function goBack() {
    setStepIndex((index) => Math.max(0, index - 1));
  }

  function toggleChannel(id: string) {
    setState((prev) => ({
      ...prev,
      channels: prev.channels.includes(id) ? prev.channels.filter((c) => c !== id) : [...prev.channels, id],
    }));
  }

  return (
    <>
      <TopBar title="Campagnes" />
      <main className="flex-1 overflow-y-auto bg-dash-wizard-canvas">
        <div className="mx-auto flex max-w-[1295px] flex-col gap-3 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Link href="/dashboard/campagnes" className="flex items-center gap-1 font-semibold text-dash-body hover:text-black">
                <ChevronRight className="size-3 rotate-180" aria-hidden="true" />
                Campagnes
              </Link>
              <span className="text-dash-muted">/</span>
              <span className="font-semibold text-dash-heading">Assistant de Création</span>
            </div>
            <Link
              href="/dashboard/campagnes"
              aria-label="Fermer l'assistant de création"
              className="flex size-8 items-center justify-center rounded-full text-dash-muted hover:bg-white hover:text-black"
            >
              <X className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <WizardStepper stepIndex={stepIndex} />

            {stepIndex === 0 && <StepType value={state.type} onChange={(type) => setState((prev) => ({ ...prev, type }))} />}
            {stepIndex === 1 && (
              <StepDefinition
                data={state.definition}
                onChange={(definition) => setState((prev) => ({ ...prev, definition }))}
              />
            )}
            {stepIndex === 2 && (
              <StepObjective
                value={state.objective}
                onChange={(objective) => setState((prev) => ({ ...prev, objective }))}
              />
            )}
            {stepIndex === 3 && (
              <StepAudience data={state.audience} onChange={(audience) => setState((prev) => ({ ...prev, audience }))} />
            )}
            {stepIndex === 4 && (
              <StepBudget data={state.budget} onChange={(budget) => setState((prev) => ({ ...prev, budget }))} />
            )}
            {stepIndex === 5 && <StepChannels value={state.channels} onToggle={toggleChannel} />}
            {stepIndex === 6 && <StepSimulation />}

            {stepIndex < LAST_STEP && (
              <WizardFooterNav onBack={goBack} onNext={goNext} nextDisabled={!canContinue} showBack={stepIndex > 0} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
