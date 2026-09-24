"use client";

import { Check, Plus, Users, UsersRound } from "lucide-react";
import { interestTags } from "@/data/dashboard";
import { AgeRangeSlider } from "./AgeRangeSlider";

import type { TargetGender } from "@/lib/api/types";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

export interface AudienceData {
  ageMin: number;
  ageMax: number;
  // Valeur envoyée telle quelle comme `targetGender` à
  // PUT /campagnes/:id/digital-details.
  gender: TargetGender;
  interests: string[];
}

const genderOptions: AudienceData["gender"][] = ["ALL", "MALE", "FEMALE"];

export function StepAudience({
  data,
  onChange,
}: {
  data: AudienceData;
  onChange: (data: AudienceData) => void;
}) {
  const t = useT("dashWizard").audience;
  function toggleInterest(tag: string) {
    const isActive = data.interests.includes(tag);
    onChange({
      ...data,
      interests: isActive ? data.interests.filter((t) => t !== tag) : [...data.interests, tag],
    });
  }

  return (
    <div>
      <div className="max-w-[768px]">
        <h1 className="text-[40px] font-semibold leading-9 tracking-[-1px] text-dash-heading">
          {t.title}
        </h1>
        <p className="mt-3 text-base leading-[26px] text-dash-body">
          {t.subtitle}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6 rounded-t-xl bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-dash-heading">
          <UsersRound className="size-[18px] text-green-accent-dark" aria-hidden="true" />
          {t.demographics}
        </h2>

        <AgeRangeSlider
          min={data.ageMin}
          max={data.ageMax}
          onChange={([ageMin, ageMax]) => onChange({ ...data, ageMin, ageMax })}
        />

        <div>
          <p className="text-xs font-medium text-dash-body">{t.gender}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {genderOptions.map((option) => {
              const selected = data.gender === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onChange({ ...data, gender: option })}
                  className={`flex h-[52px] flex-1 basis-[200px] items-center justify-center gap-1.5 rounded-full text-xs font-medium transition-colors ${
                    selected ? "bg-blue-500 text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]" : "bg-dash-pill-bg text-dash-heading"
                  }`}
                >
                  {selected && <Check className="size-3" aria-hidden="true" />}
                  {t.genders[option]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-b-xl bg-white px-6 pb-6 pt-2 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-dash-heading">
            <Users className="size-[18px] text-green-accent-dark" aria-hidden="true" />
            {t.interests}
          </h2>
          <span className="text-[11px] font-semibold text-green-accent">{fill(data.interests.length > 1 ? t.selectedMany : t.selectedOne, { count: data.interests.length })}</span>
        </div>
        <p className="text-[13px] leading-[18px] text-dash-body">
          {t.interestsHint}
        </p>
        <div className="flex flex-wrap gap-2">
          {interestTags.map((tag, index) => {
            const selected = data.interests.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleInterest(tag)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                  selected ? "bg-blue-500 text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]" : "bg-dash-pill-bg text-dash-heading"
                }`}
              >
                {selected ? <Check className="size-3" aria-hidden="true" /> : <Plus className="size-3" aria-hidden="true" />}
                {t.interestLabels[index] ?? tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
