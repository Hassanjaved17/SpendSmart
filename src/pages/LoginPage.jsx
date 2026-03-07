// ============================================================
//  SPENDSMART — LoginPage.jsx
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Loader2, AlertCircle, DollarSign } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin]   = useState(true);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [error, setError]       = useState("");

  // ── Friendly error messages ───────────────────────────────
  const friendlyError = (code) => {
    switch (code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":   return "Invalid email or password.";
      case "auth/email-already-in-use": return "Email already registered. Please sign in.";
      case "auth/weak-password":        return "Password must be at least 6 characters.";
      case "auth/invalid-email":        return "Please enter a valid email address.";
      case "auth/too-many-requests":    return "Too many attempts. Please try again later.";
      case "auth/popup-closed-by-user": return "Google sign-in was cancelled.";
      default:                          return "Something went wrong. Please try again.";
    }
  };

  // ── Submit handler ────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      isLogin
        ? await login(email, password)
        : await signup(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  // ── Google handler ────────────────────────────────────────
  const handleGoogle = async () => {
    setError("");
    setGLoading(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setGLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050a06] flex items-center justify-center px-4 relative overflow-hidden">

      {/* ── Background glow orbs ── */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-emerald-400/8 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Card ── */}
      <div className="w-full max-w-md relative z-10">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <DollarSign size={20} color="#000" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">SpendSmart</span>
          </div>
          <p className="text-gray-500 text-sm">Track every rupee. Own your finances.</p>
        </div>

        {/* Card box */}
        <div className="bg-[#0d1a0f] border border-emerald-900/50 rounded-2xl p-8 shadow-2xl shadow-black/50">

          {/* Toggle tabs */}
          <div className="flex bg-[#0a120b] rounded-xl p-1 mb-7 border border-emerald-900/30">
            <button
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-[#0a120b] border border-emerald-900/40 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#0a120b] border border-emerald-900/40 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-900 disabled:text-emerald-700 text-black font-semibold py-3 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {isLogin ? "Signing in…" : "Creating account…"}
                </>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          {/* OR divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-emerald-900/30" />
            <span className="text-gray-600 text-xs">OR</span>
            <div className="flex-1 h-px bg-emerald-900/30" />
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={gLoading}
            className="w-full bg-transparent border border-emerald-900/40 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-white py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-3"
          >
            {gLoading ? (
              <>
                <Loader2 size={16} className="animate-spin text-emerald-500" />
                Connecting…
              </>
            ) : (
              <>
                <FcGoogle size={18} />
                Continue with Google
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-700 text-xs mt-6">
          © 2026 Hassan Javed — SpendSmart
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

// © 2026 Hassan Javed — All Rights Reserved