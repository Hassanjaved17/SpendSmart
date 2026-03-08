// ============================================================
//  SPENDSMART — Toast.jsx
//  Success / Error notification component
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {

  // ── Auto close after 3 seconds ───────────────────────────
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-2xl shadow-black/40 backdrop-blur-sm transition-all duration-300 max-w-sm ${
      isSuccess
        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        : "bg-red-500/10 border-red-500/30 text-red-400"
    }`}>

      {/* Icon */}
      {isSuccess
        ? <CheckCircle size={17} className="shrink-0" />
        : <XCircle    size={17} className="shrink-0" />
      }

      {/* Message */}
      <p className="text-sm font-medium flex-1">{message}</p>

      {/* Close button */}
      <button
        onClick={onClose}
        className="text-current opacity-50 hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>

    </div>
  );
};

export default Toast;

// © 2026 Hassan Javed — All Rights Reserved