"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, takeOverIntro, useMotion } from "@/lib/motion/gsap";
import { ease, intro } from "@/lib/motion/tokens";

/**
 * "Boot sequence" for page heroes. Mark the parts inside with data-intro:
 *   badge   – eyebrow / logo, lights up first
 *   title   – rises out of a mask
 *   text    – supporting paragraph
 *   actions – CTA row / search form
 *   meta    – trust line, secondary chips
 *   visual  – illustration: moves only, never fades (it is the LCP element)
 *   stat    – floating stat cards: land one by one, then drift gently
 *
 * badge → meta are sequenced in CSS (globals.css) so they start at first
 * paint without waiting for hydration: animating them from JS measurably
 * delayed LCP on text-only heroes. GSAP handles what needs JS: the visual's
 * settle, the stat cards landing (synced with their CountUp) and the drift.
 */
export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(
    () => {
      const root = ref.current;
      if (!root) return;
      const parts = (role: string) =>
        Array.from(root.querySelectorAll<HTMLElement>(`[data-intro="${role}"]`));

      const visuals = parts("visual");
      if (visuals.length) gsap.from(visuals, { y: 24, scale: 0.97, duration: 1.1, delay: 0.1 });

      const stats = parts("stat");
      if (!stats.length || !takeOverIntro(stats)) return;

      const tl = gsap.timeline();
      tl.fromTo(
        stats,
        { opacity: 0, scale: 0.6, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: ease.settle, stagger: intro.statStagger },
        intro.statsAt,
      );

      // Once landed, the cards drift slightly out of phase — like live
      // readouts. The loop only runs while the hero is on screen.
      const drift = stats.map((card, i) =>
        gsap.to(card, {
          y: i % 2 ? 6 : -6,
          duration: 2.6 + i * 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
        }),
      );
      let landed = false;
      let onScreen = true;
      const sync = () => drift.forEach((t) => (landed && onScreen ? t.play() : t.pause()));
      tl.call(() => {
        landed = true;
        sync();
      });
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          onScreen = self.isActive;
          sync();
        },
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
