import { Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function WelcomeBanner() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-black">Bonjour, Aristide</h1>
        <p className="mt-1 text-sm text-gray-text">Voici un aperçu de la performance de vos campagnes.</p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-500">
          <TrendingUp className="size-3.5" aria-hidden="true" />
          Vos performances sont en hausse de 18 % cette semaine.
        </span>
      </div>
      <Button variant="cta" size="md" icon={<Plus className="size-4" aria-hidden="true" />} iconPosition="left">
        Nouvelle campagne
      </Button>
    </div>
  );
}
