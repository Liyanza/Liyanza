"use client";

import { useEffect } from "react";
import { Maximize2, Megaphone, SquarePen, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useT } from "@/i18n/client";
import { CopilotChat } from "./CopilotChat";
import { useCopilot } from "./CopilotProvider";

/**
 * Panneau latéral du Copilot, disponible sur toutes les pages du dashboard
 * (sauf la page plein écran, qui affiche déjà la conversation). Il se
 * superpose au contenu sans le décaler : on garde la page sous les yeux.
 */
export function CopilotPanel() {
  const t = useT("dash").copilot;
  const pathname = usePathname();
  const { panelOpen, closePanel, campaignId, selectConversation } = useCopilot();
  const onAssistantPage = pathname.startsWith("/dashboard/assistant");
  const open = panelOpen && !onAssistantPage;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closePanel]);

  if (!open) return null;

  const iconButton =
    "flex size-8 items-center justify-center rounded-lg text-dash-body transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600";

  return (
    <aside
      role="dialog"
      aria-label={t.title}
      className="fixed inset-y-0 right-0 z-40 flex w-full max-w-[440px] flex-col border-l border-border bg-white shadow-[-16px_0_48px_rgba(13,31,60,0.14)]"
    >
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-dash-heading">{t.title}</p>
          {campaignId ? (
            <p className="flex items-center gap-1 text-[11px] font-semibold text-green-700">
              <Megaphone className="size-3" aria-hidden="true" />
              {t.campaignContext}
            </p>
          ) : (
            <p className="text-[11px] text-dash-muted">{t.subtitle}</p>
          )}
        </div>
        <button type="button" onClick={() => selectConversation(null)} aria-label={t.newConversation} title={t.newConversation} className={iconButton}>
          <SquarePen className="size-4" aria-hidden="true" />
        </button>
        <Link href="/dashboard/assistant" onClick={closePanel} aria-label={t.fullScreen} title={t.fullScreen} className={iconButton}>
          <Maximize2 className="size-4" aria-hidden="true" />
        </Link>
        <button type="button" onClick={closePanel} aria-label={t.close} title={t.close} className={iconButton}>
          <X className="size-4" aria-hidden="true" />
        </button>
      </header>
      <CopilotChat variant="panel" />
    </aside>
  );
}

/** Bouton « ✦ Assistant » de l'en-tête du dashboard. */
export function CopilotButton() {
  const t = useT("dash").copilot;
  const pathname = usePathname();
  const { enabled, panelOpen, togglePanel } = useCopilot();

  if (!enabled || pathname.startsWith("/dashboard/assistant")) return null;

  return (
    <button
      type="button"
      onClick={togglePanel}
      aria-label={t.openLabel}
      aria-expanded={panelOpen}
      className={`flex h-12 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 ${
        panelOpen
          ? "bg-[#1a3460] text-white"
          : "bg-gradient-to-br from-blue-500 to-[#1a3460] text-white shadow-[0_4px_14px_rgba(26,52,96,0.3)] hover:brightness-110"
      }`}
    >
      <SparkleIcon />
      <span className="hidden md:inline">{t.open}</span>
    </button>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2zm7 12l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" />
    </svg>
  );
}
