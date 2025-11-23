import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Workspace from "./pages/Workspace";
import { CanvasProvider } from "./context/CanvasContext";
import { ChatProvider } from "./context/ChatContext";

function App() {
  const [view, setView] = useState("landing");

  const goToWorkspace = () => setView("workspace");
  const goToLanding = () => setView("landing");

  return (
    <CanvasProvider>
      <ChatProvider>
        {view === "landing" ? (
          <LandingPage onStart={goToWorkspace} onDemo={goToWorkspace} />
        ) : (
          <div className="relative">
            <div className="absolute left-4 top-4 z-10">
              <button
                onClick={goToLanding}
                className="rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 hover:border-sky-400"
              >
                ← Back
              </button>
            </div>
            <Workspace />
          </div>
        )}
      </ChatProvider>
    </CanvasProvider>
  );
}

export default App;
