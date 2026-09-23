"use client";

import { useInViewOnce, useCountUp } from "@/lib/motion/hooks";
import { duration } from "@/lib/motion/tokens";

/**
 * Splits a display value such as "124 400", "+28%", "-18.5%", "85 000F" or
 * "5.8x" into prefix / number / suffix, remembering the decimal and thousands
 * separators so the animated value is formatted exactly like the original.
 */
function parse(display: string) {
  const match = display.match(/^(.*?)(\d[\d\s ]*(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, raw, suffix] = match;
  const decimalMatch = raw.match(/[.,](\d+)$/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;
  const decimalSep = decimalMatch ? raw[raw.length - decimals - 1] : ".";
  const groupSep = raw.match(/[\s ]/)?.[0] ?? "";
  const number = parseFloat(raw.replace(/[\s ]/g, "").replace(",", "."));
  return { prefix, suffix, number, decimals, decimalSep, groupSep };
}

function format(n: number, p: NonNullable<ReturnType<typeof parse>>) {
  const [int, frac] = n.toFixed(p.decimals).split(".");
  const grouped = p.groupSep ? int.replace(/\B(?=(\d{3})+(?!\d))/g, p.groupSep) : int;
  return `${p.prefix}${grouped}${frac ? p.decimalSep + frac : ""}${p.suffix}`;
}

/**
 * Rolls a figure up from 0 when it scrolls into view. The final value is
 * exposed to assistive tech and rendered on the server; only the visual
 * roll-up is aria-hidden. No GSAP: usable in the dashboard too.
 */
export function CountUp({
  value,
  className = "",
  durationMs = duration.count * 1000,
  delayMs = 0,
}: {
  value: string;
  className?: string;
  durationMs?: number;
  /** Extra wait after entering the viewport (e.g. to sync with an intro). */
  delayMs?: number;
}) {
  const parsed = parse(value);
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  const current = useCountUp(parsed?.number ?? 0, inView, durationMs, delayMs);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden="true">{format(current, parsed)}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
