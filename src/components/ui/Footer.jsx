// ============================================================
//  SPENDSMART — Footer.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { DollarSign } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-emerald-900/20 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
            <DollarSign size={13} color="#000" strokeWidth={2.5} />
          </div>
          <span className="text-gray-600 text-xs font-medium">SpendSmart</span>
        </div>

        {/* Center */}
        <p className="text-gray-700 text-xs">
          Track every rupee. Own your finances.
        </p>

        {/* Right */}
        <p className="text-gray-700 text-xs">
          © 2026{" "}
          <a
            href="https://hassanjaveds.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 hover:text-emerald-500 transition-colors duration-200"
          >
            Hassan Javed
          </a>
        </p>

      </div>
    </footer>
  );
};

export default Footer;

// © 2026 Hassan Javed — All Rights Reserved