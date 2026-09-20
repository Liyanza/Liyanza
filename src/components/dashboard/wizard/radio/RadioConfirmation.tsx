"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function RadioConfirmation({
  campaignName,
  stationName,
  budgetLabel,
  periodLabel,
  startDateLabel,
  broadcastCount,
  truncated,
}: {
  campaignName: string;
  stationName: string;
  budgetLabel: string;
  periodLabel: string;
  startDateLabel: string;
  broadcastCount: number;
  truncated: boolean;
}) {
  const router = useRouter();

  return (
    <div className="mx-auto flex max-w-[620px] flex-col items-center px-5 pb-6 pt-8 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-green-accent-dark/10">
        <CheckCircle2 className="size-8 text-green-accent-dark" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-2xl font-bold text-dash-heading">Campagne radio créée !</h2>
      <p className="mt-1.5 text-sm text-dash-muted">
        Votre campagne est prête et sera diffusée à partir du {startDateLabel}.
      </p>

      <div className="mt-6 w-full rounded-2xl border border-border bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-dash-heading">{campaignName}</h3>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
            Brouillon
          </span>
        </div>
        <p className="mt-1 text-sm text-dash-muted">{stationName}</p>
        <div className="mt-4 flex items-center gap-8 border-t border-border-light pt-4 text-left">
          <div>
            <p className="text-[11px] text-dash-muted">Budget</p>
            <p className="text-sm font-bold text-dash-heading">{budgetLabel}</p>
          </div>
          <div>
            <p className="text-[11px] text-dash-muted">Période</p>
            <p className="text-sm font-bold text-dash-heading">{periodLabel}</p>
          </div>
          <div>
            <p className="text-[11px] text-dash-muted">Diffusions planifiées</p>
            <p className="text-sm font-bold text-dash-heading">{broadcastCount}</p>
          </div>
        </div>
      </div>

      {truncated && (
        <div className="mt-3 flex w-full items-start gap-2 rounded-xl bg-orange-500/5 p-3.5 text-left text-xs text-orange-600">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            Limite technique atteinte : seules les {broadcastCount} premières diffusions ont été
            planifiées. Réduisez la fréquence ou la période pour tout couvrir.
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={() => router.push("/dashboard/monitoring")}
        className="mt-6 w-full rounded-full bg-green-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
      >
        Aller au monitoring
      </button>
      <button
        type="button"
        onClick={() => router.push("/dashboard/campagnes")}
        className="mt-3 w-full rounded-full bg-dash-pill-bg px-6 py-3.5 text-sm font-semibold text-dash-heading"
      >
        Voir la campagne
      </button>
    </div>
  );
}
