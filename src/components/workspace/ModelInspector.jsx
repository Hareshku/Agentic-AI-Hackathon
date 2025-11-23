import React, { useEffect, useState } from "react";
import { useCanvas } from "../../context/CanvasContext";
import Button from "../Button";
import { NODE_TYPES } from "../../utils/constants";

function ModelInspector() {
  const { nodes, selectedNodeId, updateNode, deleteNode } = useCanvas();
  const selected = nodes.find((n) => n.id === selectedNodeId);
  const [form, setForm] = useState({ label: "", type: "variable", description: "" });

  useEffect(() => {
    if (selected) {
      setForm({
        label: selected.data?.label || "",
        type: selected.data?.type || "variable",
        description: selected.data?.description || "",
      });
    } else {
      setForm({ label: "", type: "variable", description: "" });
    }
  }, [selected]);

  const handleSave = () => {
    if (!selected) return;
    updateNode(selected.id, form);
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteNode(selected.id);
  };

  return (
    <aside className="flex h-full w-full flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
        Model Inspector
      </h3>
      {selected ? (
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wide text-slate-400">
            Node Name
            <input
              value={form.label}
              onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-white focus:border-sky-400"
              placeholder="Population"
            />
          </label>
          <label className="text-xs uppercase tracking-wide text-slate-400">
            Type
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-white focus:border-sky-400"
            >
              {NODE_TYPES.map((type) => (
                <option key={type} value={type} className="bg-slate-900">
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs uppercase tracking-wide text-slate-400">
            Description
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="mt-1 min-h-[120px] w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-white focus:border-sky-400"
              placeholder="Represents total population"
            />
          </label>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={handleDelete}>
              Delete Node
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-400">Select a node to edit its details.</p>
      )}
    </aside>
  );
}

export default ModelInspector;
