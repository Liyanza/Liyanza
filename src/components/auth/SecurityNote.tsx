import { ShieldCheck } from "lucide-react";

export function SecurityNote() {
  return (
    <div className="flex items-center gap-3 text-white">
      <ShieldCheck className="size-4 shrink-0 text-orange-500" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-white">
        Données sécurisées · Conformité RGPD · Chiffrement bout-en-bout
      </p>
    </div>
  );
}
