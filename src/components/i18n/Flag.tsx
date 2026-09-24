import { useId } from "react";
import type { Locale } from "@/i18n/config";

/**
 * Drapeau d'une langue, dessiné en SVG : les emojis drapeaux ne s'affichent
 * pas sous Windows (on y voit « FR »/« GB » en lettres). Décoratif — le nom
 * de la langue est toujours affiché ou annoncé à côté.
 */
export function Flag({ locale, className = "" }: { locale: Locale; className?: string }) {
  const id = useId();
  const box = `inline-block h-[14px] w-5 shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)] ${className}`;

  if (locale === "fr") {
    return (
      <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" className={box} aria-hidden="true">
        <rect width="1" height="2" fill="#002654" />
        <rect x="1" width="1" height="2" fill="#fff" />
        <rect x="2" width="1" height="2" fill="#ce1126" />
      </svg>
    );
  }

  // Union Jack (proportions officielles 2:1, recadré au format de la pastille).
  const diagonals = `${id}-diag`;
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className={box} aria-hidden="true">
      <clipPath id={diagonals}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${diagonals})`} stroke="#c8102e" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}
