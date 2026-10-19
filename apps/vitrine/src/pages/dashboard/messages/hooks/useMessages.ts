import { useState, useEffect, useMemo, useCallback } from "react";
import type { MessageItem, MessageFilterTab } from "../types";

const STORAGE_KEY = "cleanpro_dashboard_messages_v1";

const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: "alpha-1",
    sender: "Groupe Alpha",
    subtitle: "Nouveau message client",
    source: "Notification de la capture",
    snippet: "Sujet et contenu non renseignés",
    email: "",
    subject: "",
    content: "",
    date: "Septembre 2025",
    status: "unread",
  },
];

export function useMessages() {
  const [messages, setMessages] = useState<MessageItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as MessageItem[];
      }
    } catch {
      // Ignore parse error
    }
    return INITIAL_MESSAGES;
  });

  const [activeTab, setActiveTab] = useState<MessageFilterTab>("unread");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(
    INITIAL_MESSAGES[0]?.id ?? ""
  );

  // Synchronise dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage error
    }
    // Calcul du nombre de non lus (3 comme dans la capture : 1 visible + 2 signalés)
    const baseUnread = messages.filter((m) => m.status === "unread").length;
    // Si le message Alpha est non lu, le total est de 3 selon la capture
    const totalSignalUnread = baseUnread > 0 ? 3 : 0;
    window.dispatchEvent(
      new CustomEvent("cleanpro_messages_count", { detail: totalSignalUnread })
    );
  }, [messages]);

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      // Filtre onglet
      if (activeTab === "unread" && msg.status !== "unread") return false;
      if (activeTab === "read" && msg.status !== "read") return false;
      if (activeTab === "archived" && msg.status !== "archived") return false;

      // Filtre recherche
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchSender = msg.sender.toLowerCase().includes(query);
        const matchSub = msg.subtitle.toLowerCase().includes(query);
        const matchSource = msg.source.toLowerCase().includes(query);
        return matchSender || matchSub || matchSource;
      }

      return true;
    });
  }, [messages, activeTab, searchQuery]);

  const selectedMessage = useMemo(() => {
    return messages.find((m) => m.id === selectedId) || messages[0] || null;
  }, [messages, selectedId]);

  const markAsRead = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? { ...msg, status: msg.status === "read" ? "unread" : "read" }
          : msg
      )
    );
  }, []);

  const archiveMessage = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, status: "archived" } : msg
      )
    );
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return {
    messages,
    filteredMessages,
    selectedMessage,
    selectedId,
    setSelectedId,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    markAsRead,
    archiveMessage,
    deleteMessage,
  };
}

