import React from "react";
import Button from "../Button";

function Navbar({ onGetStarted, onTryDemo }) {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-4 shadow-lg shadow-slate-900/40">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-400 font-black text-slate-900">
          SD
        </div>
        <div>
          <p className="text-lg font-semibold text-white">sd-ai studio</p>
          <p className="text-xs text-slate-400">System dynamics, accelerated</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-sm text-slate-300 hover:text-white" onClick={onTryDemo}>
          Login
        </button>
        <Button variant="ghost" className="text-sm" onClick={onGetStarted}>
          Sign Up
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
