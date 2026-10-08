"use client";

import { forwardRef } from "react";
import { Camera, MapPin, TriangleAlert } from "lucide-react";
import type { InstallationRecord } from "@/lib/api/types";
import { useFormat, useT } from "@/i18n/client";
import { PROOF_BADGE, proofState } from "./proofState";

/** Ligne de la liste Terrain : un clic sélectionne l'emplacement (et la carte s'y rend). */
export const InstallationRow = forwardRef<
  HTMLButtonElement,
  { installation: InstallationRecord; selected: boolean; onSelect: () => void }
>(function InstallationRow({ installation, selected, onSelect }, ref) {
  const t = useT("dashField").terrain;
  const f = useFormat();
  const state = proofState(installation);
  const proof = installation.proof;
  const gap = installation.locationMatch === false;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all ${
        selected
          ? "border-green-accent-dark bg-green-accent-dark/5 shadow-[0_2px_10px_rgba(0,168,70,0.15)]"
          : "border-border-light bg-white hover:border-border hover:bg-dash-canvas"
      }`}
    >
      <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-dash-canvas">
        {proof ? (
          // eslint-disable-next-line @next/next/no-img-element -- photo envoyée en data URL ou URL externe
          <img src={proof.photo} alt="" className="size-full object-cover" />
        ) : (
          <span className="flex size-full items-center justify-center text-dash-muted">
            <Camera className="size-4" aria-hidden="true" />
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 truncate text-xs font-semibold text-dash-heading">
          <MapPin className="size-3 shrink-0 text-dash-muted" aria-hidden="true" />
          <span className="truncate">{installation.location}</span>
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-dash-muted">
          {installation.campaignName} · {f.date(installation.plannedInstallationDate, { day: "numeric", month: "short" })}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${PROOF_BADGE[state]}`}>
            {t.statuses[state]}
          </span>
          {gap && (
            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-orange-600">
              <TriangleAlert className="size-3" aria-hidden="true" />
              {t.gapBadge}
            </span>
          )}
        </span>
      </span>
    </button>
  );
});
