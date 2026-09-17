"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lightbulb, Loader2, Sparkle } from "lucide-react";
import { scenarioResults, scenarioInsight, simulationChecklist } from "@/data/dashboard";
import { CircularProgress } from "./CircularProgress";
import { ScenarioCard } from "./ScenarioCard";
import { apiCreateCampagne, ApiError } from "@/lib/api/client";
import type { CreateCampagnePayload } from "@/lib/api/types";

export function StepSimulation({ payload }: { payload: CreateCampagnePayload | null }) {
  const router = useRouter();
  const [percent, setPercent] = useState(0);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    if (percent >= 100) return;
    const timer = setInterval(() => {
      setPercent((prev) => Math.min(100, prev + 4));
    }, 90);
    return () => clearInterval(timer);
  }, [percent]);

  const done = percent >= 100;
  const completedSteps = Math.floor((percent / 100) * simulationChecklist.length);

  if (!done) {
    return (
      <div className="flex flex-col items-center px-5 pb-6 pt-3.5 text-center">
        <h2 className="text-[22px] font-semibold text-[#101828]">
          Nous analysons et simulons
          <br />
          vos scénarios...
        </h2>
        <p className="mt-2 text-[13px] text-gray-text-light">
          Notre IA compare les performances prévisionnelles
          <br />
          pour vous proposer la meilleure stratégie.
        </p>

        <div className="mt-8">
          <CircularProgress percent={percent} label="Analyse en cours" />
        </div>

        <div className="mt-8 flex flex-col items-start gap-3.5">
          {simulationChecklist.map((item, index) => {
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

  return (
    <div className="mx-auto flex max-w-[435px] flex-col items-center pb-4">
      <div className="flex flex-col items-center pb-4 pt-5 text-center">
        <span className="mb-3 flex size-12 items-center justify-center rounded-2xl border-2 border-blue-500 bg-white">
          <Sparkle className="size-6 text-blue-500" aria-hidden="true" />
        </span>
        <p className="text-xl font-black text-gray-900">Simulation terminée !</p>
        <p className="mt-1 text-xs text-gray-text-light">Voici les résultats estimés pour vos scénarios.</p>
      </div>

      <div className="w-full">
        <ScenarioCard scenario={scenarioResults[0]} highlighted />
      </div>

      <div className="mt-4 flex w-full items-center justify-between">
        <p className="text-[15px] font-bold text-gray-800">Aperçu des scénarios</p>
        <span className="text-xs font-semibold text-green-600">Comparer →</span>
      </div>

      <div className="mt-2.5 flex w-full flex-col gap-2">
        {scenarioResults.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} highlighted={false} />
        ))}
      </div>

      <div className="mt-4 flex w-full items-start gap-3 rounded-2xl border-2 border-blue-500 bg-white/20 p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#d4e1f7]">
          <Lightbulb className="size-4 text-blue-500" aria-hidden="true" />
        </span>
        <p className="text-[12.5px] leading-[20px] text-blue-500">{scenarioInsight}</p>
      </div>

      {createError && (
        <p role="alert" className="mt-4 w-full rounded-lg bg-red-50 px-4 py-2.5 text-center text-xs font-medium text-red-600">
          {createError}
        </p>
      )}

      <button
        type="button"
        disabled={creating || !payload}
        onClick={async () => {
          if (!payload) {
            setCreateError("Formulaire incomplet : revenez aux étapes précédentes.");
            return;
          }
          setCreateError(null);
          setCreating(true);
          try {
            await apiCreateCampagne(payload);
            router.push("/dashboard/campagnes");
          } catch (error) {
            setCreateError(error instanceof ApiError ? error.message : "Une erreur est survenue.");
            setCreating(false);
          }
        }}
        className="mt-6 flex items-center gap-2 rounded-full bg-green-accent px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-opacity hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {creating && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        Créer la campagne
      </button>
    </div>
  );
}
