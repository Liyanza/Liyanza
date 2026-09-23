import { CountUp } from "@/components/motion/CountUp";

interface Scenario {
  name: string;
  score: number;
  roas: string;
  conversions: string;
  recommended?: boolean;
}

const scenarios: Scenario[] = [
  {
    name: "Scénario A — Budget focus",
    score: 92,
    roas: "4,2×",
    conversions: "1 450",
    recommended: true,
  },
  {
    name: "Scénario B — Portée max",
    score: 78,
    roas: "3,6×",
    conversions: "2 100",
  },
  {
    name: "Scénario C — Équilibré",
    score: 85,
    roas: "3,9×",
    conversions: "1 780",
  },
];

export function AIScenarioMockup() {
  return (
    <div className="w-full max-w-[500px] overflow-hidden rounded-[5px] border border-zinc-100 bg-zinc-50 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-5 py-4">
        <span className="text-blue-500" aria-hidden="true">
          ✦
        </span>
        <p className="text-xs font-bold text-zinc-900">Comparateur de scénarios IA</p>
      </div>

      <div className="space-y-3 p-5">
        {scenarios.map((s) => (
          <div
            key={s.name}
            data-live="item"
            className={`rounded-[5px] p-4 ${
              s.recommended
                ? "border-2 border-blue-500 bg-blue-500/[0.04]"
                : "border border-zinc-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold text-zinc-900">{s.name}</p>
              {s.recommended && (
                <span
                  data-live="badge"
                  className="shrink-0 rounded-full bg-blue-500 px-2 py-0.5 text-[8px] font-black text-white"
                >
                  RECOMMANDÉ IA
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-200">
                <div
                  data-live="fill"
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${s.score}%` }}
                />
              </div>
              <span
                className={`shrink-0 text-[9px] font-bold ${
                  s.recommended ? "text-blue-500" : "text-gray-text"
                }`}
              >
                <CountUp value={`${s.score}/100`} />
              </span>
            </div>
            <div className="mt-2 flex items-center gap-6">
              <div>
                <p className="text-[7px] uppercase tracking-wide text-gray-text-light">
                  ROAS estimé
                </p>
                <p className="text-[11px] font-black text-zinc-900">
                  <CountUp value={s.roas} />
                </p>
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-wide text-gray-text-light">
                  Conversions
                </p>
                <p className="text-[11px] font-black text-zinc-900">
                  <CountUp value={s.conversions} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
