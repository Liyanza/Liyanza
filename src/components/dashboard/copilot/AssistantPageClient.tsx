"use client";

import { useEffect, useState } from "react";
import { Check, MessagesSquare, Pencil, SquarePen, Trash2, X } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { useLocale, useT } from "@/i18n/client";
import { apiDeleteConversation, apiListConversations, apiRenameConversation } from "@/lib/api/client";
import type { AiConversationSummary } from "@/lib/api/types";
import { CopilotChat } from "./CopilotChat";
import { useCopilot } from "./CopilotProvider";

/** Page plein écran du Copilot : historique des conversations + conversation courante. */
export function AssistantPageClient() {
  const dash = useT("dash");
  const t = dash.copilot;
  const { selectConversation } = useCopilot();

  return (
    <>
      <TopBar title={dash.titles.assistant} />
      <main className="flex min-h-0 flex-1 bg-dash-canvas">
        <aside className="flex w-72 shrink-0 flex-col border-r border-border bg-white" aria-label={t.history}>
          <div className="p-3">
            <button
              type="button"
              onClick={() => selectConversation(null)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <SquarePen className="size-3.5" aria-hidden="true" />
              {t.newConversation}
            </button>
          </div>
          <p className="px-4 pb-1 pt-2 text-[9px] font-bold uppercase tracking-[0.1em] text-gray-text-light">{t.history}</p>
          <HistoryList />
        </aside>
        <section className="flex min-w-0 flex-1 flex-col bg-white">
          <CopilotChat variant="page" />
        </section>
      </main>
    </>
  );
}

function HistoryList() {
  const t = useT("dash").copilot;
  const locale = useLocale();
  const { conversationId, selectConversation, historyVersion, refreshHistory } = useCopilot();
  const [items, setItems] = useState<AiConversationSummary[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    apiListConversations().then(
      (list) => {
        setItems(list);
        setFailed(false);
      },
      () => setFailed(true)
    );
  }, [historyVersion]);

  const dateFormat = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });

  function startRename(item: AiConversationSummary) {
    setEditingId(item.id);
    setDraft(item.topic);
  }

  function saveRename(id: string) {
    const topic = draft.trim().slice(0, 120);
    setEditingId(null);
    if (!topic) return;
    setItems((prev) => prev?.map((item) => (item.id === id ? { ...item, topic } : item)) ?? null);
    apiRenameConversation(id, topic).then(refreshHistory, refreshHistory);
  }

  function remove(id: string) {
    if (!window.confirm(t.deleteConfirm)) return;
    setItems((prev) => prev?.filter((item) => item.id !== id) ?? null);
    if (id === conversationId) selectConversation(null);
    apiDeleteConversation(id).then(refreshHistory, refreshHistory);
  }

  if (failed) {
    return <p className="px-4 py-3 text-xs text-dash-muted">{t.historyError}</p>;
  }
  if (!items) {
    return (
      <div className="flex flex-col gap-2 px-3 py-2" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-10 animate-pulse rounded-lg bg-slate-100" />
        ))}
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
        <MessagesSquare className="size-5 text-gray-text-light" aria-hidden="true" />
        <p className="text-xs text-dash-muted">{t.historyEmpty}</p>
      </div>
    );
  }

  return (
    <ul className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 pb-3">
      {items.map((item) => {
        const active = item.id === conversationId;
        if (editingId === item.id) {
          return (
            <li key={item.id}>
              <form
                className="flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveRename(item.id);
                }}
              >
                <label htmlFor={`rename-${item.id}`} className="sr-only">
                  {t.renameLabel}
                </label>
                <input
                  id={`rename-${item.id}`}
                  autoFocus
                  value={draft}
                  maxLength={120}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && setEditingId(null)}
                  className="min-w-0 flex-1 rounded-md border border-border bg-white px-2 py-1 text-xs text-black focus:border-green-600 focus:outline-none"
                />
                <button type="submit" aria-label={t.save} className="flex size-6 items-center justify-center rounded-md text-green-700 hover:bg-green-50">
                  <Check className="size-3.5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => setEditingId(null)} aria-label={t.cancel} className="flex size-6 items-center justify-center rounded-md text-dash-muted hover:bg-slate-100">
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </form>
            </li>
          );
        }
        return (
          <li key={item.id} className="group relative">
            <button
              type="button"
              onClick={() => selectConversation(item.id)}
              aria-current={active ? "true" : undefined}
              className={`flex w-full flex-col rounded-lg px-3 py-2 pr-16 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 ${
                active ? "bg-green-accent-dark/10" : "hover:bg-slate-50"
              }`}
            >
              <span className={`truncate text-xs font-semibold ${active ? "text-green-700" : "text-dash-body"}`}>{item.topic}</span>
              <span className="text-[10px] text-gray-text-light">{dateFormat.format(new Date(item.lastMessageAt))}</span>
            </button>
            <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 gap-0.5 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
              <button
                type="button"
                onClick={() => startRename(item)}
                aria-label={`${t.rename} : ${item.topic}`}
                title={t.rename}
                className="flex size-6 items-center justify-center rounded-md text-dash-muted hover:bg-white hover:text-dash-body"
              >
                <Pencil className="size-3" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label={`${t.delete} : ${item.topic}`}
                title={t.delete}
                className="flex size-6 items-center justify-center rounded-md text-dash-muted hover:bg-white hover:text-red-600"
              >
                <Trash2 className="size-3" aria-hidden="true" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
