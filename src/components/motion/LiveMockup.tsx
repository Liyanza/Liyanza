"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useMotion } from "@/lib/motion/gsap";
import { duration, ease, stagger } from "@/lib/motion/tokens";

/**
 * Turns a static product mockup into a live "instrument" when it scrolls
 * into view. Mark elements inside the mockup with data-live:
 *   item  – rows, fields, tiles, alerts: arrive in sequence
 *   fill  – progress bars: fill up from the left (scaleX)
 *   grow  – vertical chart bars: rise from their baseline (scaleY)
 *   draw  – SVG strokes: trace themselves (DrawSVG)
 *   dot   – SVG data points: pop in once the line reaches them
 *   area  – SVG area under a curve: fades in after the line
 *   badge – the verdict (e.g. "Recommandé IA"): locks on last
 * Figures use <CountUp>, which rolls up on its own when visible.
 *
 * Only transform/opacity/stroke are animated. A mockup already on screen
 * when the page loads is left as is: we never hide what was already seen.
 */
export function LiveMockup({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(
    () => {
      const root = ref.current;
      if (!root || ScrollTrigger.isInViewport(root)) return;
      const q = (kind: string) => root.querySelectorAll<Element>(`[data-live="${kind}"]`);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
        defaults: { ease: ease.out },
      });
      // Everything here ends at its natural state, so end values are explicit
      // (never read from a possibly mid-transition element) and cleared after.
      const settled: Element[] = [root];
      const add = (
        kind: string,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        at: gsap.Position,
      ) => {
        const els = q(kind);
        if (!els.length) return;
        settled.push(...els);
        tl.fromTo(els, from, to, at);
      };

      tl.fromTo(root, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: duration.base }, 0);
      add("item", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: duration.fast, stagger: stagger.tight }, 0.2);
      add(
        "fill",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: duration.slow, stagger: stagger.base },
        0.35,
      );
      add(
        "grow",
        { scaleY: 0, transformOrigin: "center bottom" },
        { scaleY: 1, duration: duration.base, stagger: stagger.tight },
        0.35,
      );
      add(
        "dot",
        { scale: 0, transformOrigin: "center" },
        { scale: 1, duration: duration.fast, stagger: 0.12, ease: ease.settle },
        0.6,
      );
      add(
        "badge",
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.5, ease: ease.settle },
        1.3,
      );

      // SVG strokes and areas keep their own resting values (dash, 0.15 alpha).
      const draws = q("draw");
      if (draws.length) tl.from(draws, { drawSVG: 0, duration: 1.2, ease: ease.inOut }, 0.35);
      const areas = q("area");
      if (areas.length) tl.from(areas, { opacity: 0, duration: duration.base }, 1.1);

      tl.eventCallback("onComplete", () => {
        gsap.set(settled, { clearProps: "opacity,transform" });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
