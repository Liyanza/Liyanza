"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, MousePointerClick, Trash2 } from "lucide-react";
import { AddressSearch } from "@/components/dashboard/terrain/AddressSearch";
import type { MapFocus } from "@/components/dashboard/terrain/TerrainMap";
import { reversePlace } from "@/lib/geocoding";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

const TerrainMap = dynamic(() => import("@/components/dashboard/terrain/TerrainMap").then((m) => m.TerrainMap), {
  ssr: false,
  loading: () => <div className="h-full bg-dash-canvas" />,
});

export const SUPPORT_KINDS = ["poster", "billboard", "banner", "rollup", "flyers"] as const;
export type SupportKind = (typeof SUPPORT_KINDS)[number];

export interface PosterPlacement {
  key: string;
  lat: number;
  lng: number;
  location: string;
  kind: SupportKind;
  /** AAAA-MM-JJ. */
  date: string;
}

/**
 * Emplacements des supports : chaque clic sur la carte ajoute un support
 * (nom du lieu proposé par géocodage inverse, type de support, date de
 * pose). Ils deviendront des emplacements suivis dans Terrain, chacun
 * attendant sa preuve photo.
 */
export function StepPosterPlacements({
  value,
  onChange,
  defaultDate,
  minDate,
  maxDate,
}: {
  value: PosterPlacement[];
  onChange: (placements: PosterPlacement[]) => void;
  defaultDate: string;
  minDate: string;
  maxDate: string;
}) {
  const t = useT("dashWizard").poster.placements;
  const [kind, setKind] = useState<SupportKind>("poster");
  const [focus, setFocus] = useState<MapFocus | null>(null);
  const seq = useRef(0);
  // Toujours la dernière liste : le géocodage répond après coup.
  const latest = useRef(value);
  useEffect(() => {
    latest.current = value;
  }, [value]);

  function add(lat: number, lng: number) {
    const key = `p${++seq.current}-${lat.toFixed(6)},${lng.toFixed(6)}`;
    const placement: PosterPlacement = {
      key,
      lat,
      lng,
      location: fill(t.pointLabel, { lat: lat.toFixed(4), lng: lng.toFixed(4) }),
      kind,
      date: defaultDate,
    };
    latest.current = [...latest.current, placement];
    onChange(latest.current);
    reversePlace(lat, lng)
      .then((label) => {
        if (!label) return;
        latest.current = latest.current.map((p) => (p.key === key ? { ...p, location: label } : p));
        onChange(latest.current);
      })
      .catch(() => {});
  }

  function update(key: string, patch: Partial<PosterPlacement>) {
    onChange(value.map((p) => (p.key === key ? { ...p, ...patch } : p)));
  }

  const field = "rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs outline-none focus:border-green-accent-dark";

  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-4 py-5">
      <div>
        <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">{t.title}</h1>
        <p className="mt-1 text-sm text-dash-body">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="min-w-[240px] flex-1">
              <AddressSearch onPick={(place) => setFocus({ lat: place.lat, lng: place.lng, zoom: 17, key: `a${++seq.current}` })} />
            </div>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={t.kindLabel}>
              {SUPPORT_KINDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={kind === k}
                  onClick={() => setKind(k)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                    kind === k ? "bg-dash-heading text-white" : "bg-white text-dash-body shadow-sm"
                  }`}
                >
                  {t.kinds[k]}
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-[460px] overflow-hidden rounded-2xl border border-border">
            <TerrainMap
              installations={[]}
              draftPoints={value.map((p, i) => ({ lat: p.lat, lng: p.lng, label: String(i + 1) }))}
              onMapClick={add}
              picking
              focus={focus}
            />
            <p className="pointer-events-none absolute left-1/2 top-3 z-[500] flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-dash-body shadow">
              <MousePointerClick className="size-3.5 text-blue-500" aria-hidden="true" />
              {fill(t.clickHint, { kind: t.kinds[kind].toLowerCase() })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <h2 className="text-sm font-semibold text-dash-heading">{fill(t.listTitle, { count: value.length })}</h2>
          {value.length === 0 ? (
            <p className="rounded-xl bg-dash-canvas p-4 text-xs leading-relaxed text-dash-muted">{t.empty}</p>
          ) : (
            <ol className="flex max-h-[470px] flex-col gap-2 overflow-y-auto">
              {value.map((p, index) => (
                <li key={p.key} className="rounded-xl border border-border-light p-2.5">
                  <div className="flex items-start gap-2">
                    <button
                      type="button"
                      onClick={() => setFocus({ lat: p.lat, lng: p.lng, zoom: 17, key: `f${++seq.current}` })}
                      aria-label={t.showOnMap}
                      className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-[11px] font-bold text-blue-600"
                    >
                      {index + 1}
                    </button>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <input
                        type="text"
                        value={p.location}
                        onChange={(event) => update(p.key, { location: event.target.value })}
                        aria-label={t.locationLabel}
                        className={`${field} font-semibold text-dash-heading`}
                      />
                      <div className="flex gap-1.5">
                        <select
                          value={p.kind}
                          onChange={(event) => update(p.key, { kind: event.target.value as SupportKind })}
                          aria-label={t.kindLabel}
                          className={`${field} flex-1`}
                        >
                          {SUPPORT_KINDS.map((k) => (
                            <option key={k} value={k}>
                              {t.kinds[k]}
                            </option>
                          ))}
                        </select>
                        <input
                          type="date"
                          value={p.date}
                          min={minDate}
                          max={maxDate}
                          onChange={(event) => update(p.key, { date: event.target.value })}
                          aria-label={t.dateLabel}
                          className={field}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onChange(value.filter((x) => x.key !== p.key))}
                      aria-label={t.remove}
                      className="mt-1 text-dash-muted hover:text-red-600"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}
          <p className="mt-1 flex items-start gap-1.5 text-[11px] leading-relaxed text-dash-muted">
            <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            {t.proofNote}
          </p>
        </div>
      </div>
    </div>
  );
}
