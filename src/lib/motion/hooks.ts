"use client";

/**
 * Dependency-free motion hooks, safe to use in the dashboard (no GSAP).
 */
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { MEDIA } from "./tokens";

function subscribeMotion(onChange: () => void) {
  const mql = window.matchMedia(MEDIA.motionOk);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** True when the user asked for reduced motion. False during SSR. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => !window.matchMedia(MEDIA.motionOk).matches,
    () => false,
  );
}

/**
 * Becomes true once the element is sufficiently visible, then stays true.
 * Uses a visibility threshold rather than a negative rootMargin, which would
 * never fire for elements at the very bottom of the page.
 */
export function useInViewOnce<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.4 },
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // Options are read once on mount on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return [ref, inView];
}

/** easeOutCubic — matches the "power3.out" feel used on the GSAP side. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number from 0 to `target` once `start` becomes true.
 * Server render and reduced motion both yield `target` directly, so the real
 * value is always what crawlers, no-JS visitors and reduced-motion users see.
 */
export function useCountUp(target: number, start: boolean, durationMs: number, delayMs = 0) {
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced || !start) return;
    let frame = 0;
    const t0 = performance.now() + delayMs;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, now - t0) / durationMs);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, durationMs, delayMs, reduced]);

  if (reduced || !hydrated) return target;
  return target * easeOut(progress);
}

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true afterwards. */
function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
