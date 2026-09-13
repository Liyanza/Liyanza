"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

const campaignsOptions = ["1 – 3", "4 – 10", "10 +"];
const teamOptions = ["Solo", "2 – 10", "10 +"];
const needOptions = ["Planifier", "Monitorer", "Optimiser avec l'IA", "Rapporter"];

const scoreMap: Record<string, number> = {
  "1 – 3": 0,
  "4 – 10": 1,
  "10 +": 2,
  Solo: 0,
  Planifier: 0,
  Monitorer: 1,
  "Optimiser avec l'IA": 1,
  Rapporter: 0,
};

function recommend(campaigns: string, team: string, need: string) {
  const score =
    (scoreMap[campaigns] ?? 0) + (scoreMap[team] ?? 0) + (scoreMap[need] ?? 0);
  if (score <= 1) return "FREE";
  if (score <= 3) return "PRO";
  return "BUSINESS";
}

function Question({
  number,
  question,
  options,
  selected,
  onSelect,
}: {
  number: number;
  question: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-gray-text">
          {number}
        </span>
        <p className="text-sm font-bold text-black">{question}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selected === option
                ? "border-green-600 bg-green-600 text-white"
                : "border-border bg-white text-[#3f3f46] hover:border-green-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PricingQuiz() {
  const [campaigns, setCampaigns] = useState<string | null>(null);
  const [team, setTeam] = useState<string | null>("2 – 10");
  const [need, setNeed] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const canSubmit = campaigns && team && need;

  return (
    <section className="border-y border-[#e4e4e7] bg-[#fafafa] py-24">
      <Container className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-blue-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Aide au choix
          </span>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            Quelle formule est faite pour vous ?
          </h2>
          <p className="mt-3 text-base text-gray-text">
            Répondez à 3 questions — nous vous recommandons la formule la
            plus adaptée à votre situation.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-[#e4e4e7] bg-white p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Question
              number={1}
              question="Combien de campagnes gérez-vous ?"
              options={campaignsOptions}
              selected={campaigns}
              onSelect={setCampaigns}
            />
            <Question
              number={2}
              question="Quelle est la taille de votre équipe ?"
              options={teamOptions}
              selected={team}
              onSelect={setTeam}
            />
            <div className="sm:col-span-2">
              <Question
                number={3}
                question="Quel est votre besoin principal ?"
                options={needOptions}
                selected={need}
                onSelect={setNeed}
              />
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={() =>
                setResult(recommend(campaigns!, team!, need!))
              }
              className="flex items-center gap-2 rounded-full border-2 border-green-600 px-8 py-3 text-sm font-bold text-green-600 transition hover:bg-green-600/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Voir ma recommandation
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          {result && (
            <div className="mt-8 flex items-center justify-center gap-3 rounded-xl border border-green-accent bg-[#f0fdf4] px-6 py-4">
              <Check className="size-5 shrink-0 text-green-accent" aria-hidden="true" />
              <p className="text-sm font-semibold text-navy">
                Formule recommandée :{" "}
                <span className="text-green-accent-dark">{result}</span>
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
