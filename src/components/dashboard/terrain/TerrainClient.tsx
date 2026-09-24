"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Copy, MapPin, Plus, Check, X } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import {
  apiCreatePrestation,
  apiGenerateProofLink,
  apiListCampagnes,
  apiListInstallations,
  apiListUsers,
  ApiError,
} from "@/lib/api/client";
import type { CampagneRecord, CompanyMember, InstallationRecord } from "@/lib/api/types";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

function MapLoading() {
  const t = useT("dashField").terrain;
  return <div className="flex h-full items-center justify-center text-sm text-dash-muted">{t.mapLoading}</div>;
}

const TerrainMap = dynamic(() => import("./TerrainMap").then((mod) => mod.TerrainMap), {
  ssr: false,
  loading: () => <MapLoading />,
});

const DOUALA_CENTER: [number, number] = [4.0483, 9.7]; // Centre par défaut — aucune installation n'existe encore au premier lancement.

interface NewPrestationForm {
  location: string;
  campaignId: string;
  providerId: string;
  plannedInstallationDate: string;
}

const EMPTY_FORM: NewPrestationForm = { location: "", campaignId: "", providerId: "", plannedInstallationDate: "" };

export function TerrainClient() {
  const t = useT("dashField").terrain;
  const dash = useT("dash");
  const [installations, setInstallations] = useState<InstallationRecord[]>([]);
  const [campaigns, setCampaigns] = useState<CampagneRecord[]>([]);
  const [providers, setProviders] = useState<CompanyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [addMode, setAddMode] = useState(false);
  const [pendingPoint, setPendingPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [form, setForm] = useState<NewPrestationForm>(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [linkByInstallation, setLinkByInstallation] = useState<Record<string, string>>({});
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([apiListInstallations(), apiListCampagnes({ limit: 100 }), apiListUsers()]).then(
      ([installationsResult, campagnesResult, usersResult]) => {
        setInstallations(installationsResult);
        setCampaigns(campagnesResult.items);
        setProviders(usersResult.filter((member) => member.role === "PROVIDER"));
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : t.loadError);
        setLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- messages stables, chargement unique
  }, []);

  function refreshInstallations() {
    apiListInstallations().then((result) => setInstallations(result), () => {});
  }

  function handleMapClick(lat: number, lng: number) {
    if (!addMode) return;
    setPendingPoint({ lat, lng });
  }

  function handleCancelAdd() {
    setAddMode(false);
    setPendingPoint(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  }

  function handleCreate() {
    if (!pendingPoint || !form.campaignId || !form.providerId || !form.location.trim() || !form.plannedInstallationDate) {
      setFormError(t.missingFields);
      return;
    }
    setCreating(true);
    setFormError(null);
    apiCreatePrestation(form.campaignId, {
      location: form.location.trim(),
      providerId: form.providerId,
      plannedLatitude: pendingPoint.lat,
      plannedLongitude: pendingPoint.lng,
      plannedInstallationDate: new Date(form.plannedInstallationDate).toISOString(),
    }).then(
      () => {
        setCreating(false);
        handleCancelAdd();
        refreshInstallations();
      },
      (error: unknown) => {
        setFormError(error instanceof ApiError ? error.message : t.createError);
        setCreating(false);
      }
    );
  }

  function handleGenerateLink(installationId: string) {
    setGeneratingId(installationId);
    apiGenerateProofLink(installationId).then(
      (result) => {
        setLinkByInstallation((prev) => ({ ...prev, [installationId]: result.link }));
        setGeneratingId(null);
      },
      () => setGeneratingId(null)
    );
  }

  function handleCopy(installationId: string, link: string) {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(installationId);
      setTimeout(() => setCopiedId(null), 2000);
    }, () => {});
  }

  return (
    <>
      <TopBar title={dash.titles.terrain} searchPlaceholder={t.searchPlaceholder} />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[1295px] flex-col gap-5 px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-bold text-dash-heading">{t.title}</h1>
              <p className="mt-0.5 text-sm text-dash-muted">
                {t.subtitle}
              </p>
            </div>
            {!addMode ? (
              <button
                type="button"
                onClick={() => setAddMode(true)}
                className="flex items-center gap-2 rounded-full bg-green-accent px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Plus className="size-4" aria-hidden="true" />
                {t.add}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancelAdd}
                className="flex items-center gap-2 rounded-full bg-dash-pill-bg px-5 py-2.5 text-sm font-semibold text-dash-heading"
              >
                <X className="size-4" aria-hidden="true" />
                {dash.common.cancel}
              </button>
            )}
          </div>

          {addMode && (
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 text-sm text-dash-body">
              {pendingPoint
                ? fill(t.pointPlaced, { lat: pendingPoint.lat.toFixed(4), lng: pendingPoint.lng.toFixed(4) })
                : t.clickMap}
            </div>
          )}

          {loadError && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{loadError}</p>}

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
            <div className="h-[480px] overflow-hidden rounded-2xl border border-border">
              <TerrainMap
                installations={installations}
                pendingPoint={pendingPoint}
                onMapClick={handleMapClick}
                center={
                  installations[0]
                    ? [
                        installations[0].proof?.latitude ?? installations[0].plannedLatitude,
                        installations[0].proof?.longitude ?? installations[0].plannedLongitude,
                      ]
                    : DOUALA_CENTER
                }
              />
            </div>

            <div className="flex flex-col gap-4">
              {pendingPoint && (
                <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4">
                  <h2 className="text-sm font-semibold text-dash-heading">{t.newPanel}</h2>
                  {formError && <p className="text-xs font-medium text-red-600">{formError}</p>}
                  <input
                    type="text"
                    placeholder={t.locationPlaceholder}
                    value={form.location}
                    onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                    className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-green-accent-dark"
                  />
                  <select
                    value={form.campaignId}
                    onChange={(event) => setForm((prev) => ({ ...prev, campaignId: event.target.value }))}
                    className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-green-accent-dark"
                  >
                    <option value="">{t.campaignPlaceholder}</option>
                    {campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={form.providerId}
                    onChange={(event) => setForm((prev) => ({ ...prev, providerId: event.target.value }))}
                    className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-green-accent-dark"
                  >
                    <option value="">{t.providerPlaceholder}</option>
                    {providers.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.firstName} {provider.lastName}
                      </option>
                    ))}
                  </select>
                  {providers.length === 0 && (
                    <p className="text-xs text-dash-muted">
                      {t.noProvider}
                    </p>
                  )}
                  <input
                    type="date"
                    value={form.plannedInstallationDate}
                    onChange={(event) => setForm((prev) => ({ ...prev, plannedInstallationDate: event.target.value }))}
                    className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-green-accent-dark"
                  />
                  <button
                    type="button"
                    disabled={creating}
                    onClick={handleCreate}
                    className="rounded-full bg-green-accent-dark px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {creating ? t.creating : t.create}
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4">
                <h2 className="text-sm font-semibold text-dash-heading">{fill(t.panels, { count: installations.length })}</h2>
                {loading ? (
                  <SkeletonRows rows={3} label={t.loading} />
                ) : installations.length === 0 ? (
                  <p className="text-sm text-dash-muted">{t.empty}</p>
                ) : (
                  <div className="flex max-h-[380px] flex-col gap-2 overflow-y-auto">
                    {installations.map((installation) => {
                      const link = linkByInstallation[installation.id];
                      return (
                        <div key={installation.id} className="rounded-xl border border-border-light p-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className="flex items-center gap-1.5 text-xs font-semibold text-dash-heading">
                              <MapPin className="size-3.5 shrink-0 text-dash-muted" aria-hidden="true" />
                              {installation.location}
                            </p>
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                !installation.proof
                                  ? "bg-slate-100 text-slate-500"
                                  : installation.locationMatch
                                    ? "bg-green-accent-dark/10 text-green-accent-dark"
                                    : "bg-orange-500/10 text-orange-500"
                              }`}
                            >
                              {!installation.proof ? t.pending : installation.locationMatch ? t.confirmed : t.gap}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-dash-muted">{installation.campaignName}</p>

                          {!installation.proof && (
                            <div className="mt-2">
                              {link ? (
                                <div className="flex items-center gap-1.5 rounded-lg bg-dash-canvas px-2 py-1.5">
                                  <span className="min-w-0 flex-1 truncate text-[10px] text-dash-muted">{link}</span>
                                  <button type="button" onClick={() => handleCopy(installation.id, link)} aria-label={t.copyLink} className="shrink-0 text-dash-muted">
                                    {copiedId === installation.id ? (
                                      <Check className="size-3.5 text-green-accent-dark" aria-hidden="true" />
                                    ) : (
                                      <Copy className="size-3.5" aria-hidden="true" />
                                    )}
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  disabled={generatingId === installation.id}
                                  onClick={() => handleGenerateLink(installation.id)}
                                  className="text-[11px] font-semibold text-green-accent-dark disabled:opacity-50"
                                >
                                  {generatingId === installation.id ? t.generating : t.generateLink}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
