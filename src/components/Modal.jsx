import React from "react";
import Button from "./Button";

function Modal({ open, title, children, onClose, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:border-sky-400"
          >
            Close
          </button>
        </div>
        <div className="text-sm text-slate-200">{children}</div>
        {actions ? (
          <div className="mt-6 flex justify-end gap-3">{actions}</div>
        ) : (
          <div className="mt-6 flex justify-end">
            <Button variant="primary" onClick={onClose}>
              OK
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
