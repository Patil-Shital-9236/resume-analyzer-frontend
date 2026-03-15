"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function MyResumesPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [viewingResume, setViewingResume] = useState(null);

  const fetchResumes = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) { router.push("/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/resumes/${userId}`)
      .then(r => r.json())
      .then(data => { setResumes(data.resumes || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchResumes(); }, []);

  const setLatest = async (resumeId) => {
    const userId = localStorage.getItem("userId");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/resumes/${resumeId}/set-latest`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
    setMsg("✅ Latest resume updated");
    fetchResumes();
    setTimeout(() => setMsg(""), 3000);
  };

  const deleteResume = async (resumeId) => {
    if (!confirm("Delete this resume?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/resumes/${resumeId}`, { method: "DELETE" });
    setMsg("🗑️ Resume deleted");
    fetchResumes();
    setTimeout(() => setMsg(""), 3000);
  };

const openResume = (resume) => {
  if (resume.file_url) {
    // Just download/open directly - works for both PDF and DOCX
    window.open(resume.file_url, "_blank");
  } else {
    alert("Please re-upload this resume to enable viewing.");
  }
};

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Segoe UI', sans-serif" }}>
      <Sidebar active="resumes" />
      <div style={{ flex: 1, padding: "28px", overflow: "auto" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1f2937", marginBottom: "6px" }}>📄 My Resumes</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>All your uploaded resumes</p>

        {msg && <div style={{ background: "#dcfce7", color: "#16a34a", padding: "10px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>{msg}</div>}

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#6b7280" }}>Loading...</div>
        ) : resumes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "16px", color: "#6b7280" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>No resumes uploaded yet</div>
            <div style={{ fontSize: "14px", marginTop: "8px" }}>Go to Dashboard to upload your resume</div>
            <button onClick={() => router.push("/dashboard")} style={{ marginTop: "16px", padding: "10px 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Go to Dashboard</button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "14px" }}>
            {resumes.map(r => (
              <div key={r.id} style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: `1px solid ${r.is_latest ? "#bfdbfe" : "#e5e7eb"}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer" }} onClick={() => openResume(r)}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: r.file_type === "pdf" ? "#fee2e2" : "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                    {r.file_type === "pdf" ? "📕" : "📘"}
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "15px", color: "#2563eb", display: "flex", alignItems: "center", gap: "8px", textDecoration: "underline" }}>
                      {r.file_name}
                      {r.is_latest && <span style={{ background: "#dbeafe", color: "#1d4ed8", padding: "2px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: "600" }}>Latest</span>}
                    </div>
                    <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "2px" }}>
                      {r.file_type?.toUpperCase()} • Uploaded {new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>Click to open</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => setLatest(r.id)} style={{ padding: "8px 16px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
                    Set as Latest
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteResume(r.id); }} style={{ padding: "8px 16px", background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {viewingResume && (
  <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", background: "#1e293b", flexShrink: 0 }}>
      <span style={{ color: "white", fontWeight: "600", fontSize: "14px" }}>📄 {viewingResume.name}</span>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => window.open(viewingResume.url, "_blank")} style={{ background: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>⬇️ Download</button>
        <button onClick={() => setViewingResume(null)} style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>✕ Close</button>
      </div>
    </div>
    <object
      data={viewingResume.url}
      type="application/pdf"
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      <div style={{ color: "white", textAlign: "center", padding: "40px" }}>
        <p>PDF cannot be displayed in browser.</p>
        <button onClick={() => window.open(viewingResume.url, "_blank")} style={{ background: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "10px 20px", cursor: "pointer", fontWeight: "600" }}>⬇️ Download PDF</button>
      </div>
    </object>
  </div>
)}
    </div>
  );
}