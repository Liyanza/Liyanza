"use client";

/**
 * GSAP entry point for the public site. Import GSAP only from here so the
 * plugins are registered once and every animation goes through `useMotion`,
 * which enforces prefers-reduced-motion. Never import this from dashboard
 * code: the dashboard animates with CSS and the rAF hooks in ./hooks.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { duration, ease, MEDIA } from "./tokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);
  gsap.defaults({ ease: ease.out, duration: duration.base });
}

export { gsap, ScrollTrigger, SplitText };

type MotionConditions = { isDesktop: boolean };

/**
 * Runs `setup` only when the user accepts motion, and reverts everything it
 * created (tweens, ScrollTriggers, SplitText) on unmount or when the media
 * conditions change. With reduced motion nothing runs, so content keeps its
 * server-rendered, fully visible state.
 */
export function useMotion(
  setup: (conditions: MotionConditions) => void | (() => void),
  config: { scope: RefObject<HTMLElement | null>; dependencies?: unknown[] },
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motionOk: MEDIA.motionOk, desktop: MEDIA.desktop }, (ctx) => {
        const { motionOk, desktop } = ctx.conditions as { motionOk: boolean; desktop: boolean };
        if (!motionOk) return;
        return setup({ isDesktop: desktop });
      });
      return () => mm.revert();
    },
    { scope: config.scope, dependencies: config.dependencies ?? [] },
  );
}

/**
 * Hero intros are pre-hidden in CSS ([data-motion-intro], see globals.css) to
 * avoid a flash before hydration, with a CSS failsafe that reveals them if JS
 * never runs. Call this before animating them so GSAP takes over from the
 * failsafe.
 */
export function takeOverIntro(targets: gsap.TweenTarget) {
  gsap.set(targets, { animation: "none" });
}
