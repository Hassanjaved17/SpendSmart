// ============================================================
//  SPENDSMART — AddTransaction.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useState } from "react";
import { X, TrendingUp, TrendingDown, DollarSign, AlignLeft, Loader2 } from "lucide-react";
import CategoryInput from "../ui/CategoryInput";

const AddTransaction = ({ onClose, onAdd }) => {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!category.trim()) {
      setError("Please enter or select a category.");
      return;
    }

    setLoading(true);
    try {
      await onAdd({
        type,
        amount: Number(amount),
        category: category.trim(),
        note: note.trim(),
        date,
      });
      onClose();
    } catch (err) {
      setError("Failed to add transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-[#0d1a0f] border border-emerald-900/50 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-900/30">
          <h2 className="text-white font-semibold text-base">Add Transaction</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-emerald-900/30 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">

          {/* Type toggle */}
          <div className="flex bg-[#0a120b] rounded-xl p-1 border border-emerald-900/30">
            <button
              type="button"
              onClick={() => handleTypeChange("expense")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${type === "expense"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "text-gray-500 hover:text-gray-300"
                }`}
            >
              <TrendingDown size={14} />
              Expense
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("income")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${type === "income"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-gray-500 hover:text-gray-300"
                }`}
            >
              <TrendingUp size={14} />
              Income
            </button>
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Amount (PKR)
            </label>
            <div className="relative">
              <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="1"
                required
                className="w-full bg-[#0a120b] border border-emerald-900/40 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>

          {/* Category — smart combo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Category
            </label>
            <CategoryInput
              type={type}
              value={category}
              onChange={setCategory}
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-[#0a120b] border border-emerald-900/40 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Note <span className="text-gray-600 normal-case">(optional)</span>
            </label>
            <div className="relative">
              <AlignLeft size={15} className="absolute left-3.5 top-3.5 text-gray-600" />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a short note…"
                rows={2}
                maxLength={100}
                className="w-full bg-[#0a120b] border border-emerald-900/40 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-emerald-900/40 text-gray-400 hover:text-white hover:border-emerald-700/40 text-sm font-medium transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${type === "expense"
                  ? "bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 disabled:bg-red-900 disabled:text-red-700"
                  : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 disabled:bg-emerald-900 disabled:text-emerald-700"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Saving…
                </>
              ) : (
                `Add ${type === "expense" ? "Expense" : "Income"}`
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTransaction;

// © 2026 Hassan Javed — All Rights Reserved