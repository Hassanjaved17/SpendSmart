// ============================================================
//  SPENDSMART — Navbar.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DollarSign, LogOut, Loader2 } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  // ── Get initials from display name or email ───────────────
  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0].toUpperCase() ?? "?";
  };

  // ── Get display name ──────────────────────────────────────
  const getName = () => {
    if (user?.displayName) return user.displayName.split(" ")[0];
    return user?.email?.split("@")[0] ?? "";
  };

  // ── Logout handler ────────────────────────────────────────
  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#050a06]/90 backdrop-blur-md border-b border-emerald-900/30">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* ── Brand ── */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/30">
            <DollarSign size={17} color="#000" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Spend<span className="text-emerald-400">Smart</span>
          </span>
        </div>

        {/* ── User + Logout ── */}
        <div className="flex items-center gap-3">

          {/* Avatar + name */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold">
              {getInitials()}
            </div>
            <span className="text-gray-400 text-sm hidden sm:block max-w-[120px] truncate">
              {getName()}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-emerald-900/50" />

          {/* Logout button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-300 text-xs font-medium disabled:opacity-50"
          >
            {loggingOut ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span className="hidden sm:block">Signing out…</span>
              </>
            ) : (
              <>
                <LogOut size={13} />
                <span className="hidden sm:block">Sign out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// © 2026 Hassan Javed — All Rights Reserved