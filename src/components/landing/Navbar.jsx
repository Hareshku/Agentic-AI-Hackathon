import React from "react";
import Button from "../Button";

function Navbar({ onGetStarted, onTryDemo }) {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <img
          src="assets/logo.png"
          alt="SD-AI Studio Logo"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold text-white">
            Tackle Simulation Studio
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="text-sm text-slate-300 hover:text-white"
          onClick={onTryDemo}
        >
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
