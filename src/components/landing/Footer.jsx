import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-800/30 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left side - Copyright */}
          <div className="text-center text-sm text-slate-400 md:text-left">
            <p>
              Copyright © {currentYear} Tackle Simulation Studio. All rights
              reserved.
            </p>
            <p className="mt-1">
              Powered by{" "}
              <a
                href="https://tackle.systems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 transition-colors hover:text-sky-300"
              >
                tackle.systems
              </a>
            </p>
          </div>

          {/* Right side - Contact */}
          <div className="text-center text-sm text-slate-400 md:text-right">
            <p className="font-semibold text-slate-300">Get in Touch</p>
            <p className="mt-1">
              Partnership inquiries:{" "}
              <a
                href="mailto:partnership@tackle.systems"
                className="text-sky-400 transition-colors hover:text-sky-300"
              >
                partnership@tackle.systems
              </a>
            </p>
          </div>
        </div>

        {/* Bottom links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-slate-800/30 pt-6 text-xs text-slate-500">
          <a
            href="https://tackle.systems"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-slate-300"
          >
            About Tackle Systems
          </a>
          <span>•</span>
          <a href="#" className="transition-colors hover:text-slate-300">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="transition-colors hover:text-slate-300">
            Terms of Service
          </a>
          <span>•</span>
          <a href="#" className="transition-colors hover:text-slate-300">
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
