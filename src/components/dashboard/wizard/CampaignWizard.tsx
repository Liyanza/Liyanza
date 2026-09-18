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
import { wizardSteps, objectiveOptions } from "@/data/dashboard";
import type {
  CampaignType,
  CreateCampagnePayload,
  DigitalObjective,
  SelectDigitalChannelsPayload,
  SocialPlatform,
  UpsertDigitalDetailsPayload,
} from "@/lib/api/types";

interface WizardState {
  type: string | null;
  definition: DefinitionData;
  objective: DigitalObjective | null;
  audience: AudienceData;
  budget: BudgetData;
  channels: SocialPlatform[];
}

const initialState: WizardState = {
  type: null,
  definition: { name: "", product: "", description: "" },
  objective: null,
  audience: { ageMin: 25, ageMax: 45, gender: "ALL", interests: ["Fintech & Mobile Money", "Entrepreneuriat", "Commerce & PME"] },
  budget: { budgetType: "TOTAL", amount: 500000, startDate: "2025-10-15", endDate: "2025-10-29" },
  channels: [],
};

const LAST_STEP = wizardSteps.length - 1;

// StepType n'expose que 3 options (voir src/data/dashboard.ts) : leur id
// correspond 1:1 à l'enum CampaignType du backend.
const TYPE_TO_BACKEND: Record<string, CampaignType> = {
  digital: "DIGITAL",
  radio: "RADIO",
  print: "POSTER",
};

function durationInDays(start: string, end: string): number {
  const diff = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff > 0 ? diff : 1;
}

/**
 * Traduit l'état (riche, orienté UX) du wizard vers les champs exacts
 * attendus par POST /campagnes. Décisions de mapping :
 *  - "objective" (texte libre, requis) = objectif choisi à l'étape 3 +
 *    description libre de l'étape 2, si renseignée.
 *  - un budget "quotidien" est converti en budget total en le multipliant
 *    par la durée de la période sélectionnée (le backend n'a qu'un seul
 *    champ plannedBudget — l'allocation TOTAL/DAILY elle-même est transmise
 *    séparément à PUT digital-details, voir buildDigitalDetailsPayload).
 */
function buildCampagnePayload(state: WizardState): CreateCampagnePayload | null {
  const type = state.type ? TYPE_TO_BACKEND[state.type] : undefined;
  const objectiveOption = objectiveOptions.find((option) => option.id === state.objective);
  if (!type || !objectiveOption || !state.definition.name.trim()) return null;

  const days = durationInDays(state.budget.startDate, state.budget.endDate);
  const rawBudget = state.budget.budgetType === "DAILY" ? state.budget.amount * days : state.budget.amount;
  const plannedBudget = Math.min(9_999_999_999, Math.max(0.01, Math.round(rawBudget * 100) / 100));

  const objective = [objectiveOption.title, state.definition.description.trim() || objectiveOption.description]
    .join(" — ")
    .slice(0, 2000);

  return {
    name: state.definition.name.trim().slice(0, 200),
    startDate: state.budget.startDate,
    endDate: state.budget.endDate,
    plannedBudget,
    objective,
    type,
  };
}

/**
 * Détails structurés de la campagne digitale, envoyés à
 * PUT /campagnes/:id/digital-details une fois la campagne créée.
 * `targetLocations` : aucune saisie de localisation dans cette maquette —
 * tableau vide, accepté par le backend (pas de @ArrayMinSize).
 */
function buildDigitalDetailsPayload(state: WizardState): UpsertDigitalDetailsPayload | null {
  if (!state.objective) return null;
  return {
    objective: state.objective,
    ageMin: state.audience.ageMin,
    ageMax: state.audience.ageMax,
    targetGender: state.audience.gender,
    targetLocations: [],
    targetInterests: state.audience.interests,
    budgetAllocation: state.budget.budgetType,
  };
}

function buildChannelsPayload(state: WizardState): SelectDigitalChannelsPayload | null {
  if (state.channels.length === 0) return null;
  return { channels: state.channels.map((platform) => ({ platform })) };
}

export function CampaignWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<WizardState>(initialState);

  const payload = useMemo(() => buildCampagnePayload(state), [state]);
  const digitalDetailsPayload = useMemo(() => buildDigitalDetailsPayload(state), [state]);
  const channelsPayload = useMemo(() => buildChannelsPayload(state), [state]);
  const isDigital = state.type === "digital";

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

  function toggleChannel(platform: SocialPlatform) {
    setState((prev) => ({
      ...prev,
      channels: prev.channels.includes(platform)
        ? prev.channels.filter((c) => c !== platform)
        : [...prev.channels, platform],
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
            {stepIndex === 6 && (
              <StepSimulation
                payload={payload}
                digitalDetailsPayload={isDigital ? digitalDetailsPayload : null}
                channelsPayload={isDigital ? channelsPayload : null}
              />
            )}

            {stepIndex < LAST_STEP && (
              <WizardFooterNav onBack={goBack} onNext={goNext} nextDisabled={!canContinue} showBack={stepIndex > 0} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
