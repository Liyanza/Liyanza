"use client";

import { useCallback, useRef } from "react";

const MIN = 18;
const MAX = 65;
const MARKS = [18, 25, 35, 45, 65];

function clamp(value: number) {
  return Math.min(MAX, Math.max(MIN, value));
}

export function AgeRangeSlider({
  min,
  max,
  onChange,
}: {
  min: number;
  max: number;
  onChange: (range: [number, number]) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const valueFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return MIN;
    const rect = track.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return clamp(Math.round(MIN + ratio * (MAX - MIN)));
  }, []);

  function startDrag(thumb: "min" | "max") {
    return (event: React.PointerEvent) => {
      event.preventDefault();

      function handleMove(moveEvent: PointerEvent) {
        const value = valueFromClientX(moveEvent.clientX);
        if (thumb === "min") {
          onChange([Math.min(value, max - 5), max]);
        } else {
          onChange([min, Math.max(value, min + 5)]);
        }
      }

      function handleUp() {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
      }

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    };
  }

  const minPercent = ((min - MIN) / (MAX - MIN)) * 100;
  const maxPercent = ((max - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-dash-body">Tranche d&apos;âge sélectionnée</p>
        <p className="text-[15px] font-semibold text-orange-500">
          {min} ans — {max === MAX ? "65+ ans" : `${max} ans`}
        </p>
      </div>

      <div ref={trackRef} className="relative mt-4 h-5 w-full touch-none select-none">
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-dash-track" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-blue-500"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        {[
          { key: "min", value: min, percent: minPercent },
          { key: "max", value: max, percent: maxPercent },
        ].map((thumb) => (
          <button
            key={thumb.key}
            type="button"
            role="slider"
            aria-label={thumb.key === "min" ? "Âge minimum" : "Âge maximum"}
            aria-valuemin={MIN}
            aria-valuemax={MAX}
            aria-valuenow={thumb.value}
            onPointerDown={startDrag(thumb.key as "min" | "max")}
            className="absolute top-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
            style={{ left: `${thumb.percent}%` }}
          >
            <span className="size-2 rounded-full bg-[#006b28]" />
          </button>
        ))}
      </div>

      <div className="mt-1.5 flex justify-between text-[11px] font-semibold text-dash-muted">
        {MARKS.map((mark) => (
          <span key={mark}>{mark === MAX ? "65+ ans" : `${mark} ans`}</span>
        ))}
      </div>
    </div>
  );
}
