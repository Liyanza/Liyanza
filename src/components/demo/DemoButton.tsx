"use client";

import { useState } from "react";
import { Loader2, PlayCircle } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { apiStartDemo } from "@/lib/api/client";

interface DemoButtonProps {
  label: string;
  loadingLabel: string;
  errorLabel: string;
  className?: string;
}

/**
 * Ouvre la démo en un clic : session sur l'entreprise fictive (lecture
 * seule), puis tableau de bord. Libellés passés en props pour être utilisable
 * depuis les pages serveur comme depuis les formulaires client.
 */
export function DemoButton({ label, loadingLabel, errorLabel, className = "" }: DemoButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  function start() {
    setPending(true);
    setFailed(false);
    apiStartDemo().then(
      () => router.push("/dashboard"),
      () => {
        setFailed(true);
        setPending(false);
      }
    );
  }

  return (
    <span className="inline-flex flex-col gap-1.5">
      <button
        type="button"
        onClick={start}
        disabled={pending}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 ${className}`}
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <PlayCircle className="size-4" aria-hidden="true" />
        )}
        {pending ? loadingLabel : label}
      </button>
      {failed && (
        <span role="alert" className="text-xs font-medium text-red-600">
          {errorLabel}
        </span>
      )}
    </span>
  );
}
