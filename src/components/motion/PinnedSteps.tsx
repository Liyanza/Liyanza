"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useMotion } from "@/lib/motion/gsap";
import { duration, ease, reveal, stagger } from "@/lib/motion/tokens";

/**
 * A step-by-step flow (data-step items, data-step-link connectors between
 * them, optional data-step-pulse ring inside each step).
 *
 * Desktop: the section pins mid-screen and scrolling powers the flow — each
 * step switches on with a pulse, then its connector traces to the next.
 * Phones/tablets: no pinning (hostile to touch scrolling), the steps simply
 * cascade in. The final state is always the static design.
 */
export function PinnedSteps({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(
    ({ isDesktop }) => {
      const root = ref.current;
      if (!root || ScrollTrigger.isInViewport(root)) return;
      const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
      const links = Array.from(root.querySelectorAll<HTMLElement>("[data-step-link]"));
      if (!steps.length) return;

      if (!isDesktop) {
        gsap.fromTo(
          steps,
          { opacity: 0, y: reveal.distance },
          {
            opacity: 1,
            y: 0,
            duration: duration.base,
            stagger: stagger.base,
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: root, start: reveal.start, once: true },
          },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "center center",
          end: `+=${steps.length * 160}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      steps.forEach((step, i) => {
        tl.fromTo(step, { opacity: 0.3, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1, ease: ease.out });
        const pulse = step.querySelector("[data-step-pulse]");
        if (pulse) tl.fromTo(pulse, { scale: 1, opacity: 0.9 }, { scale: 1.7, opacity: 0, duration: 1 }, "<");
        const link = links[i];
        if (link) {
          tl.fromTo(
            link,
            { scaleX: 0, opacity: 0.3, transformOrigin: "left center" },
            { scaleX: 1, opacity: 1, duration: 0.8 },
          );
        }
      });
      // Hold the finished flow on screen briefly before unpinning.
      tl.to({}, { duration: 1 });
    },
    { scope: ref, responsive: true },
  );

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
