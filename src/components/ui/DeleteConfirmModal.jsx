// ============================================================
//  SPENDSMART — DeleteConfirmModal.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useState } from "react";
import { Trash2, X, Loader2 } from "lucide-react";

// ── Format PKR ────────────────────────────────────────────────
const formatPKR = (amount) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency", currency: "PKR",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount);

// ── Category emoji map ────────────────────────────────────────
const CATEGORY_EMOJI = {
  Food: "🍔", Transport: "🚗", Shopping: "🛍️",
  Bills: "📄", Health: "💊", Education: "📚",
  Entertainment: "🎬", Salary: "💼", Freelance: "💻",
  Business: "🏢", Investment: "📈", Gift: "🎁", Other: "💰",
};

const DeleteConfirmModal = ({ transaction, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const emoji = CATEGORY_EMOJI[transaction.category] ?? "💰";

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(transaction.id);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm bg-[#0d1a0f] border border-red-900/40 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-red-900/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Trash2 size={15} className="text-red-400" />
            </div>
            <h2 className="text-white font-semibold text-base">Delete Transaction</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-red-900/20 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5">

          {/* Warning */}
          <p className="text-gray-400 text-sm leading-relaxed">
            Are you sure you want to delete this transaction? This action
            <span className="text-red-400 font-medium"> cannot be undone </span>
            and will affect your balance and charts.
          </p>

          {/* Transaction preview */}
          <div className="flex items-center gap-3 bg-[#0a120b] border border-red-900/20 rounded-xl px-4 py-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d1a0f] border border-emerald-900/30 flex items-center justify-center text-lg flex-shrink-0">
              {emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{transaction.category}</p>
              {transaction.note && (
                <p className="text-gray-600 text-xs truncate">{transaction.note}</p>
              )}
            </div>
            <span className={`font-bold text-sm flex-shrink-0 ${
              transaction.type === "expense" ? "text-red-400" : "text-emerald-400"
            }`}>
              {transaction.type === "expense" ? "− " : "+ "}
              {formatPKR(transaction.amount)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-xl border border-emerald-900/40 text-gray-400 hover:text-white hover:border-emerald-700/40 text-sm font-medium transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-red-500/80 hover:bg-red-500 disabled:bg-red-900 disabled:text-red-700 text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 size={14} />
                  Yes, Delete
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

// © 2026 Hassan Javed — All Rights Reserved