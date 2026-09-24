"use client";

import { useState } from "react";
import { Check, Copy, Loader2, MapPin, X } from "lucide-react";
import { apiReviewProof, ApiError } from "@/lib/api/client";
import type { InstallationRecord } from "@/lib/api/types";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

export type ProofState = "awaiting" | "pending" | "validated" | "rejected";

/** État de la preuve d'une installation, partagé avec la carte. */
export function proofState(installation: InstallationRecord): ProofState {
  const status = installation.proof?.validationStatus;
  if (!status) return "awaiting";
  if (status === "VALIDATED") return "validated";
  if (status === "REJECTED") return "rejected";
  return "pending";
}

const BADGE: Record<ProofState, string> = {
  awaiting: "bg-slate-100 text-slate-500",
  pending: "bg-blue-500/10 text-blue-600",
  validated: "bg-green-accent-dark/10 text-green-accent-dark",
  rejected: "bg-red-600/10 text-red-600",
};

/**
 * Une installation de la liste Terrain : preuve reçue (photo, écart GPS),
 * décision Valider / Refuser pour les rôles autorisés, lien de preuve à
 * (re)générer tant qu'aucune preuve acceptable n'a été reçue.
 */
export function InstallationCard({
  installation,
  canReview,
  link,
  generating,
  copied,
  onGenerateLink,
  onCopy,
  onReviewed,
}: {
  installation: InstallationRecord;
  canReview: boolean;
  link?: string;
  generating: boolean;
  copied: boolean;
  onGenerateLink: () => void;
  onCopy: (link: string) => void;
  onReviewed: () => void;
}) {
  const t = useT("dashField").terrain;
  const common = useT("dash").common;
  const f = useFormat();
  const state = proofState(installation);
  const proof = installation.proof;

  const [photoOpen, setPhotoOpen] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState<"VALIDATED" | "REJECTED" | null>(null);
  const [error, setError] = useState<string | null>(null);

  function review(decision: "VALIDATED" | "REJECTED") {
    setSubmitting(decision);
    setError(null);
    apiReviewProof(installation.id, { decision, comment: decision === "REJECTED" ? comment : undefined }).then(
      () => {
        setSubmitting(null);
        setRejecting(false);
        setComment("");
        onReviewed();
      },
      (err: unknown) => {
        setError(err instanceof ApiError ? err.message : t.reviewError);
        setSubmitting(null);
      }
    );
  }

  const distance = installation.distanceMeters !== null ? Math.round(installation.distanceMeters) : null;
  const needsLink = state === "awaiting" || state === "rejected";

  return (
    <div className="rounded-xl border border-border-light p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-dash-heading">
          <MapPin className="size-3.5 shrink-0 text-dash-muted" aria-hidden="true" />
          {installation.location}
        </p>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${BADGE[state]}`}>
          {t.statuses[state]}
        </span>
      </div>
      <p className="mt-0.5 text-[11px] text-dash-muted">{installation.campaignName}</p>

      {proof && state !== "rejected" && (
        <div className="mt-2.5 flex gap-2.5">
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            aria-label={t.enlarge}
            className="size-16 shrink-0 overflow-hidden rounded-lg bg-dash-canvas"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- photo envoyée en data URL ou URL externe, non optimisable */}
            <img src={proof.photo} alt={fill(t.photoAlt, { location: installation.location })} className="size-full object-cover" />
          </button>
          <div className="min-w-0 text-[11px] leading-snug text-dash-muted">
            <p>{fill(t.takenAt, { date: f.date(proof.takenAt, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) })}</p>
            {distance !== null && (
              <p className={installation.locationMatch ? "text-green-accent-dark" : "font-semibold text-orange-600"}>
                {fill(installation.locationMatch ? t.distanceOk : t.distanceGap, { distance })}
              </p>
            )}
          </div>
        </div>
      )}

      {state === "rejected" && proof?.validationComment && (
        <p className="mt-2 rounded-lg bg-red-50 px-2.5 py-1.5 text-[11px] text-red-700">
          {fill(t.rejectedReason, { comment: proof.validationComment })}
        </p>
      )}

      {state === "pending" && canReview && (
        <div className="mt-2.5">
          {rejecting ? (
            <div className="flex flex-col gap-2">
              <textarea
                rows={2}
                maxLength={1000}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder={t.rejectPlaceholder}
                className="w-full resize-none rounded-lg border border-border px-2.5 py-1.5 text-xs outline-none focus:border-red-400"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={submitting !== null}
                  onClick={() => review("REJECTED")}
                  className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white disabled:opacity-50"
                >
                  {submitting === "REJECTED" && <Loader2 className="size-3 animate-spin" aria-hidden="true" />}
                  {t.confirmReject}
                </button>
                <button
                  type="button"
                  disabled={submitting !== null}
                  onClick={() => setRejecting(false)}
                  className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-dash-muted hover:bg-dash-canvas"
                >
                  {common.cancel}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                disabled={submitting !== null}
                onClick={() => review("VALIDATED")}
                className="flex items-center gap-1.5 rounded-full bg-green-accent-dark px-3.5 py-1.5 text-[11px] font-semibold text-white disabled:opacity-50"
              >
                {submitting === "VALIDATED" ? (
                  <Loader2 className="size-3 animate-spin" aria-hidden="true" />
                ) : (
                  <Check className="size-3" aria-hidden="true" />
                )}
                {t.validate}
              </button>
              <button
                type="button"
                disabled={submitting !== null}
                onClick={() => setRejecting(true)}
                className="flex items-center gap-1.5 rounded-full border border-red-600/30 px-3.5 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <X className="size-3" aria-hidden="true" />
                {t.reject}
              </button>
            </div>
          )}
          {error && <p className="mt-1.5 text-[11px] font-medium text-red-600">{error}</p>}
        </div>
      )}

      {needsLink && (
        <div className="mt-2">
          {link ? (
            <div className="flex items-center gap-1.5 rounded-lg bg-dash-canvas px-2 py-1.5">
              <span className="min-w-0 flex-1 truncate text-[10px] text-dash-muted">{link}</span>
              <button type="button" onClick={() => onCopy(link)} aria-label={t.copyLink} className="shrink-0 text-dash-muted">
                {copied ? (
                  <Check className="size-3.5 text-green-accent-dark" aria-hidden="true" />
                ) : (
                  <Copy className="size-3.5" aria-hidden="true" />
                )}
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={generating}
              onClick={onGenerateLink}
              className="text-[11px] font-semibold text-green-accent-dark disabled:opacity-50"
            >
              {generating ? t.generating : state === "rejected" ? t.newLink : t.generateLink}
            </button>
          )}
        </div>
      )}

      {photoOpen && proof && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={fill(t.photoAlt, { location: installation.location })}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-6"
          onClick={() => setPhotoOpen(false)}
        >
          <button
            type="button"
            onClick={() => setPhotoOpen(false)}
            aria-label={t.closePhoto}
            className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/90 text-black"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- idem vignette */}
          <img
            src={proof.photo}
            alt={fill(t.photoAlt, { location: installation.location })}
            className="max-h-full max-w-full rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
