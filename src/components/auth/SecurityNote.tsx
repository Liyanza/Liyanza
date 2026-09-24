import { ShieldCheck } from "lucide-react";
import { getMessages } from "@/i18n/server";

export async function SecurityNote() {
  const t = (await getMessages("auth")).shell;

  return (
    <div className="mt-2.5 flex items-center justify-center gap-3">
      <ShieldCheck className="size-4 shrink-0 text-white" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-white/70">
        {t.security}
      </p>
    </div>
  );
}
