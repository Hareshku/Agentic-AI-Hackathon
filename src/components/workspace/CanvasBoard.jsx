import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import useCanvasActions from "../../hooks/useCanvasActions";
import { useCanvas } from "../../context/CanvasContext";

function CanvasViewport() {
  const { nodes, edges, onNodesChange, onEdgesChange, setSelectedNodeId } = useCanvas();
  const { handlePaneClick, handleConnect, handleNodeClick, handleEdgeClick } = useCanvasActions();

  return (
    <div className="h-[72vh] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50 shadow-inner shadow-slate-950/60">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePaneClick}
        onConnect={handleConnect}
        onSelectionChange={(sel) => setSelectedNodeId(sel?.nodes?.[0]?.id || null)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{ animated: false, type: "default" }}
        connectionLineStyle={{ stroke: "#38bdf8", strokeWidth: 2 }}
        className="react-flow-subtle"
      >
        <MiniMap pannable zoomable />
        <Controls position="top-left" />
        <Background gap={24} color="#1f2937" />
      </ReactFlow>
    </div>
  );
}

function CanvasBoard() {
  return (
    <ReactFlowProvider>
      <CanvasViewport />
    </ReactFlowProvider>
  );
}

export default CanvasBoard;
