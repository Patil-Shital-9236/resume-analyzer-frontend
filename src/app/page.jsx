"use client";
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
    <div style={{ minHeight: "100vh", background: "#0B0F19", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: "#F8FAFC", overflowX: "hidden" }}>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        .animate-fade-up { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        
        .glass-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        
        .nav-link {
          color: #94A3B8; transition: color 0.3s; cursor: pointer; font-weight: 500; font-size: 14px;
        }
        .nav-link:hover { color: #F8FAFC; }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, padding: "20px 4vw", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 50, borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", background: "rgba(11, 15, 25, 0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #6366F1, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "12px", height: "12px", background: "white", borderRadius: "2px", transform: "rotate(45deg)" }} />
          </div>
          <span style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "0.5px" }}>Elevate</span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <span className="nav-link" onClick={() => router.push("/login")}>Sign in</span>
          <button onClick={() => router.push("/register")} style={{ padding: "10px 24px", background: "#F8FAFC", color: "#0B0F19", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ paddingTop: "140px", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative" }}>
        {/* Glow Effects */}
        <div style={{ position: "absolute", top: "20%", left: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(11,15,25,0) 70%)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(11,15,25,0) 70%)", zIndex: 0 }} />

        <div style={{ width: "100%", maxWidth: "1300px", margin: "0 auto", padding: "0 4vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", zIndex: 1, alignItems: "center" }}>
          
          {/* Left Content */}
          <div style={{ paddingRight: "40px" }}>
            <div className="animate-fade-up" style={{ display: "inline-block", padding: "6px 14px", background: "rgba(99, 102, 241, 0.1)", color: "#818CF8", borderRadius: "100px", fontSize: "13px", fontWeight: "600", marginBottom: "32px", border: "1px solid rgba(99, 102, 241, 0.2)", letterSpacing: "0.5px" }}>
              Precision Application Scanning
            </div>
            
            <h1 className="animate-fade-up delay-1" style={{ fontSize: "64px", fontWeight: "700", lineHeight: "1.05", marginBottom: "32px", letterSpacing: "-1.5px" }}>
              Engineered to bypass the <span style={{ color: "#818CF8" }}>algorithm.</span>
            </h1>
            
            <p className="animate-fade-up delay-2" style={{ fontSize: "19px", color: "#94A3B8", lineHeight: "1.6", marginBottom: "48px", fontWeight: "400" }}>
              Stop guessing what recruiters want. We map your resume's DNA against any job description, surfacing the exact keywords, structural gaps, and metrics you need to secure the interview.
            </p>
            
            <div className="animate-fade-up delay-3" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <button onClick={() => router.push("/dashboard")} style={{ padding: "18px 36px", background: "linear-gradient(135deg, #6366F1, #4F46E5)", color: "white", border: "none", borderRadius: "12px", fontWeight: "600", fontSize: "16px", cursor: "pointer", transition: "transform 0.2s", animation: "pulseGlow 2s infinite" }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                Analyze First Resume
              </button>
              <div style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.5" }}>
                No registration required.<br/>Results in 2.4 seconds.
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="animate-fade-up delay-2" style={{ position: "relative", height: "600px" }}>
            <div style={{ animation: "float 6s ease-in-out infinite", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%" }}>
              
              {/* Dashboard Mockup Component */}
              <div className="glass-card" style={{ padding: "24px", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Match Probability</div>
                    <div style={{ fontSize: "36px", fontWeight: "700", color: "#10B981" }}>87%</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Role</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#E2E8F0" }}>Senior Engineer</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ padding: "16px", background: "rgba(16, 185, 129, 0.05)", borderRadius: "12px", borderLeft: "3px solid #10B981" }}>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#E2E8F0", marginBottom: "4px" }}>System Architecture</div>
                    <div style={{ fontSize: "13px", color: "#94A3B8" }}>Present in both resume and job description.</div>
                  </div>
                  <div style={{ padding: "16px", background: "rgba(239, 68, 68, 0.05)", borderRadius: "12px", borderLeft: "3px solid #EF4444" }}>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#E2E8F0", marginBottom: "4px" }}>Microservices</div>
                    <div style={{ fontSize: "13px", color: "#94A3B8" }}>Missing. Critical requirement found in JD 4 times.</div>
                  </div>
                  <div style={{ padding: "16px", background: "rgba(245, 158, 11, 0.05)", borderRadius: "12px", borderLeft: "3px solid #F59E0B" }}>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#E2E8F0", marginBottom: "4px" }}>Impact Metrics</div>
                    <div style={{ fontSize: "13px", color: "#94A3B8" }}>Weak phrasing. Quantify "improved performance".</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}