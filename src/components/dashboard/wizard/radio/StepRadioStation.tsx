"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { radioStations } from "@/data/radioStations";
import { useT } from "@/i18n/client";

export interface RadioStationData {
  stationId: string | null;
}

export function StepRadioStation({
  value,
  onChange,
}: {
  value: RadioStationData;
  onChange: (data: RadioStationData) => void;
}) {
  const t = useT("dashWizard").radio;
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return radioStations;
    return radioStations.filter((station) => station.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="mx-auto max-w-[1215px] py-2">
      <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">
        {t.station.title}
      </h1>
      <p className="mt-1 text-sm text-dash-muted">{t.station.subtitle}</p>

      <div className="mt-4 flex items-center gap-2 rounded-full border border-border-light bg-white px-4 py-3">
        <Search className="size-3.5 shrink-0 text-dash-muted" aria-hidden="true" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t.station.search}
          className="w-full bg-transparent text-sm text-dash-heading outline-none placeholder:text-dash-muted"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {filtered.map((station) => {
          const selected = value.stationId === station.id;
          return (
            <button
              key={station.id}
              type="button"
              onClick={() => onChange({ stationId: station.id })}
              aria-pressed={selected}
              className={`flex items-center gap-3.5 rounded-2xl border-2 bg-white px-4 py-3.5 text-left shadow-[0_2px_4px_rgba(0,0,0,0.06)] transition-colors ${
                selected ? "border-blue-500" : "border-transparent hover:border-border"
              }`}
            >
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${station.avatarBg}`}>
                {station.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#111827]">{station.name}</span>
                <span className="block text-xs text-dash-muted">{t.coverage[station.coverage]}</span>
              </span>
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                  selected ? "border-blue-500" : "border-border"
                }`}
              >
                {selected && <span className="size-2 rounded-full bg-blue-500" />}
              </span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="rounded-xl border border-border-light bg-white p-6 text-center text-sm text-dash-muted">
            {t.station.empty}
          </p>
        )}
      </div>
    </div>
  );
}
