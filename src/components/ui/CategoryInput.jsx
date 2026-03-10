// ============================================================
//  SPENDSMART — CategoryInput.jsx
//  Smart category combo — type or pick from list
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useState, useRef, useEffect } from "react";
import { Tag, ChevronDown } from "lucide-react";

// ── Category emoji map ────────────────────────────────────────
const CATEGORY_EMOJI = {
    Food: "🍔", Transport: "🚗", Shopping: "🛍️",
    Bills: "📄", Health: "💊", Education: "📚",
    Entertainment: "🎬", Salary: "💼", Freelance: "💻",
    Business: "🏢", Investment: "📈", Gift: "🎁", Other: "💰",
};

const EXPENSE_CATEGORIES = [
    "Food", "Transport", "Shopping", "Bills",
    "Health", "Education", "Entertainment", "Other",
];

const INCOME_CATEGORIES = [
    "Salary", "Freelance", "Business", "Investment", "Gift", "Other",
];

const CategoryInput = ({ type, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(value || "");
    const containerRef = useRef(null);

    const suggestions = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

    // ── Filter suggestions ────────────────────────────────────
    const filtered = query
        ? suggestions.filter((c) =>
            c.toLowerCase().includes(query.toLowerCase())
        )
        : suggestions;

    // ── Close on outside click ────────────────────────────────
    useEffect(() => {
        const handleClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // ── Sync value from parent ────────────────────────────────
    useEffect(() => {
        setQuery(value || "");
    }, [value]);

    // ── Handlers ─────────────────────────────────────────────
    const handleInput = (e) => {
        const val = e.target.value;
        setQuery(val);
        onChange(val);
        setOpen(true);
    };

    const handleSelect = (cat) => {
        setQuery(cat);
        onChange(cat);
        setOpen(false);
    };

    return (
        <div ref={containerRef} className="relative">

            {/* Input */}
            <div className="relative">
                <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none z-10" />
                <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    onFocus={() => setOpen(true)}
                    placeholder="Type or select category…"
                    autoComplete="off"
                    className="w-full bg-[#0a120b] border border-emerald-900/40 rounded-xl pl-10 pr-10 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
                <ChevronDown
                    size={14}
                    onClick={() => setOpen((prev) => !prev)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </div>

            {/* Dropdown */}
            {open && (filtered.length > 0 || query) && (
                <div className="absolute z-50 w-full mt-1.5 bg-[#0d1a0f] border border-emerald-900/40 rounded-xl shadow-xl overflow-hidden">
                    <div className="max-h-48 overflow-y-auto category-scroll">
                        {filtered.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => handleSelect(cat)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-emerald-500/10 transition-colors duration-150 ${query === cat
                                        ? "text-emerald-400 bg-emerald-500/5"
                                        : "text-gray-300"
                                    }`}
                            >
                                <span className="text-base">{CATEGORY_EMOJI[cat] ?? "💰"}</span>
                                <span>{cat}</span>
                            </button>
                        ))}
                    </div>

                    {/* Custom category hint */}
                    {query && !suggestions.includes(query) && (
                        <div className="border-t border-emerald-900/30 px-4 py-2.5 flex items-center gap-2">
                            <span className="text-base">💰</span>
                            <span className="text-emerald-400 text-sm">
                                Use "<span className="font-medium">{query}</span>" as custom category
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryInput;

// © 2026 Hassan Javed — All Rights Reserved