"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) { setError("Please enter your email address"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).then(r => r.json());
      if (res.error) { setError(res.error); }
      else { setSent(true); }
    } catch { setError("Server error. Please try again."); }
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

          {!sent ? (
            <>
              <div style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "18px", fontWeight: "700", color: "#111827", margin: "0 0 6px" }}>Forgot Password?</h1>
                <p style={{ color: "#6b7280", fontSize: "13.5px", margin: 0, lineHeight: "1.6" }}>
                  Enter your registered email and we'll send you a link to reset your password.
                </p>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  style={{ width: "100%", padding: "10px 13px", border: `1.5px solid ${error ? "#fca5a5" : "#e5e7eb"}`, borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#111827", fontFamily: "inherit" }}
                />
                {error && <div style={{ color: "#dc2626", fontSize: "12.5px", marginTop: "6px" }}>{error}</div>}
              </div>

              <button onClick={handleSubmit} disabled={loading} style={{
                width: "100%", padding: "11px", background: loading ? "#93c5fd" : "#1d4ed8",
                color: "white", border: "none", borderRadius: "8px", fontWeight: "600",
                fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
              }}>
                {loading
                  ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 0.8s linear infinite" }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg> Sending...</>
                  : "Send Reset Link"
                }
              </button>
            </>
          ) : (
            /* Success state */
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#ecfdf5", border: "2px solid #a7f3d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#111827", margin: "0 0 8px" }}>Check Your Email</h2>
              <p style={{ color: "#6b7280", fontSize: "13.5px", lineHeight: "1.7", margin: "0 0 20px" }}>
                We've sent a password reset link to <strong style={{ color: "#111827" }}>{email}</strong>.<br />
                The link will expire in <strong>1 hour</strong>.
              </p>
              <div style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px 16px", fontSize: "12.5px", color: "#6b7280", marginBottom: "20px", textAlign: "left" }}>
                <strong style={{ color: "#374151" }}>Didn't receive it?</strong><br />
                Check your spam folder or{" "}
                <span onClick={() => setSent(false)} style={{ color: "#1d4ed8", cursor: "pointer", fontWeight: "600" }}>try again</span>.
              </div>
            </div>
          )}

          {/* Back to login */}
          <div style={{ textAlign: "center", marginTop: "20px", paddingTop: "18px", borderTop: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: "13.5px", color: "#6b7280" }}>Remember your password? </span>
            <span onClick={() => router.push("/login")} style={{ fontSize: "13.5px", color: "#1d4ed8", fontWeight: "600", cursor: "pointer" }}>
              Back to Login
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}