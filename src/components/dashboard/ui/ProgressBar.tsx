export function ProgressBar({
  value,
  className = "",
  trackClassName = "bg-dash-track",
  barClassName = "bg-blue-500",
  height = "h-1.5",
}: {
  value: number;
  className?: string;
  trackClassName?: string;
  barClassName?: string;
  height?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`overflow-hidden rounded-full ${height} ${trackClassName} ${className}`}>
      <div className={`dash-fill ${height} rounded-full transition-all ${barClassName}`} style={{ width: `${clamped}%` }} />
    </div>
  );
}
