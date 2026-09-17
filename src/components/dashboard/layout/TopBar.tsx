"use client";

import { ChevronDown, Search } from "lucide-react";
import { currentUser } from "@/data/dashboard";

export function TopBar({
  title,
  searchPlaceholder = "Rechercher une campagne...",
  showPeriodFilter = false,
}: {
  title: string;
  searchPlaceholder?: string;
  showPeriodFilter?: boolean;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-8">
      <p className="text-[15px] font-bold text-gray-900">{title}</p>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-[220px] items-center gap-2 rounded-full border border-border bg-dash-canvas px-3 lg:w-[280px]">
          <Search className="size-3.5 shrink-0 text-gray-text-light" aria-hidden="true" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-xs text-gray-text placeholder:text-gray-text outline-none"
          />
        </div>
        {showPeriodFilter && (
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-dash-canvas px-3 py-2 text-xs font-medium text-dash-body md:flex"
          >
            7 derniers jours
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-dash-canvas"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-4 text-dash-body" aria-hidden="true">
            <path
              d="M12 2a6 6 0 0 0-6 6v3.5c0 .8-.3 1.6-.9 2.2L4 15h16l-1.1-1.3c-.6-.6-.9-1.4-.9-2.2V8a6 6 0 0 0-6-6Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M9.5 18a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="absolute -top-1 right-4 flex size-4 items-center justify-center rounded-full bg-[#e93c16] text-[9px] font-extrabold text-white">
            3
          </span>
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-extrabold text-white">
            {currentUser.initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-black">{currentUser.name}</p>
            <p className="text-[10px] text-gray-text">{currentUser.role}</p>
          </div>
          <ChevronDown className="hidden size-3 text-gray-text sm:block" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
