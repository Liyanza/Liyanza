const RADIUS = 68;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CircularProgress({ percent, label }: { percent: number; label: string }) {
  const dash = (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="relative size-[148px]">
      <svg viewBox="0 0 148 148" className="size-full -rotate-90">
        <circle cx="74" cy="74" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="74"
          cy="74"
          r={RADIUS}
          fill="none"
          stroke="#141b2b"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
          className="transition-[stroke-dasharray] duration-300 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[30px] font-black text-[#101828]">{percent}%</p>
        <p className="text-[11px] text-gray-text-light">{label}</p>
      </div>
    </div>
  );
}
