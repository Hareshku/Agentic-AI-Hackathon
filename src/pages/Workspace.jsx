import React from "react";
import HeaderBar from "../components/workspace/HeaderBar";
import ToolsPanel from "../components/workspace/ToolsPanel";
import CanvasBoard from "../components/workspace/CanvasBoard";
import ChatPanel from "../components/workspace/ChatPanel";
import ModelInspector from "../components/workspace/ModelInspector";

function Workspace() {
  return (
    <div className="min-h-screen bg-transparent px-4 py-6 lg:px-8">
      <HeaderBar />
      <div className="mt-6 grid gap-4 lg:grid-cols-[260px_1fr_320px]">
        <div className="flex flex-col gap-4">
          <ToolsPanel />
          <ChatPanel />
        </div>
        <CanvasBoard />
        <ModelInspector />
      </div>
    </div>
  );
}

export default Workspace;
