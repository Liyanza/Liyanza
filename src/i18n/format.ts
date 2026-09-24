import type { Locale } from "./config";

/**
 * Remplace les variables {nom} d'un texte traduit.
 *   fill("Bonjour {name}", { name: "Awa" }) → "Bonjour Awa"
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Locale Intl d'une langue du site. L'anglais suit l'usage britannique
 * (dates « 24 Sept 2026 »), comme les textes du site.
 */
export function intlLocale(locale: Locale): string {
  return locale === "en" ? "en-GB" : "fr-FR";
}

/** Nombre groupé selon la langue : 150 000 (fr) / 150,000 (en). */
export function formatNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions): string {
  return value.toLocaleString(intlLocale(locale), options);
}

/** Montant arrondi en FCFA : « 150 000 FCFA » / « 150,000 FCFA ». */
export function formatMoney(amount: number, locale: Locale): string {
  return `${formatNumber(Math.round(amount), locale)} FCFA`;
}

/** Date (ou date + heure) selon la langue ; accepte une chaîne ISO. */
export function formatDate(value: string | number | Date, locale: Locale, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(intlLocale(locale), options).format(new Date(value));
}
