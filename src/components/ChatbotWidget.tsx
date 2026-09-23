"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { ChatPanel } from "@/components/ChatPanel";
import { useScrolledPast } from "@/lib/motion/hooks";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  // On phones the launcher waits until the hero is scrolled past, so it never
  // covers the hero's content on arrival. Always shown from `sm` up.
  const pastHero = useScrolledPast(0.7);
  const hiddenOnPhone = !open && !pastHero;

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex flex-col gap-2 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out)] sm:bottom-6 sm:right-6 ${
        open ? "items-center" : "items-end"
      } ${hiddenOnPhone ? "max-sm:invisible max-sm:translate-y-4 max-sm:opacity-0" : ""}`}
    >
      {open ? (
        <>
          <ChatPanel />
          <button
            type="button"
            aria-label="Fermer le chat"
            onClick={() => setOpen(false)}
            className="relative flex size-16 items-center justify-center rounded-full bg-red-500 shadow-[0_2px_8px_rgba(13,31,60,0.3),0_8px_32px_rgba(0,200,83,0.45)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
          >
            <X className="size-6 text-white" aria-hidden="true" />
          </button>
        </>
      ) : (
        <>
          {/* Label hidden on phones: it covered hero content at 390px. */}
          <div className="hidden rounded-full bg-[#488bf6] px-3 py-1.5 sm:block shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)]">
            <p className="text-sm font-semibold text-white">Posez vos questions</p>
          </div>

          <button
            type="button"
            aria-label="Ouvrir le chat marketing"
            onClick={() => setOpen(true)}
            className="relative flex size-14 sm:size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-navy shadow-[0_2px_8px_rgba(13,31,60,0.3),0_8px_32px_rgba(0,200,83,0.45)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
          >
            <Sparkles className="size-6 text-white" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center">
              <span className="absolute size-4 animate-ping rounded-full bg-green-accent opacity-75" />
              <span className="relative size-3 rounded-full bg-green-accent ring-2 ring-white" />
            </span>
          </button>
        </>
      )}
    </div>
  );
}
