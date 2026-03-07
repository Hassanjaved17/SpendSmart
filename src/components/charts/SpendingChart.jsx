// ============================================================
//  SPENDSMART — SpendingChart.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChart2 } from "lucide-react";

// ── Custom Tooltip ────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1a0f] border border-emerald-900/50 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-gray-400 text-xs mb-2">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="text-xs text-gray-400 capitalize">{entry.name}:</span>
            <span className="text-xs font-bold text-white">
              PKR {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ── Build last 6 months data from transactions ────────────────
const buildChartData = (transactions) => {
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const date  = new Date();
    date.setMonth(date.getMonth() - i);
    const key   = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleString("default", { month: "short" });
    months.push({ key, label, income: 0, expense: 0 });
  }

  transactions.forEach((t) => {
    const monthKey = t.date.slice(0, 7);
    const found    = months.find((m) => m.key === monthKey);
    if (found) {
      if (t.type === "income")  found.income  += t.amount;
      if (t.type === "expense") found.expense += t.amount;
    }
  });

  return months;
};

// ── SpendingChart ─────────────────────────────────────────────
const SpendingChart = ({ transactions = [] }) => {
  const data = buildChartData(transactions);

  return (
    <div className="bg-[#0d1a0f] border border-emerald-900/40 rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 size={16} className="text-emerald-500/70" />
        <h2 className="text-white font-semibold text-sm">6-Month Overview</h2>

        {/* Legend */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-gray-500 text-xs">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="text-gray-500 text-xs">Expense</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#10b98115"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : v}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#10b98108" }} />

          {/* Income bars */}
          <Bar dataKey="income" name="income" radius={[6, 6, 0, 0]} maxBarSize={32}>
            {data.map((_, i) => (
              <Cell key={i} fill="#10b981" opacity={0.85} />
            ))}
          </Bar>

          {/* Expense bars */}
          <Bar dataKey="expense" name="expense" radius={[6, 6, 0, 0]} maxBarSize={32}>
            {data.map((_, i) => (
              <Cell key={i} fill="#f87171" opacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;

// © 2026 Hassan Javed — All Rights Reserved