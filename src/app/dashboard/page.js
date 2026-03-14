"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { uploadResume, runFullAnalysis } from "@/services/api";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadedResumeId, setUploadedResumeId] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [analyzeError, setAnalyzeError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const uid = localStorage.getItem("userId");
    if (!uid) { router.push("/login"); return; }
    setUserName(name || "User");
    setUserId(uid);
  }, []);

  const handleUpload = async () => {
    if (!file) { setUploadMsg("error:Please select a file"); return; }
    setUploading(true); setUploadMsg("");
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userId", userId);
      const res = await uploadResume(formData);
      if (res.resumeId) { setUploadedResumeId(res.resumeId); setUploadMsg("success:Resume uploaded!"); }
      else { setUploadMsg("error:" + (res.error || "Upload failed")); }
    } catch { setUploadMsg("error:Server error"); }
    setUploading(false);
  };

  const handleAnalyze = async () => {
    if (!jobDesc.trim()) { setAnalyzeError("Please paste a job description"); return; }
    if (!uploadedResumeId) { setAnalyzeError("Please upload a resume first"); return; }
    setAnalyzing(true); setAnalyzeError(""); setResult(null); setActiveTab("overview");
    try {
      const res = await runFullAnalysis({ userId, resumeId: uploadedResumeId, title: jobTitle, company: company || "Unknown Company", jdText: jobDesc });
      if (res.analysis) setResult(res.analysis);
      else setAnalyzeError(res.error || "Analysis failed");
    } catch { setAnalyzeError("Server error"); }
    setAnalyzing(false);
  };

  const isSuccess = uploadMsg.startsWith("success:");
  const uploadText = uploadMsg.replace(/^(success|error):/, "");

  const sc = result ? (
    result.match_score >= 70
      ? { text: "#059669", light: "#ecfdf5", border: "#6ee7b7", bar: "#10b981", badge: "Strong Match", ring: "#10b981" }
      : result.match_score >= 40
      ? { text: "#d97706", light: "#fffbeb", border: "#fcd34d", bar: "#f59e0b", badge: "Partial Match", ring: "#f59e0b" }
      : { text: "#dc2626", light: "#fef2f2", border: "#fca5a5", bar: "#ef4444", badge: "Weak Match", ring: "#ef4444" }
  ) : null;

  const parse = (t) => {
    const c = (typeof t === "string" ? t : String(t || "")).replace(/\*\*(.*?)\*\*/g, "$1");
    const i = c.indexOf(":");
    return i > -1 ? { h: c.slice(0, i).trim(), b: c.slice(i + 1).trim() } : { h: null, b: c };
  };

  const inp = { width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "7px", fontSize: "13.5px", outline: "none", boxSizing: "border-box", color: "#111827", background: "#fff", fontFamily: "inherit" };

  // SVG circle ring for score
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const scoreVal = result?.match_score ?? 0;
  const dashOffset = circumference - (scoreVal / 100) * circumference;

  const tabs = [
    { id: "overview", label: "Overview", count: null },
    { id: "skills", label: "Missing Skills", count: result?.missing_skills?.length ?? 0 },
    { id: "weaknesses", label: "Weaknesses", count: result?.weaknesses?.length ?? 0 },
    { id: "plan", label: "Improvement Plan", count: result?.improvement_plan?.length ?? 0 },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
      <Sidebar active="dashboard" />

      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Topbar */}
        <div style={{ background: "#fff", height: "56px", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Dashboard</div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "33px", height: "33px", borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#111827", lineHeight: 1.2 }}>{userName}</div>
              {/* <div style={{ fontSize: "11px", color: "#9ca3af" }}>User</div> */}
            </div>
          </div>
        </div>

        <div style={{ padding: "28px 32px" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", margin: "0 0 5px" }}>Welcome back, {userName}</h1>
            <p style={{ color: "#6b7280", fontSize: "13.5px", margin: 0 }}>Upload your resume and a job description to get your AI match score.</p>
          </div>

          {/* Step tracker */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 18px", width: "fit-content" }}>
            {[
              { n: 1, label: "Upload Resume", done: !!uploadedResumeId },
              { n: 2, label: "Add Job Description", done: jobDesc.trim().length > 20 },
              { n: 3, label: "View Results", done: !!result },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: s.done ? "#1d4ed8" : "#f1f5f9", color: s.done ? "white" : "#94a3b8", transition: "all 0.3s" }}>
                    {s.done ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : s.n}
                  </div>
                  <span style={{ fontSize: "12.5px", color: s.done ? "#111827" : "#9ca3af", fontWeight: s.done ? "600" : "400" }}>{s.label}</span>
                </div>
                {i < 2 && <div style={{ width: "24px", height: "1px", background: "#e5e7eb", margin: "0 4px" }} />}
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "22px", alignItems: "start" }}>
            {/* Upload card */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>Upload Resume</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af" }}>PDF or DOCX, max 5MB</div>
                </div>
                {uploadedResumeId && (
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px", background: "#ecfdf5", color: "#059669", padding: "3px 10px", borderRadius: "999px", fontSize: "11.5px", fontWeight: "600", border: "1px solid #a7f3d0" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Uploaded
                  </div>
                )}
              </div>
              <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); setFile(e.dataTransfer.files[0]); setUploadMsg(""); }}
                onClick={() => document.getElementById("fileInput").click()}
                style={{ border: `2px dashed ${dragOver ? "#1d4ed8" : file ? "#10b981" : "#e5e7eb"}`, borderRadius: "10px", padding: "30px 16px", textAlign: "center", cursor: "pointer", marginBottom: "14px", background: dragOver ? "#eff6ff" : file ? "#f0fdf4" : "#fafafa", transition: "all 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                  {file
                    ? <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>
                    : <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>}
                </div>
                {file ? <div style={{ fontSize: "13px", fontWeight: "600", color: "#059669" }}>{file.name}</div>
                  : <><div style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>Click or drag file here</div><div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "3px" }}>Supports PDF, DOCX</div></>}
                <input id="fileInput" type="file" accept=".pdf,.docx" style={{ display: "none" }} onChange={e => { setFile(e.target.files[0]); setUploadMsg(""); }} />
              </div>
              {uploadMsg && (
                <div style={{ padding: "9px 12px", borderRadius: "7px", fontSize: "12.5px", marginBottom: "12px", display: "flex", gap: "8px", alignItems: "center", background: isSuccess ? "#f0fdf4" : "#fef2f2", color: isSuccess ? "#059669" : "#dc2626", border: `1px solid ${isSuccess ? "#a7f3d0" : "#fecaca"}` }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: isSuccess ? "#059669" : "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {isSuccess ? <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : <span style={{ color: "white", fontSize: "10px", fontWeight: "700" }}>!</span>}
                  </div>
                  {uploadText}
                </div>
              )}
              <button onClick={handleUpload} disabled={uploading || !file} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: file && !uploading ? "#1d4ed8" : "#e5e7eb", color: file && !uploading ? "white" : "#9ca3af", fontWeight: "600", fontSize: "13.5px", cursor: file && !uploading ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.2s" }}>
                {uploading ? "Uploading..." : "Upload Resume"}
              </button>
            </div>

            {/* JD Card */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>Job Description</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af" }}>Paste the role you're targeting</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#6b7280", display: "block", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Job Title</label>
                  <input type="text" placeholder="e.g. Full Stack Developer" value={jobTitle} onChange={e => setJobTitle(e.target.value)} style={inp} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#6b7280", display: "block", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Company <span style={{ fontWeight: "400", textTransform: "none", fontSize: "10px" }}>(optional)</span></label>
                  <input type="text" placeholder="e.g. Google, TCS" value={company} onChange={e => setCompany(e.target.value)} style={inp} />
                </div>
              </div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#6b7280", display: "block", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Job Description</label>
              <textarea rows="10" placeholder="Paste the full job description here..." value={jobDesc} onChange={e => { setJobDesc(e.target.value); setAnalyzeError(""); }} style={{ ...inp, resize: "vertical", lineHeight: "1.65", marginBottom: "12px" }} />
              {analyzeError && <div style={{ padding: "9px 12px", borderRadius: "7px", fontSize: "12.5px", marginBottom: "12px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>{analyzeError}</div>}
              <button onClick={handleAnalyze} disabled={analyzing} style={{ width: "100%", padding: "11px", background: "#7c3aed", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "13.5px", cursor: analyzing ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit", opacity: analyzing ? 0.8 : 1, transition: "all 0.2s" }}>
                {analyzing
                  ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 0.8s linear infinite" }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg> Analyzing...</>
                  : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Run Full Analysis</>
                }
              </button>
            </div>
          </div>

          {/* ══════════ RESULTS ══════════ */}
          {result && (
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden", marginBottom: "24px" }}>

              {/* Result Header */}
              <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", padding: "20px 24px", display: "flex", alignItems: "center", gap: "20px" }}>

                {/* SVG Score Ring */}
                <div style={{ position: "relative", width: "130px", height: "130px", flexShrink: 0 }}>
                  <svg width="130" height="130" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                    <circle cx="65" cy="65" r={radius} fill="none" stroke={sc.ring} strokeWidth="10"
                      strokeDasharray={circumference} strokeDashoffset={dashOffset}
                      strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.2s ease" }} />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: "32px", fontWeight: "800", color: sc.ring, lineHeight: 1 }}>{scoreVal}</div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: "500" }}>%</div>
                  </div>
                </div>

                {/* Header info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "#f9fafb" }}>Analysis Results</span>
                    <span style={{ background: sc.light, color: sc.text, border: `1px solid ${sc.border}`, padding: "3px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "700" }}>
                      {sc.badge}
                    </span>
                  </div>
                  {(jobTitle || company) && (
                    <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "14px" }}>
                      {jobTitle}{company && company !== "Unknown Company" ? ` · ${company}` : ""}
                    </div>
                  )}
                  {/* Mini stat pills */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "7px 14px", textAlign: "center" }}>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#f87171" }}>{result.missing_skills?.length ?? 0}</div>
                      <div style={{ fontSize: "10px", color: "#64748b", marginTop: "1px" }}>Missing Skills</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "7px 14px", textAlign: "center" }}>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#fb923c" }}>{result.weaknesses?.length ?? 0}</div>
                      <div style={{ fontSize: "10px", color: "#64748b", marginTop: "1px" }}>Weaknesses</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "7px 14px", textAlign: "center" }}>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#a78bfa" }}>{result.improvement_plan?.length ?? 0}</div>
                      <div style={{ fontSize: "10px", color: "#64748b", marginTop: "1px" }}>Action Steps</div>
                    </div>
                    {result.skills_match_percentage != null && (
                      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "7px 14px", textAlign: "center" }}>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#34d399" }}>{result.skills_match_percentage}%</div>
                        <div style={{ fontSize: "10px", color: "#64748b", marginTop: "1px" }}>Skills Match</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#fafafa", padding: "0 24px" }}>
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    style={{ padding: "13px 16px", border: "none", background: "transparent", cursor: "pointer", fontSize: "13px", fontWeight: activeTab === tab.id ? "700" : "500", color: activeTab === tab.id ? "#111827" : "#6b7280", borderBottom: `2px solid ${activeTab === tab.id ? "#7c3aed" : "transparent"}`, display: "flex", alignItems: "center", gap: "6px", transition: "all 0.15s", fontFamily: "inherit" }}>
                    {tab.label}
                    {tab.count !== null && tab.count > 0 && (
                      <span style={{ background: activeTab === tab.id ? "#7c3aed" : "#e5e7eb", color: activeTab === tab.id ? "white" : "#6b7280", borderRadius: "999px", padding: "1px 7px", fontSize: "11px", fontWeight: "700" }}>{tab.count}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div style={{ padding: "22px 24px" }}>

                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <div>
                    {/* Summary */}
                    <div style={{ background: "#f0fdf4", borderRadius: "12px", padding: "18px", border: "1px solid #bbf7d0", marginBottom: "16px" }}>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        AI Summary
                      </div>
                      <p style={{ fontSize: "13.5px", color: "#166534", lineHeight: "1.75", margin: 0 }}>{result.summary || "--"}</p>
                    </div>

                    {/* Score breakdown */}
                    {(result.skills_match_percentage != null || result.experience_match_percentage != null || result.education_match_percentage != null) && (
                      <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "18px", border: "1px solid #e2e8f0" }}>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "14px" }}>Score Breakdown</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          {[
                            { label: "Skills Match", val: result.skills_match_percentage, color: "#3b82f6" },
                            { label: "Experience Match", val: result.experience_match_percentage, color: "#8b5cf6" },
                            { label: "Education Match", val: result.education_match_percentage, color: "#10b981" },
                          ].filter(x => x.val != null).map((item, i) => (
                            <div key={i}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                <span style={{ fontSize: "12.5px", color: "#374151", fontWeight: "500" }}>{item.label}</span>
                                <span style={{ fontSize: "12.5px", fontWeight: "700", color: item.color }}>{item.val}%</span>
                              </div>
                              <div style={{ background: "#e2e8f0", borderRadius: "999px", height: "6px" }}>
                                <div style={{ width: `${item.val}%`, height: "100%", borderRadius: "999px", background: item.color, transition: "width 1s ease" }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* MISSING SKILLS TAB */}
                {activeTab === "skills" && (
                  <div>
                    {Array.isArray(result.missing_skills) && result.missing_skills.length > 0 ? (
                      <>
                        <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 16px" }}>
                          These skills are required by the job description but not found in your resume.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {result.missing_skills.map((s, i) => (
                            <span key={i} style={{ background: "#fffbeb", color: "#78350f", padding: "6px 14px", borderRadius: "8px", fontSize: "13px", border: "1px solid #fcd34d", fontWeight: "500", display: "flex", alignItems: "center", gap: "6px" }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                              {s}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "center", padding: "40px", color: "#059669" }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}><polyline points="20 6 9 17 4 12"/></svg>
                        <div style={{ fontSize: "15px", fontWeight: "600" }}>No missing skills!</div>
                        <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Your resume covers all required skills.</div>
                      </div>
                    )}
                  </div>
                )}

                {/* WEAKNESSES TAB */}
                {activeTab === "weaknesses" && (
                  <div>
                    {Array.isArray(result.weaknesses) && result.weaknesses.length > 0 ? (
                      <>
                        <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 16px" }}>
                          Areas in your resume that need improvement to stand out.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                          {result.weaknesses.map((w, i) => {
                            const { h, b } = parse(w);
                            return (
                              <div key={i} style={{ display: "flex", gap: "12px", background: "#fff1f2", borderRadius: "10px", padding: "14px", border: "1px solid #fecdd3" }}>
                                <div style={{ minWidth: "28px", height: "28px", background: "#e11d48", color: "white", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", flexShrink: 0 }}>{i + 1}</div>
                                <div>
                                  {h && <div style={{ fontWeight: "700", color: "#be123c", fontSize: "13px", marginBottom: "4px" }}>{h}</div>}
                                  <div style={{ color: "#6b7280", fontSize: "12.5px", lineHeight: "1.65" }}>{b}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "center", padding: "40px", color: "#059669" }}>
                        <div style={{ fontSize: "15px", fontWeight: "600" }}>No weaknesses found!</div>
                        <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Your resume looks strong.</div>
                      </div>
                    )}
                  </div>
                )}

                {/* IMPROVEMENT PLAN TAB */}
                {activeTab === "plan" && (
                  <div>
                    {Array.isArray(result.improvement_plan) && result.improvement_plan.length > 0 ? (
                      <>
                        <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 16px" }}>
                          Follow these steps to improve your resume and increase your match score.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {result.improvement_plan.map((tip, i) => {
                            const { h, b } = parse(tip);
                            return (
                              <div key={i} style={{ display: "flex", gap: "14px", background: "#f5f3ff", borderRadius: "10px", padding: "16px", border: "1px solid #ddd6fe", alignItems: "flex-start" }}>
                                <div style={{ minWidth: "30px", height: "30px", background: "#7c3aed", color: "white", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", flexShrink: 0 }}>{i + 1}</div>
                                <div style={{ flex: 1 }}>
                                  {h && <div style={{ fontWeight: "700", color: "#5b21b6", fontSize: "13.5px", marginBottom: "4px" }}>{h}</div>}
                                  <div style={{ color: "#6b7280", fontSize: "13px", lineHeight: "1.65" }}>{b}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "center", padding: "40px" }}>
                        <div style={{ fontSize: "15px", fontWeight: "600", color: "#111827" }}>No improvement steps</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
