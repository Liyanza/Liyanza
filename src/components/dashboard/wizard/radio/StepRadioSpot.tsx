"use client";

import { useRef } from "react";
import { Mic, Upload, X, CheckCircle2 } from "lucide-react";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import type { Messages } from "@/i18n/dictionaries";

export interface RadioSpotData {
  file: File | null;
  fileName: string;
  durationSec: number | null;
  spotName: string;
}

const MAX_SIZE_BYTES = 30 * 1024 * 1024;
const ACCEPTED_TYPES = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav"];

export function formatDuration(seconds: number | null, t: Messages["dashWizard"]["radio"]["spot"]): string {
  if (seconds === null) return "—";
  const rounded = Math.round(seconds);
  if (rounded < 60) return fill(t.seconds, { s: rounded });
  const min = Math.floor(rounded / 60);
  const sec = rounded % 60;
  return sec === 0 ? fill(t.minutes, { m: min }) : fill(t.minutesSeconds, { m: min, s: sec });
}

export function StepRadioSpot({
  value,
  onChange,
}: {
  value: RadioSpotData;
  onChange: (data: RadioSpotData) => void;
}) {
  const t = useT("dashWizard").radio.spot;
  const common = useT("dash").common;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type) && !/\.(mp3|wav)$/i.test(file.name)) {
      window.alert(t.badFormat);
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      window.alert(t.tooLarge);
      return;
    }

    // Durée réelle lue côté client (métadonnées audio du navigateur) plutôt
    // qu'une valeur inventée — aucun backend de stockage/traitement audio
    // n'existe pour ce flux (voir StepRadioSpot dans la cartographie).
    const objectUrl = URL.createObjectURL(file);
    const audio = new Audio();
    audio.addEventListener("loadedmetadata", () => {
      onChange({
        file,
        fileName: file.name,
        durationSec: Number.isFinite(audio.duration) ? audio.duration : null,
        spotName: value.spotName || file.name.replace(/\.[^.]+$/, ""),
      });
      URL.revokeObjectURL(objectUrl);
    });
    audio.src = objectUrl;
  }

  function handleDrop(event: React.DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function clearFile() {
    onChange({ file: null, fileName: "", durationSec: null, spotName: "" });
    if (inputRef.current) inputRef.current.value = "";
  }

  const hasFile = Boolean(value.file);

  return (
    <div className="mx-auto flex max-w-[1215px] flex-col items-center py-2 text-center">
      <h1 className="w-full text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading">
        {t.title}
      </h1>

      <input
        ref={inputRef}
        type="file"
        accept=".mp3,.wav,audio/mpeg,audio/wav"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {hasFile ? (
        <div className="mt-6 flex w-full items-center gap-3 rounded-2xl border-2 border-green-accent/30 bg-green-accent/5 p-6">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green-accent-dark">
            <CheckCircle2 className="size-5 text-white" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1 text-left">
            <span className="block text-sm font-semibold text-dash-heading">{value.fileName}</span>
            <span className="block text-xs text-green-accent-dark">
              {t.imported} · {formatDuration(value.durationSec, t)}
            </span>
          </span>
          <button
            type="button"
            onClick={clearFile}
            aria-label={t.remove}
            className="shrink-0 rounded-full p-1.5 text-dash-muted hover:bg-white"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="mt-6 flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border p-14"
        >
          <span className="flex size-12 items-center justify-center rounded-xl bg-dash-pill-bg">
            <Upload className="size-5 text-dash-muted" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold text-dash-heading">{t.import}</span>
          <span className="text-xs text-dash-muted">{t.formats}</span>
        </button>
      )}

      <div className="my-6 flex w-full items-center gap-3 text-xs text-dash-muted">
        <span className="h-px flex-1 bg-border-light" />
        {t.orRecord}
        <span className="h-px flex-1 bg-border-light" />
      </div>

      <button
        type="button"
        disabled
        title={common.comingSoon}
        className="flex items-center gap-2 rounded-full border-2 border-green-accent px-8 py-3 text-sm font-semibold text-dash-heading opacity-50"
      >
        <Mic className="size-4" aria-hidden="true" />
        {t.record}
      </button>

      <div className="mt-6 flex w-full flex-col gap-3 text-left">
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">{t.name}</span>
          <input
            type="text"
            value={value.spotName}
            onChange={(event) => onChange({ ...value, spotName: event.target.value })}
            placeholder={t.namePlaceholder}
            className="rounded-xl border border-border px-4 py-3 text-sm text-dash-heading outline-none focus:border-green-accent"
          />
        </label>
        <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm">
          <span className="text-dash-muted">{t.duration}</span>
          <span className="font-semibold text-dash-heading">{formatDuration(value.durationSec, t)}</span>
        </div>
      </div>
    </div>
  );
}
