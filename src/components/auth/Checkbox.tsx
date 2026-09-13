"use client";

import { ReactNode } from "react";
import { Check } from "lucide-react";

export function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border transition ${
          checked
            ? "border-green-accent-dark bg-green-accent-dark"
            : "border-[#d4d4d8] bg-white"
        }`}
      >
        {checked && <Check className="size-3 text-white" aria-hidden="true" />}
      </button>
      <span className="text-xs leading-relaxed text-[#52525b]">{children}</span>
    </label>
  );
}
