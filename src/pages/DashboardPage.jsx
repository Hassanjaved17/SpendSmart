// ============================================================
//  SPENDSMART — DashboardPage.jsx
//  Final — Edit + Category Chart
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import BalanceCard from "../components/dashboard/BalanceCard";
import StatsRow from "../components/dashboard/StatsRow";
import AddTransaction from "../components/transactions/AddTransaction";
import TransactionList from "../components/transactions/TransactionList";
import SpendingChart from "../components/charts/SpendingChart";
import CategoryChart from "../components/charts/CategoryChart";
import Footer from "../components/ui/Footer";
import Toast from "../components/ui/Toast";
import useTransactions from "../hooks/useTransactions";
import useToast from "../hooks/useToast";

const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);

  // ── Firebase hook ─────────────────────────────────────────
  const {
    transactions, loading, error,
    addTransaction, editTransaction, deleteTransaction,
  } = useTransactions();

  // ── Toast hook ────────────────────────────────────────────
  const { toast, showToast, hideToast } = useToast();

  // ── Computed values ───────────────────────────────────────
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyExpenses = transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
  const topCategory = Object.keys(categoryTotals).length
    ? Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0]
    : "—";

  // ── Handlers ─────────────────────────────────────────────
  const handleAdd = async (data) => {
    try {
      await addTransaction(data);
      showToast(
        `${data.type === "expense" ? "Expense" : "Income"} of PKR ${data.amount.toLocaleString()} added!`,
        "success"
      );
    } catch {
      showToast("Failed to add transaction. Try again.", "error");
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await editTransaction(id, data);
      showToast("Transaction updated successfully.", "success");
    } catch {
      showToast("Failed to update transaction. Try again.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      showToast("Transaction deleted successfully.", "success");
    } catch {
      showToast("Failed to delete transaction. Try again.", "error");
    }
  };

  // ── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a06] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={28} className="animate-spin text-emerald-500" />
            <p className="text-gray-600 text-sm">Loading your transactions…</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#050a06] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-8 py-6 text-center">
            <p className="text-red-400 text-sm">{error}</p>
            <p className="text-gray-600 text-xs mt-1">Please refresh the page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a06]">

      <Navbar />
 
      {/* Background glow */}
      <div className="fixed top-[-100px] right-[-100px] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Balance Card */}
        <div className="max-w-lg mx-auto w-full">
          <BalanceCard
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        </div>

        {/* Stats Row */}
        <StatsRow
          totalTransactions={transactions.length}
          monthlyExpenses={monthlyExpenses}
          topCategory={topCategory}
        />

        {/* Add button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30"
          >
            <Plus size={17} strokeWidth={2.5} />
            Add Transaction
          </button>
        </div>

        {/* Charts — side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingChart transactions={transactions} />
          <CategoryChart transactions={transactions} />
        </div>

        {/* Transaction List */}
        <TransactionList
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

      </main>

      <Footer />

      {/* Add Modal */}
      {showModal && (
        <AddTransaction
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

    </div>
  );
};

export default DashboardPage;

// © 2026 Hassan Javed — All Rights Reserved