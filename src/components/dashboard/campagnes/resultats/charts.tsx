"use client";

// Primitives de graphiques dessinées à la main (SVG/flex), cohérent avec le
// reste du dashboard (voir la barre de performance de MissionSection) —
// aucune librairie de charting n'est encore une dépendance de ce projet.
// Palette catégorielle validée (contraste + daltonisme) : voir le rapport de
// scripts/validate_palette.js de la skill dataviz sur ["#00c853","#3b82f6","#f97316"].

const SERIES_COLORS = {
  reach: "#3b82f6", // Portée
  clicks: "#f97316", // Clics
  conversions: "#00c853", // Conversions
} as const;

export function BudgetDonutChart({
  segments,
  totalLabel,
  totalSubLabel = "FCFA",
}: {
  segments: { label: string; value: number; percent: number; color: string }[];
  totalLabel: string;
  totalSubLabel?: string;
}) {
  const size = 140;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Décalages précalculés en une passe pure (pas de mutation d'un
  // accumulateur pendant le rendu — react-hooks/immutability) : chaque
  // segment reçoit la somme cumulée des `dash` qui le précèdent.
  const arcs = segments.reduce<
    { segment: (typeof segments)[number]; dash: number; offset: number; cumulative: number }[]
  >((acc, segment) => {
    const previousCumulative = acc.length > 0 ? acc[acc.length - 1].cumulative : 0;
    const dash = (segment.percent / 100) * circumference;
    const offset = circumference * 0.25 - previousCumulative;
    return [...acc, { segment, dash, offset, cumulative: previousCumulative + dash }];
  }, []);

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Répartition du budget : ${segments.map((s) => `${s.label} ${s.percent}%`).join(", ")}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
        {arcs.map(({ segment, dash, offset }) => {
          return (
            <circle
              key={segment.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
              className="dash-arc"
              style={{ "--arc-circ": circumference } as React.CSSProperties}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            >
              <title>{`${segment.label} : ${segment.percent}%`}</title>
            </circle>
          );
        })}
        <text x="50%" y="47%" textAnchor="middle" className="fill-dash-heading text-[13px] font-bold">
          {totalLabel}
        </text>
        <text x="50%" y="61%" textAnchor="middle" className="fill-dash-muted text-[9px]">
          {totalSubLabel}
        </text>
      </svg>
      <ul className="flex flex-col gap-2.5">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2 text-xs">
            <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: segment.color }} aria-hidden="true" />
            <span className="font-semibold text-dash-heading">{segment.label}</span>
            <span className="text-dash-muted">{segment.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WeeklySpendBarChart({
  points,
}: {
  points: { weekIndex: number; budgetSpent: number }[];
}) {
  const max = Math.max(...points.map((p) => p.budgetSpent), 1);

  return (
    <div className="flex items-end gap-3" style={{ height: 160 }}>
      {points.map((point) => {
        const heightPercent = Math.max(4, Math.round((point.budgetSpent / max) * 100));
        return (
          <div key={point.weekIndex} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[11px] font-semibold text-dash-heading">
              {Math.round(point.budgetSpent).toLocaleString("fr-FR")}
            </span>
            <div className="flex h-32 w-full items-end">
              <div
                className="dash-grow w-full rounded-t-md bg-blue-500"
                style={{ height: `${heightPercent}%` }}
                title={`Semaine ${point.weekIndex} : ${Math.round(point.budgetSpent).toLocaleString("fr-FR")} FCFA`}
              />
            </div>
            <span className="text-[10px] font-medium text-dash-muted">S{point.weekIndex}</span>
          </div>
        );
      })}
    </div>
  );
}

interface PerformanceSeriesPoint {
  weekIndex: number;
  predictedReach: number;
  predictedClicks: number;
  predictedConversions: number;
}

export function PerformanceLineChart({ points }: { points: PerformanceSeriesPoint[] }) {
  const width = 560;
  const height = 180;
  const paddingX = 24;
  const paddingY = 16;

  const seriesList: { key: keyof PerformanceSeriesPoint; label: string; color: string }[] = [
    { key: "predictedReach", label: "Portée", color: SERIES_COLORS.reach },
    { key: "predictedClicks", label: "Clics", color: SERIES_COLORS.clicks },
    { key: "predictedConversions", label: "Conversions", color: SERIES_COLORS.conversions },
  ];

  // Portée/Clics/Conversions diffèrent typiquement d'un ou deux ordres de
  // grandeur : les tracer sur UNE échelle linéaire partagée écraserait
  // visuellement les deux plus petites séries. Jamais de double axe (règle
  // dataviz) — chaque série est donc indexée sur son propre maximum ; la
  // valeur réelle reste disponible via l'infobulle au survol de chaque point.
  function coordsFor(key: keyof PerformanceSeriesPoint) {
    const seriesMax = Math.max(...points.map((p) => Number(p[key])), 1);
    return points.map((point, index) => {
      const x = paddingX + (index / Math.max(points.length - 1, 1)) * (width - paddingX * 2);
      const y = height - paddingY - (Number(point[key]) / seriesMax) * (height - paddingY * 2);
      return { x, y, value: Number(point[key]) };
    });
  }

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Évolution hebdomadaire de la portée, des clics et des conversions">
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={paddingX}
            x2={width - paddingX}
            y1={paddingY + (i * (height - paddingY * 2)) / 2}
            y2={paddingY + (i * (height - paddingY * 2)) / 2}
            stroke="#f1f5f9"
            strokeWidth={1}
          />
        ))}
        {seriesList.map((series) => {
          const coords = coordsFor(series.key);
          const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
          return (
            <g key={series.key}>
              <path d={path} fill="none" stroke={series.color} strokeWidth={2} pathLength={1} className="dash-line" />
              {coords.map((c, i) => (
                <circle
                  key={i}
                  cx={c.x}
                  cy={c.y}
                  r={3}
                  fill={series.color}
                  className="dash-pop"
                  style={{ animationDelay: `${200 + (i / Math.max(coords.length - 1, 1)) * 800}ms` }}
                >
                  <title>{`${series.label} — semaine ${points[i].weekIndex} : ${Math.round(c.value).toLocaleString("fr-FR")}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
        {points.map((point, index) => {
          const x = paddingX + (index / Math.max(points.length - 1, 1)) * (width - paddingX * 2);
          return (
            <text key={point.weekIndex} x={x} y={height - 2} textAnchor="middle" className="fill-dash-muted text-[9px]">
              S{point.weekIndex}
            </text>
          );
        })}
      </svg>
      <div className="mt-3 flex items-center justify-center gap-5">
        {seriesList.map((series) => (
          <span key={series.key} className="flex items-center gap-1.5 text-xs font-medium text-dash-body">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: series.color }} aria-hidden="true" />
            {series.label}
          </span>
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] text-dash-muted">
        Chaque courbe est indexée sur son propre maximum (échelles très différentes) — survolez un point pour la valeur exacte.
      </p>
    </div>
  );
}
