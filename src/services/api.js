const API_BASE = "http://localhost:5000/api";

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  return res.json();
};

export const uploadResume = async (formData) => {
  const res = await fetch(`${API_BASE}/resume/upload`, { method: "POST", body: formData });
  return res.json();
};

export const runFullAnalysis = async (data) => {
  const res = await fetch(`${API_BASE}/full-analysis`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  return res.json();
};
