import type { ReactNode } from "react";
import { Minus, Plus } from "lucide-react";

/**
 * Smooth open/close for accordion panels. Animates grid-template-rows
 * (0fr ↔ 1fr) — the one layout property here, unavoidable for content that
 * pushes what follows — plus opacity. Closed panels stay in the DOM (their
 * text remains indexable) but are `inert`, so they are skipped by keyboard
 * and assistive tech. Reduced motion: the global CSS rule makes it instant.
 */
export function Collapse({ open, id, children }: { open: boolean; id?: string; children: ReactNode }) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div
        className={`overflow-hidden transition-opacity duration-300 ease-[var(--ease-out)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/** "+" that turns into "−": the plus rotates away as the minus rotates in. */
export function ToggleIcon({
  open,
  className = "size-4",
  openClassName = "",
  strokeWidth,
}: {
  open: boolean;
  className?: string;
  /** Extra classes for the "−" (e.g. an accent colour). */
  openClassName?: string;
  strokeWidth?: number;
}) {
  const icon = "absolute transition duration-300 ease-[var(--ease-out)]";
  return (
    <span className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <Plus
        className={`${icon} ${className} ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
        strokeWidth={strokeWidth}
      />
      <Minus
        className={`${icon} ${className} ${openClassName} ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
        strokeWidth={strokeWidth}
      />
    </span>
  );
}
