"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MEDIA } from "@/lib/motion/tokens";

/** Ancres des sections (identiques dans toutes les langues) ; libellés en props. */
const anchors = ["#campagnes", "#scenarios-ia", "#gestion-campagnes", "#monitoring", "#recommandations-ia", "#rapports"];
const tabs = anchors.map((href, i) => ({ number: String(i + 1).padStart(2, "0"), href }));

export function TabNav({ label, items }: { label: string; items: string[] }) {
  const [active, setActive] = useState(tabs[0].href);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const placedOnce = useRef(false);

  // Slide the underline to the active tab (transform only). The first
  // placement is instant; later ones glide. Until this runs (or without JS)
  // the active tab keeps its own border as a fallback.
  useLayoutEffect(() => {
    const place = () => {
      const link = linkRefs.current[active];
      const bar = indicatorRef.current;
      if (!link || !bar) return;
      if (!placedOnce.current) bar.style.transition = "none";
      bar.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth})`;
      if (!placedOnce.current) {
        void bar.offsetWidth; // commit the instant placement before re-enabling transitions
        bar.style.transition = "";
        placedOnce.current = true;
        navRef.current?.setAttribute("data-ready", "");
      }
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.querySelector<HTMLElement>(tab.href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const HEADER_OFFSET = 170; // sticky Navbar (80px) + sticky TabNav (~65px) + margin

    let ticking = false;
    function updateActive() {
      ticking = false;
      let current = tabs[0].href;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= HEADER_OFFSET) {
          current = tabs[i].href;
        }
      }
      setActive(current);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    }

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    linkRefs.current[active]?.scrollIntoView({
      behavior: window.matchMedia(MEDIA.motionOk).matches ? "smooth" : "auto",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label={label}
      className="group sticky top-20 z-30 border-b border-border-light bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]"
    >
      <div className="relative mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-6">
        {tabs.map((tab, i) => {
          const isActive = active === tab.href;
          return (
            <a
              key={tab.href}
              ref={(el) => {
                linkRefs.current[tab.href] = el;
              }}
              href={tab.href}
              onClick={() => setActive(tab.href)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-4 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-green-600 text-green-accent-dark group-data-[ready]:border-transparent"
                  : "border-transparent text-gray-text hover:border-border hover:text-black"
              }`}
            >
              <span
                className={`text-xs font-bold ${
                  isActive ? "text-green-600" : "text-gray-text-light"
                }`}
              >
                {tab.number}
              </span>
              {items[i]}
            </a>
          );
        })}
        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 hidden h-0.5 w-px origin-left bg-green-600 transition-transform duration-300 ease-[var(--ease-out)] group-data-[ready]:block"
        />
      </div>
    </nav>
  );
}
