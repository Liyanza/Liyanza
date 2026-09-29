"use client";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";

/**
 * Sélection multiple par pastilles : des suggestions à cocher, plus une
 * saisie libre pour ajouter ses propres valeurs (retirables). `labelFor`
 * traduit une suggestion ; une valeur ajoutée s'affiche telle quelle.
 */
export function ChipPicker({
  suggestions,
  value,
  onChange,
  labelFor = (item) => item,
  inputLabel,
  placeholder,
  addLabel,
  removeLabel,
  max = 20,
}: {
  suggestions: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  labelFor?: (item: string) => string;
  inputLabel: string;
  placeholder: string;
  addLabel: string;
  /** « Retirer {item} » : {item} est remplacé par la valeur. */
  removeLabel: string;
  max?: number;
}) {
  const [draft, setDraft] = useState("");
  const custom = value.filter((item) => !suggestions.includes(item));
  const full = value.length >= max;

  function toggle(item: string) {
    onChange(value.includes(item) ? value.filter((v) => v !== item) : [...value, item]);
  }

  function add() {
    const item = draft.trim().replace(/\s+/g, " ").slice(0, 100);
    if (!item || full) return;
    // Même valeur qu'une suggestion (casse ignorée) : on coche la suggestion.
    const existing = [...suggestions, ...value].find((v) => v.toLowerCase() === item.toLowerCase());
    if (existing) {
      if (!value.includes(existing)) onChange([...value, existing]);
    } else {
      onChange([...value, item]);
    }
    setDraft("");
  }

  const chipClass = (selected: boolean) =>
    `flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
      selected ? "bg-blue-500 text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]" : "bg-dash-pill-bg text-dash-heading hover:bg-slate-200"
    }`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((item) => {
          const selected = value.includes(item);
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              disabled={!selected && full}
              onClick={() => toggle(item)}
              className={`${chipClass(selected)} disabled:opacity-50`}
            >
              {selected ? <Check className="size-3" aria-hidden="true" /> : <Plus className="size-3" aria-hidden="true" />}
              {labelFor(item)}
            </button>
          );
        })}
        {custom.map((item) => (
          <span key={item} className={chipClass(true)}>
            <Check className="size-3" aria-hidden="true" />
            {item}
            <button
              type="button"
              onClick={() => toggle(item)}
              aria-label={removeLabel.replace("{item}", item)}
              className="-mr-1 rounded-full p-0.5 hover:bg-white/20"
            >
              <X className="size-3" aria-hidden="true" />
            </button>
          </span>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          add();
        }}
        className="flex max-w-md items-center gap-2"
      >
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={placeholder}
          aria-label={inputLabel}
          maxLength={100}
          disabled={full}
          className="min-w-0 flex-1 rounded-full border border-border bg-white px-4 py-2 text-xs text-dash-heading outline-none focus:border-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!draft.trim() || full}
          className="flex shrink-0 items-center gap-1 rounded-full bg-blue-500 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-40"
        >
          <Plus className="size-3" aria-hidden="true" />
          {addLabel}
        </button>
      </form>
    </div>
  );
}
