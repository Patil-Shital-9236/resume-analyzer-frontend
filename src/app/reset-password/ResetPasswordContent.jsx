"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!token) { setVerifying(false); setTokenValid(false); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-reset-token?token=${token}`)
      .then(r => r.json())
      .then(data => { setTokenValid(data.valid); setVerifying(false); })
      .catch(() => { setTokenValid(false); setVerifying(false); });
  }, [token]);

  const validate = () => {
    const e = {};
    if (!newPassword) e.newPassword = "Password is required";
    else if (newPassword.length < 6) e.newPassword = "Minimum 6 characters";
    else if (!/[A-Z]/.test(newPassword)) e.newPassword = "Must include at least 1 uppercase letter";
    else if (!/[0-9]/.test(newPassword)) e.newPassword = "Must include at least 1 number";
    if (!confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleReset = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true); setErrors({});
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      }).then(r => r.json());
      if (res.error) { setErrors({ general: res.error }); }
      else { setSuccess(true); setTimeout(() => router.push("/login"), 3000); }
    } catch { setErrors({ general: "Server error. Please try again." }); }
    setLoading(false);
  };

  const EyeIcon = ({ open }) => open
    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

  const strength = () => {
    let s = 0;
    if (newPassword.length >= 6) s++;
    if (/[A-Z]/.test(newPassword)) s++;
    if (/[0-9]/.test(newPassword)) s++;
    if (/[^A-Za-z0-9]/.test(newPassword)) s++;
    return s;
  };
  const str = strength();
  const strColor = str <= 1 ? "#ef4444" : str === 2 ? "#f59e0b" : str === 3 ? "#3b82f6" : "#10b981";
  const strLabel = str <= 1 ? "Weak" : str === 2 ? "Fair" : str === 3 ? "Good" : "Strong";

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#111827" }}>AI Resume Analyzer</div>
          <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>Smart Career Insights</div>
        </div>

        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", padding: "32px" }}>
          {verifying ? (
            <div style={{ textAlign: "center", padding: "20px 0", color: "#6b7280", fontSize: "14px" }}>Verifying link...</div>

          ) : !tokenValid ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#fef2f2", border: "2px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              </div>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#111827", margin: "0 0 8px" }}>Link Expired</h2>
              <p style={{ color: "#6b7280", fontSize: "13.5px", lineHeight: "1.7", margin: "0 0 20px" }}>
                This reset link is invalid or has expired.<br />Please request a new one.
              </p>
              <button onClick={() => router.push("/forgot-password")} style={{ width: "100%", padding: "11px", background: "#1d4ed8", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}>
                Request New Link
              </button>
            </div>

          ) : success ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#ecfdf5", border: "2px solid #a7f3d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#111827", margin: "0 0 8px" }}>Password Reset!</h2>
              <p style={{ color: "#6b7280", fontSize: "13.5px", lineHeight: "1.7", margin: "0 0 6px" }}>
                Your password has been updated successfully.
              </p>
              <p style={{ color: "#9ca3af", fontSize: "12.5px" }}>Redirecting to login...</p>
            </div>

          ) : (
            <>
              <div style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "18px", fontWeight: "700", color: "#111827", margin: "0 0 6px" }}>Set New Password</h1>
                <p style={{ color: "#6b7280", fontSize: "13.5px", margin: 0 }}>Choose a strong password for your account.</p>
              </div>

              {errors.general && (
                <div style={{ padding: "10px 13px", borderRadius: "8px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", fontSize: "13px", marginBottom: "16px" }}>{errors.general}</div>
              )}

              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>New Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={e => { setNewPassword(e.target.value); setErrors(p => ({ ...p, newPassword: "" })); }}
                    style={{ width: "100%", padding: "10px 40px 10px 13px", border: `1.5px solid ${errors.newPassword ? "#fca5a5" : "#e5e7eb"}`, borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#111827", fontFamily: "inherit" }}
                  />
                  <span onClick={() => setShowNew(p => !p)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#9ca3af" }}>
                    <EyeIcon open={showNew} />
                  </span>
                </div>
                {errors.newPassword && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "5px" }}>{errors.newPassword}</div>}
                {newPassword.length > 0 && (
                  <div style={{ marginTop: "8px" }}>
                    <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ flex: 1, height: "3px", borderRadius: "999px", background: i <= str ? strColor : "#e5e7eb", transition: "background 0.3s" }} />
                      ))}
                    </div>
                    <div style={{ fontSize: "11.5px", color: strColor, fontWeight: "600" }}>{strLabel}</div>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: "" })); }}
                    style={{ width: "100%", padding: "10px 40px 10px 13px", border: `1.5px solid ${errors.confirmPassword ? "#fca5a5" : confirmPassword && confirmPassword === newPassword ? "#a7f3d0" : "#e5e7eb"}`, borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#111827", fontFamily: "inherit" }}
                  />
                  <span onClick={() => setShowConfirm(p => !p)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#9ca3af" }}>
                    <EyeIcon open={showConfirm} />
                  </span>
                </div>
                {errors.confirmPassword && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "5px" }}>{errors.confirmPassword}</div>}
                {confirmPassword && confirmPassword === newPassword && !errors.confirmPassword && (
                  <div style={{ color: "#059669", fontSize: "12px", marginTop: "5px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Passwords match
                  </div>
                )}
              </div>

              <button onClick={handleReset} disabled={loading} style={{
                width: "100%", padding: "11px", background: loading ? "#93c5fd" : "#1d4ed8",
                color: "white", border: "none", borderRadius: "8px", fontWeight: "600",
                fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit"
              }}>
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </>
          )}

          <div style={{ textAlign: "center", marginTop: "20px", paddingTop: "18px", borderTop: "1px solid #f3f4f6" }}>
            <span onClick={() => router.push("/login")} style={{ fontSize: "13.5px", color: "#1d4ed8", fontWeight: "600", cursor: "pointer" }}>
              ← Back to Login
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}