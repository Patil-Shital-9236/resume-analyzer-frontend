"use client";
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
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: "#111827", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.02);
        }
        
        .nav-link {
          color: #4B5563; transition: color 0.3s; cursor: pointer; font-weight: 600; font-size: 15px;
        }
        .nav-link:hover { color: #111827; }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 60px !important; text-align: center; }
          .hero-content { padding-right: 0 !important; margin: 0 auto; display: flex; flexDirection: column; alignItems: center; }
          .hero-buttons { justify-content: center !important; }
          .mockup-container { margin: 0 auto; max-width: 600px; width: 100%; }
        }
      `}</style>

      {/* Massive, soft background blobs for a premium "Stripe-like" warm gradient effect */}
      <div style={{ position: "absolute", top: "-200px", right: "-100px", width: "800px", height: "800px", background: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)", filter: "blur(120px)", opacity: 0.4, borderRadius: "50%", zIndex: 0, pointerEvents: "none", animation: "float 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "-200px", left: "-200px", width: "1000px", height: "1000px", background: "linear-gradient(135deg, #F6D365 0%, #FDA085 100%)", filter: "blur(150px)", opacity: 0.3, borderRadius: "50%", zIndex: 0, pointerEvents: "none", animation: "float 12s ease-in-out infinite reverse" }} />

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, padding: "20px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 50, borderBottom: "1px solid rgba(0,0,0,0.05)", backdropFilter: "blur(20px)", background: "rgba(250, 250, 250, 0.7)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #FF512F, #DD2476)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(221,36,118,0.2)" }}>
            <div style={{ width: "14px", height: "14px", background: "white", borderRadius: "3px", transform: "rotate(45deg)" }} />
          </div>
          <span style={{ fontSize: "20px", fontWeight: "800", color: "#111827", letterSpacing: "-0.5px" }}>Elevate</span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <span className="nav-link" onClick={() => router.push("/login")}>Sign in</span>
          <button onClick={() => router.push("/register")} style={{ padding: "12px 28px", background: "#111827", color: "white", border: "none", borderRadius: "999px", fontWeight: "600", fontSize: "14px", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ paddingTop: "160px", paddingBottom: "100px", minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <div className="hero-grid" style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 5vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
          
          {/* Left Content */}
          <div className="hero-content" style={{ paddingRight: "40px", position: "relative", zIndex: 2 }}>
            <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "white", color: "#4B5563", borderRadius: "100px", fontSize: "13px", fontWeight: "600", marginBottom: "32px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)", letterSpacing: "0.5px" }}>
              <span style={{ color: "#FF512F" }}>✦</span> The AI Career Strategist
            </div>
            
            <h1 className="animate-fade-up delay-1" style={{ fontSize: "clamp(48px, 5vw, 72px)", fontWeight: "800", lineHeight: "1.1", marginBottom: "32px", letterSpacing: "-2px", color: "#111827" }}>
              Crafted to bypass the <br/>
              <span style={{ background: "linear-gradient(to right, #FF512F, #DD2476)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>algorithm.</span>
            </h1>
            
            <p className="animate-fade-up delay-2" style={{ fontSize: "20px", color: "#4B5563", lineHeight: "1.6", marginBottom: "48px", fontWeight: "400", maxWidth: "540px" }}>
              Stop guessing what recruiters want. We map your resume's DNA against any job description, surfacing the exact keywords and structural gaps you need to secure the interview.
            </p>
            
            <div className="hero-buttons animate-fade-up delay-3" style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={() => router.push("/dashboard")} style={{ padding: "18px 36px", background: "linear-gradient(135deg, #FF512F, #DD2476)", color: "white", border: "none", borderRadius: "999px", fontWeight: "700", fontSize: "16px", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 10px 25px rgba(221,36,118,0.25)" }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(221,36,118,0.3)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(221,36,118,0.25)"; }}>
                Analyze First Resume
              </button>
              <div style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.5", fontWeight: "500" }}>
                No registration required.<br/>Results in 2.4 seconds.
              </div>
            </div>
          </div>

          {/* Right Visual (Glassmorphism Mockup) */}
          <div className="mockup-container animate-fade-up delay-2" style={{ position: "relative", width: "100%", zIndex: 2 }}>
            <div style={{ animation: "float 6s ease-in-out infinite" }}>
              
              {/* Dashboard Mockup Component */}
              <div className="glass-card" style={{ padding: "32px", borderRadius: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "20px" }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "#6B7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px", fontWeight: "600" }}>Match Probability</div>
                    <div style={{ fontSize: "48px", fontWeight: "800", color: "#059669", letterSpacing: "-1px" }}>87%</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", color: "#6B7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px", fontWeight: "600" }}>Role</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#111827" }}>Product Designer</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ padding: "20px", background: "white", borderRadius: "20px", borderLeft: "4px solid #10B981", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} />
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#111827" }}>User Research</div>
                    </div>
                    <div style={{ fontSize: "14px", color: "#4B5563", paddingLeft: "16px" }}>Strongly aligned. Mentioned 3 times in your experience.</div>
                  </div>
                  <div style={{ padding: "20px", background: "white", borderRadius: "20px", borderLeft: "4px solid #EF4444", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EF4444" }} />
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#111827" }}>Design Systems</div>
                    </div>
                    <div style={{ fontSize: "14px", color: "#4B5563", paddingLeft: "16px" }}>Missing keyword. Required by the job description.</div>
                  </div>
                  <div style={{ padding: "20px", background: "white", borderRadius: "20px", borderLeft: "4px solid #F59E0B", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F59E0B" }} />
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#111827" }}>Impact Metrics</div>
                    </div>
                    <div style={{ fontSize: "14px", color: "#4B5563", paddingLeft: "16px" }}>Weak phrasing. Quantify "improved conversions".</div>
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