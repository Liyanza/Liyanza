"use client";

import { useState } from "react";
import { ChevronDown, Mail, MessageCircle } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { useT } from "@/i18n/client";

export function AideClient() {
  const t = useT("dashAccount").help;
  const dash = useT("dash");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <TopBar title={dash.titles.help} />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[720px] flex-col gap-6 px-8 py-6">
          <div>
            <h1 className="text-lg font-bold text-dash-heading">{t.title}</h1>
            <p className="mt-1 text-sm text-dash-muted">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {t.faq.map((entry, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={entry.question} className="overflow-hidden rounded-2xl border border-border bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-dash-heading">{entry.question}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-dash-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <p className="border-t border-border-light px-5 py-4 text-sm leading-relaxed text-dash-body">
                      {entry.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-white p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-green-accent-dark/10">
              <MessageCircle className="size-5 text-green-accent-dark" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-dash-heading">{t.moreHelp}</h2>
              <p className="mt-1 text-sm text-dash-muted">{t.moreHelpText}</p>
            </div>
            <a
              href="mailto:contact@kiyanza.com"
              className="flex items-center gap-2 rounded-full bg-green-accent px-6 py-2.5 text-sm font-semibold text-white"
            >
              <Mail className="size-4" aria-hidden="true" />
              contact@kiyanza.com
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
