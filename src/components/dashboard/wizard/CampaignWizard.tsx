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
import { RadioWizardStepper } from "./radio/RadioWizardStepper";
import { StepRadioStation, type RadioStationData } from "./radio/StepRadioStation";
import { StepRadioSpot, type RadioSpotData } from "./radio/StepRadioSpot";
import { StepRadioFrequency, type RadioFrequencyData } from "./radio/StepRadioFrequency";
import { StepRadioRecap } from "./radio/StepRadioRecap";
import { RadioConfirmation } from "./radio/RadioConfirmation";
import { buildBroadcastSchedule } from "./radio/buildBroadcastSchedule";
import { wizardSteps, objectiveOptions } from "@/data/dashboard";
import { radioStations } from "@/data/radioStations";
import {
  apiAssociateChannels,
  apiCreateCampagne,
  apiCreateSchedule,
  ApiError,
} from "@/lib/api/client";
import type {
  CampagneRecord,
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
  radioStation: RadioStationData;
  radioSpot: RadioSpotData;
  radioFrequency: RadioFrequencyData;
}

const initialState: WizardState = {
  type: null,
  definition: { name: "", product: "", description: "" },
  objective: null,
  audience: { ageMin: 25, ageMax: 45, gender: "ALL", interests: ["Fintech & Mobile Money", "Entrepreneuriat", "Commerce & PME"] },
  budget: { budgetType: "TOTAL", amount: 500000, startDate: "2025-10-15", endDate: "2025-10-29" },
  channels: [],
  radioStation: { stationId: null },
  radioSpot: { file: null, fileName: "", durationSec: null, spotName: "" },
  radioFrequency: {
    perDay: 3,
    timeSlots: ["07h00 - 09h00", "12h00 - 14h00", "17h00 - 19h00"],
    days: ["MON", "TUE", "WED", "THU"],
    startDate: "2026-09-25",
    endDate: "2026-10-25",
  },
};

const DIGITAL_LAST_STEP = wizardSteps.length - 1;

// Flux Radio (maquette Figma "MARKETED-OSC-2026", frames
// Campagnes.CreationRadio) : 4 écrans propres (station, spot, fréquence,
// récapitulatif) + un écran de confirmation, totalement différents des
// étapes 2-6 du flux Digital — voir la note sur CampaignTypeOption.supported
// dans src/data/dashboard.ts.
const RADIO_STEP = { STATION: 1, SPOT: 2, FREQUENCY: 3, RECAP: 4, CONFIRMATION: 5 } as const;
const RADIO_LAST_STEP = RADIO_STEP.CONFIRMATION;

// StepType n'expose que 3 options (voir src/data/dashboard.ts) : leur id
// correspond 1:1 à l'enum CampaignType du backend.
const TYPE_TO_BACKEND: Record<string, CampaignType> = {
  digital: "DIGITAL",
  radio: "RADIO",
  print: "POSTER",
};

// Aucune étape "budget" n'existe dans la maquette Figma du flux radio
// (StepRadioRecap n'a pas de ligne "Budget", contrairement à son écran de
// confirmation qui en affiche un) — placeholder documenté reprenant
// exactement le montant démo de cet écran de confirmation, en attendant
// qu'une vraie étape budget soit ajoutée à ce flux.
const RADIO_DEFAULT_BUDGET = 100_000;

function durationInDays(start: string, end: string): number {
  const diff = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff > 0 ? diff : 1;
}

function formatMonthYear(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const label = date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
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

/**
 * Le catalogue de stations et le spot audio restent des données de
 * démonstration (voir src/data/radioStations.ts) — mais la campagne, le
 * canal de diffusion et le planning créés ensuite sont, eux, entièrement
 * réels : ils réutilisent le pipeline `CanauxModule`/`DiffusionsModule`
 * (`AdvertisingChannel`/`Broadcast`) déjà construit pour Radio/Affichage
 * bien avant le flux Digital, plutôt que de rester en pur mock côté
 * campagne comme la première version de ce wizard.
 */
function buildRadioCampagnePayload(state: WizardState): CreateCampagnePayload | null {
  const station = radioStations.find((s) => s.id === state.radioStation.stationId);
  const { radioSpot, radioFrequency } = state;
  if (
    !station ||
    !radioSpot.file ||
    radioFrequency.timeSlots.length === 0 ||
    radioFrequency.days.length === 0 ||
    !radioFrequency.startDate ||
    !radioFrequency.endDate
  ) {
    return null;
  }

  return {
    name: `Campagne Radio ${formatMonthYear(radioFrequency.startDate)}`.trim(),
    startDate: radioFrequency.startDate,
    endDate: radioFrequency.endDate,
    plannedBudget: RADIO_DEFAULT_BUDGET,
    objective: `Diffusion radio — ${station.name}`.slice(0, 2000),
    type: "RADIO",
  };
}

export function CampaignWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<WizardState>(initialState);
  const [radioSubmitting, setRadioSubmitting] = useState(false);
  const [radioError, setRadioError] = useState<string | null>(null);
  const [radioCampaign, setRadioCampaign] = useState<CampagneRecord | null>(null);
  const [radioBroadcastCount, setRadioBroadcastCount] = useState(0);
  const [radioTruncated, setRadioTruncated] = useState(false);

  const payload = useMemo(() => buildCampagnePayload(state), [state]);
  const digitalDetailsPayload = useMemo(() => buildDigitalDetailsPayload(state), [state]);
  const channelsPayload = useMemo(() => buildChannelsPayload(state), [state]);
  const isDigital = state.type === "digital";
  const isRadio = state.type === "radio";
  const lastStep = isRadio ? RADIO_LAST_STEP : DIGITAL_LAST_STEP;

  const canContinue = useMemo(() => {
    if (isRadio) {
      switch (stepIndex) {
        case RADIO_STEP.STATION:
          return Boolean(state.radioStation.stationId);
        case RADIO_STEP.SPOT:
          return Boolean(state.radioSpot.file);
        case RADIO_STEP.FREQUENCY:
          return (
            state.radioFrequency.timeSlots.length > 0 &&
            state.radioFrequency.days.length > 0 &&
            Boolean(state.radioFrequency.startDate) &&
            Boolean(state.radioFrequency.endDate)
          );
        default:
          return true;
      }
    }
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
  }, [isRadio, stepIndex, state]);

  async function submitRadioCampaign() {
    const radioPayload = buildRadioCampagnePayload(state);
    if (!radioPayload) {
      setRadioError("Formulaire incomplet : revenez aux étapes précédentes.");
      return;
    }
    setRadioSubmitting(true);
    setRadioError(null);
    try {
      const campaign = await apiCreateCampagne(radioPayload);

      // Un seul canal représente "la diffusion radio" de cette campagne —
      // AdvertisingChannel ne connaît que des booléens radio/poster/flyer,
      // pas un nom de station (voir CanauxModule côté backend) : le nom
      // choisi à l'étape 1 reste porté par `Campaign.objective` ci-dessus.
      const [channel] = await apiAssociateChannels(campaign.id, {
        channels: [{ radio: true, poster: false, flyer: false }],
      });

      const { broadcasts, truncated } = buildBroadcastSchedule(
        state.radioFrequency,
        state.radioSpot.durationSec,
        channel.id
      );
      if (broadcasts.length === 0) {
        throw new Error(
          "Aucune diffusion ne correspond à la période et aux jours sélectionnés."
        );
      }
      const created = await apiCreateSchedule(campaign.id, { broadcasts });

      setRadioCampaign(campaign);
      setRadioBroadcastCount(created.length);
      setRadioTruncated(truncated);
      setStepIndex(RADIO_STEP.CONFIRMATION);
    } catch (error) {
      setRadioError(error instanceof ApiError ? error.message : "Une erreur est survenue.");
    } finally {
      setRadioSubmitting(false);
    }
  }

  function goNext() {
    if (isRadio && stepIndex === RADIO_STEP.RECAP) {
      void submitRadioCampaign();
      return;
    }
    setStepIndex((index) => Math.min(lastStep, index + 1));
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

  const selectedRadioStation = radioStations.find((s) => s.id === state.radioStation.stationId);

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
            {isRadio && stepIndex >= RADIO_STEP.STATION && stepIndex < RADIO_STEP.CONFIRMATION ? (
              <RadioWizardStepper stepIndex={stepIndex - 1} />
            ) : !isRadio || stepIndex === 0 ? (
              <WizardStepper stepIndex={stepIndex} />
            ) : null}

            {stepIndex === 0 && <StepType value={state.type} onChange={(type) => setState((prev) => ({ ...prev, type }))} />}

            {!isRadio && stepIndex === 1 && (
              <StepDefinition
                data={state.definition}
                onChange={(definition) => setState((prev) => ({ ...prev, definition }))}
              />
            )}
            {!isRadio && stepIndex === 2 && (
              <StepObjective
                value={state.objective}
                onChange={(objective) => setState((prev) => ({ ...prev, objective }))}
              />
            )}
            {!isRadio && stepIndex === 3 && (
              <StepAudience data={state.audience} onChange={(audience) => setState((prev) => ({ ...prev, audience }))} />
            )}
            {!isRadio && stepIndex === 4 && (
              <StepBudget data={state.budget} onChange={(budget) => setState((prev) => ({ ...prev, budget }))} />
            )}
            {!isRadio && stepIndex === 5 && <StepChannels value={state.channels} onToggle={toggleChannel} />}
            {!isRadio && stepIndex === 6 && (
              <StepSimulation
                payload={payload}
                digitalDetailsPayload={isDigital ? digitalDetailsPayload : null}
                channelsPayload={isDigital ? channelsPayload : null}
              />
            )}

            {isRadio && stepIndex === RADIO_STEP.STATION && (
              <StepRadioStation
                value={state.radioStation}
                onChange={(radioStation) => setState((prev) => ({ ...prev, radioStation }))}
              />
            )}
            {isRadio && stepIndex === RADIO_STEP.SPOT && (
              <StepRadioSpot value={state.radioSpot} onChange={(radioSpot) => setState((prev) => ({ ...prev, radioSpot }))} />
            )}
            {isRadio && stepIndex === RADIO_STEP.FREQUENCY && (
              <StepRadioFrequency
                value={state.radioFrequency}
                onChange={(radioFrequency) => setState((prev) => ({ ...prev, radioFrequency }))}
              />
            )}
            {isRadio && stepIndex === RADIO_STEP.RECAP && (
              <StepRadioRecap
                station={state.radioStation}
                spot={state.radioSpot}
                frequency={state.radioFrequency}
                error={radioError}
              />
            )}
            {isRadio && stepIndex === RADIO_STEP.CONFIRMATION && radioCampaign && (
              <RadioConfirmation
                campaignName={radioCampaign.name}
                stationName={selectedRadioStation?.name ?? ""}
                budgetLabel={`${radioCampaign.plannedBudget.toLocaleString("fr-FR")} FCFA`}
                periodLabel={`${radioCampaign.startDate} – ${radioCampaign.endDate}`}
                startDateLabel={radioCampaign.startDate}
                broadcastCount={radioBroadcastCount}
                truncated={radioTruncated}
              />
            )}

            {stepIndex < lastStep && (
              <WizardFooterNav
                onBack={goBack}
                onNext={goNext}
                nextDisabled={!canContinue || radioSubmitting}
                nextLabel={isRadio && stepIndex === RADIO_STEP.RECAP && radioSubmitting ? "Création..." : "Continuer"}
                showBack={stepIndex > 0}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
