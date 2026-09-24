"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { useT } from "@/i18n/client";
import {
  apiCreateCampagne,
  apiCreateDigitalSimulation,
  apiSelectDigitalChannels,
  apiUpsertDigitalDetails,
  ApiError,
} from "@/lib/api/client";
import type {
  CreateCampagnePayload,
  SelectDigitalChannelsPayload,
  UpsertDigitalDetailsPayload,
} from "@/lib/api/types";

// Pas d'incrément fixe : chaque étape franchie (campagne créée, détails
// enregistrés, canaux sélectionnés, simulation lancée) fait avancer la barre
// d'un quart — reflète la progression réelle des appels plutôt qu'une
// animation déconnectée du réseau.
const STEP_PERCENT = 25;

export function StepSimulation({
  payload,
  digitalDetailsPayload,
  channelsPayload,
}: {
  payload: CreateCampagnePayload | null;
  digitalDetailsPayload: UpsertDigitalDetailsPayload | null;
  channelsPayload: SelectDigitalChannelsPayload | null;
}) {
  const router = useRouter();
  const t = useT("dashWizard");
  const common = useT("dash").common;
  const checklist = t.simulation.checklist;
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const runningRef = useRef(false);

  const isDigital = Boolean(digitalDetailsPayload && channelsPayload);
  const completedSteps = Math.floor((percent / 100) * checklist.length);

  // Chaînage `.then()` plutôt qu'async/await : appelée depuis l'effet de
  // montage, une fonction `async` dont le corps enchaîne directement
  // `await`+`setState` est détectée par `react-hooks/set-state-in-effect`
  // (rendus en cascade) même après un `await` initial — seuls les
  // `setState` isolés dans des callbacks `.then()` séparés y échappent, même
  // pattern que `SocialAccountsPanel.fetchAccounts`.
  function runSubmission(): Promise<void> {
    if (runningRef.current) return Promise.resolve();
    runningRef.current = true;

    if (!payload) {
      return Promise.resolve().then(() => {
        setError(t.errors.incomplete);
        runningRef.current = false;
      });
    }

    return apiCreateCampagne(payload)
      .then((campaign) => {
        setPercent(STEP_PERCENT);

        if (isDigital && digitalDetailsPayload && channelsPayload) {
          return apiUpsertDigitalDetails(campaign.id, digitalDetailsPayload)
            .then(() => {
              setPercent(STEP_PERCENT * 2);
              return apiSelectDigitalChannels(campaign.id, channelsPayload);
            })
            .then(() => {
              setPercent(STEP_PERCENT * 3);
              return apiCreateDigitalSimulation(campaign.id);
            })
            .then(() => {
              setPercent(100);
              router.push(`/dashboard/campagnes/${campaign.id}/resultats`);
            });
        }

        setPercent(100);
        router.push("/dashboard/campagnes");
      })
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : common.genericError);
        runningRef.current = false;
      });
  }

  useEffect(() => {
    void runSubmission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 px-5 pb-6 pt-3.5 text-center">
        <AlertTriangle className="size-8 text-red-500" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-[#101828]">{t.simulation.failed}</h2>
        <p className="max-w-sm text-sm text-gray-text-light">{error}</p>
        <button
          type="button"
          onClick={() => {
            setPercent(0);
            setError(null);
            void runSubmission();
          }}
          className="mt-2 flex items-center gap-2 rounded-full bg-green-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          {common.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-5 pb-6 pt-3.5 text-center">
      <h2 className="text-[22px] font-semibold text-[#101828]">
        {t.simulation.title1}
        <br />
        {t.simulation.title2}
      </h2>
      <p className="mt-2 text-[13px] text-gray-text-light">
        {t.simulation.text1}
        <br />
        {t.simulation.text2}
      </p>

      <div className="mt-8">
        <CircularProgress percent={percent} label={t.simulation.analysing} />
      </div>

      <div className="mt-8 flex flex-col items-start gap-3.5">
        {checklist.map((item, index) => {
          const isDone = index < completedSteps;
          return (
            <div key={item} className="flex items-center gap-3">
              <span
                className={`flex size-5 items-center justify-center rounded-full transition-colors ${
                  isDone ? "bg-[#2aa147]" : "bg-slate-200"
                }`}
              >
                {isDone && <CheckCircle2 className="size-3 text-white" aria-hidden="true" />}
              </span>
              <span className={`text-[13px] font-medium ${isDone ? "text-gray-900" : "text-gray-text-light"}`}>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
