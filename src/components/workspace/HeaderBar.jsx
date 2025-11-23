import React, { useState } from "react";
import { processModel, saveDiagram } from "../../api/modelAPI";
import Button from "../Button";
import Loader from "../Loader";
import { useCanvas } from "../../context/CanvasContext";

function HeaderBar() {
  const { projectName, nodes, edges } = useCanvas();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const runProcessing = async () => {
    setBusy(true);
    setStatus("Processing model...");
    try {
      const res = await processModel({ nodes, edges });
      const suggestions = res?.processedModel?.suggestions?.length || 0;
      setStatus(`Processed. Suggestions: ${suggestions}`);
    } catch (err) {
      setStatus("Processing failed - backend not ready?");
    } finally {
      setBusy(false);
    }
  };

  const saveDiagramAction = async () => {
    setBusy(true);
    setStatus("Saving...");
    try {
      await saveDiagram({ projectId: "demo", nodes, edges });
      setStatus("Saved draft");
    } catch (err) {
      setStatus("Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <header className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-lg shadow-slate-950/30">
      <div className="flex items-center gap-3">
        <button className="rounded-md border border-slate-700 px-3 py-1 text-slate-200">
          ☰
        </button>
        <div className="rounded-md border border-slate-800 bg-slate-800/70 px-4 py-2 text-sm text-slate-300">
          Project: {projectName}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {status && !busy && <span className="text-xs text-slate-400">{status}</span>}
        {busy && <Loader label={status || "Working..."} />}
        <Button variant="subtle" className="text-xs" onClick={saveDiagramAction}>
          Save
        </Button>
        <Button onClick={runProcessing}>Run Model</Button>
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-500 to-teal-300" />
      </div>
    </header>
  );
}

export default HeaderBar;
