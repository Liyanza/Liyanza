"use client";

import { useCallback, useEffect, useState } from "react";
import { apiGetRapportConformite, ApiError } from "@/lib/api/client";
import type { RapportConformite } from "@/lib/api/types";

/** Rapport de conformité d'une campagne, rechargeable après un constat. */
export function useConformityReport(campaignId: string, fallbackError: string) {
  const [report, setReport] = useState<RapportConformite | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let active = true;
    apiGetRapportConformite(campaignId).then(
      (result) => active && (setReport(result), setError(null)),
      (err: unknown) => active && setError(err instanceof ApiError ? err.message : fallbackError)
    );
    return () => {
      active = false;
    };
  }, [campaignId, version, fallbackError]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);
  return { report, error, loading: report === null && error === null, reload };
}
