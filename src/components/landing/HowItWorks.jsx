import React from "react";

const steps = [
  {
    title: "Describe your system to the AI",
    detail: "Outline variables, links, and feedback loops in plain language.",
  },
  {
    title: "AI suggests variables and links",
    detail: "Receive structured nodes/edges you can add to the canvas.",
  },
  {
    title: "Add to canvas & refine visually",
    detail: "Edit nodes, connect relationships, and run sd-ai processing.",
  },
];

function HowItWorks() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">How it works</h3>
      <div className="mt-5 space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex items-start gap-3 rounded-xl border border-slate-800/70 bg-slate-800/40 p-4"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-sky-300">
              {index + 1}
            </div>
            <div>
              <p className="font-semibold text-white">{step.title}</p>
              <p className="text-sm text-slate-400">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
