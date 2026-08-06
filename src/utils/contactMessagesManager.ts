export interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const MESSAGES_STORAGE_KEY = 'siddartha_inbox_messages';

export function getStoredMessages(): StoredMessage[] {
  try {
    const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveMessage(msg: Omit<StoredMessage, 'id' | 'timestamp' | 'read'>): StoredMessage {
  const newMsg: StoredMessage = {
    ...msg,
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toLocaleString(),
    read: false
  };

  const existing = getStoredMessages();
  const updated = [newMsg, ...existing];
  
  try {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('siddartha_messages_updated'));
  } catch (e) {
    console.error('Failed to store message', e);
  }

  return newMsg;
}

export function deleteMessage(id: string): void {
  const existing = getStoredMessages();
  const updated = existing.filter(m => m.id !== id);
  try {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('siddartha_messages_updated'));
  } catch (e) {
    console.error('Failed to delete message', e);
  }
}

export function clearAllMessages(): void {
  try {
    localStorage.removeItem(MESSAGES_STORAGE_KEY);
    window.dispatchEvent(new Event('siddartha_messages_updated'));
  } catch (e) {
    console.error('Failed to clear messages', e);
  }
}
