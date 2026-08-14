import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#111827", letterSpacing: "-0.5px" }}>AI Resume Analyzer</span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <button onClick={() => router.push("/login")} style={{ padding: "10px 20px", background: "transparent", color: "#475569", border: "none", fontWeight: "600", fontSize: "14.5px", cursor: "pointer", transition: "color 0.2s" }}>
            Login
          </button>
          <button onClick={() => router.push("/register")} style={{ padding: "10px 24px", background: "#111827", color: "white", border: "none", borderRadius: "999px", fontWeight: "600", fontSize: "14.5px", cursor: "pointer", transition: "background 0.2s" }}>
            Sign Up Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Background Gradients */}
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(248,250,252,0) 70%)", zIndex: 0, pointerEvents: "none" }} />
        
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <div style={{ display: "inline-block", padding: "6px 16px", background: "#eff6ff", color: "#1d4ed8", borderRadius: "999px", fontSize: "13px", fontWeight: "700", marginBottom: "24px", border: "1px solid #bfdbfe", textTransform: "uppercase", letterSpacing: "1px" }}>
            ✨ Smart Career Insights
          </div>
          <h1 style={{ fontSize: "56px", fontWeight: "800", color: "#0f172a", lineHeight: "1.1", marginBottom: "24px", letterSpacing: "-1.5px" }}>
            Get past the ATS. <br />
            <span style={{ background: "linear-gradient(to right, #2563eb, #7c3aed)", WebkitBackgroundClip: "text", color: "transparent" }}>Land your dream job.</span>
          </h1>
          <p style={{ fontSize: "18px", color: "#475569", lineHeight: "1.6", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
            Instantly analyze your resume against any job description using advanced AI. Discover missing skills, fix weaknesses, and get a tailored improvement plan.
          </p>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <button onClick={() => router.push("/dashboard")} style={{ padding: "16px 32px", background: "#2563eb", color: "white", border: "none", borderRadius: "999px", fontWeight: "600", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 10px 25px -5px rgba(37,99,235,0.3), 0 8px 10px -6px rgba(37,99,235,0.1)", transition: "transform 0.2s, box-shadow 0.2s" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              Analyze Resume Free
            </button>
            <button onClick={() => router.push("/login")} style={{ padding: "16px 32px", background: "white", color: "#334155", border: "1px solid #cbd5e1", borderRadius: "999px", fontWeight: "600", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", transition: "background 0.2s" }}>
              Log In
            </button>
          </div>
          <div style={{ marginTop: "24px", fontSize: "13px", color: "#64748b", fontWeight: "500" }}>
            No credit card required • 1 Free Analysis • Instant Results
          </div>
        </div>

        {/* Feature Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "80px", maxWidth: "1000px", width: "100%", position: "relative", zIndex: 1 }}>
          {[
            { icon: "🎯", title: "Match Scoring", desc: "Get an instant ATS match percentage based on skills and experience." },
            { icon: "💡", title: "Missing Skills", desc: "Identify exactly which keywords you need to add to pass the filter." },
            { icon: "📈", title: "Action Plan", desc: "Receive a step-by-step guide to improve your resume instantly." }
          ].map((f, i) => (
            <div key={i} style={{ background: "white", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", textAlign: "left" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e5e7eb", padding: "32px 40px", background: "white", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8", fontWeight: "500" }}>© 2025 AI Resume Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
}