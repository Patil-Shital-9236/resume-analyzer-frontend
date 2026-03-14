"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ resumes: 0, analyses: 0 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { router.push("/login"); return; }

    Promise.all([
      fetch(`http://localhost:5000/api/user/profile/${userId}`).then(r => r.json()),
      fetch(`http://localhost:5000/api/user/history/${userId}`).then(r => r.json()).catch(() => ({ history: [] })),
      fetch(`http://localhost:5000/api/user/resumes/${userId}`).then(r => r.json()).catch(() => ({ resumes: [] })),
    ]).then(([profileData, historyData, resumeData]) => {
      const user = profileData.user || profileData;
      setProfile(user);
      setFullName(user?.full_name || "");
      setStats({
        analyses: historyData.history?.length || 0,
        resumes: resumeData.resumes?.length || 0,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    setSaving(true); setSaveMsg("");
    try {
      const res = await fetch(`http://localhost:5000/api/user/profile/${userId}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName }),
      }).then(r => r.json());
      if (res.user || res.success) {
        setProfile(p => ({ ...p, full_name: fullName }));
        localStorage.setItem("userName", fullName);
        setSaveMsg("success"); setEditing(false);
      } else { setSaveMsg("error"); }
    } catch { setSaveMsg("error"); }
    setSaving(false);
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const getInitials = (name) => name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";
  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—";
  const memberMonth = (d) => d ? new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "—";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
      <Sidebar active="profile" />

      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Topbar */}
        <div style={{ background: "#fff", height: "56px", padding: "0 28px", display: "flex", alignItems: "center", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Profile</div>
        </div>

        <div style={{ padding: "28px 32px", maxWidth: "1780px", margin: "0 auto" }}>

          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", margin: "0 0 4px" }}>My Profile</h1>
            <p style={{ color: "#6b7280", fontSize: "13.5px", margin: 0 }}>Manage your account information</p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#9ca3af" }}>Loading...</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* ── Hero Card ── */}
              <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", borderRadius: "16px", padding: "28px", display: "flex", alignItems: "center", gap: "24px", position: "relative", overflow: "hidden" }}>
                {/* BG decoration */}
                <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
                <div style={{ position: "absolute", bottom: "-20px", right: "80px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

                {/* Avatar */}
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "700", color: "white", flexShrink: 0, border: "3px solid rgba(255,255,255,0.15)", letterSpacing: "-1px" }}>
                  {getInitials(profile?.full_name || "")}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#f9fafb", marginBottom: "4px" }}>{profile?.full_name || "—"}</div>
                  <div style={{ fontSize: "13.5px", color: "#94a3b8", marginBottom: "14px" }}>{profile?.email || "—"}</div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "999px", padding: "3px 10px" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                      <span style={{ fontSize: "11.5px", color: "#6ee7b7", fontWeight: "600" }}>Active Account</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px", padding: "3px 10px" }}>
                      <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>Member since {memberMonth(profile?.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                  {[
                    { val: stats.resumes,  label: "Resumes",  color: "#60a5fa" },
                    { val: stats.analyses, label: "Analyses", color: "#a78bfa" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 18px", textAlign: "center" }}>
                      <div style={{ fontSize: "24px", fontWeight: "800", color: s.color, lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Account Details ── */}
              <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>

                <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>Account Details</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>Update your personal information</div>
                  </div>
                  {!editing ? (
                    <button onClick={() => { setEditing(true); setSaveMsg(""); }}
                      style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#374151", fontFamily: "inherit" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Edit Profile
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => { setEditing(false); setFullName(profile?.full_name || ""); }}
                        style={{ padding: "8px 14px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500", color: "#6b7280", fontFamily: "inherit" }}>
                        Cancel
                      </button>
                      <button onClick={handleSave} disabled={saving}
                        style={{ padding: "8px 16px", background: "#1d4ed8", border: "none", borderRadius: "8px", cursor: saving ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: "600", color: "white", fontFamily: "inherit", opacity: saving ? 0.7 : 1 }}>
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ padding: "22px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>

                  {/* Full Name */}
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.6px", display: "block", marginBottom: "7px" }}>Full Name</label>
                    {editing ? (
                      <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} autoFocus
                        style={{ width: "100%", padding: "10px 13px", border: "1.5px solid #1d4ed8", borderRadius: "8px", fontSize: "14px", color: "#111827", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    ) : (
                      <div style={{ padding: "10px 13px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#111827" }}>
                        {profile?.full_name || "—"}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.6px", display: "block", marginBottom: "7px" }}>Email Address</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ flex: 1, padding: "10px 13px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {profile?.email || "—"}
                      </div>
                      <span style={{ fontSize: "10.5px", color: "#9ca3af", background: "#f3f4f6", padding: "4px 8px", borderRadius: "6px", border: "1px solid #e5e7eb", whiteSpace: "nowrap", flexShrink: 0 }}>Locked</span>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.6px", display: "block", marginBottom: "7px" }}>Member Since</label>
                    <div style={{ padding: "10px 13px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#6b7280" }}>
                      {formatDate(profile?.created_at)}
                    </div>
                  </div>

                  {/* Account Status */}
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.6px", display: "block", marginBottom: "7px" }}>Account Status</label>
                    <div style={{ padding: "10px 13px", background: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0", fontSize: "14px", color: "#059669", fontWeight: "600", display: "flex", alignItems: "center", gap: "7px" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981" }} />
                      Active
                    </div>
                  </div>
                </div>

                {/* Save message */}
                {saveMsg && (
                  <div style={{ margin: "0 22px 18px", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", background: saveMsg === "success" ? "#f0fdf4" : "#fef2f2", color: saveMsg === "success" ? "#059669" : "#dc2626", border: `1px solid ${saveMsg === "success" ? "#a7f3d0" : "#fecaca"}` }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: saveMsg === "success" ? "#059669" : "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {saveMsg === "success"
                        ? <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        : <span style={{ color: "white", fontSize: "10px", fontWeight: "700" }}>!</span>}
                    </div>
                    {saveMsg === "success" ? "Profile updated successfully!" : "Failed to update. Try again."}
                  </div>
                )}
              </div>

              {/* ── Quick Links ── */}
              <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>Quick Actions</div>
                </div>
                <div style={{ padding: "12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {[
                    { label: "Go to Dashboard", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>, path: "/dashboard", color: "#1d4ed8", bg: "#eff6ff" },
                    { label: "My Resumes",       icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, path: "/resumes", color: "#7c3aed", bg: "#f5f3ff" },
                    { label: "View History",     icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, path: "/history", color: "#059669", bg: "#f0fdf4" },
                  ].map((item, i) => (
                    <button key={i} onClick={() => router.push(item.path)}
                      style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 14px", background: item.bg, border: `1px solid ${item.bg}`, borderRadius: "9px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: item.color, fontFamily: "inherit", transition: "all 0.15s" }}>
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Danger Zone ── */}
              <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #fecdd3", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                <div style={{ padding: "14px 22px", borderBottom: "1px solid #fff1f2", display: "flex", alignItems: "center", gap: "7px" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#be123c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#be123c" }}>Danger Zone</span>
                </div>
                <div style={{ padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "13.5px", fontWeight: "600", color: "#111827", marginBottom: "3px" }}>Sign out of your account</div>
                    <div style={{ fontSize: "12.5px", color: "#9ca3af" }}>You will be redirected to the login page</div>
                  </div>
                  <button onClick={() => { localStorage.clear(); router.push("/login"); }}
                    style={{ padding: "8px 16px", background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#be123c", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "7px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Sign Out
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}