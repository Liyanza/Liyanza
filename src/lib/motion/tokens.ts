/**
 * Single source of truth for motion timing on the JS side (GSAP, rAF hooks).
 * The CSS side mirrors these values as custom properties in globals.css
 * (--motion-* / --ease-*): keep both in sync when changing one.
 */

/** Durations in seconds (GSAP unit). */
export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  /** Number roll-ups (KPI, stats). */
  count: 1.4,
} as const;

/** GSAP ease names — "cockpit" feel: quick attack, precise settle. */
export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
  /** Instruments snapping into place. */
  snap: "expo.out",
  /** Slight overshoot for elements that "land" (stat cards). */
  settle: "back.out(1.6)",
} as const;

/** Delay between siblings in a sequence, in seconds. */
export const stagger = {
  tight: 0.06,
  base: 0.1,
  loose: 0.16,
} as const;

export const reveal = {
  /** Vertical travel for scroll reveals, in px. */
  distance: 24,
  /** ScrollTrigger start: element top reaches 85% of the viewport. */
  start: "top 85%",
} as const;

/**
 * Hero "boot sequence" timing (seconds from mount). Shared by HeroIntro and
 * FloatingStat so stat roll-ups start exactly when their card lands.
 */
export const intro = {
  statsAt: 0.7,
  statStagger: 0.12,
} as const;

export const MEDIA = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px)",
} as const;
