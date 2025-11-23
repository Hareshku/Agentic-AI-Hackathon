import React from "react";

function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-slate-300">
      <span className="h-3 w-3 animate-ping rounded-full bg-sky-400" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export default Loader;
