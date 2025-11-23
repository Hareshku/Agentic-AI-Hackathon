import backend from "./backend";

export async function sendChatPrompt(message) {
  const { data } = await backend.post("/api/chat", { message });
  return data;
}

export default { sendChatPrompt };
