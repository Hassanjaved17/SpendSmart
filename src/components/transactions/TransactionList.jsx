// ============================================================
//  SPENDSMART — TransactionList.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useState } from "react";
import { Search, Filter, ReceiptText } from "lucide-react";
import TransactionItem from "./TransactionItem";
import EditTransaction from "./EditTransaction";

const FILTER_OPTIONS = ["All", "Income", "Expense"];

const TransactionList = ({ transactions = [], onDelete, onEdit }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingTransaction, setEditing] = useState(null);

  // ── Filter + search ───────────────────────────────────────
  const filtered = transactions
    .filter((t) => {
      if (filter === "Income") return t.type === "income";
      if (filter === "Expense") return t.type === "expense";
      return true;
    })
    .filter((t) => {
      const q = search.toLowerCase();
      return (
        t.category.toLowerCase().includes(q) ||
        (t.note && t.note.toLowerCase().includes(q))
      );
    });

  return (
    <>
      <div className="flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ReceiptText size={16} className="text-emerald-500/70" />
            <h2 className="text-white font-semibold text-sm">Transactions</h2>
            <span className="text-xs text-gray-600 bg-emerald-900/20 border border-emerald-900/30 px-2 py-0.5 rounded-full">
              {transactions.length}
            </span>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5">
            <Filter size={12} className="text-gray-600" />
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${filter === opt
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "text-gray-500 hover:text-gray-300 border border-transparent"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by category or note…"
            className="w-full bg-[#0d1a0f] border border-emerald-900/40 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        {/* List */}
        <div className="flex flex-col gap-2.5">
          {filtered.length > 0 ? (
            filtered.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={onDelete}
                onEdit={(t) => setEditing(t)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-900/20 border border-emerald-900/30 flex items-center justify-center">
                <ReceiptText size={24} className="text-emerald-900" />
              </div>
              <p className="text-gray-600 text-sm">
                {search || filter !== "All"
                  ? "No transactions match your search."
                  : "No transactions yet. Add your first one!"}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Edit modal */}
      {editingTransaction && (
        <EditTransaction
          transaction={editingTransaction}
          onClose={() => setEditing(null)}
          onEdit={async (id, data) => {
            await onEdit(id, data);
            setEditing(null);
          }}
        />
      )}
    </>
  );
};

export default TransactionList;

// © 2026 Hassan Javed — All Rights Reserved