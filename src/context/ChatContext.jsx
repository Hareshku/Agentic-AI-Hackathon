import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { sendChatPrompt } from "../api/chatAPI";

const ChatContext = createContext(null);

const seedMessages = [
  { role: "system", message: "Ask me to propose variables and links for your model." },
  { role: "assistant", message: "Try describing your system and I will suggest nodes." },
];

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(seedMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (input) => {
    if (!input.trim()) return;
    const userMessage = { role: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    try {
      const data = await sendChatPrompt(input);
      const reply = data?.reply || "The backend will respond with model suggestions here.";
      const aiMessage = { role: "assistant", message: reply };
      setMessages((prev) => [...prev, aiMessage]);
      return aiMessage;
    } catch (err) {
      setError("Could not reach AI. Please try again later.");
      const fallback = {
        role: "assistant",
        message: "Example suggestion: Population -> Birth rate, Population -> Death rate",
      };
      setMessages((prev) => [...prev, fallback]);
      return fallback;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ messages, sendMessage, isLoading, error }),
    [messages, sendMessage, isLoading, error]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
