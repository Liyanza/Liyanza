"use client";

import { radioStations, slotLabel } from "@/data/radioStations";
import { useFormat, useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { formatDuration } from "./StepRadioSpot";
import type { RadioStationData } from "./StepRadioStation";
import type { RadioSpotData } from "./StepRadioSpot";
import type { RadioFrequencyData } from "./StepRadioFrequency";


export function StepRadioRecap({
  station,
  spot,
  frequency,
  error,
}: {
  station: RadioStationData;
  spot: RadioSpotData;
  frequency: RadioFrequencyData;
  error?: string | null;
}) {
  const t = useT("dashWizard").radio;
  const f = useFormat();
  const selectedStation = radioStations.find((s) => s.id === station.stationId);
  const dayLabels = frequency.days.map((id) => t.days[id]).join(", ");
  const longDate = (iso: string) => f.date(`${iso}T00:00:00`, { day: "numeric", month: "long", year: "numeric" });
  const period =
    frequency.startDate && frequency.endDate ? `${longDate(frequency.startDate)} – ${longDate(frequency.endDate)}` : "—";

  const rows: { label: string; value: string }[] = [
    { label: t.recap.radio, value: selectedStation?.name ?? "—" },
    { label: t.recap.period, value: period },
    { label: t.recap.spot, value: spot.fileName ? `${spot.fileName} · ${formatDuration(spot.durationSec, t.spot)}` : "—" },
    {
      label: t.recap.frequency,
      value: fill(frequency.perDay > 1 ? t.frequency.perDayMany : t.frequency.perDayOne, { count: frequency.perDay }),
    },
    {
      label: t.recap.slots,
      value: frequency.timeSlots.length > 0 ? frequency.timeSlots.map((s) => slotLabel(s, f.locale)).join(", ") : "—",
    },
    { label: t.recap.days, value: dayLabels || "—" },
    { label: t.recap.zone, value: selectedStation ? t.zones[selectedStation.coverage] : "—" },
  ];

  return (
    <div className="mx-auto max-w-[1215px] py-2">
      <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">{t.recap.title}</h1>

      <dl className="mt-6 flex flex-col divide-y divide-border-light rounded-2xl border border-border bg-white px-6">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-4">
            <dt className="text-sm text-dash-muted">{row.label}</dt>
            <dd className="text-right text-sm font-semibold text-dash-heading">{row.value}</dd>
          </div>
        ))}
      </dl>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
