"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { router.push("/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${userId}`)
      .then(r => r.json())
      .then(data => { setHistory(data.history || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sc = (s) => s >= 70
    ? { text: "#059669", bg: "#ecfdf5", border: "#6ee7b7", bar: "#10b981", badge: "Strong Match" }
    : s >= 40
    ? { text: "#d97706", bg: "#fffbeb", border: "#fcd34d", bar: "#f59e0b", badge: "Partial Match" }
    : { text: "#dc2626", bg: "#fef2f2", border: "#fca5a5", bar: "#ef4444", badge: "Weak Match" };

  const parse = (t) => {
    const c = (typeof t === "string" ? t : String(t || "")).replace(/\*\*(.*?)\*\*/g, "$1");
    const i = c.indexOf(":");
    return i > -1 ? { h: c.slice(0, i).trim(), b: c.slice(i + 1).trim() } : { h: null, b: c };
  };

  const getTab = (id) => activeTab[id] || "summary";
  const setTab = (id, tab) => setActiveTab(p => ({ ...p, [id]: tab }));

  const radius = 28;
  const circ = 2 * Math.PI * radius;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
      <Sidebar active="history" />

      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Topbar */}
        {<div style={{ background: "#fff", height: "56px", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Dashboard</div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "33px", height: "33px", borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#111827", lineHeight: 1.2 }}>{userName}</div>
            </div>
          </div>
        </div>}

        <div style={{ padding: "28px 32px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", margin: "0 0 4px" }}>Analysis History</h1>
            <p style={{ color: "#6b7280", fontSize: "13.5px", margin: 0 }}>All your past resume analyses</p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#9ca3af", fontSize: "14px" }}>Loading...</div>
          ) : history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div style={{ fontWeight: "600", fontSize: "15px", color: "#111827", marginBottom: "6px" }}>No analyses yet</div>
              <div style={{ fontSize: "13.5px", color: "#6b7280" }}>Upload a resume and run an analysis to see results here</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {history.map(h => {
                const style = sc(h.overall_match_score);
                const isOpen = selected?.id === h.id;
                const tab = getTab(h.id);
                const score = h.overall_match_score ?? 0;
                const dashOffset = circ - (score / 100) * circ;

                const tabs = [
                  { id: "summary",    label: "Summary" },
                  { id: "skills",     label: "Missing Skills", count: h.missing_skills?.length ?? 0 },
                  { id: "weaknesses", label: "Weaknesses",     count: h.weaknesses?.length ?? 0 },
                  { id: "plan",       label: "Improvement",    count: h.improvement_plan?.length ?? 0 },
                ];

                return (
                  <div key={h.id} style={{ background: "white", borderRadius: "14px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>

                    {/* Card Header */}
                    <div onClick={() => setSelected(isOpen ? null : h)}
                      style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: 0 }}>

                        {/* Mini score ring */}
                        <div style={{ position: "relative", width: "68px", height: "68px", flexShrink: 0 }}>
                          <svg width="68" height="68" style={{ transform: "rotate(-90deg)" }}>
                            <circle cx="34" cy="34" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="6"/>
                            <circle cx="34" cy="34" r={radius} fill="none" stroke={style.bar} strokeWidth="6"
                              strokeDasharray={circ} strokeDashoffset={dashOffset} strokeLinecap="round"/>
                          </svg>
                          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "14px", fontWeight: "800", color: style.text, lineHeight: 1 }}>{score}</span>
                            <span style={{ fontSize: "9px", color: style.text, fontWeight: "600" }}>%</span>
                          </div>
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: "700", fontSize: "14.5px", color: "#111827", marginBottom: "3px" }}>{h.title || "Unknown Role"}</div>
                          <div style={{ fontSize: "12.5px", color: "#6b7280", marginBottom: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {h.company && h.company !== "Unknown Company" ? h.company + " · " : ""}{h.file_name}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "11.5px", color: "#9ca3af" }}>
                              {new Date(h.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                            <span style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}`, padding: "1px 9px", borderRadius: "999px", fontSize: "11px", fontWeight: "700" }}>
                              {style.badge}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right side stats + chevron */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          {[
                            { val: h.missing_skills?.length ?? 0, label: "Missing", color: "#f59e0b" },
                            { val: h.weaknesses?.length ?? 0,     label: "Weak",    color: "#ef4444" },
                            { val: h.improvement_plan?.length ?? 0, label: "Steps", color: "#8b5cf6" },
                          ].map((stat, i) => (
                            <div key={i} style={{ textAlign: "center", background: "#f8fafc", borderRadius: "8px", padding: "5px 10px", border: "1px solid #e5e7eb" }}>
                              <div style={{ fontSize: "13px", fontWeight: "700", color: stat.color }}>{stat.val}</div>
                              <div style={{ fontSize: "10px", color: "#9ca3af" }}>{stat.label}</div>
                            </div>
                          ))}
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>

                    {/* Expanded */}
                    {isOpen && (
                      <div style={{ borderTop: "1px solid #f3f4f6" }}>

                        {/* Tabs */}
                        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#fafafa", padding: "0 20px" }}>
                          {tabs.map(t => (
                            <button key={t.id} onClick={() => setTab(h.id, t.id)}
                              style={{ padding: "11px 14px", border: "none", background: "transparent", cursor: "pointer", fontSize: "12.5px", fontWeight: tab === t.id ? "700" : "500", color: tab === t.id ? "#111827" : "#6b7280", borderBottom: `2px solid ${tab === t.id ? "#7c3aed" : "transparent"}`, display: "flex", alignItems: "center", gap: "5px", fontFamily: "inherit", transition: "all 0.15s" }}>
                              {t.label}
                              {t.count > 0 && (
                                <span style={{ background: tab === t.id ? "#7c3aed" : "#e5e7eb", color: tab === t.id ? "white" : "#6b7280", borderRadius: "999px", padding: "1px 6px", fontSize: "10px", fontWeight: "700" }}>{t.count}</span>
                              )}
                            </button>
                          ))}
                        </div>

                        <div style={{ padding: "18px 20px", background: "#fafafa" }}>

                          {/* SUMMARY TAB */}
                          {tab === "summary" && (
                            <div style={{ background: "#f0fdf4", borderRadius: "10px", padding: "16px", border: "1px solid #bbf7d0" }}>
                              <div style={{ fontSize: "11px", fontWeight: "700", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>AI Summary</div>
                              <p style={{ fontSize: "13px", color: "#166534", lineHeight: "1.75", margin: 0 }}>{h.alignment_summary || "--"}</p>
                            </div>
                          )}

                          {/* MISSING SKILLS TAB */}
                          {tab === "skills" && (
                            <div>
                              {Array.isArray(h.missing_skills) && h.missing_skills.length > 0 ? (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                  {h.missing_skills.map((s, i) => (
                                    <span key={i} style={{ background: "#fffbeb", color: "#78350f", padding: "6px 14px", borderRadius: "8px", fontSize: "12.5px", border: "1px solid #fcd34d", fontWeight: "500", display: "flex", alignItems: "center", gap: "5px" }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <div style={{ textAlign: "center", padding: "24px", color: "#059669", fontSize: "13.5px", fontWeight: "600" }}>No missing skills — great fit!</div>
                              )}
                            </div>
                          )}

                          {/* WEAKNESSES TAB */}
                          {tab === "weaknesses" && (
                            <div>
                              {Array.isArray(h.weaknesses) && h.weaknesses.length > 0 ? (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                                  {h.weaknesses.map((w, i) => {
                                    const { h: title, b: detail } = parse(w);
                                    return (
                                      <div key={i} style={{ display: "flex", gap: "10px", background: "#fff1f2", borderRadius: "9px", padding: "12px", border: "1px solid #fecdd3" }}>
                                        <div style={{ minWidth: "24px", height: "24px", background: "#e11d48", color: "white", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", flexShrink: 0 }}>{i + 1}</div>
                                        <div>
                                          {title && <div style={{ fontWeight: "700", color: "#be123c", fontSize: "12px", marginBottom: "2px" }}>{title}</div>}
                                          <div style={{ color: "#6b7280", fontSize: "12px", lineHeight: "1.6" }}>{detail}</div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div style={{ textAlign: "center", padding: "24px", color: "#059669", fontSize: "13.5px", fontWeight: "600" }}>No weaknesses found!</div>
                              )}
                            </div>
                          )}

                          {/* IMPROVEMENT PLAN TAB */}
                          {tab === "plan" && (
                            <div>
                              {Array.isArray(h.improvement_plan) && h.improvement_plan.length > 0 ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                  {h.improvement_plan.map((tip, i) => {
                                    const { h: title, b: detail } = parse(tip);
                                    return (
                                      <div key={i} style={{ display: "flex", gap: "12px", background: "#f5f3ff", borderRadius: "9px", padding: "13px", border: "1px solid #ddd6fe" }}>
                                        <div style={{ minWidth: "26px", height: "26px", background: "#7c3aed", color: "white", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", flexShrink: 0 }}>{i + 1}</div>
                                        <div>
                                          {title && <div style={{ fontWeight: "700", color: "#5b21b6", fontSize: "12.5px", marginBottom: "3px" }}>{title}</div>}
                                          <div style={{ color: "#6b7280", fontSize: "12px", lineHeight: "1.6" }}>{detail}</div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div style={{ textAlign: "center", padding: "24px", color: "#6b7280", fontSize: "13.5px" }}>No improvement steps</div>
                              )}
                            </div>
                          )}

                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
