import { CountUp } from "@/components/motion/CountUp";

const stats = [
  { label: "Impressions", value: "124 400", change: "+18%", color: "text-green-accent" },
  { label: "Clics", value: "9 240", change: "+12%", color: "text-blue-500" },
  { label: "Conversions", value: "1 384", change: "+22%", color: "text-green-accent" },
  { label: "Dépenses", value: "89 000F", change: "+8%", color: "text-orange-500" },
  { label: "ROAS", value: "5.8x", change: "+15%", color: "text-violet-500" },
];

const alerts = [
  { dot: "bg-orange-500", text: "CPC dépasse le seuil sur Facebook", time: "Il y a 2h" },
  { dot: "bg-green-accent", text: "Conversion rate en hausse : +4.2%", time: "Il y a 4h" },
];

export function MonitoringMockup() {
  return (
    <div className="w-full max-w-[448px] overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
        <div>
          <p className="text-sm font-bold text-navy">Monitoring temps réel</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-gray-text-light">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-accent opacity-75" />
              <span className="relative size-1.5 rounded-full bg-green-accent" />
            </span>
            En direct · 12–18 Mai 2025
          </p>
        </div>
        <span className="rounded-full border border-blue-500 px-2.5 py-1 text-[10px] font-medium text-blue-500">
          7 derniers jours
        </span>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-5 gap-1.5">
          {stats.map((stat) => (
            <div key={stat.label} data-live="item" className="text-center">
              <p className="text-sm font-bold text-navy">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-0.5 text-[8px] text-gray-text-light">{stat.label}</p>
              <p className={`mt-0.5 text-[8px] font-bold ${stat.color}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-3">
          <svg
            viewBox="0 0 378 56"
            className="h-14 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              data-live="draw"
              points="0,50 60,42 120,44 189,20 250,26 378,6"
              fill="none"
              stroke="#00c853"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[60, 120, 189, 250, 320].map((x, i) => (
              <circle key={i} data-live="dot" cx={x} cy={[42, 44, 20, 26, 12][i]} r="3" fill="#00c853" stroke="#fff" strokeWidth="1.5" />
            ))}
          </svg>
        </div>

        <div className="mt-4 border-t border-border-light pt-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-text-light">
            Alertes automatiques
          </p>
          <div className="mt-2 space-y-2">
            {alerts.map((alert) => (
              <div key={alert.text} data-live="item" className="flex items-center gap-2">
                <span className={`size-1.5 shrink-0 rounded-full ${alert.dot}`} />
                <p className="flex-1 text-xs text-[#4a5565]">{alert.text}</p>
                <p className="shrink-0 text-xs text-gray-text-light">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
