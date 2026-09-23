"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useMotion } from "@/lib/motion/gsap";
import { duration, reveal, stagger as staggerTokens } from "@/lib/motion/tokens";

/**
 * Fades and lifts its content in when it scrolls into view (once).
 * With `stagger`, animates the descendants marked `data-reveal-item` in
 * sequence instead of the wrapper itself.
 *
 * Only opacity/transform are animated, and opacity (not visibility) is used on
 * purpose: content stays in the accessibility tree before it is revealed.
 * Content already on screen at load is left untouched (heroes use HeroIntro).
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
      // Already on screen at load: never hide what the user has already seen.
      if (!el || ScrollTrigger.isInViewport(el)) return;
      const items = stagger ? el.querySelectorAll("[data-reveal-item]") : null;
      const targets = items?.length ? items : el;
      // Explicit end values: reading the "current" value (gsap.from) is unsafe
      // when a CSS transition on the element is mid-flight. clearProps hands
      // the final state back to the stylesheet (no leftover transform layer).
      gsap.fromTo(
        targets,
        { opacity: 0, y: reveal.distance },
        {
          opacity: 1,
          y: 0,
          duration: duration.base,
          delay,
          stagger: stagger === true ? staggerTokens.base : stagger || 0,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: el, start: reveal.start, once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
