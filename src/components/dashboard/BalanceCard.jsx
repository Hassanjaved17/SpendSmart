// ============================================================
//  SPENDSMART — BalanceCard.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

// ── Format number as PKR ──────────────────────────────────────
const formatPKR = (amount) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

const BalanceCard = ({ totalIncome = 0, totalExpenses = 0 }) => {
  const balance = totalIncome - totalExpenses;
  const isPositive = balance >= 0;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-900/40 bg-[#0d1a0f] shadow-2xl shadow-black/40">

      {/* ── Glow behind card ── */}
      <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

      {/* ── Top section — total balance ── */}
      <div className="relative px-8 pt-8 pb-6 text-center border-b border-emerald-900/30">

        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Wallet size={14} className="text-emerald-500/60" />
          <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">
            Total Balance
          </span>
        </div>

        {/* Balance amount */}
        <div className={`text-4xl sm:text-5xl font-bold tracking-tight mb-1 ${
          isPositive ? "text-white" : "text-red-400"
        }`}>
          {isPositive ? "" : "- "}
          {formatPKR(balance)}
        </div>

        {/* Status pill */}
        <div className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-medium ${
          isPositive
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-red-500/10 text-red-400 border border-red-500/20"
        }`}>
          {isPositive ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}
          {isPositive ? "You're in the green!" : "Expenses exceed income"}
        </div>
      </div>

      {/* ── Bottom section — income vs expenses ── */}
      <div className="grid grid-cols-2 divide-x divide-emerald-900/30">

        {/* Income */}
        <div className="px-6 py-5 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5 text-emerald-500/70">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp size={13} className="text-emerald-400" />
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              Income
            </span>
          </div>
          <span className="text-emerald-400 font-bold text-xl">
            {formatPKR(totalIncome)}
          </span>
        </div>

        {/* Expenses */}
        <div className="px-6 py-5 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center">
              <TrendingDown size={13} className="text-red-400" />
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              Expenses
            </span>
          </div>
          <span className="text-red-400 font-bold text-xl">
            {formatPKR(totalExpenses)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;

// © 2026 Hassan Javed — All Rights Reserved