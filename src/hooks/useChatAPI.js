import { useCallback, useState } from "react";
import { sendChatPrompt } from "../api/chatAPI";

export default function useChatAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendPrompt = useCallback(async (message) => {
    setLoading(true);
    setError(null);
    try {
      const data = await sendChatPrompt(message);
      return data;
    } catch (err) {
      setError(err?.message || "Failed to reach chat endpoint");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendPrompt, loading, error };
}
