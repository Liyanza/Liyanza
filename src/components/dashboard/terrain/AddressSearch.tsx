"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { searchPlaces, type PlaceResult } from "@/lib/geocoding";
import { useT } from "@/i18n/client";

/** Champ de recherche d'adresse (Cameroun) : choisir un résultat centre la carte dessus. */
export function AddressSearch({ onPick }: { onPick: (place: PlaceResult) => void }) {
  const t = useT("dashField").terrain;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setLoading(true);
      searchPlaces(q, controller.signal)
        .then((places) => {
          setResults(places);
          setOpen(true);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 450);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <label className="flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-2 shadow-sm focus-within:border-green-accent-dark">
        {loading ? (
          <Loader2 className="size-4 shrink-0 animate-spin text-dash-muted" aria-hidden="true" />
        ) : (
          <Search className="size-4 shrink-0 text-dash-muted" aria-hidden="true" />
        )}
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={t.addressPlaceholder}
          aria-label={t.addressPlaceholder}
          className="w-full bg-transparent text-sm outline-none"
        />
      </label>
      {open && query.trim().length >= 3 && !loading && (
        <ul className="absolute inset-x-0 top-full z-[600] mt-1 overflow-hidden rounded-xl border border-border bg-white shadow-lg">
          {results.length === 0 ? (
            <li className="px-3.5 py-2.5 text-xs text-dash-muted">{t.addressNoResult}</li>
          ) : (
            results.map((place) => (
              <li key={`${place.lat},${place.lng}`}>
                <button
                  type="button"
                  onClick={() => {
                    onPick(place);
                    setQuery(place.label);
                    setOpen(false);
                  }}
                  className="block w-full px-3.5 py-2.5 text-left text-xs text-dash-heading hover:bg-dash-canvas"
                >
                  {place.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
