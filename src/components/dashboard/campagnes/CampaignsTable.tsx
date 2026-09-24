"use client";

import { useState } from "react";
import { Eye, SearchX } from "lucide-react";
import type { CampagneRecord, CampaignStatus } from "@/lib/api/types";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";
import { useAuth } from "@/context/AuthContext";
import { apiLancerCampagne, ApiError } from "@/lib/api/client";
import { Link } from "@/i18n/navigation";
import { useFormat, useT } from "@/i18n/client";

const TYPE_COLORS: Record<CampagneRecord["type"], string> = {
  DIGITAL: "#3b82f6",
  RADIO: "#f97316",
  POSTER: "#8b5cf6",
};

// Couleur d'avatar dérivée du nom : aucune donnée backend équivalente, mais
// stable (même campagne = même couleur à chaque rendu) grâce au hash de l'id.
const AVATAR_COLORS = ["#3b82f6", "#00a846", "#f97316", "#8b5cf6", "#e93c16"];

// Miroir de `CampaignStateMachine` (Liyanza-backend,
// src/modules/campagnes/state/campaign-state-machine.ts) — uniquement pour
// décider quels boutons proposer. Le backend revalide systématiquement la
// transition ; un décalage ici n'est qu'un bouton en trop, jamais une faille.
interface Transition {
  status: CampaignStatus;
  /** Clé du libellé dans dashCampaigns.table.transitions. */
  label: "launch" | "start" | "complete" | "cancel";
  tone: "primary" | "danger";
}

const NEXT_TRANSITIONS: Record<CampaignStatus, Transition[]> = {
  DRAFT: [
    { status: "PLANNED", label: "launch", tone: "primary" },
    { status: "CANCELLED", label: "cancel", tone: "danger" },
  ],
  PLANNED: [
    { status: "IN_PROGRESS", label: "start", tone: "primary" },
    { status: "CANCELLED", label: "cancel", tone: "danger" },
  ],
  IN_PROGRESS: [
    { status: "COMPLETED", label: "complete", tone: "primary" },
    { status: "CANCELLED", label: "cancel", tone: "danger" },
  ],
  COMPLETED: [],
  CANCELLED: [],
};

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

function colorFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function CampaignsTable({
  rows,
  title,
  description,
  viewAllHref,
  onChanged,
}: {
  rows: CampagneRecord[];
  title?: string;
  description?: string;
  viewAllHref?: string;
  /** Rappelée après une transition de statut réussie, pour que la page
   * hôte (liste complète ou aperçu Accueil) rafraîchisse ses propres
   * données (KPI, compteurs par onglet...). */
  onChanged?: () => void;
}) {
  const t = useT("dashCampaigns").table;
  const dash = useT("dash");
  const f = useFormat();
  const shortDate = (iso: string) => f.date(iso, { day: "numeric", month: "short", year: "numeric" });
  const { user } = useAuth();
  const canManage = user?.role === "ADMIN" || user?.role === "MARKETING_MANAGER";
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  function handleTransition(campaignId: string, status: CampaignStatus) {
    if (status === "CANCELLED" && !window.confirm(t.confirmCancel)) return;

    setPendingId(campaignId);
    setRowErrors((prev) => ({ ...prev, [campaignId]: "" }));
    apiLancerCampagne(campaignId, status).then(
      () => {
        setPendingId(null);
        onChanged?.();
      },
      (error: unknown) => {
        setRowErrors((prev) => ({
          ...prev,
          [campaignId]: error instanceof ApiError ? error.message : t.statusError,
        }));
        setPendingId(null);
      }
    );
  }

  return (
    <div className="overflow-hidden rounded-[5px] border border-border bg-white">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ecfdf5]">
            <Eye className="size-3.5 text-green-accent-dark" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-black">{title ?? t.title}</h2>
            <p className="text-[11px] text-gray-text">{description ?? t.description}</p>
          </div>
        </div>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-xs font-semibold text-green-accent-dark">
            {t.viewAll}
          </Link>
        )}
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
          <SearchX className="size-8 text-gray-text-light" aria-hidden="true" />
          <p className="text-sm font-semibold text-black">{t.emptyTitle}</p>
          <p className="text-xs text-gray-text">{t.emptyText}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold text-gray-text">
                <th className="px-5 py-2.5">{t.headers.campaign}</th>
                <th className="px-5 py-2.5">{t.headers.type}</th>
                <th className="px-5 py-2.5">{t.headers.status}</th>
                <th className="px-5 py-2.5">{t.headers.budget}</th>
                <th className="px-5 py-2.5">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const transitions = canManage ? NEXT_TRANSITIONS[row.status] : [];
                const isPending = pendingId === row.id;
                const rowError = rowErrors[row.id];
                return (
                  <tr key={row.id} className="border-t border-border-light">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[9px] font-black text-white"
                          style={{ backgroundColor: colorFor(row.id) }}
                        >
                          {initialsOf(row.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-black">{row.name}</p>
                          <p className="truncate text-[10px] text-gray-text-light">
                            {shortDate(row.startDate)} – {shortDate(row.endDate)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1.5 text-xs text-gray-700">
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: TYPE_COLORS[row.type] }}
                          aria-hidden="true"
                        />
                        {dash.campaignTypes[row.type]}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <StatusPill status={row.status} />
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-700">{f.money(row.plannedBudget)}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {row.type === "DIGITAL" && (
                          <Link
                            href={`/dashboard/campagnes/${row.id}/resultats`}
                            className="text-xs font-semibold text-green-accent-dark hover:underline"
                          >
                            {t.view}
                          </Link>
                        )}
                        {transitions.map((transition) => (
                          <button
                            key={transition.status}
                            type="button"
                            disabled={isPending}
                            onClick={() => handleTransition(row.id, transition.status)}
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold disabled:opacity-50 ${
                              transition.tone === "primary"
                                ? "bg-green-accent-dark/10 text-green-accent-dark hover:bg-green-accent-dark/20"
                                : "text-red-600 hover:underline"
                            }`}
                          >
                            {t.transitions[transition.label]}
                          </button>
                        ))}
                        {row.type !== "DIGITAL" && transitions.length === 0 && (
                          <span className="text-xs text-gray-text-light">—</span>
                        )}
                      </div>
                      {rowError && <p className="mt-1 text-[11px] font-medium text-red-600">{rowError}</p>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
