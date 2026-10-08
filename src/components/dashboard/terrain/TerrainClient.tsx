"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, Plus, Search, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { apiGenerateProofLink, apiListCampagnes, apiListInstallations, apiListUsers, ApiError } from "@/lib/api/client";
import type { CampagneRecord, CompanyMember, InstallationRecord } from "@/lib/api/types";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { InstallationCard } from "./InstallationCard";
import { InstallationRow } from "./InstallationRow";
import { AddPlacementPanel } from "./AddPlacementPanel";
import { AddressSearch } from "./AddressSearch";
import { proofState, type ProofState } from "./proofState";
import type { MapFocus } from "./TerrainMap";

function MapLoading() {
  const t = useT("dashField").terrain;
  return <div className="flex h-full items-center justify-center bg-dash-canvas text-sm text-dash-muted">{t.mapLoading}</div>;
}

const TerrainMap = dynamic(() => import("./TerrainMap").then((mod) => mod.TerrainMap), {
  ssr: false,
  loading: () => <MapLoading />,
});

type StateFilter = "all" | ProofState;
const FILTERS: StateFilter[] = ["all", "pending", "awaiting", "validated", "rejected"];

/** `initialCampaignId` : campagne passée dans `?campagne=` (ex. depuis l'assistant de création). */
export function TerrainClient({ initialCampaignId = "" }: { initialCampaignId?: string }) {
  const t = useT("dashField").terrain;
  const dash = useT("dash");
  const { user } = useAuth();
  const canReview = user?.role === "ADMIN" || user?.role === "MARKETING_MANAGER";

  const [installations, setInstallations] = useState<InstallationRecord[]>([]);
  const [campaigns, setCampaigns] = useState<CampagneRecord[]>([]);
  const [providers, setProviders] = useState<CompanyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [stateFilter, setStateFilter] = useState<StateFilter>("all");
  const [campaignFilter, setCampaignFilter] = useState(initialCampaignId);
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focus, setFocus] = useState<MapFocus | null>(null);
  const rowRefs = useRef(new Map<string, HTMLButtonElement>());
  // Chaque demande de vol porte une clé neuve, même vers le même point.
  const focusSeq = useRef(0);

  const [adding, setAdding] = useState(false);
  const [draftPoint, setDraftPoint] = useState<{ lat: number; lng: number } | null>(null);

  const [linkByInstallation, setLinkByInstallation] = useState<Record<string, string>>({});
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiListInstallations(),
      apiListCampagnes({ limit: 100 }),
      // La liste des membres est réservée à l'administrateur : sans elle, pas de prestataire à proposer.
      apiListUsers().catch(() => [] as CompanyMember[]),
    ]).then(
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

  const refreshInstallations = useCallback(() => {
    apiListInstallations().then((result) => setInstallations(result), () => {});
  }, []);

  const byCampaign = useMemo(
    () => (campaignFilter ? installations.filter((i) => i.campaignId === campaignFilter) : installations),
    [installations, campaignFilter]
  );
  const counts = useMemo(() => {
    const c: Record<StateFilter, number> = { all: byCampaign.length, awaiting: 0, pending: 0, validated: 0, rejected: 0 };
    for (const i of byCampaign) c[proofState(i)] += 1;
    return c;
  }, [byCampaign]);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return byCampaign.filter(
      (i) =>
        (stateFilter === "all" || proofState(i) === stateFilter) &&
        (!q || i.location.toLowerCase().includes(q) || i.campaignName.toLowerCase().includes(q))
    );
  }, [byCampaign, stateFilter, query]);

  const selected = installations.find((i) => i.id === selectedId) ?? null;

  function selectFromList(installation: InstallationRecord) {
    setAdding(false);
    setDraftPoint(null);
    setSelectedId(installation.id);
    const [lat, lng] = installation.proof
      ? [installation.proof.latitude, installation.proof.longitude]
      : [installation.plannedLatitude, installation.plannedLongitude];
    setFocus({ lat, lng, zoom: 17, key: `${installation.id}-${++focusSeq.current}` });
  }

  function selectFromMap(id: string) {
    setSelectedId(id);
    rowRefs.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function startAdding() {
    setSelectedId(null);
    setDraftPoint(null);
    setAdding(true);
  }

  function stopAdding() {
    setAdding(false);
    setDraftPoint(null);
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

  const overlay = adding ? (
    <div className="flex flex-col gap-2">
      <AddressSearch onPick={(place) => setFocus({ lat: place.lat, lng: place.lng, zoom: 17, key: `addr-${++focusSeq.current}` })} />
      <AddPlacementPanel
        point={draftPoint}
        campaigns={campaigns}
        providers={providers}
        defaultCampaignId={campaignFilter || undefined}
        onCancel={stopAdding}
        onCreated={() => {
          stopAdding();
          refreshInstallations();
        }}
      />
    </div>
  ) : selected ? (
    <InstallationCard
      key={selected.id}
      installation={selected}
      canReview={canReview}
      link={linkByInstallation[selected.id]}
      generating={generatingId === selected.id}
      copied={copiedId === selected.id}
      onGenerateLink={() => handleGenerateLink(selected.id)}
      onCopy={(link) => handleCopy(selected.id, link)}
      onReviewed={refreshInstallations}
      onClose={() => setSelectedId(null)}
    />
  ) : null;

  return (
    <>
      <TopBar title={dash.titles.terrain} />
      <main className="flex min-h-0 flex-1 flex-col bg-dash-canvas lg:flex-row lg:overflow-hidden">
        {/* ------------------------------------------------ liste */}
        <aside className="order-2 flex min-h-0 flex-col border-border bg-white lg:order-1 lg:w-[380px] lg:shrink-0 lg:border-r">
          <div className="flex flex-col gap-3 border-b border-border-light p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-base font-bold text-dash-heading">{t.title}</h1>
                <p className="mt-0.5 text-xs text-dash-muted">{t.subtitle}</p>
              </div>
              {canReview && (
                <button
                  type="button"
                  onClick={adding ? stopAdding : startAdding}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold ${
                    adding ? "bg-dash-pill-bg text-dash-heading" : "bg-green-accent text-white"
                  }`}
                >
                  {adding ? <X className="size-3.5" aria-hidden="true" /> : <Plus className="size-3.5" aria-hidden="true" />}
                  {adding ? dash.common.cancel : t.add}
                </button>
              )}
            </div>

            <label className="flex items-center gap-2 rounded-full bg-dash-canvas px-3.5 py-2">
              <Search className="size-4 shrink-0 text-dash-muted" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>

            <span className="relative">
              <select
                value={campaignFilter}
                onChange={(event) => setCampaignFilter(event.target.value)}
                aria-label={t.campaignFilter}
                className="w-full appearance-none rounded-full border border-border bg-white px-3.5 py-2 text-xs font-medium text-dash-heading outline-none"
              >
                <option value="">{t.allCampaigns}</option>
                {campaigns
                  .filter((c) => installations.some((i) => i.campaignId === c.id))
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-dash-muted" aria-hidden="true" />
            </span>

            <div className="flex flex-wrap gap-1.5" role="group" aria-label={t.stateFilter}>
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={stateFilter === filter}
                  onClick={() => setStateFilter(filter)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    stateFilter === filter ? "bg-dash-heading text-white" : "bg-dash-pill-bg text-dash-body hover:bg-border-light"
                  }`}
                >
                  {filter === "all" ? t.filterAll : t.statuses[filter]} · {counts[filter]}
                </button>
              ))}
            </div>
          </div>

          {loadError && <p className="m-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{loadError}</p>}

          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
            {loading ? (
              <SkeletonRows rows={4} label={t.loading} />
            ) : installations.length === 0 ? (
              <p className="p-4 text-center text-sm text-dash-muted">{canReview ? t.emptyManager : t.empty}</p>
            ) : visible.length === 0 ? (
              <p className="p-4 text-center text-sm text-dash-muted">{t.noMatch}</p>
            ) : (
              visible.map((installation) => (
                <InstallationRow
                  key={installation.id}
                  ref={(el) => {
                    if (el) rowRefs.current.set(installation.id, el);
                    else rowRefs.current.delete(installation.id);
                  }}
                  installation={installation}
                  selected={installation.id === selectedId}
                  onSelect={() => selectFromList(installation)}
                />
              ))
            )}
          </div>
          {!loading && installations.length > 0 && (
            <p className="border-t border-border-light px-4 py-2 text-[11px] text-dash-muted">
              {fill(t.shown, { shown: visible.length, total: installations.length })}
            </p>
          )}
        </aside>

        {/* ------------------------------------------------ carte */}
        <section className="relative order-1 h-[55vh] shrink-0 lg:order-2 lg:h-auto lg:flex-1">
          <TerrainMap
            installations={visible}
            selectedId={selectedId}
            onSelect={selectFromMap}
            draftPoints={draftPoint ? [draftPoint] : []}
            onMapClick={adding ? (lat, lng) => setDraftPoint({ lat, lng }) : undefined}
            picking={adding}
            focus={focus}
          />
          <div className="pointer-events-none absolute bottom-3 left-3 z-[500] flex flex-wrap gap-1.5 rounded-xl bg-white/90 px-2.5 py-1.5 text-[10px] font-medium text-dash-body shadow-sm backdrop-blur">
            <span className="flex items-center gap-1"><i className="inline-block size-2.5 rounded-full bg-[#94a3b8]" />{t.statuses.awaiting}</span>
            <span className="flex items-center gap-1"><i className="inline-block size-2.5 rounded-full bg-[#296bd6]" />{t.statuses.pending}</span>
            <span className="flex items-center gap-1"><i className="inline-block size-2.5 rounded-full bg-[#00a846]" />{t.statuses.validated}</span>
            <span className="flex items-center gap-1"><i className="inline-block size-2.5 rounded-full bg-[#dc2626]" />{t.statuses.rejected}</span>
          </div>
          {overlay && (
            <div className="absolute bottom-3 right-3 top-14 z-[500] hidden w-[340px] flex-col justify-end lg:flex">{overlay}</div>
          )}
        </section>

        {overlay && <div className="order-1 p-3 lg:hidden">{overlay}</div>}
      </main>
    </>
  );
}
