const stats = [
  { label: "Campagnes", value: "12", accent: true },
  { label: "ROI", value: "3.8×", accent: true },
  { label: "Budget", value: "94%", accent: true },
  { label: "Alertes IA", value: "3", accent: false },
];

const barHeights = [22, 36, 29, 47, 40, 58, 65];

export function DashboardMockCard() {
  return (
    <div className="border border-white/20 bg-[#18181b] p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-white">Dashboard KIYANZA</p>
        <span className="rounded bg-orange-500 px-2 py-0.5 text-[9px] font-bold text-white">
          ● Live
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-white/20 bg-white p-2.5">
            <p className="text-[9px] text-[#71717a]">{stat.label}</p>
            <p
              className={`mt-1 text-base font-black ${stat.accent ? "text-orange-500" : "text-black"}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-end gap-1 pt-3">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-orange-500"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </div>
  );
}
