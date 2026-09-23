import { Check } from "lucide-react";

export function CheckItem({ text }: { text: string }) {
  return (
    <li data-reveal-item className="flex items-start gap-2.5 py-1.5">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-accent/10">
        <Check className="size-3 text-green-accent-dark" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="text-sm leading-5 text-[#364153]">{text}</span>
    </li>
  );
}
