import { CountUp } from "@/components/motion/CountUp";

interface Scenario {
  name: string;
  budget: string;
  roi: string;
  roiColor: string;
  roas: string;
  progress: number;
  progressClass: string;
  highlighted?: boolean;
  badge?: string;
}

const scenarios: Scenario[] = [
  {
    name: "Scénario A",
    budget: "200 000 FCFA",
    roi: "245%",
    roiColor: "text-black",
    roas: "ROAS 4.2x",
    progress: 58,
    progressClass: "bg-[#3b82f6]",
  },
  {
    name: "Scénario B",
    budget: "350 000 FCFA",
    roi: "318%",
    roiColor: "text-blue-500",
    roas: "ROAS 5.8x",
    progress: 82,
    progressClass: "bg-blue-500",
    highlighted: true,
    badge: "Recommandé IA",
  },
  {
    name: "Scénario C",
    budget: "275 000 FCFA",
    roi: "272%",
    roiColor: "text-black",
    roas: "ROAS 4.9x",
    progress: 68,
    progressClass: "bg-[#3b82f6]",
  },
];

export function ScenariosMockup() {
  return (
    <div className="w-full max-w-[448px] overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
        <p className="text-sm font-bold text-black">Simulation de scénarios IA</p>
        <p className="text-xs text-gray-text-light">Budget : 500 000 FCFA</p>
      </div>

      <div>
        {scenarios.map((s) => (
          <div
            key={s.name}
            data-live="item"
            className={`px-5 py-4 ${s.highlighted ? "bg-[#f0fdf4]" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm font-bold ${
                    s.highlighted ? "text-navy" : "text-black"
                  }`}
                >
                  {s.name}
                </p>
                {s.badge && (
                  <span
                    data-live="badge"
                    className="rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white"
                  >
                    {s.badge}
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${s.roiColor}`}>
                  <CountUp value={s.roi} />
                </p>
                <p className="text-[10px] text-gray-text-light">ROI estimé</p>
              </div>
            </div>
            <p className="mt-0.5 text-xs text-gray-text">{s.budget}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border-light">
                <div
                  data-live="fill"
                  className={`h-full rounded-full ${s.progressClass}`}
                  style={{ width: `${s.progress}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-text-light">{s.roas}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border-light bg-slate-50 p-4">
        <button
          type="button"
          className="w-full rounded-full border-2 border-green-accent py-2.5 text-sm font-semibold text-green-accent"
        >
          Voir tous les scénarios
        </button>
      </div>
    </div>
  );
}
