export type MessageStatus = "unread" | "read" | "archived";

export interface MessageItem {
  id: string;
  sender: string;
  subtitle: string;
  source: string;
  snippet: string;
  email?: string;
  subject?: string;
  content?: string;
  date: string;
  status: MessageStatus;
}

export type MessageFilterTab = "all" | "unread" | "read" | "archived";

