"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const handle = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors({ ...errors, [k]: "" }); // clear field error on type
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!form.confirm) {
      newErrors.confirm = "Please confirm your password";
    } else if (form.password !== form.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");
    setSuccess("");

    try {
      const res = await registerUser({ full_name: form.name.trim(), email: form.email.trim(), password: form.password });

      if (res.user || res.message === "User registered successfully") {
        setSuccess("Account created successfully! Redirecting to login...");
        setForm({ name: "", email: "", password: "", confirm: "" });
        setErrors({});
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setServerError(res.error || res.message || "Registration failed");
      }
    } catch {
      setServerError("Server error. Please try again.");
    }
    setLoading(false);
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 16px",
    border: `1px solid ${errors[field] ? "#ef4444" : "#d1d5db"}`,
    borderRadius: "8px",
    fontSize: "15px",
    marginBottom: errors[field] ? "4px" : "20px",
    outline: "none",
    boxSizing: "border-box",
    background: errors[field] ? "#fff5f5" : "white",
    transition: "border 0.2s"
  });

  return (
    <div style={{ minHeight: "100vh", background: "#eef2f7", display: "flex", flexDirection: "column" }}>
      <nav style={{ background: "#1e3a5f", padding: "16px 32px" }}>
        <span style={{ color: "white", fontWeight: "700", fontSize: "20px", fontFamily: "Georgia, serif" }}>
          AI Resume Analyzer
        </span>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
        <div style={{ background: "white", borderRadius: "16px", padding: "48px 40px", width: "100%", maxWidth: "480px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "700", marginBottom: "8px", color: "#1a1a2e", fontFamily: "Georgia, serif" }}>
            Create Account
          </h2>
          <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginBottom: "32px" }} />

          {serverError && (
            <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
              ❌ {serverError}
            </div>
          )}

          {success && (
            <div style={{ background: "#dcfce7", color: "#16a34a", padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
              ✅ {success}
            </div>
          )}

          {/* Full Name */}
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", color: "#374151", fontSize: "14px" }}>
            Full Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handle("name")}
            style={inputStyle("name")}
          />
          {errors.name && <p style={{ color: "#ef4444", fontSize: "12px", marginBottom: "16px", marginTop: "2px" }}>⚠ {errors.name}</p>}

          {/* Email */}
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", color: "#374151", fontSize: "14px" }}>
            Email <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handle("email")}
            style={inputStyle("email")}
          />
          {errors.email && <p style={{ color: "#ef4444", fontSize: "12px", marginBottom: "16px", marginTop: "2px" }}>⚠ {errors.email}</p>}

          {/* Password */}
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", color: "#374151", fontSize: "14px" }}>
            Password <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="password"
            placeholder="Min 6 chars, 1 uppercase, 1 number"
            value={form.password}
            onChange={handle("password")}
            style={inputStyle("password")}
          />
          {errors.password && <p style={{ color: "#ef4444", fontSize: "12px", marginBottom: "16px", marginTop: "2px" }}>⚠ {errors.password}</p>}

          {/* Confirm Password */}
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", color: "#374151", fontSize: "14px" }}>
            Confirm Password <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={form.confirm}
            onChange={handle("confirm")}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            style={inputStyle("confirm")}
          />
          {errors.confirm && <p style={{ color: "#ef4444", fontSize: "12px", marginBottom: "16px", marginTop: "2px" }}>⚠ {errors.confirm}</p>}

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: "100%", padding: "14px",
              background: loading ? "#93c5fd" : "#2563eb",
              color: "white", border: "none", borderRadius: "8px",
              fontSize: "16px", fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "20px", marginTop: "8px",
              transition: "background 0.2s"
            }}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginBottom: "20px" }} />
          <div style={{ textAlign: "center", fontSize: "14px" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "500" }}>
              Login Here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}