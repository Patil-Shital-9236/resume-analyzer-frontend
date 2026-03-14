const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export default API_BASE;

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  return res.json();
};

export const uploadResume = async (formData) => {
  const res = await fetch(`${API_BASE}/api/resume/upload`, { method: "POST", body: formData });
  return res.json();
};

export const runFullAnalysis = async (data) => {
  const res = await fetch(`${API_BASE}/api/full-analysis`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  return res.json();
};
