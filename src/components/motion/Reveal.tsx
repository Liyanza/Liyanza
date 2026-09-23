"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useMotion } from "@/lib/motion/gsap";
import { duration, reveal, stagger as staggerTokens } from "@/lib/motion/tokens";

/**
 * Fades and lifts its content in when it scrolls into view (once).
 * With `stagger`, animates the descendants marked `data-reveal-item` in
 * sequence instead of the wrapper itself.
 *
 * Only opacity/transform are animated, and opacity (not visibility) is used on
 * purpose: content stays in the accessibility tree before it is revealed.
 * Meant for below-the-fold content; hero intros use [data-motion-intro].
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = false,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: boolean | number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useMotion(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? el.querySelectorAll("[data-reveal-item]") : el;
      gsap.from(targets, {
        opacity: 0,
        y: reveal.distance,
        duration: duration.base,
        delay,
        stagger: stagger === true ? staggerTokens.base : stagger || 0,
        scrollTrigger: { trigger: el, start: reveal.start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
