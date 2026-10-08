/**
 * Recherche d'adresses et nom d'un lieu à partir de coordonnées, via
 * Nominatim (OpenStreetMap, gratuit, sans clé). Usage modéré exigé par sa
 * politique : appels déclenchés par l'utilisateur, avec un délai de saisie.
 */

const BASE = "https://nominatim.openstreetmap.org";

export interface PlaceResult {
  label: string;
  lat: number;
  lng: number;
}

interface NominatimPlace {
  display_name: string;
  lat: string;
  lon: string;
  name?: string;
  address?: Record<string, string>;
}

/** Libellé court : nom du lieu, puis quartier et ville. */
export function shortLabel(place: NominatimPlace): string {
  const a = place.address ?? {};
  const parts = [
    place.name || a.road || a.amenity || a.shop,
    a.suburb || a.neighbourhood || a.quarter,
    a.city || a.town || a.village,
  ].filter((p): p is string => Boolean(p));
  const unique = parts.filter((p, i) => parts.indexOf(p) === i);
  return unique.length > 0 ? unique.join(", ") : place.display_name.split(",").slice(0, 3).join(",");
}

export async function searchPlaces(query: string, signal?: AbortSignal): Promise<PlaceResult[]> {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    addressdetails: "1",
    limit: "5",
    countrycodes: "cm",
    "accept-language": "fr",
  });
  const response = await fetch(`${BASE}/search?${params}`, { signal });
  if (!response.ok) return [];
  const places = (await response.json()) as NominatimPlace[];
  return places.map((p) => ({ label: shortLabel(p), lat: Number(p.lat), lng: Number(p.lon) }));
}

export async function reversePlace(lat: number, lng: number, signal?: AbortSignal): Promise<string | null> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lng),
    format: "jsonv2",
    addressdetails: "1",
    zoom: "18",
    "accept-language": "fr",
  });
  const response = await fetch(`${BASE}/reverse?${params}`, { signal });
  if (!response.ok) return null;
  const place = (await response.json()) as NominatimPlace & { error?: string };
  return place.error ? null : shortLabel(place);
}
