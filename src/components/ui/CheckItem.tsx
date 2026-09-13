import { Check } from "lucide-react";

export function CheckItem({
  text,
  accentClass,
}: {
  text: string;
  accentClass: string;
}) {
  return (
    <li className="flex items-center gap-2.5 py-1.5">
      <span
        className={`flex size-[15px] shrink-0 items-center justify-center rounded-full ${accentClass}`}
      >
        <Check className="size-2.5 text-white" strokeWidth={3} aria-hidden="true" />
      </span>
      <span className="text-sm text-[#364153]">{text}</span>
    </li>
  );
}
