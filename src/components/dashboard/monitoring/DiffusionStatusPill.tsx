import { diffusionStatusMeta, type DiffusionStatus } from "@/data/monitoring";

export function DiffusionStatusPill({ status }: { status: DiffusionStatus }) {
  const meta = diffusionStatusMeta[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.className}`}>
      {meta.label}
    </span>
  );
}
