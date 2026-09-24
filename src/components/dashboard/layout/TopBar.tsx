"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ChevronDown, LogOut, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiListNotifications } from "@/lib/api/client";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export function TopBar({
  title,
  searchPlaceholder,
  showPeriodFilter = false,
}: {
  title: string;
  searchPlaceholder?: string;
  showPeriodFilter?: boolean;
}) {
  const { user, logout } = useAuth();
  const dash = useT("dash");
  const t = dash.topBar;
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Le total exact importe peu ici (juste la pastille du clocher) : on ne
    // remonte qu'un compteur, jamais le contenu — pas de gestion d'erreur
    // visible, un badge qui reste à 0 en cas d'échec réseau est acceptable.
    apiListNotifications({ readStatus: "UNREAD", limit: 1 }).then(
      (result) => setUnreadCount(result.total),
      () => {}
    );
  }, []);

  const displayName =
    user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.email ?? "…";
  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : (user?.email?.[0] ?? "?").toUpperCase();
  const roleLabel = user ? dash.roles[user.role] : "";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-8">
      <p className="text-[15px] font-bold text-gray-900">{title}</p>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-[220px] items-center gap-2 rounded-full border border-border bg-dash-canvas px-3 lg:w-[280px]">
          <Search className="size-3.5 shrink-0 text-gray-text-light" aria-hidden="true" />
          <input
            type="search"
            placeholder={searchPlaceholder ?? t.searchCampaign}
            className="w-full bg-transparent text-xs text-gray-text placeholder:text-gray-text outline-none"
          />
        </div>
        {showPeriodFilter && (
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-dash-canvas px-3 py-2 text-xs font-medium text-dash-body md:flex"
          >
            {t.period}
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </button>
        )}
        <LanguageSwitcher variant="dashboard" />
        <Link
          href="/dashboard/notifications"
          aria-label={unreadCount > 0 ? fill(t.notificationsUnread, { count: unreadCount }) : t.notifications}
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
          {unreadCount > 0 && (
            <span className="absolute -top-1 right-4 flex size-4 items-center justify-center rounded-full bg-[#e93c16] text-[9px] font-extrabold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2.5"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-extrabold text-white">
              {initials}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-black">{displayName}</p>
              <p className="text-[10px] text-gray-text">{roleLabel}</p>
            </div>
            <ChevronDown className="hidden size-3 text-gray-text sm:block" aria-hidden="true" />
          </button>

          {menuOpen && (
            <>
              <button
                type="button"
                aria-label={t.closeMenu}
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setMenuOpen(false)}
              />
              <div
                role="menu"
                className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-border bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  <LogOut className="size-3.5" aria-hidden="true" />
                  {t.logout}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
