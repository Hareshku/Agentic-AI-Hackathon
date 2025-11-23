import React, { useMemo, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useCanvas } from "../../context/CanvasContext";
import parseAIModel from "../../utils/parseAIModel";
import Button from "../Button";
import Loader from "../Loader";

function ChatPanel() {
  const { messages, sendMessage, isLoading, error } = useChat();
  const { nodes: canvasNodes, addNode, addEdge, updateNode } = useCanvas();
  const [input, setInput] = useState("");

  const latestAssistant = useMemo(
    () => [...messages].reverse().find((m) => m.role === "assistant"),
    [messages]
  );

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const injectToCanvas = () => {
    if (!latestAssistant?.message) return;
    const { nodes, edges } = parseAIModel(latestAssistant.message);
    const existingIds = new Set(canvasNodes.map((n) => n.id));
    const idMap = {};

    nodes.forEach((node) => {
      let newId = node.id || `node-${Date.now()}`;
      if (existingIds.has(newId)) {
        newId = `${newId}-${Date.now()}`;
      }
      idMap[node.id] = newId;
      const created = addNode(node.position, node.data, newId);
      updateNode(created.id, node.data);
    });
    edges.forEach((edge) =>
      addEdge({
        ...edge,
        source: idMap[edge.source] || edge.source,
        target: idMap[edge.target] || edge.target,
      })
    );
  };

  return (
    <div className="flex min-h-[260px] flex-1 flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/30">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Chat Panel</h3>
        {latestAssistant?.message && (
          <Button variant="ghost" className="text-xs" onClick={injectToCanvas}>
            Add to Canvas
          </Button>
        )}
      </div>
      <div className="mt-3 flex-1 space-y-3 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/40 p-3">
        {messages.map((msg, idx) => (
          <div
            key={`${msg.role}-${idx}`}
            className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
              msg.role === "user"
                ? "ml-auto bg-sky-500/20 text-sky-100"
                : "mr-auto bg-slate-800/80 text-slate-100"
            }`}
          >
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              {msg.role === "user" ? "You" : "AI"}
            </p>
            <p>{msg.message}</p>
          </div>
        ))}
        {isLoading && <Loader label="Waiting for AI..." />}
        {error && <p className="text-xs text-rose-400">{error}</p>}
      </div>
      <form onSubmit={handleSend} className="mt-3 flex items-center gap-2">
        <input
          className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none ring-1 ring-transparent focus:ring-sky-400"
          placeholder='Describe your system, e.g. "Population drives Birth rate"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" className="whitespace-nowrap">
          Send
        </Button>
      </form>
    </div>
  );
}

export default ChatPanel;
