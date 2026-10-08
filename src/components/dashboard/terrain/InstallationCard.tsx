"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Loader2, MapPin, X } from "lucide-react";
import { apiReviewProof, ApiError } from "@/lib/api/client";
import type { InstallationRecord } from "@/lib/api/types";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { PROOF_BADGE, proofState } from "./proofState";

export { proofState, type ProofState } from "./proofState";

/**
 * Fiche de l'emplacement sélectionné, posée sur la carte : photo de preuve
 * (agrandissable), écart avec l'emplacement prévu, décision Valider /
 * Refuser pour les rôles autorisés, lien de preuve tant qu'aucune preuve
 * acceptable n'a été reçue.
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
  onClose,
}: {
  installation: InstallationRecord;
  canReview: boolean;
  link?: string;
  generating: boolean;
  copied: boolean;
  onGenerateLink: () => void;
  onCopy: (link: string) => void;
  onReviewed: () => void;
  onClose: () => void;
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

  useEffect(() => {
    if (!photoOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setPhotoOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photoOpen]);

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
    <div className="flex max-h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
      {proof && (
        <button
          type="button"
          onClick={() => setPhotoOpen(true)}
          aria-label={t.enlarge}
          className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-dash-canvas"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- photo envoyée en data URL ou URL externe, non optimisable */}
          <img src={proof.photo} alt={fill(t.photoAlt, { location: installation.location })} className="size-full object-cover" />
        </button>
      )}
      <div className="flex flex-col gap-2 overflow-y-auto p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-dash-heading">
              <MapPin className="size-4 shrink-0 text-dash-muted" aria-hidden="true" />
              <span className="truncate">{installation.location}</span>
            </p>
            <p className="mt-0.5 text-xs text-dash-muted">
              {installation.campaignName} ·{" "}
              {fill(t.plannedOn, { date: f.date(installation.plannedInstallationDate, { day: "numeric", month: "long" }) })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeDetail}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-dash-canvas text-dash-muted hover:text-dash-heading"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <span className={`w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${PROOF_BADGE[state]}`}>
          {t.statuses[state]}
        </span>

        {proof && (
          <div className="text-xs leading-relaxed text-dash-muted">
            <p>{fill(t.takenAt, { date: f.date(proof.takenAt, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) })}</p>
            {distance !== null && (
              <p className={installation.locationMatch ? "text-green-accent-dark" : "font-semibold text-orange-600"}>
                {fill(installation.locationMatch ? t.distanceOk : t.distanceGap, { distance })}
              </p>
            )}
          </div>
        )}

        {state === "rejected" && proof?.validationComment && (
          <p className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs text-red-700">
            {fill(t.rejectedReason, { comment: proof.validationComment })}
          </p>
        )}

        {state === "pending" && canReview && (
          <div className="mt-1">
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
                    className="flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    {submitting === "REJECTED" && <Loader2 className="size-3 animate-spin" aria-hidden="true" />}
                    {t.confirmReject}
                  </button>
                  <button
                    type="button"
                    disabled={submitting !== null}
                    onClick={() => setRejecting(false)}
                    className="rounded-full px-3 py-2 text-xs font-semibold text-dash-muted hover:bg-dash-canvas"
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
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-green-accent-dark px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
                >
                  {submitting === "VALIDATED" ? (
                    <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Check className="size-3.5" aria-hidden="true" />
                  )}
                  {t.validate}
                </button>
                <button
                  type="button"
                  disabled={submitting !== null}
                  onClick={() => setRejecting(true)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-red-600/30 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <X className="size-3.5" aria-hidden="true" />
                  {t.reject}
                </button>
              </div>
            )}
            {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
          </div>
        )}

        {needsLink && (
          <div className="mt-1 rounded-xl bg-dash-canvas p-2.5">
            <p className="mb-1.5 text-[11px] text-dash-muted">{t.linkHint}</p>
            {link ? (
              <div className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5">
                <span className="min-w-0 flex-1 truncate text-[11px] text-dash-muted">{link}</span>
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
                className="text-xs font-semibold text-green-accent-dark disabled:opacity-50"
              >
                {generating ? t.generating : state === "rejected" ? t.newLink : t.generateLink}
              </button>
            )}
          </div>
        )}
      </div>

      {photoOpen && proof && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={fill(t.photoAlt, { location: installation.location })}
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 p-6"
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
