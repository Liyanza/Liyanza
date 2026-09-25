"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ApiError,
  apiCreateConversation,
  apiGetConversation,
  apiRegenerateLastAnswer,
  apiSetMessageFeedback,
  apiStreamChatMessage,
} from "@/lib/api/client";
import type { AiMessageFeedback, AiMessageRecord } from "@/lib/api/types";
import { COPILOT_ROLES } from "./roles";

/**
 * État du Copilot (assistant IA du dashboard), partagé par le panneau
 * latéral, la page plein écran /dashboard/assistant et les pages qui
 * fournissent un contexte (la campagne affichée).
 *
 * La conversation courante vit ICI, pas dans les vues : passer du panneau à
 * la page plein écran (ou l'inverse) la conserve telle quelle, et une page
 * peut lancer une question (`ask`) directement depuis un clic.
 */

// Alignés sur le backend (EnvoyerMessageDto, CreateConversationDto).
export const COPILOT_MAX_MESSAGE_LENGTH = 5000;
const TOPIC_MAX_LENGTH = 80;

/**
 * Message affiché : un message enregistré, ou un message local (`local`) —
 * la question en cours d'envoi, ou la réponse de l'IA en train de s'écrire.
 */
export type CopilotMessage = Pick<AiMessageRecord, "id" | "content" | "sender" | "feedback"> & { local?: boolean };

export type CopilotNotice = "error" | "noCompany" | "loadError" | null;

interface CopilotContextValue {
  enabled: boolean;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;

  /** Campagne affichée à l'écran, ajoutée au contexte envoyé à l'IA. */
  campaignId: string | null;
  setCampaignId: (id: string | null) => void;

  conversationId: string | null;
  messages: CopilotMessage[];
  loadingConversation: boolean;
  pending: boolean;
  notice: CopilotNotice;
  selectConversation: (id: string | null) => void;
  send: (text: string) => void;
  /** Ouvre le panneau et pose la question dans une conversation neuve. */
  ask: (prompt: string) => void;
  regenerate: () => void;
  setFeedback: (messageId: string, value: AiMessageFeedback | null) => void;

  /** Incrémenté quand l'historique change (création, renommage, suppression). */
  historyVersion: number;
  refreshHistory: () => void;
}

const CopilotContext = createContext<CopilotContextValue | null>(null);

let localId = 0;

export function CopilotProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const enabled = !!user && COPILOT_ROLES.includes(user.role);

  const [panelOpen, setPanelOpen] = useState(false);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<CopilotNotice>(null);
  const [historyVersion, setHistoryVersion] = useState(0);

  // Conversation « active » au moment où une réponse arrive : une réponse
  // qui revient après que l'utilisateur a changé de conversation est ignorée.
  const activeRef = useRef<string | null>(null);
  const pendingRef = useRef(false);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const togglePanel = useCallback(() => setPanelOpen((open) => !open), []);
  const refreshHistory = useCallback(() => setHistoryVersion((v) => v + 1), []);

  const selectConversation = useCallback((id: string | null) => {
    activeRef.current = id;
    setConversationId(id);
    setNotice(null);
    setMessages([]);
    if (!id) {
      setLoadingConversation(false);
      return;
    }
    setLoadingConversation(true);
    apiGetConversation(id).then(
      (conversation) => {
        if (activeRef.current !== id) return;
        setMessages(conversation.messages);
        setLoadingConversation(false);
      },
      () => {
        if (activeRef.current !== id) return;
        setNotice("loadError");
        setLoadingConversation(false);
      }
    );
  }, []);

  const send = useCallback(
    (text: string) => {
      const content = text.trim().slice(0, COPILOT_MAX_MESSAGE_LENGTH);
      if (!content || pendingRef.current) return;

      const question: CopilotMessage = { id: `local-${++localId}`, content, sender: "USER", feedback: null, local: true };
      const answerId = `local-${++localId}`;
      const startedIn = activeRef.current;
      pendingRef.current = true;
      setPending(true);
      setNotice(null);
      setMessages((prev) => [...prev, question]);

      const run = async () => {
        let id = startedIn;
        if (!id) {
          const conversation = await apiCreateConversation(content.slice(0, TOPIC_MAX_LENGTH));
          id = conversation.id;
          activeRef.current = id;
          setConversationId(id);
          setHistoryVersion((v) => v + 1);
        }
        const conversationId = id;
        // Chaque morceau reçu s'ajoute à une bulle de réponse locale, créée
        // au premier morceau (jusque-là : indicateur « rédige sa réponse »).
        const result = await apiStreamChatMessage(conversationId, content, campaignId ?? undefined, (text) => {
          if (activeRef.current !== conversationId) return;
          setMessages((prev) => {
            const index = prev.findIndex((m) => m.id === answerId);
            if (index === -1) {
              return [...prev, { id: answerId, content: text, sender: "AI", feedback: null, local: true }];
            }
            const next = prev.slice();
            next[index] = { ...next[index], content: next[index].content + text };
            return next;
          });
        });
        return { id, result };
      };

      run().then(
        ({ id, result }) => {
          if (activeRef.current === id) {
            setMessages((prev) => [
              ...prev.filter((m) => m.id !== question.id && m.id !== answerId),
              result.userMessage,
              result.iaMessage,
            ]);
          }
          setHistoryVersion((v) => v + 1);
        },
        (error: unknown) => {
          // Réponse coupée : rien n'a été enregistré, la réponse partielle
          // disparaît (la question reste affichée, avec l'erreur).
          setMessages((prev) => prev.filter((m) => m.id !== answerId));
          if (activeRef.current === startedIn || !startedIn) {
            const noCompany = error instanceof ApiError && error.status === 403;
            setNotice(noCompany ? "noCompany" : "error");
          }
        }
      ).finally(() => {
        pendingRef.current = false;
        setPending(false);
      });
    },
    [campaignId]
  );

  const ask = useCallback(
    (prompt: string) => {
      if (pendingRef.current) {
        setPanelOpen(true);
        return;
      }
      // Une analyse demandée depuis une page démarre une conversation neuve :
      // elle ne doit pas se mêler à un échange sans rapport.
      activeRef.current = null;
      setConversationId(null);
      setMessages([]);
      setNotice(null);
      setLoadingConversation(false);
      setPanelOpen(true);
      send(prompt);
    },
    [send]
  );

  const regenerate = useCallback(() => {
    const id = activeRef.current;
    if (!id || pendingRef.current) return;
    pendingRef.current = true;
    setPending(true);
    setNotice(null);
    apiRegenerateLastAnswer(id, campaignId ?? undefined)
      .then(
        (message) => {
          if (activeRef.current !== id) return;
          setMessages((prev) => prev.map((m) => (m.id === message.id ? message : m)));
        },
        () => {
          if (activeRef.current === id) setNotice("error");
        }
      )
      .finally(() => {
        pendingRef.current = false;
        setPending(false);
      });
  }, [campaignId]);

  const setFeedback = useCallback((messageId: string, value: AiMessageFeedback | null) => {
    const id = activeRef.current;
    if (!id) return;
    // Optimiste : l'avis s'affiche tout de suite, et revient en arrière en
    // cas d'échec (sans message d'erreur : ce n'est qu'un signal secondaire).
    let previous: AiMessageFeedback | null = null;
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        previous = m.feedback;
        return { ...m, feedback: value };
      })
    );
    apiSetMessageFeedback(id, messageId, value).catch(() => {
      setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, feedback: previous } : m)));
    });
  }, []);

  const value = useMemo(
    () => ({
      enabled,
      panelOpen: enabled && panelOpen,
      openPanel,
      closePanel,
      togglePanel,
      campaignId,
      setCampaignId,
      conversationId,
      messages,
      loadingConversation,
      pending,
      notice,
      selectConversation,
      send,
      ask,
      regenerate,
      setFeedback,
      historyVersion,
      refreshHistory,
    }),
    [
      enabled,
      panelOpen,
      openPanel,
      closePanel,
      togglePanel,
      campaignId,
      conversationId,
      messages,
      loadingConversation,
      pending,
      notice,
      selectConversation,
      send,
      ask,
      regenerate,
      setFeedback,
      historyVersion,
      refreshHistory,
    ]
  );

  return <CopilotContext.Provider value={value}>{children}</CopilotContext.Provider>;
}

export function useCopilot(): CopilotContextValue {
  const ctx = useContext(CopilotContext);
  if (!ctx) throw new Error("useCopilot doit être utilisé sous <CopilotProvider>.");
  return ctx;
}

/**
 * À appeler depuis une page qui affiche une campagne : tant qu'elle est
 * affichée, les questions posées au Copilot portent sur cette campagne.
 */
export function useCopilotCampaign(campaignId: string | null) {
  const { setCampaignId } = useCopilot();
  useEffect(() => {
    setCampaignId(campaignId);
    return () => setCampaignId(null);
  }, [campaignId, setCampaignId]);
}
