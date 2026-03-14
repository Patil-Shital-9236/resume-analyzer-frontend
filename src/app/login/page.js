"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) { setError("Please fill all fields"); return; }
    setLoading(true); setError("");
    try {
      const res = await loginUser({ email, password });
      if (res.token) {
        localStorage.setItem("userId", res.userId);
        localStorage.setItem("token", res.token);
        localStorage.setItem("userName", res.full_name || email);
        router.push("/dashboard");
      } else {
        setError(res.message || "Login failed");
      }
    } catch {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#111827" }}>AI Resume Analyzer</div>
          <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>Smart Career Insights</div>
        </div>

        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", padding: "32px" }}>

          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", margin: "0 0 6px" }}>Welcome back</h1>
            <p style={{ color: "#6b7280", fontSize: "13.5px", margin: 0 }}>Sign in to your account to continue</p>
          </div>

          {error && (
            <div style={{ padding: "10px 13px", borderRadius: "8px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", fontSize: "13px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "white", fontSize: "10px", fontWeight: "700" }}>!</span>
              </div>
              {error}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", padding: "10px 13px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#111827", fontFamily: "inherit" }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Password</label>
              <span
                onClick={() => router.push("/forgot-password")}
                style={{ fontSize: "12.5px", color: "#1d4ed8", fontWeight: "600", cursor: "pointer" }}
              >
                Forgot Password?
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style={{ width: "100%", padding: "10px 42px 10px 13px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#111827", fontFamily: "inherit" }}
              />
              <span onClick={() => setShowPassword(p => !p)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#9ca3af", display: "flex" }}>
                {showPassword
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </span>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ width: "100%", padding: "11px", background: loading ? "#93c5fd" : "#1d4ed8", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "background 0.2s" }}
          >
            {loading
              ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 0.8s linear infinite" }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg> Signing in...</>
              : "Sign In"
            }
          </button>

          <div style={{ textAlign: "center", marginTop: "20px", paddingTop: "18px", borderTop: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: "13.5px", color: "#6b7280" }}>Don't have an account? </span>
            <span onClick={() => router.push("/register")} style={{ fontSize: "13.5px", color: "#1d4ed8", fontWeight: "600", cursor: "pointer" }}>
              Create Account
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}