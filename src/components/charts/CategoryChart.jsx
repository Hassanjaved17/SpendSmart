// ============================================================
//  SPENDSMART — CategoryChart.jsx
//  Expense breakdown by category — Pie Chart
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { PieChart as PieIcon } from "lucide-react";

// ── Colors for each category ──────────────────────────────────
const COLORS = [
  "#10b981", "#f87171", "#60a5fa", "#fbbf24",
  "#a78bfa", "#34d399", "#f472b6", "#fb923c",
];

// ── Format PKR ────────────────────────────────────────────────
const formatPKR = (amount) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency", currency: "PKR",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount);

// ── Custom Tooltip ────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1a0f] border border-emerald-900/50 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white text-xs font-medium mb-1">{payload[0].name}</p>
        <p className="text-emerald-400 text-xs font-bold">{formatPKR(payload[0].value)}</p>
        <p className="text-gray-500 text-xs">{payload[0].payload.percent}% of expenses</p>
      </div>
    );
  }
  return null;
};

// ── CategoryChart ─────────────────────────────────────────────
const CategoryChart = ({ transactions = [] }) => {

  // Build category data from expenses only
  const categoryTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  const data = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({
      name,
      value,
      percent: total > 0 ? Math.round((value / total) * 100) : 0,
    }));

  // Empty state
  if (data.length === 0) {
    return (
      <div className="bg-[#0d1a0f] border border-emerald-900/40 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <PieIcon size={16} className="text-emerald-500/70" />
          <h2 className="text-white font-semibold text-sm">Spending by Category</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600 text-sm">No expense data yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1a0f] border border-emerald-900/40 rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <PieIcon size={16} className="text-emerald-500/70" />
        <h2 className="text-white font-semibold text-sm">Spending by Category</h2>
        <span className="text-gray-600 text-xs ml-auto">
          Total: {formatPKR(total)}
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
                opacity={0.9}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-gray-400 text-xs">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default CategoryChart;

// © 2026 Hassan Javed — All Rights Reserved