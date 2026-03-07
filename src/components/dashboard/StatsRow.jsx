// ============================================================
//  SPENDSMART — StatsRow.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { Hash, CalendarDays, Trophy } from "lucide-react";

// ── Format PKR ────────────────────────────────────────────────
const formatPKR = (amount) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// ── Single stat box ───────────────────────────────────────────
const StatBox = ({ icon: Icon, iconColor, iconBg, label, value, sub }) => (
  <div className="flex-1 bg-[#0d1a0f] border border-emerald-900/40 rounded-2xl px-5 py-5 flex flex-col gap-3 hover:border-emerald-700/40 transition-all duration-300">
    <div className="flex items-center justify-between">
      <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">
        {label}
      </span>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
        <Icon size={15} className={iconColor} />
      </div>
    </div>
    <div>
      <div className="text-white font-bold text-xl leading-tight">{value}</div>
      {sub && (
        <div className="text-gray-600 text-xs mt-1">{sub}</div>
      )}
    </div>
  </div>
);

// ── StatsRow ──────────────────────────────────────────────────
const StatsRow = ({
  totalTransactions = 0,
  monthlyExpenses   = 0,
  topCategory       = "—",
}) => {

  // Get current month name
  const monthName = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="flex flex-col sm:flex-row gap-4">

      {/* Stat 1 — Total transactions */}
      <StatBox
        icon={Hash}
        iconColor="text-emerald-400"
        iconBg="bg-emerald-500/10"
        label="Transactions"
        value={totalTransactions}
        sub="all time entries"
      />

      {/* Stat 2 — This month expenses */}
      <StatBox
        icon={CalendarDays}
        iconColor="text-sky-400"
        iconBg="bg-sky-500/10"
        label={`${monthName} Spending`}
        value={formatPKR(monthlyExpenses)}
        sub="expenses this month"
      />

      {/* Stat 3 — Top category */}
      <StatBox
        icon={Trophy}
        iconColor="text-amber-400"
        iconBg="bg-amber-500/10"
        label="Top Category"
        value={topCategory}
        sub="most spent on"
      />

    </div>
  );
};

export default StatsRow;

// © 2026 Hassan Javed — All Rights Reserved