"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ChevronRight, X } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { WizardStepper } from "./WizardStepper";
import { WizardFooterNav } from "./WizardFooterNav";
import { StepType } from "./steps/StepType";
import { StepDefinition, type DefinitionData } from "./steps/StepDefinition";
import { StepObjective } from "./steps/StepObjective";
import { StepAudience, type AudienceData } from "./steps/StepAudience";
import { budgetIssue, StepBudget, type BudgetData } from "./steps/StepBudget";
import { StepChannels } from "./steps/StepChannels";
import { StepSimulation } from "./steps/StepSimulation";
import { RadioWizardStepper } from "./radio/RadioWizardStepper";
import { StepRadioStation, type RadioStationData } from "./radio/StepRadioStation";
import { StepRadioSpot, type RadioSpotData } from "./radio/StepRadioSpot";
import { StepRadioFrequency, type RadioFrequencyData } from "./radio/StepRadioFrequency";
import { StepRadioRecap } from "./radio/StepRadioRecap";
import { RadioConfirmation } from "./radio/RadioConfirmation";
import { buildBroadcastSchedule } from "./radio/buildBroadcastSchedule";
import { StepPosterPlacements, type PosterPlacement } from "./poster/StepPosterPlacements";
import { StepPosterRecap } from "./poster/StepPosterRecap";
import { PosterConfirmation } from "./poster/PosterConfirmation";
import { WIZARD_STEP_COUNT } from "@/data/dashboard";
import { useFormat, useT } from "@/i18n/client";
import { fill, formatDate } from "@/i18n/format";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/dictionaries";
import { radioStations } from "@/data/radioStations";
import {
  apiAssociateChannels,
  apiCreateCampagne,
  apiCreatePrestation,
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
  /** Objectif formulé librement, en plus du type d'optimisation `objective`. */
  customObjective: string;
  audience: AudienceData;
  budget: BudgetData;
  channels: SocialPlatform[];
  radioStation: RadioStationData;
  radioSpot: RadioSpotData;
  radioFrequency: RadioFrequencyData;
  posterPlacements: PosterPlacement[];
}

/** Date locale (AAAA-MM-JJ) décalée de `days` jours à partir d'aujourd'hui. */
function isoDateFromToday(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Dates par défaut calculées à l'ouverture de l'assistant : des dates figées
// deviennent passées et proposent une campagne déjà terminée.
const createInitialState = (): WizardState => ({
  type: null,
  definition: { name: "", product: "", description: "" },
  objective: null,
  customObjective: "",
  // Aucun centre d'intérêt ni ville présélectionnés : c'est à l'utilisateur de choisir.
  audience: { ageMin: 25, ageMax: 45, gender: "ALL", interests: [], locations: [] },
  budget: { budgetType: "TOTAL", amount: 500000, startDate: isoDateFromToday(0), endDate: isoDateFromToday(14) },
  channels: [],
  radioStation: { stationId: null },
  radioSpot: { file: null, fileName: "", durationSec: null, spotName: "" },
  radioFrequency: {
    perDay: 3,
    timeSlots: ["07h00 - 09h00", "12h00 - 14h00", "17h00 - 19h00"],
    days: ["MON", "TUE", "WED", "THU"],
    startDate: isoDateFromToday(0),
    endDate: isoDateFromToday(30),
  },
  posterPlacements: [],
});

const DIGITAL_LAST_STEP = WIZARD_STEP_COUNT - 1;

// Flux Radio (maquette Figma "MARKETED-OSC-2026", frames
// Campagnes.CreationRadio) : 4 écrans propres (station, spot, fréquence,
// récapitulatif) + un écran de confirmation, totalement différents des
// étapes 2-6 du flux Digital — voir la note sur CampaignTypeOption.supported
// dans src/data/dashboard.ts.
const RADIO_STEP = { STATION: 1, SPOT: 2, FREQUENCY: 3, RECAP: 4, CONFIRMATION: 5 } as const;
const RADIO_LAST_STEP = RADIO_STEP.CONFIRMATION;

// Flux Supports publicitaires : définition et budget repris du flux
// Digital, puis les emplacements sur la carte, un récapitulatif et la
// confirmation. Chaque emplacement devient une installation suivie dans
// Terrain (preuve photo par lien ou par le prestataire).
const POSTER_STEP = { DEFINITION: 1, BUDGET: 2, PLACEMENTS: 3, RECAP: 4, CONFIRMATION: 5 } as const;

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

type WizardMessages = Messages["dashWizard"];

/** Budget total : un budget quotidien est multiplié par la durée. */
function totalBudget(budget: BudgetData): number {
  const days = durationInDays(budget.startDate, budget.endDate);
  const raw = budget.budgetType === "DAILY" ? budget.amount * days : budget.amount;
  return Math.min(9_999_999_999, Math.max(0.01, Math.round(raw * 100) / 100));
}

function buildPosterCampagnePayload(state: WizardState, t: WizardMessages): CreateCampagnePayload | null {
  const name = state.definition.name.trim();
  const product = state.definition.product.trim();
  if (!name || !product) return null;
  const objective = [fill(t.poster.objective, { product }), state.definition.description.trim()]
    .filter(Boolean)
    .join(" — ")
    .slice(0, 2000);
  return {
    name: name.slice(0, 200),
    startDate: state.budget.startDate,
    endDate: state.budget.endDate,
    plannedBudget: totalBudget(state.budget),
    objective,
    type: "POSTER",
  };
}

function formatMonthYear(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const label = formatDate(date, locale, { month: "long", year: "numeric" });
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
function buildCampagnePayload(state: WizardState, t: WizardMessages): CreateCampagnePayload | null {
  const type = state.type ? TYPE_TO_BACKEND[state.type] : undefined;
  const objectiveOption = state.objective ? t.objective.options[state.objective] : undefined;
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
    ...(state.customObjective.trim() && { customObjective: state.customObjective.trim() }),
    ageMin: state.audience.ageMin,
    ageMax: state.audience.ageMax,
    targetGender: state.audience.gender,
    targetLocations: state.audience.locations,
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
function buildRadioCampagnePayload(
  state: WizardState,
  t: WizardMessages,
  locale: Locale
): CreateCampagnePayload | null {
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
    name: fill(t.radio.campaignName, { month: formatMonthYear(radioFrequency.startDate, locale) }).trim(),
    startDate: radioFrequency.startDate,
    endDate: radioFrequency.endDate,
    plannedBudget: RADIO_DEFAULT_BUDGET,
    objective: fill(t.radio.objective, { station: station.name }).slice(0, 2000),
    type: "RADIO",
  };
}

export function CampaignWizard() {
  const t = useT("dashWizard");
  const dash = useT("dash");
  const f = useFormat();
  const [stepIndex, setStepIndex] = useState(0);
  // Direction of the last step change, so the new step slides in from it.
  const [stepDir, setStepDir] = useState<"forward" | "back">("forward");
  const [state, setState] = useState<WizardState>(createInitialState);
  const [radioSubmitting, setRadioSubmitting] = useState(false);
  const [radioError, setRadioError] = useState<string | null>(null);
  const [radioCampaign, setRadioCampaign] = useState<CampagneRecord | null>(null);
  const [radioBroadcastCount, setRadioBroadcastCount] = useState(0);
  const [radioTruncated, setRadioTruncated] = useState(false);
  const [posterSubmitting, setPosterSubmitting] = useState(false);
  const [posterError, setPosterError] = useState<string | null>(null);
  const [posterResult, setPosterResult] = useState<{ campaign: CampagneRecord; created: number } | null>(null);
  // Chaque canal choisi est lié à un compte actif (voir StepChannels).
  const [channelsReady, setChannelsReady] = useState(false);

  const payload = useMemo(() => buildCampagnePayload(state, t), [state, t]);
  const digitalDetailsPayload = useMemo(() => buildDigitalDetailsPayload(state), [state]);
  const channelsPayload = useMemo(() => buildChannelsPayload(state), [state]);
  const isDigital = state.type === "digital";
  const isRadio = state.type === "radio";
  const isPoster = state.type === "print";
  const lastStep = isRadio ? RADIO_LAST_STEP : isPoster ? POSTER_STEP.CONFIRMATION : DIGITAL_LAST_STEP;

  const canContinue = useMemo(() => {
    if (isPoster && stepIndex > 0) {
      switch (stepIndex) {
        case POSTER_STEP.DEFINITION:
          return state.definition.name.trim().length > 0 && state.definition.product.trim().length > 0;
        case POSTER_STEP.BUDGET:
          return budgetIssue(state.budget) === null;
        case POSTER_STEP.PLACEMENTS:
          return state.posterPlacements.length > 0 && state.posterPlacements.every((p) => p.location.trim() && p.date);
        default:
          return true;
      }
    }
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
        return budgetIssue(state.budget) === null;
      case 5:
        return state.channels.length > 0 && channelsReady;
      default:
        return true;
    }
  }, [isRadio, isPoster, stepIndex, state, channelsReady]);

  async function submitPosterCampaign() {
    const posterPayload = buildPosterCampagnePayload(state, t);
    if (!posterPayload || state.posterPlacements.length === 0) {
      setPosterError(t.errors.incomplete);
      return;
    }
    setPosterSubmitting(true);
    setPosterError(null);
    try {
      const campaign = await apiCreateCampagne(posterPayload);
      const kinds = new Set(state.posterPlacements.map((p) => p.kind));
      await apiAssociateChannels(campaign.id, {
        channels: [{ radio: false, poster: [...kinds].some((k) => k !== "flyers"), flyer: kinds.has("flyers") }],
      });
      // Un par un : un échec isolé ne fait pas perdre les autres emplacements.
      let created = 0;
      for (const placement of state.posterPlacements) {
        try {
          await apiCreatePrestation(campaign.id, {
            location: `${t.poster.placements.kinds[placement.kind]} — ${placement.location.trim()}`.slice(0, 250),
            plannedLatitude: placement.lat,
            plannedLongitude: placement.lng,
            plannedInstallationDate: new Date(`${placement.date}T09:00:00`).toISOString(),
          });
          created += 1;
        } catch {
          // compté comme manquant dans la confirmation
        }
      }
      setPosterResult({ campaign, created });
      setStepDir("forward");
      setStepIndex(POSTER_STEP.CONFIRMATION);
    } catch (error) {
      setPosterError(error instanceof ApiError || error instanceof Error ? error.message : dash.common.genericError);
    } finally {
      setPosterSubmitting(false);
    }
  }

  async function submitRadioCampaign() {
    const radioPayload = buildRadioCampagnePayload(state, t, f.locale);
    if (!radioPayload) {
      setRadioError(t.errors.incomplete);
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
        throw new Error(t.errors.noBroadcast);
      }
      const created = await apiCreateSchedule(campaign.id, { broadcasts });

      setRadioCampaign(campaign);
      setRadioBroadcastCount(created.length);
      setRadioTruncated(truncated);
      setStepDir("forward");
      setStepIndex(RADIO_STEP.CONFIRMATION);
    } catch (error) {
      setRadioError(
        error instanceof ApiError || error instanceof Error ? error.message : dash.common.genericError
      );
    } finally {
      setRadioSubmitting(false);
    }
  }

  function goNext() {
    if (isPoster && stepIndex === POSTER_STEP.RECAP) {
      void submitPosterCampaign();
      return;
    }
    if (isRadio && stepIndex === RADIO_STEP.RECAP) {
      void submitRadioCampaign();
      return;
    }
    setStepDir("forward");
    setStepIndex((index) => Math.min(lastStep, index + 1));
  }

  function goBack() {
    setStepDir("back");
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
  const shortDate = (iso: string) => f.date(iso, { day: "numeric", month: "short", year: "numeric" });
  const longDate = (iso: string) => f.date(iso, { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <TopBar title={dash.titles.campaigns} />
      <main className="flex-1 overflow-y-auto bg-dash-wizard-canvas">
        <div className="mx-auto flex max-w-[1295px] flex-col gap-3 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Link href="/dashboard/campagnes" className="flex items-center gap-1 font-semibold text-dash-body hover:text-black">
                <ChevronRight className="size-3 rotate-180" aria-hidden="true" />
                {dash.titles.campaigns}
              </Link>
              <span className="text-dash-muted">/</span>
              <span className="font-semibold text-dash-heading">{t.breadcrumb}</span>
            </div>
            <Link
              href="/dashboard/campagnes"
              aria-label={t.close}
              className="flex size-8 items-center justify-center rounded-full text-dash-muted hover:bg-white hover:text-black"
            >
              <X className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            {(isRadio || isPoster) && stepIndex >= 1 && stepIndex < lastStep ? (
              <RadioWizardStepper stepIndex={stepIndex - 1} />
            ) : (!isRadio && !isPoster) || stepIndex === 0 ? (
              <WizardStepper stepIndex={stepIndex} />
            ) : null}

            {/* Keyed on the step so each one mounts fresh and plays its entrance. */}
            <div key={stepIndex} className={stepDir === "back" ? "dash-step-back" : "dash-step-forward"}>
              {stepIndex === 0 && <StepType value={state.type} onChange={(type) => setState((prev) => ({ ...prev, type }))} />}

              {!isRadio && !isPoster && stepIndex === 1 && (
                <StepDefinition
                  data={state.definition}
                  onChange={(definition) => setState((prev) => ({ ...prev, definition }))}
                />
              )}
              {!isRadio && !isPoster && stepIndex === 2 && (
                <StepObjective
                  value={state.objective}
                  onChange={(objective) => setState((prev) => ({ ...prev, objective }))}
                  customObjective={state.customObjective}
                  onCustomObjectiveChange={(customObjective) => setState((prev) => ({ ...prev, customObjective }))}
                />
              )}
              {!isRadio && !isPoster && stepIndex === 3 && (
                <StepAudience data={state.audience} onChange={(audience) => setState((prev) => ({ ...prev, audience }))} />
              )}
              {!isRadio && !isPoster && stepIndex === 4 && (
                <StepBudget data={state.budget} onChange={(budget) => setState((prev) => ({ ...prev, budget }))} />
              )}
              {!isRadio && !isPoster && stepIndex === 5 && (
                <StepChannels value={state.channels} onToggle={toggleChannel} onReadyChange={setChannelsReady} />
              )}
              {!isRadio && !isPoster && stepIndex === 6 && (
                <StepSimulation
                  payload={payload}
                  digitalDetailsPayload={isDigital ? digitalDetailsPayload : null}
                  channelsPayload={isDigital ? channelsPayload : null}
                />
              )}

              {isPoster && stepIndex === POSTER_STEP.DEFINITION && (
                <StepDefinition
                  data={state.definition}
                  onChange={(definition) => setState((prev) => ({ ...prev, definition }))}
                />
              )}
              {isPoster && stepIndex === POSTER_STEP.BUDGET && (
                <StepBudget data={state.budget} onChange={(budget) => setState((prev) => ({ ...prev, budget }))} />
              )}
              {isPoster && stepIndex === POSTER_STEP.PLACEMENTS && (
                <StepPosterPlacements
                  value={state.posterPlacements}
                  onChange={(posterPlacements) => setState((prev) => ({ ...prev, posterPlacements }))}
                  defaultDate={state.budget.startDate}
                  minDate={state.budget.startDate}
                  maxDate={state.budget.endDate}
                />
              )}
              {isPoster && stepIndex === POSTER_STEP.RECAP && (
                <StepPosterRecap
                  name={state.definition.name.trim()}
                  product={state.definition.product.trim()}
                  budget={totalBudget(state.budget)}
                  startDate={state.budget.startDate}
                  endDate={state.budget.endDate}
                  placements={state.posterPlacements}
                  error={posterError}
                />
              )}
              {isPoster && stepIndex === POSTER_STEP.CONFIRMATION && posterResult && (
                <PosterConfirmation
                  campaignId={posterResult.campaign.id}
                  campaignName={posterResult.campaign.name}
                  created={posterResult.created}
                  requested={state.posterPlacements.length}
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
                  budgetLabel={f.money(radioCampaign.plannedBudget)}
                  periodLabel={`${shortDate(radioCampaign.startDate)} – ${shortDate(radioCampaign.endDate)}`}
                  startDateLabel={longDate(radioCampaign.startDate)}
                  broadcastCount={radioBroadcastCount}
                  truncated={radioTruncated}
                />
              )}
            </div>

            {stepIndex < lastStep && (
              <WizardFooterNav
                onBack={goBack}
                onNext={goNext}
                nextDisabled={!canContinue || radioSubmitting || posterSubmitting}
                nextLabel={
                  (isRadio && stepIndex === RADIO_STEP.RECAP && radioSubmitting) ||
                  (isPoster && stepIndex === POSTER_STEP.RECAP && posterSubmitting)
                    ? t.creating
                    : isPoster && stepIndex === POSTER_STEP.RECAP
                      ? t.poster.create
                      : t.continue
                }
                showBack={stepIndex > 0}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
