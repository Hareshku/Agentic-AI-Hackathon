import React from "react";

const cx = (...parts) =>
  parts
    .filter(Boolean)
    .join(" ")
    .trim();

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-150 active:translate-y-[1px]";

const variants = {
  primary:
    "bg-gradient-to-r from-sky-500 to-teal-400 text-slate-950 shadow-lg shadow-sky-900/30 hover:opacity-90",
  ghost: "border border-slate-700 text-slate-100 hover:border-sky-400",
  subtle: "bg-slate-800/70 text-slate-100 hover:bg-slate-700/70",
};

function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <button className={cx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
