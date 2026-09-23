import { ShieldCheck } from "lucide-react";

export function SecurityNote() {
  return (
    <div className="mt-2.5 flex items-center justify-center gap-3">
      <ShieldCheck className="size-4 shrink-0 text-white" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-white/70">
        Données sécurisées · Conformité RGPD · Chiffrement bout-en-bout
      </p>
    </div>
  );
}
