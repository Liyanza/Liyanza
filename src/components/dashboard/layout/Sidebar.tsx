"use client";

import { Link, usePathname } from "@/i18n/navigation";
import {
  Bell,
  Building2,
  CircleHelp,
  HomeIcon,
  MapPin,
  Megaphone,
  MessagesSquare,
  Monitor,
  Sparkles,
  FileBarChart2,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { mainNavItems, settingsNavItems, type NavItem } from "@/data/dashboard";
import { useT } from "@/i18n/client";

const icons: Record<NavItem["icon"], LucideIcon> = {
  home: HomeIcon,
  campaigns: Megaphone,
  monitoring: Monitor,
  terrain: MapPin,
  assistant: MessagesSquare,
  ai: Sparkles,
  reports: FileBarChart2,
  teams: Users,
  company: Building2,
  profile: User,
  notifications: Bell,
  help: CircleHelp,
};

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = icons[item.icon];
  const t = useT("dash").nav;

  return (
    <Link
      href={item.href}
      className={`flex w-full items-center gap-2.5 border-l-[1.678px] px-4 py-2.5 text-[12.5px] font-semibold transition-colors ${
        active
          ? "rounded-full border-green-600 bg-green-accent-dark/10 text-green-600"
          : "border-transparent text-dash-body hover:bg-slate-50"
      }`}
    >
      <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
      {t[item.key]}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const t = useT("dash").nav;

  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-dash-sidebar-border bg-white pb-6">
      <div className="flex items-center border-b border-border px-5 py-4">
        <Logo className="h-9" />
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto py-2" aria-label={t.label}>
        {mainNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href)}
          />
        ))}
        <p className="px-4 pb-1 pt-4 text-[9px] font-bold uppercase tracking-[0.1em] text-gray-text-light">
          {t.settings}
        </p>
        {settingsNavItems.map((item) => (
          <NavLink key={item.href} item={item} active={pathname.startsWith(item.href)} />
        ))}
      </nav>
    </aside>
  );
}
