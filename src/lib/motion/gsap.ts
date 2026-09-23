"use client";

/**
 * GSAP entry point for the public site. Import GSAP only from here so the
 * plugins are registered once and every animation goes through `useMotion`,
 * which enforces prefers-reduced-motion. Never import this from dashboard
 * code: the dashboard animates with CSS and the rAF hooks in ./hooks.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { duration, ease, MEDIA } from "./tokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);
  gsap.defaults({ ease: ease.out, duration: duration.base });
}

export { gsap, ScrollTrigger };

type MotionConditions = { isDesktop: boolean };

/**
 * Runs `setup` only when the user accepts motion, and reverts everything it
 * created (tweens, ScrollTriggers) on unmount or when the media
 * conditions change. With reduced motion nothing runs, so content keeps its
 * server-rendered, fully visible state.
 */
export function useMotion(
  setup: (conditions: MotionConditions) => void | (() => void),
  config: {
    scope: RefObject<HTMLElement | null>;
    dependencies?: unknown[];
    /**
     * Re-run `setup` when crossing the desktop breakpoint. Off by default so
     * one-shot sequences (intros) don't replay on resize.
     */
    responsive?: boolean;
  },
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const queries = config.responsive
        ? { motionOk: MEDIA.motionOk, desktop: MEDIA.desktop }
        : { motionOk: MEDIA.motionOk };
      mm.add(queries, (ctx) => {
        const { motionOk, desktop } = ctx.conditions as { motionOk: boolean; desktop?: boolean };
        if (!motionOk) return;
        return setup({ isDesktop: desktop ?? window.matchMedia(MEDIA.desktop).matches });
      });
      return () => mm.revert();
    },
    { scope: config.scope, dependencies: config.dependencies ?? [] },
  );
}

/**
 * Hero stat cards are pre-hidden in CSS (see globals.css) with a failsafe
 * that reveals them if JS is slow or absent. Returns false when the failsafe
 * already fired, in which case the parts are pinned visible and the intro
 * must not replay (it would blink the content away and back).
 */
export function takeOverIntro(parts: HTMLElement[]) {
  if (!parts.length) return true;
  const alreadyShown = getComputedStyle(parts[0]).opacity === "1";
  gsap.set(parts, { animation: "none" });
  if (alreadyShown) gsap.set(parts, { opacity: 1 });
  return !alreadyShown;
}
