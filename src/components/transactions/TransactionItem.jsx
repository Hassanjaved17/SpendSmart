// ============================================================
//  SPENDSMART — TransactionItem.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { Trash2, Pencil } from "lucide-react";

// ── Category emoji map ────────────────────────────────────────
const CATEGORY_EMOJI = {
  Food: "🍔", Transport: "🚗", Shopping: "🛍️",
  Bills: "📄", Health: "💊", Education: "📚",
  Entertainment: "🎬", Salary: "💼", Freelance: "💻",
  Business: "🏢", Investment: "📈", Gift: "🎁", Other: "💰",
};

// ── Format PKR ────────────────────────────────────────────────
const formatPKR = (amount) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency", currency: "PKR",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount);

// ── Format date ───────────────────────────────────────────────
const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-PK", {
    day: "numeric", month: "short", year: "numeric",
  });

const TransactionItem = ({ transaction, onDelete, onEdit }) => {
  const { id, type, amount, category, note, date } = transaction;
  const isExpense = type === "expense";
  const emoji = CATEGORY_EMOJI[category] ?? "💰";

  return (
    <div className="group flex items-center gap-4 bg-[#0d1a0f] border border-emerald-900/30 hover:border-emerald-800/50 rounded-xl px-4 py-3.5 transition-all duration-300">

      {/* Category emoji */}
      <div className="w-10 h-10 rounded-xl bg-[#0a120b] border border-emerald-900/30 flex items-center justify-center text-lg flex-shrink-0">
        {emoji}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium">{category}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isExpense
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }`}>
            {isExpense ? "Expense" : "Income"}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-gray-600 text-xs">{formatDate(date)}</span>
          {note && (
            <>
              <span className="text-gray-700 text-xs">·</span>
              <span className="text-gray-500 text-xs truncate max-w-[150px]">{note}</span>
            </>
          )}
        </div>
      </div>

      {/* Amount + actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`font-bold text-sm ${isExpense ? "text-red-400" : "text-emerald-400"}`}>
          {isExpense ? "− " : "+ "}
          {formatPKR(amount)}
        </span>

        {/* Edit button — always visible on mobile, hover on desktop */}
        <button
          onClick={() => onEdit(transaction)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-700 hover:text-emerald-400 hover:bg-emerald-500/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200"
          title="Edit transaction"
        >
          <Pencil size={12} />
        </button>

        {/* Delete button — always visible on mobile, hover on desktop */}
        <button
          onClick={() => onDelete(id)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-700 hover:text-red-400 hover:bg-red-500/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200"
          title="Delete transaction"
        >
          <Trash2 size={12} />
        </button>
      </div>

    </div>
  );
};

export default TransactionItem;

// © 2026 Hassan Javed — All Rights Reserved