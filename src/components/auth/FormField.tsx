import { ReactNode } from "react";

export function FormField({
  id,
  label,
  icon,
  rightElement,
  error,
  className = "",
  ...inputProps
}: {
  id: string;
  label: string;
  icon: ReactNode;
  rightElement?: ReactNode;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-semibold text-[#3f3f46]">
        {label}
      </label>
      <div
        className={`mt-1.5 flex items-center rounded-md border bg-white transition focus-within:border-green-accent ${
          error ? "border-red-500" : "border-[#e4e4e7]"
        }`}
      >
        <span className="flex items-center pl-3 pr-2 text-[#a1a1aa]">{icon}</span>
        <input
          id={id}
          className="w-full bg-transparent py-3 pr-3 text-sm text-black placeholder:text-[#a1a1aa] focus:outline-none"
          {...inputProps}
        />
        {rightElement && <span className="pr-3">{rightElement}</span>}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
