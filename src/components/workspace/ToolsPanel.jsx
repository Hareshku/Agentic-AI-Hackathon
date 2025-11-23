import React from "react";
import { TOOL_MODES } from "../../utils/constants";
import { useCanvas } from "../../context/CanvasContext";

const tools = [
  { id: TOOL_MODES.SELECT, label: "Select", icon: "☑" },
  { id: TOOL_MODES.ADD_NODE, label: "Add Node", icon: "+" },
  { id: TOOL_MODES.ADD_LINK, label: "Add Link", icon: "⇄" },
  { id: TOOL_MODES.DELETE, label: "Delete", icon: "✕" },
  { id: TOOL_MODES.ZOOM, label: "Zoom ++", icon: "🔍" },
];

function ToolsPanel() {
  const { toolMode, setToolMode } = useCanvas();
  return (
    <aside className="flex w-full flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Tools</h3>
      <div className="space-y-2">
        {tools.map((tool) => {
          const active = toolMode === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setToolMode(tool.id)}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${
                active
                  ? "border-sky-400/70 bg-sky-500/10 text-white"
                  : "border-slate-800 bg-slate-800/50 text-slate-300 hover:border-slate-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{tool.icon}</span>
                {tool.label}
              </span>
              {active && <span className="text-xs text-sky-300">active</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default ToolsPanel;
