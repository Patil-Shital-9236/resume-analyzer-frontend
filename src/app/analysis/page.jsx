"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function JobAnalysisPage() {
  const router = useRouter();
  const [jds, setJds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { router.push("/login"); return; }
    fetch(`http://localhost:5000/api/user/job-descriptions/${userId}`)
      .then(r => r.json())
      .then(data => { setJds(data.jobDescriptions || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Segoe UI', sans-serif" }}>
      <Sidebar active="analysis" />
      <div style={{ flex: 1, padding: "28px", overflow: "auto" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1f2937", marginBottom: "6px" }}> Job Analyses</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>All job descriptions you have analyzed against</p>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#6b7280" }}>Loading...</div>
        ) : jds.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "16px", color: "#6b7280" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>No job analyses yet</div>
            <div style={{ fontSize: "14px", marginTop: "8px" }}>Run an analysis from the Dashboard to see results here</div>
            <button onClick={() => router.push("/dashboard")} style={{ marginTop: "16px", padding: "10px 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {jds.map((jd, i) => (
              <div key={jd.id} style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>💼</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: "700", fontSize: "15px", color: "#1f2937", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {jd.title || "Unknown Role"}
                    </div>
                    <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>{jd.company || "Unknown Company"}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af" }}>
                      🗓 {new Date(jd.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/history")}
                  style={{ width: "100%", marginTop: "14px", padding: "8px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                >
                  View Analysis →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}