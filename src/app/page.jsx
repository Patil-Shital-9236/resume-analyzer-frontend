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
    <div style={{ minHeight: "100vh", background: "#FFFCF8", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: "#3E2723", overflowX: "hidden" }}>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes floatReverse {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        
        /* True Glassmorphism */
        .glass-card {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.15), inset 0 0 0 1px rgba(255,255,255,0.6);
        }
        
        .nav-link {
          color: #795548; transition: color 0.3s; cursor: pointer; font-weight: 600; font-size: 15px;
        }
        .nav-link:hover { color: #D84315; }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 60px !important; text-align: center; }
          .hero-content { padding-right: 0 !important; margin: 0 auto; display: flex; flexDirection: column; alignItems: center; }
          .hero-buttons { justify-content: center !important; }
          .mockup-container { margin: 0 auto; max-width: 600px; width: 100%; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, padding: "20px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 50, borderBottom: "1px solid rgba(216,67,21,0.1)", backdropFilter: "blur(20px)", background: "rgba(255, 252, 248, 0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #FF6D00, #FFD600)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(255,109,0,0.3)" }}>
            <div style={{ width: "14px", height: "14px", background: "white", borderRadius: "3px", transform: "rotate(45deg)" }} />
          </div>
          <span style={{ fontSize: "20px", fontWeight: "800", color: "#3E2723", letterSpacing: "-0.5px" }}>Elevate</span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <span className="nav-link" onClick={() => router.push("/login")}>Sign in</span>
          <button onClick={() => router.push("/register")} style={{ padding: "12px 28px", background: "#3E2723", color: "white", border: "none", borderRadius: "999px", fontWeight: "600", fontSize: "14px", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(62,39,35,0.2)" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ paddingTop: "160px", paddingBottom: "100px", minHeight: "100vh", position: "relative" }}>
        
        {/* Warm Glow Backgrounds */}
        <div style={{ position: "absolute", top: "10%", left: "-10%", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(255,109,0,0.12) 0%, rgba(255,252,248,0) 70%)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "30%", right: "-5%", width: "900px", height: "900px", background: "radial-gradient(circle, rgba(255,214,0,0.15) 0%, rgba(255,252,248,0) 70%)", zIndex: 0 }} />

        <div className="hero-grid" style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 5vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", zIndex: 1, alignItems: "center" }}>
          
          {/* Left Content */}
          <div className="hero-content" style={{ paddingRight: "40px", position: "relative", zIndex: 2 }}>
            <div className="animate-fade-up" style={{ display: "inline-block", padding: "8px 18px", background: "rgba(255,109,0,0.1)", color: "#D84315", borderRadius: "100px", fontSize: "14px", fontWeight: "700", marginBottom: "32px", border: "1px solid rgba(255,109,0,0.2)", letterSpacing: "0.5px" }}>
              ✨ The AI Career Strategist
            </div>
            
            <h1 className="animate-fade-up delay-1" style={{ fontSize: "clamp(48px, 5vw, 68px)", fontWeight: "800", lineHeight: "1.1", marginBottom: "32px", letterSpacing: "-1.5px", color: "#261612" }}>
              Crafted to bypass the <span style={{ color: "#FF6D00" }}>algorithm.</span>
            </h1>
            
            <p className="animate-fade-up delay-2" style={{ fontSize: "20px", color: "#5D4037", lineHeight: "1.6", marginBottom: "48px", fontWeight: "400", maxWidth: "540px" }}>
              Stop guessing what recruiters want. We map your resume's DNA against any job description, surfacing the exact keywords and structural gaps you need to secure the interview.
            </p>
            
            <div className="hero-buttons animate-fade-up delay-3" style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={() => router.push("/dashboard")} style={{ padding: "20px 40px", background: "linear-gradient(135deg, #FF6D00, #E65100)", color: "white", border: "none", borderRadius: "16px", fontWeight: "700", fontSize: "16px", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 10px 25px rgba(255,109,0,0.3)" }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(255,109,0,0.4)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(255,109,0,0.3)"; }}>
                Analyze First Resume
              </button>
              <div style={{ fontSize: "14px", color: "#795548", lineHeight: "1.5", fontWeight: "500" }}>
                No registration required.<br/>Results in 2.4 seconds.
              </div>
            </div>
          </div>

          {/* Right Visual (Glassmorphism & Fixed Layout) */}
          <div className="mockup-container animate-fade-up delay-2" style={{ position: "relative", width: "100%" }}>
            
            {/* Colorful Shapes Behind Glass */}
            <div style={{ position: "absolute", top: "10%", right: "10%", width: "200px", height: "200px", background: "#FFD600", borderRadius: "50%", filter: "blur(40px)", animation: "float 8s ease-in-out infinite" }} />
            <div style={{ position: "absolute", bottom: "10%", left: "10%", width: "250px", height: "250px", background: "#FF6D00", borderRadius: "50%", filter: "blur(50px)", animation: "floatReverse 7s ease-in-out infinite" }} />

            <div style={{ animation: "float 6s ease-in-out infinite", position: "relative", zIndex: 2 }}>
              
              {/* Dashboard Mockup Component */}
              <div className="glass-card" style={{ padding: "32px", borderRadius: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", borderBottom: "1px solid rgba(62,39,35,0.1)", paddingBottom: "20px" }}>
                  <div>
                    <div style={{ fontSize: "13px", color: "#795548", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px", fontWeight: "600" }}>Match Probability</div>
                    <div style={{ fontSize: "42px", fontWeight: "800", color: "#2E7D32" }}>87%</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", color: "#795548", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px", fontWeight: "600" }}>Role</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#3E2723" }}>Product Designer</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ padding: "18px", background: "rgba(46, 125, 50, 0.08)", borderRadius: "16px", borderLeft: "4px solid #4CAF50" }}>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#1B5E20", marginBottom: "6px" }}>User Research</div>
                    <div style={{ fontSize: "14px", color: "#2E7D32" }}>Strongly aligned. Mentioned 3 times in your experience.</div>
                  </div>
                  <div style={{ padding: "18px", background: "rgba(216, 67, 21, 0.08)", borderRadius: "16px", borderLeft: "4px solid #FF5722" }}>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#BF360C", marginBottom: "6px" }}>Design Systems</div>
                    <div style={{ fontSize: "14px", color: "#D84315" }}>Missing keyword. Required by the job description.</div>
                  </div>
                  <div style={{ padding: "18px", background: "rgba(249, 168, 37, 0.1)", borderRadius: "16px", borderLeft: "4px solid #FBC02D" }}>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#F57F17", marginBottom: "6px" }}>Impact Metrics</div>
                    <div style={{ fontSize: "14px", color: "#F57F17" }}>Weak phrasing. Quantify "improved conversions".</div>
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