import { CountUp } from "@/components/motion/CountUp";
import { Check, ChevronDown } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

const steps = [
  { label: "Définir l'objectif", state: "done" as const },
  { label: "Choisir les canaux", state: "active" as const },
  { label: "Fixer le budget", state: "upcoming" as const },
  { label: "Lancer", state: "upcoming" as const },
];

function StepCircle({ state, number }: { state: "done" | "active" | "upcoming"; number: number }) {
  if (state === "done") {
    return (
      <span className="flex size-6 items-center justify-center rounded-full bg-green-accent">
        <Check className="size-3 text-white" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="flex size-6 items-center justify-center rounded-full bg-green-accent text-[9px] font-bold text-white">
        {number}
      </span>
    );
  }
  return (
    <span className="flex size-6 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-[9px] font-bold text-gray-text">
      {number}
    </span>
  );
}

export function CampaignWizardMockup() {
  return (
    <div className="w-full max-w-[500px] overflow-hidden rounded-[5px] border border-zinc-200 bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="border-b border-zinc-200 px-5 py-4">
        <p className="text-xs font-bold text-zinc-900">Nouvelle campagne</p>
        <p className="mt-1 text-[10px] text-gray-text">
          Promo de fin d&apos;année — Facebook &amp; Instagram
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div
              key={step.label}
              data-live="item"
              className="flex flex-1 flex-col items-center gap-1 last:flex-none"
            >
              <div className="flex w-full items-center">
                <StepCircle state={step.state} number={i + 1} />
                {i < steps.length - 1 && (
                  <span
                    data-live={step.state === "done" ? "fill" : undefined}
                    className={`mx-1 h-px flex-1 ${
                      step.state === "done" ? "bg-green-accent-dark" : "bg-zinc-200"
                    }`}
                  />
                )}
              </div>
              <span className="w-full text-center text-[8px] font-medium text-zinc-900">
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div data-live="item">
          <p className="text-[9px] font-bold uppercase tracking-wide text-gray-text-light">
            Objectif
          </p>
          <div className="mt-1.5 flex items-center justify-between rounded-[5px] border border-zinc-200 bg-white px-3 py-2">
            <span className="text-xs text-zinc-900">Augmenter les conversions</span>
            <ChevronDown className="size-3.5 text-zinc-300" aria-hidden="true" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div data-live="item">
            <p className="text-[9px] font-bold uppercase tracking-wide text-gray-text-light">
              Budget
            </p>
            <div className="mt-1.5 rounded-[5px] border border-green-accent-dark bg-white px-3 py-2">
              <CountUp value="150 000 FCFA" className="text-xs text-zinc-900" />
            </div>
          </div>
          <div data-live="item">
            <p className="text-[9px] font-bold uppercase tracking-wide text-gray-text-light">
              Durée
            </p>
            <div className="mt-1.5 rounded-[5px] border border-zinc-200 bg-white px-3 py-2">
              <span className="text-xs text-zinc-900">14 jours</span>
            </div>
          </div>
        </div>

        <div data-live="item" className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-[5px] border border-green-accent-dark/30 bg-green-accent-dark/[0.08] px-3 py-1.5 text-[10px] font-semibold text-green-accent-dark">
            <FaFacebook aria-hidden="true" />
            Facebook
          </span>
          <span className="flex items-center gap-1.5 rounded-[5px] border border-green-accent-dark/10 bg-green-accent-dark/[0.08] px-3 py-1.5 text-[10px] font-semibold text-green-accent-dark">
            <FaInstagram aria-hidden="true" />
            Instagram
          </span>
          <span className="rounded-[5px] border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-semibold text-gray-text">
            + Ajouter
          </span>
        </div>
      </div>
    </div>
  );
}
