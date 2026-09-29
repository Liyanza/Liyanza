"use client";

import { useCallback, useRef, useState } from "react";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

const MIN = 18;
const MAX = 65;
/** Écart minimal entre les deux bornes, en années. */
const MIN_GAP = 2;
const MARKS = [18, 25, 35, 45, 55, 65];

type Thumb = "min" | "max";

const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));
const percentOf = (age: number) => ((age - MIN) / (MAX - MIN)) * 100;

/**
 * Tranche d'âge à deux poignées. Les repères sont placés à leur vraie
 * position sur la barre (pas répartis régulièrement), un clic sur la barre
 * déplace la poignée la plus proche, et les flèches du clavier ajustent la
 * poignée active (Maj : par 5 ans).
 */
export function AgeRangeSlider({
  min,
  max,
  onChange,
}: {
  min: number;
  max: number;
  onChange: (range: [number, number]) => void;
}) {
  const t = useT("dashWizard").audience.age;
  const years = (age: number) => (age === MAX ? t.max : fill(t.years, { age }));
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<Thumb | null>(null);

  const valueFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return MIN;
    const rect = track.getBoundingClientRect();
    return clamp(Math.round(MIN + ((clientX - rect.left) / rect.width) * (MAX - MIN)));
  }, []);

  const move = useCallback(
    (thumb: Thumb, value: number) => {
      if (thumb === "min") onChange([Math.min(clamp(value), max - MIN_GAP), max]);
      else onChange([min, Math.max(clamp(value), min + MIN_GAP)]);
    },
    [min, max, onChange]
  );

  function startDrag(thumb: Thumb, event: React.PointerEvent) {
    event.preventDefault();
    setDragging(thumb);
    const handleMove = (moveEvent: PointerEvent) => move(thumb, valueFromClientX(moveEvent.clientX));
    const handleUp = () => {
      setDragging(null);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }

  /** Clic sur la barre : la poignée la plus proche vient au point cliqué, puis suit le glissé. */
  function handleTrackPointerDown(event: React.PointerEvent) {
    const value = valueFromClientX(event.clientX);
    const thumb: Thumb = Math.abs(value - min) <= Math.abs(value - max) ? "min" : "max";
    move(thumb, value);
    startDrag(thumb, event);
  }

  function handleKeyDown(thumb: Thumb, event: React.KeyboardEvent) {
    const step = event.shiftKey ? 5 : 1;
    const current = thumb === "min" ? min : max;
    const next =
      event.key === "ArrowLeft" || event.key === "ArrowDown"
        ? current - step
        : event.key === "ArrowRight" || event.key === "ArrowUp"
          ? current + step
          : event.key === "Home"
            ? MIN
            : event.key === "End"
              ? MAX
              : null;
    if (next === null) return;
    event.preventDefault();
    move(thumb, next);
  }

  const minPercent = percentOf(min);
  const maxPercent = percentOf(max);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-dash-body">{t.selected}</p>
        <p className="text-[15px] font-semibold text-orange-500" aria-live="polite">
          {years(min)} — {years(max)}
        </p>
      </div>

      <div
        ref={trackRef}
        onPointerDown={handleTrackPointerDown}
        className="relative mt-5 h-6 w-full cursor-pointer touch-none select-none"
      >
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-dash-track" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-blue-500"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        {(
          [
            { key: "min", value: min, percent: minPercent, label: t.minLabel },
            { key: "max", value: max, percent: maxPercent, label: t.maxLabel },
          ] as const
        ).map((thumb) => (
          <button
            key={thumb.key}
            type="button"
            role="slider"
            aria-label={thumb.label}
            aria-valuemin={MIN}
            aria-valuemax={MAX}
            aria-valuenow={thumb.value}
            aria-valuetext={years(thumb.value)}
            onPointerDown={(event) => {
              event.stopPropagation();
              startDrag(thumb.key, event);
            }}
            onKeyDown={(event) => handleKeyDown(thumb.key, event)}
            className={`absolute top-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-blue-500 ${
              dragging === thumb.key ? "scale-110 cursor-grabbing" : ""
            }`}
            style={{ left: `${thumb.percent}%` }}
          >
            <span className="size-2.5 rounded-full bg-[#006b28]" />
            {dragging === thumb.key && (
              <span className="absolute -top-8 rounded-md bg-dash-heading px-2 py-0.5 text-[11px] font-semibold text-white">
                {thumb.value}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Repères placés à leur vraie position sur la barre. */}
      <div className="relative mt-2 h-4 text-[11px] font-semibold text-dash-muted" aria-hidden="true">
        {MARKS.map((mark, index) => (
          <span
            key={mark}
            className="absolute"
            style={{
              left: `${percentOf(mark)}%`,
              transform: index === 0 ? "none" : index === MARKS.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
            }}
          >
            {years(mark)}
          </span>
        ))}
      </div>
    </div>
  );
}
