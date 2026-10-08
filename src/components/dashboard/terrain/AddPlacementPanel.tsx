"use client";

import { useEffect, useState } from "react";
import { Loader2, MousePointerClick, X } from "lucide-react";
import { apiCreatePrestation, ApiError } from "@/lib/api/client";
import type { CampagneRecord, CompanyMember } from "@/lib/api/types";
import { reversePlace } from "@/lib/geocoding";
import { useT } from "@/i18n/client";

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Ajout d'un emplacement : point placé sur la carte (nom du lieu proposé
 * automatiquement), campagne, date de pose et, si l'entreprise en a, un
 * prestataire. Sans prestataire, la preuve arrive par le lien de preuve.
 */
export function AddPlacementPanel({
  point,
  campaigns,
  providers,
  defaultCampaignId,
  onCreated,
  onCancel,
}: {
  point: { lat: number; lng: number } | null;
  campaigns: CampagneRecord[];
  providers: CompanyMember[];
  defaultCampaignId?: string;
  onCreated: () => void;
  onCancel: () => void;
}) {
  const t = useT("dashField").terrain;
  const common = useT("dash").common;
  const [location, setLocation] = useState("");
  const [locationEdited, setLocationEdited] = useState(false);
  const [campaignId, setCampaignId] = useState(defaultCampaignId ?? "");
  const [providerId, setProviderId] = useState("");
  const [date, setDate] = useState(todayIso());
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Propose le nom du lieu à chaque nouveau point, sauf si l'utilisateur l'a saisi.
  useEffect(() => {
    if (!point || locationEdited) return;
    const controller = new AbortController();
    reversePlace(point.lat, point.lng, controller.signal)
      .then((label) => label && setLocation(label))
      .catch(() => {});
    return () => controller.abort();
  }, [point, locationEdited]);

  function create() {
    if (!point || !campaignId || !location.trim() || !date) {
      setError(t.missingFields);
      return;
    }
    setCreating(true);
    setError(null);
    apiCreatePrestation(campaignId, {
      location: location.trim(),
      ...(providerId && { providerId }),
      plannedLatitude: point.lat,
      plannedLongitude: point.lng,
      plannedInstallationDate: new Date(`${date}T09:00:00`).toISOString(),
    }).then(
      () => {
        setCreating(false);
        onCreated();
      },
      (err: unknown) => {
        setError(err instanceof ApiError ? err.message : t.createError);
        setCreating(false);
      }
    );
  }

  const openCampaigns = campaigns.filter((c) => c.status !== "COMPLETED" && c.status !== "CANCELLED");
  const field = "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-green-accent-dark";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-dash-heading">{t.newPanel}</h2>
        <button
          type="button"
          onClick={onCancel}
          aria-label={common.cancel}
          className="flex size-8 items-center justify-center rounded-full bg-dash-canvas text-dash-muted hover:text-dash-heading"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      {!point ? (
        <p className="flex items-start gap-2 rounded-xl bg-blue-500/5 p-3 text-xs text-dash-body">
          <MousePointerClick className="mt-0.5 size-4 shrink-0 text-blue-500" aria-hidden="true" />
          {t.clickMap}
        </p>
      ) : (
        <>
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
          <label className="flex flex-col gap-1 text-[11px] font-semibold text-dash-muted">
            {t.locationLabel}
            <input
              type="text"
              placeholder={t.locationPlaceholder}
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                setLocationEdited(true);
              }}
              className={field}
            />
          </label>
          <label className="flex flex-col gap-1 text-[11px] font-semibold text-dash-muted">
            {t.campaignLabel}
            <select value={campaignId} onChange={(event) => setCampaignId(event.target.value)} className={field}>
              <option value="">{t.campaignPlaceholder}</option>
              {openCampaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[11px] font-semibold text-dash-muted">
            {t.dateLabel}
            <input type="date" min={todayIso()} value={date} onChange={(event) => setDate(event.target.value)} className={field} />
          </label>
          <label className="flex flex-col gap-1 text-[11px] font-semibold text-dash-muted">
            {t.providerLabel}
            <select value={providerId} onChange={(event) => setProviderId(event.target.value)} className={field}>
              <option value="">{t.providerNone}</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.firstName} {provider.lastName}
                </option>
              ))}
            </select>
            <span className="font-normal">{t.providerHint}</span>
          </label>
          <button
            type="button"
            disabled={creating}
            onClick={create}
            className="flex items-center justify-center gap-2 rounded-full bg-green-accent-dark px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {creating && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {creating ? t.creating : t.create}
          </button>
        </>
      )}
    </div>
  );
}
