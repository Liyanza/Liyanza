import Image from "next/image";
import {
  Bot,
  Cloud,
  FolderOpen,
  Home,
  Lightbulb,
  Megaphone,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Accueil", active: true },
  { icon: Megaphone, label: "Campagnes" },
  { icon: Bot, label: "Scénarios IA" },
  { icon: Cloud, label: "Monitoring" },
  { icon: FolderOpen, label: "Rapports" },
  { icon: Lightbulb, label: "Recommandations" },
];

const stats = [
  { label: "Dépenses", value: "2,45M", change: "+18%" },
  { label: "Conversions", value: "1 240", change: "+22%" },
  { label: "ROI", value: "320%", change: "+15%" },
  { label: "Audience", value: "82,6k", change: "+12%" },
];

export function MiniDashboard() {
  return (
    <div className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-2 border-b border-border-light px-4 py-3">
        <Image
          src="/kiyanza-logo-mark.svg"
          alt=""
          width={85}
          height={56}
          aria-hidden="true"
          className="h-7 w-auto"
        />
        <div>
          <p className="text-sm font-extrabold leading-none tracking-[-0.02em] text-black">
            KIYANZA
          </p>
          <p className="text-[7px] font-medium leading-none text-gray-text">
            Light your future
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="flex w-36 shrink-0 flex-col gap-0.5 border-r border-border-light p-2.5">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-medium ${
                item.active
                  ? "bg-[#e8f5e9] text-green-accent"
                  : "text-gray-text"
              }`}
            >
              <item.icon className="size-3" aria-hidden="true" />
              {item.label}
            </div>
          ))}
        </div>

        <div className="flex-1 p-3.5">
          <p className="text-[10px] text-gray-text-light">Bonjour, Aristide</p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-slate-50 p-1.5">
                <p className="text-[8px] text-gray-text-light">{stat.label}</p>
                <p className="text-[11px] font-bold text-navy">{stat.value}</p>
                <p className="text-[8px] font-semibold text-green-accent">
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-slate-50 p-2.5">
            <p className="text-[9px] font-semibold text-gray-text">
              Évolution des performances
            </p>
            <svg
              viewBox="0 0 217 38"
              className="mt-1.5 h-10 w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline
                points="0,32 40,26 80,28 120,12 160,16 217,4"
                fill="none"
                stroke="#00c853"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="0,24 40,20 80,22 120,10 160,14 217,6"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="mt-2 flex items-center gap-1.5 rounded-xl border border-green-accent bg-gradient-to-r from-[#e8f5e9] to-[#e0f7fa] p-2">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-green-600 text-[7px] text-white">
              ✦
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-semibold text-navy">
                Recommandation IA
              </p>
              <p className="truncate text-[8px] text-[#4a5565]">
                Réallouez 20% vers WhatsApp Ads
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-full bg-blue-500 px-2 py-1 text-[8px] font-semibold text-white"
            >
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
