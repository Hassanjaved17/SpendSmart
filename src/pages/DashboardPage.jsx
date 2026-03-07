// ============================================================
//  SPENDSMART — DashboardPage.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useState } from "react";
import Footer from "../components/ui/Footer";
import { Plus } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import BalanceCard from "../components/dashboard/BalanceCard";
import StatsRow from "../components/dashboard/StatsRow";
import AddTransaction from "../components/transactions/AddTransaction";
import TransactionList from "../components/transactions/TransactionList";
import SpendingChart from "../components/charts/SpendingChart";

// ── Dummy transactions for UI preview ────────────────────────
const DUMMY_TRANSACTIONS = [
  { id: "1", type: "income", amount: 50000, category: "Salary", note: "March salary", date: "2026-03-01" },
  { id: "2", type: "expense", amount: 3500, category: "Food", note: "Grocery run", date: "2026-03-02" },
  { id: "3", type: "expense", amount: 2000, category: "Transport", note: "Uber rides", date: "2026-03-03" },
  { id: "4", type: "expense", amount: 8000, category: "Shopping", note: "New shoes", date: "2026-03-04" },
  { id: "5", type: "expense", amount: 1500, category: "Bills", note: "Electricity bill", date: "2026-03-05" },
  { id: "6", type: "income", amount: 15000, category: "Freelance", note: "Logo design", date: "2026-03-06" },
  { id: "7", type: "expense", amount: 500, category: "Entertainment", note: "Netflix", date: "2026-03-07" },
];

const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState(DUMMY_TRANSACTIONS);

  // ── Computed values ───────────────────────────────────────
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // This month expenses
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyExpenses = transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  // Top category
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
    const newTransaction = { ...data, id: Date.now().toString() };
    setTransactions((prev) => [newTransaction, ...prev]);
    // Firebase addDoc goes here in Phase 2
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    // Firebase deleteDoc goes here in Phase 2
  };

  return (
    <div className="min-h-screen bg-[#050a06]">

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Background glow ── */}
      <div className="fixed top-[-100px] right-[-100px] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Main content ── */}
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

        {/* Chart + Add button row */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30"
            >
              <Plus size={17} strokeWidth={2.5} />
              Add Transaction
            </button>
          </div>

          {/* Spending Chart */}
          <SpendingChart transactions={transactions} />
        </div>

        {/* Transaction List */}
        <TransactionList
          transactions={transactions}
          onDelete={handleDelete}
        />

      </main>

      <Footer />

      {/* ── Modal ── */}
      {showModal && (
        <AddTransaction
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

    </div>
  );
};

export default DashboardPage;

// © 2026 Hassan Javed — All Rights Reserved