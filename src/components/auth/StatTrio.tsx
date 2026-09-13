interface Stat {
  value: string;
  label: string;
}

export function StatTrio({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-3 divide-x divide-white/20 border border-white/20">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-1 px-2 py-5 text-center">
          <p className="text-xl font-black text-orange-500">{stat.value}</p>
          <p className="text-[10px] text-white">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
