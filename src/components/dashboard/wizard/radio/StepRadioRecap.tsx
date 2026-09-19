import { radioStations, radioDayOptions } from "@/data/radioStations";
import type { RadioStationData } from "./StepRadioStation";
import type { RadioSpotData } from "./StepRadioSpot";
import type { RadioFrequencyData } from "./StepRadioFrequency";

function formatDateRange(start: string, end: string): string {
  if (!start || !end) return "—";
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return `${fmt(start)} – ${fmt(end)}`;
}

function formatDuration(seconds: number | null): string {
  if (seconds === null) return "—";
  const rounded = Math.round(seconds);
  return rounded < 60 ? `${rounded} sec` : `${Math.floor(rounded / 60)} min ${rounded % 60} sec`;
}

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
  const selectedStation = radioStations.find((s) => s.id === station.stationId);
  const dayLabels = frequency.days
    .map((id) => radioDayOptions.find((d) => d.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  const rows: { label: string; value: string }[] = [
    { label: "Radio", value: selectedStation?.name ?? "—" },
    { label: "Période", value: formatDateRange(frequency.startDate, frequency.endDate) },
    { label: "Spot", value: spot.fileName ? `${spot.fileName} · ${formatDuration(spot.durationSec)}` : "—" },
    { label: "Fréquence", value: `${frequency.perDay} diffusion${frequency.perDay > 1 ? "s" : ""} par jour` },
    { label: "Créneaux", value: frequency.timeSlots.length > 0 ? frequency.timeSlots.join(", ") : "—" },
    { label: "Jours", value: dayLabels || "—" },
    { label: "Zone", value: selectedStation?.coverage.replace("Couverture ", "") ?? "—" },
  ];

  return (
    <div className="mx-auto max-w-[1215px] py-2">
      <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">Récapitulatif</h1>

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
