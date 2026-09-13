"use client";

import { useEffect, useRef, useState } from "react";

const tabs = [
  { number: "01", label: "Campagnes", href: "#campagnes" },
  { number: "02", label: "Scénarios IA", href: "#scenarios-ia" },
  { number: "03", label: "Gestion des Campagnes", href: "#gestion-campagnes" },
  { number: "04", label: "Monitoring", href: "#monitoring" },
  { number: "05", label: "Recommandations IA", href: "#recommandations-ia" },
  { number: "06", label: "Rapports", href: "#rapports" },
];

export function TabNav() {
  const [active, setActive] = useState(tabs[0].href);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

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
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <nav
      aria-label="Sections de fonctionnalités"
      className="sticky top-20 z-30 border-b border-border-light bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]"
    >
      <div className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-6">
        {tabs.map((tab) => {
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
                  ? "border-green-600 text-green-accent-dark"
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
              {tab.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
