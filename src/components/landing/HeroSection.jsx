import React from "react";
import Button from "../Button";

function HeroSection({ onGetStarted, onTryDemo }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/60 px-8 py-12 shadow-xl shadow-slate-950/30 lg:px-12">
      <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Qualitative SD Canvas</p>
      <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
        AI-assisted system dynamics modeling, right in your browser
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-slate-300">
        Chat with AI to design qualitative models and visualize them on a whiteboard powered by
        sd-ai. Combine rapid ideation with a tactile canvas.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button onClick={onGetStarted}>Get Started</Button>
        <Button variant="ghost" onClick={onTryDemo}>
          Try Demo
        </Button>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Live workspace preview
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
