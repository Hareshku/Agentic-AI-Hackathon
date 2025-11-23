import React from "react";

const projects = [
  { name: "Population Growth Model", meta: "Loops + delays" },
  { name: "Education & Employment", meta: "Stocks & flows" },
  { name: "Urban Transport Dynamics", meta: "Capacity + demand" },
];

function RecentProjects() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
        Recent Projects
      </h3>
      <div className="mt-4 space-y-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-800/40 px-4 py-3"
          >
            <div>
              <p className="font-semibold text-white">{project.name}</p>
              <p className="text-xs text-slate-400">{project.meta}</p>
            </div>
            <span className="text-xs text-sky-300">Open</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentProjects;
