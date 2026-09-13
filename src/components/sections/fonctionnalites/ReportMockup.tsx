const stats = [
  { label: "Impressions", value: "124 400" },
  { label: "Conversions", value: "1 384" },
  { label: "Taux conv.", value: "4.5%" },
  { label: "Budget dépensé", value: "85 000F" },
  { label: "ROAS", value: "5.8x" },
  { label: "CPA", value: "85 FCFA" },
];

export function ReportMockup() {
  return (
    <div className="w-full max-w-[384px] overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
        <div>
          <p className="text-sm font-bold text-navy">Rapport de campagne</p>
          <p className="text-[10px] text-gray-text-light">
            Promo Orange Money · Mai 2025
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-green-accent px-2.5 py-1 text-xs font-bold text-white">
            +24%
          </span>
          <span className="rounded-lg border-2 border-violet-500 px-2.5 py-1 text-xs text-violet-500">
            PDF ↓
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border-light bg-white p-2.5 text-center shadow-[0_2px_12px_-2px_rgba(0,0,0,0.07)]"
            >
              <p className="text-sm font-bold text-navy">{stat.value}</p>
              <p className="mt-0.5 text-[8px] leading-tight text-gray-text-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-3">
          <svg
            viewBox="0 0 313 48"
            className="h-12 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon
              points="0,48 0,38 60,30 120,32 189,14 250,20 313,4 313,48"
              fill="#8b5cf6"
              opacity="0.15"
            />
            <polyline
              points="0,38 60,30 120,32 189,14 250,20 313,4"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-full border-2 border-violet-500 py-2.5 text-xs font-semibold text-violet-500"
          >
            Exporter PDF
          </button>
          <button
            type="button"
            className="flex-1 rounded-full bg-violet-500 py-2.5 text-xs font-semibold text-white"
          >
            Partager →
          </button>
        </div>
      </div>
    </div>
  );
}
