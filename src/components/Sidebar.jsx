"use client";
import { useRouter } from "next/navigation";

const icons = {
  dashboard: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  resumes:   <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  analysis:  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  history:   <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  profile:   <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  logout:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

const navItems = [
  { id: "profile",   label: "Profile",      path: "/profile"   },
  { id: "dashboard", label: "Dashboard",    path: "/dashboard" },
  { id: "resumes",   label: "My Resumes",   path: "/resumes"   },
  { id: "analysis",  label: "Job Analysis", path: "/analysis"  },
  { id: "history",   label: "History",      path: "/history"   },
];

export default function Sidebar({ active }) {
  const router = useRouter();

  return (
    <div style={{
      width: "240px",
      flexShrink: 0,
      height: "100vh",
      position: "sticky",
      top: 0,
      background: "#1e293b",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      overflowY: "auto",
    }}>

      {/* Logo */}
      <div
        onClick={() => router.push("/dashboard")}
        style={{ padding: "20px 20px 18px", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}
      >
        <div style={{ fontSize: "15px", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.2px" }}>
          AI Resume Analyzer
        </div>
        <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "3px", fontWeight: "400" }}>
          Smart Career Insights
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px" }}>
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <div
              key={item.id}
              onClick={() => router.push(item.path)}
              style={{
                display: "flex", alignItems: "center", gap: "11px",
                padding: "9px 12px", borderRadius: "8px",
                cursor: "pointer", marginBottom: "2px",
                background: isActive ? "#334155" : "transparent",
                color: isActive ? "#f1f5f9" : "#94a3b8",
                transition: "all 0.15s",
              }}
            >
              <span style={{ display: "flex", flexShrink: 0 }}>{icons[item.id]}</span>
              <span style={{ fontSize: "13.5px", fontWeight: isActive ? "600" : "400" }}>{item.label}</span>
              {isActive && (
                <span style={{ marginLeft: "auto", width: "5px", height: "5px", borderRadius: "50%", background: "#60a5fa" }} />
              )}
            </div>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ margin: "0 10px", height: "1px", background: "rgba(255,255,255,0.06)", flexShrink: 0 }} />

      {/* Logout */}
      <div style={{ padding: "12px 10px 20px", flexShrink: 0 }}>
        <div
          onClick={() => { localStorage.clear(); router.push("/login"); }}
          style={{
            display: "flex", alignItems: "center", gap: "11px",
            padding: "9px 12px", borderRadius: "8px", cursor: "pointer",
            color: "#94a3b8", transition: "all 0.15s",
          }}
        >
          <span style={{ display: "flex", flexShrink: 0 }}>{icons.logout}</span>
          <span style={{ fontSize: "13.5px", fontWeight: "400" }}>Logout</span>
        </div>
        <div style={{ fontSize: "11px", color: "#475569", textAlign: "center", marginTop: "12px" }}>
          © 2025 AI Resume Analyzer
        </div>
      </div>
    </div>
  );
}
